"use strict";

/**
 * Manager, 22.10.2015 Spaceify Oy
 * 
 * Spacelet, sandboxed, sandboxed debian and native debian application manager class.
 * 
 * @class Manager
 */

//var Logger = require("./logger");
var fibrous = require("./fibrous");
var Database = require("./database");
var language = require("./language");
var Manifest = require("./manifest");
var SpaceifyError = require("./spaceifyerror");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyUnique = require("./spaceifyunique");
var SpaceifyUtility = require("./spaceifyutility");
var DockerContainer = require("./dockercontainer");
var DockerImage = require("./dockerimage");

function Manager(managerType)
{
var self = this;

var database = new Database();
var errorc = new SpaceifyError();
var unique = new SpaceifyUnique();
var utility = new SpaceifyUtility();
var dockerImage = new DockerImage();
var config = SpaceifyConfig.getConfig();
//var logger = Logger.getLogger("Manager");

var manifests = {};
var manifestsCount = 0;

self.install = fibrous( function(unique_name, throws)
	{
	var manifestFile;
	var dbApplication;
	var manifest = null;

	try	{
		dbApplication = database.sync.getApplication(unique_name);

		if((manifestFile = utility.sync.loadJSON(unique.getAppPath(managerType, unique_name, config) + config.MANIFEST, true)) == null)
			throw language.E_INSTALL_READ_MANIFEST_FAILED.preFmt("Manager::install", {"~type": language.APP_DISPLAY_NAMES[managerType], "~unique_name": unique_name});

		manifest = new Manifest(manifestFile, dbApplication.develop);
		manifest.setDockerImageId(dbApplication.docker_image_id);
		add(manifest);
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
	var manifest = null;
	var startObject = {};

	try	{
		manifest = manifests[unique_name];

		run.sync(manifest);

		startObject = { providesServices: manifest.getProvidesServices() };
		}
	catch(err)
		{
		if(throws)
			throw errorc.make(err);
		}

	return startObject;
	});

var run = fibrous( function(manifest)
	{ // Starts the application in a Docker container
	var ferr;
	var matches;
	var response;
	var binds = [];
	var volumes = {};
	var dockerContainer;

	try	{
		if(manifest.sync.isRunning())
			return true;

		if(manifest.isDevelop())
			return false;

		if(managerType == config.SPACELET || managerType == config.SANDBOXED || managerType == config.SANDBOXED_DEBIAN)
			{
				// Make sure there are no containers running with the imageID
			dockerImage.sync.removeContainers(manifest.getDockerImageId(), "", null);

				// Run
			var fullApiPath = config.SPACEIFY_CODE_PATH;
			var fullVolumePath = unique.getVolPath(managerType, manifest.getUniqueName(), config);

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

			manifest.clearRuntimeServices();

			dockerContainer = new DockerContainer();
			manifest.setDockerContainer(dockerContainer);
			dockerContainer.sync.startContainer(manifest.getProvidesServicesCount(), manifest.getDockerImageId(), volumes, binds);

			manifest.createRuntimeServices(dockerContainer.getPublicPorts(), dockerContainer.getIpAddress());

			response = dockerContainer.sync.runApplication(manifest);				// [0] = output from the app, [1] = initialization status

			if(response[1] == config.APPLICATION_UNINITIALIZED)
				{
				matches = /;;(.+)::/.exec(response[0]);								// extract error string from the output

				matches = errorc.endWithDot(matches[1]);

				self.sync.stop(manifest.getUniqueName(), true);						// Stop container

				throw language.E_START_INIT_FAILED.preFmt("Manager::run", {	"~err": matches,
																			"~type": language.APP_UPPER_CASE_DISPLAY_NAMES[managerType]});
				}
			}
		else //if(managerType == config.NATIVE_DEBIAN)
			{
			utility.execute.sync("systemctl", ["start", manifest.getUniqueNameAsServiceName()], {}, null);
			}
		}
	catch(err)
		{
		ferr = language.E_RUN_FAILED_TO_RUN.preFmt("Manager::run", {"~type": language.APP_DISPLAY_NAMES[managerType], "~unique_name": manifest.getUniqueName()});
		throw errorc.make(ferr, err);
		}
	});

self.stop = fibrous( function(unique_name, throws)
	{
	var dockerContainer;
	var manifest = self.getApplication(unique_name);

	if(manifest)
		{
		if(managerType == config.SPACELET || managerType == config.SANDBOXED || managerType == config.SANDBOXED_DEBIAN)
			{
			if((dockerContainer = manifest.getDockerContainer()) != null)
				dockerContainer.sync.stopContainer(manifest, throws);
			}
		else //if(managerType == config.NATIVE_DEBIAN)
			{
			utility.execute.sync("systemctl", ["stop", manifest.getUniqueNameAsServiceName()], {}, null);
			}

		manifest.clearRuntimeServices();
		manifest.setDockerContainer(null);
		}
	});

var add = function(manifest)
	{
	manifests[manifest.getUniqueName()] = manifest;

	manifestsCount = Object.keys(manifests).length;
	}

self.remove = fibrous( function(unique_name, throws)
	{
	var keys = Object.keys(manifests);									// Deleting seems to work reliably only in "normal" loop

	for(var i = 0; i < keys.length; i++)
		{
		if(keys[i] == unique_name || unique_name == "")
			{
			self.sync.stop(keys[i], throws);
			delete manifests[keys[i]];
			}
		}

	manifestsCount = Object.keys(manifests).length;
	});

self.removeAll = fibrous( function()
	{
	self.sync.remove("", false);
	});

self.getApplicationCount = function()
	{
	return manifestsCount;
	}

	// -- -- -- -- -- -- -- -- -- -- //
self.getApplication = function(unique_name)
	{
	return (unique_name in manifests ? manifests[unique_name] : null);
	}

self.getApplicationByIp = function(ip)
	{ // Only sandboxed applications can return a unique IP 
	var dc;

	for(var unique_name in manifests)
		{
		dc = manifests[unique_name].getDockerContainer();
		if(dc && dc.getIpAddress() == ip)
			return manifests[unique_name];
		}

	return null;
	}

self.getRuntimeService = function(search)
	{
	var service = null;

	for(var unique_name in manifests)
		{
		if((service = manifests[unique_name].getRuntimeService(search.service_name, search.unique_name)))
			break;
		}

	return service;
	}

self.getRuntimeServicesByName = function(service_name)
	{
	var service;
	var services = {};

	for(var unique_name in manifests)
		{
		if((service = manifests[unique_name].getRuntimeService(service_name, null)))
			services[service.unique_name] = service;
		}

	return (Object.keys(services).length > 0 ? services : null);
	}

self.getServiceRuntimeStates = function()
	{
	var state;
	var services;
	var status = {};

	for(var unique_name in manifests)
		{
		state = [];
		services = manifests[unique_name].getRuntimeServices();

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

			status[unique_name] = { services: state, isDevelop: manifests[unique_name].isDevelop() };
			}
		}

	return status;
	}

self.getUniqueNames = function()
	{
	var uniqueNames = [];

	for(var unique_name in manifests)
		uniqueNames.push(unique_name);

	return uniqueNames;
	}

}

module.exports = Manager;
