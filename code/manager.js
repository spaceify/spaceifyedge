"use strict";

/**
 * Manager, 22.10.2015 Spaceify Oy
 * 
 * Spacelet, sandboxed, sandboxed debian and native debian application manager class.
 * 
 * @class Manager
 */

var Logger = require("./logger");
var fibrous = require("./fibrous");
var Database = require("./database");
var language = require("./language");
var Application = require("./application");
var SpaceifyError = require("./spaceifyerror");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyUtility = require("./spaceifyutility");
var DockerContainer = require("./dockercontainer");

function Manager(managerType)
{
var self = this;

var logger = new Logger();
var database = new Database();
var errorc = new SpaceifyError();
var config = new SpaceifyConfig();
var utility = new SpaceifyUtility();

var applications = {};
var applicationsCount = 0;

self.install = fibrous( function(unique_name, throws)
	{
	var manifest;
	var dbApplication;
	var application = null;
	var applicationPath = "";

	try	{
		dbApplication = database.sync.getApplication(unique_name);

		if(managerType == config.SPACELET)
			applicationPath = config.SPACELETS_PATH;
		else if(managerType == config.SANDBOXED)
			applicationPath = config.SANDBOXED_PATH;
		else if(managerType == config.SANDBOXED_DEBIAN)
			applicationPath = config.SANDBOXED_DEBIAN_PATH;
		else if(managerType == config.NATIVE_DEBIAN)
			applicationPath = config.NATIVE_DEBIAN_PATH;

		if((manifest = utility.sync.loadJSON(applicationPath + dbApplication.unique_directory + config.VOLUME_DIRECTORY + config.APPLICATION_DIRECTORY + config.MANIFEST, true)) == null)
			throw language.E_INSTALL_READ_MANIFEST_FAILED.preFmt("Manager::install", {"~type": language.APP_DISPLAY_NAMES[managerType], "~unique_name": dbApplication.unique_name});

		application = new Application(manifest, dbApplication.develop);
		application.setDockerImageId(dbApplication.docker_image_id);
		add(application);
		}
	catch(err)
		{
		if(throws)
			throw errorc.make(err);
		}
	finally
		{
		database.close();
		}

	return true;
	});

self.start = fibrous( function(unique_name, throws)
	{
	var startObject = {};
	var application = null;

	try	{
		application = applications[unique_name];

		run.sync(application);

		startObject = { providesServices: application.getProvidesServices() };
		}
	catch(err)
		{
		if(throws)
			throw errorc.make(err);
		}

	return startObject;
	});

var run = fibrous( function(application)
	{ // Starts the application in a Docker container
	var ferr;
	var matches;
	var response;
	var binds = [];
	var volumes = {};
	var dockerContainer;
	var applicationPath = "";

	try	{
		if(application.sync.isRunning())
			return true;

		if(application.isDevelop())
			return false;

		if(managerType == config.SPACELET || managerType == config.SANDBOXED || managerType == config.SANDBOXED_DEBIAN)
			{
			if(managerType == config.SPACELET)
				applicationPath = config.SPACELETS_PATH;
			else if(managerType == config.SANDBOXED)
				applicationPath = config.SANDBOXED_PATH;
			else if(managerType == config.SANDBOXED_DEBIAN)
				applicationPath = config.SANDBOXED_DEBIAN_PATH;

			var fullApiPath = config.SPACEIFY_CODE_PATH;
			var fullVolumePath = applicationPath + application.getUniqueDirectory() + config.VOLUME_DIRECTORY;

			volumes[config.API_PATH] = {};
			volumes[config.VOLUME_PATH] = {};
			volumes[fullApiPath] = {};
			volumes[fullVolumePath] = {};

			binds = [
					fullVolumePath + ":" + config.VOLUME_PATH + ":rw",
					fullVolumePath + ":" + fullVolumePath + ":rw",
					fullApiPath + ":" + config.API_PATH + ":ro",
					fullApiPath + ":" + config.SPACEIFY_CODE_PATH + ":ro"
					];

			application.clearRuntimeServices();

			dockerContainer = new DockerContainer();
			application.setDockerContainer(dockerContainer);
			dockerContainer.sync.startContainer(application.getProvidesServicesCount(), application.getDockerImageId(), volumes, binds);

			application.createRuntimeServices(dockerContainer.getPublicPorts(), dockerContainer.getIpAddress());

			response = dockerContainer.sync.runApplication(application);			// [0] = output from the app, [1] = initialization status

			if(response[1] == config.APPLICATION_UNINITIALIZED)
				{
				matches = /;;(.+)::/.exec(response[0]);								// extract error string from the output

				matches = errorc.endWithDot(matches[1]);

				self.sync.stop(application.getUniqueName());						// Stop container

				throw language.E_START_INIT_FAILED.preFmt("Manager::run", {	"~err": matches,
																			"~type": language.APP_UPPER_CASE_DISPLAY_NAMES[managerType]});
				}
			}
		else //if(managerType == config.NATIVE_DEBIAN)
			{
			utility.execute.sync("systemctl", ["start", application.getUniqueNameAsServiceName()], {}, null);
			}
		}
	catch(err)
		{
		ferr = language.E_RUN_FAILED_TO_RUN.preFmt("Manager::run", {"~type": language.APP_DISPLAY_NAMES[managerType], "~unique_name": application.getUniqueName()});
		throw errorc.make(ferr, err);
		}
	});

self.stop = fibrous( function(unique_name)
	{
	var dockerContainer;
	var application = self.getApplication(unique_name);

	if(application)
		{
		if(managerType == config.SPACELET || managerType == config.SANDBOXED || managerType == config.SANDBOXED_DEBIAN)
			{
			if((dockerContainer = application.getDockerContainer()) != null)
				dockerContainer.sync.stopContainer(application);
			}
		else //if(managerType == config.NATIVE_DEBIAN)
			{
			utility.execute.sync("systemctl", ["stop", application.getUniqueNameAsServiceName()], {}, null);
			}

		application.clearRuntimeServices();
		}
	});

var add = function(application)
	{
	applications[application.getUniqueName()] = application;

	applicationsCount = Object.keys(applications).length;
	}

self.remove = fibrous( function(unique_name)
	{
	var keys = Object.keys(applications);								// Deleting seems to work reliably only in "normal" loop

	for(var i = 0; i < keys.length; i++)
		{
		if(keys[i] == unique_name || unique_name == "")
			{
			self.sync.stop(keys[i]);
			delete applications[keys[i]];
			}
		}

	applicationsCount = Object.keys(applications).length;
	});

self.removeAll = fibrous( function()
	{
	self.sync.remove("");
	});

self.getApplicationCount = function()
	{
	return applicationsCount;
	}

	// -- -- -- -- -- -- -- -- -- -- //
self.getApplication = function(unique_name)
	{
	return (unique_name in applications ? applications[unique_name] : null);
	}

self.getApplicationByIp = function(ip)
	{ // Only sandboxed applications can return a unique IP 
	var dc;

	for(var unique_name in applications)
		{
		dc = applications[unique_name].getDockerContainer();
		if(dc && dc.getIpAddress() == ip)
			return applications[unique_name];
		}

	return null;
	}

self.getRuntimeService = function(search)
	{
	var service = null;

	for(var unique_name in applications)
		{
		if((service = applications[unique_name].getRuntimeService(search.service_name, search.unique_name)))
			break;
		}

	return service;
	}

self.getRuntimeServicesByName = function(service_name)
	{
	var service;
	var services = {};

	for(var unique_name in applications)
		{
		if((service = applications[unique_name].getRuntimeService(service_name, null)))
			services[service.unique_name] = service;
		}

	return (Object.keys(services).length > 0 ? services : null);
	}

self.getServiceRuntimeStates = function()
	{
	var state;
	var services;
	var status = {};

	for(var unique_name in applications)
		{
		state = [];
		services = applications[unique_name].getRuntimeServices();

		if(services.length > 0)
			{
			for(var i = 0; i < services.length; i++)
				state.push(	{
							service_name: services[i].service_name,
							service_type: services[i].service_type,
							port: services[i].port,
							securePort: services[i].securePort,
							containerPort: services[i].containerPort,
							secureContainerPort: services[i].secureContainerPort,
							ip: services[i].ip,
							isRegistered: services[i].isRegistered
							});

			status[unique_name] = { services: state, isDevelop: applications[unique_name].isDevelop() };
			}
		}

	return status;
	}

}

module.exports = Manager;
