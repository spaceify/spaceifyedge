"use strict";

/**
 * RuntimeManager, 22.10.2015 Spaceify Oy
 * 
 * Spacelet, sandboxed, sandboxed debian and native debian application runtime manager class.
 * 
 * @class RuntimeManager
 */

var fibrous = require("./fibrous");
var Database = require("./database");
var language = require("./language");
var Manifest = require("./manifest");
var DockerHelper = require("./dockerhelper");
var SpaceifyError = require("./spaceifyerror");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyUnique = require("./spaceifyunique");
//var SpaceifyLogger = require("./spaceifylogger");
var SpaceifyUtility = require("./spaceifyutility");
var DockerContainer = require("./dockercontainer");
var DockerImage = require("./dockerimage");

function RuntimeManager(managerType, _parent)
{
var self = this;

var database = new Database();
var errorc = new SpaceifyError();
var unique = new SpaceifyUnique();
var utility = new SpaceifyUtility();
var dockerImage = new DockerImage();
var dockerHelper = new DockerHelper();
var config = SpaceifyConfig.getConfig();
//var logger = new SpaceifyLogger("RuntimeManager");

var applications = {};
var applicationsCount = 0;

self.install = fibrous( function(unique_name, throws)
	{
	var dbApplication;
	var manifest = null;
	var application = null;

	try	{
		dbApplication = database.sync.getApplication(unique_name);

		manifest = Manifest.load(managerType, unique_name);

		if (manifest == null)
			throw language.E_INSTALL_READ_MANIFEST_FAILED.preFmt("RuntimeManager::install", {"~type": language.APP_DISPLAY_NAMES[managerType], "~unique_name": unique_name});

		application = { manifest: manifest,
						type: managerType,
						unique_name: unique_name,
						isDevelop: dbApplication.develop,
						dockerImageId: dbApplication.docker_image_id,
						dockerContainer: null
						};

		add(application);
		}
	catch(err)
		{
		if (throws)
			throw errorc.make(err);
		}
	finally
		{
		database.close();
		}

	return application;
	});

self.start = fibrous( function(unique_name, throws)
	{
	var application = null;

	try	{
		application = applications[unique_name];

		run.sync(application);
		}
	catch(err)
		{
		if (throws)
			throw errorc.make(err);
		}
	});

var run = fibrous( function(application)
	{ // Starts the application in a Docker container
	var ferr;
	var matches;
	var response;
	var binds = [];
	var volumes = {};
	var dockerContainer;

	try	{
		if (self.sync.isRunning(application.unique_name))
			return true;

		if (application.isDevelop)
			return false;

		if (managerType == config.SPACELET || managerType == config.SANDBOXED || managerType == config.SANDBOXED_DEBIAN)
			{
				// Make sure there are no containers running with the imageID
			dockerImage.sync.removeContainers(application.dockerImageId, "", null);

				// Run
			var fullApiPath = config.SPACEIFY_CODE_PATH;
			var fullVolumePath = unique.getVolPath(managerType, application.unique_name, config);

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

			dockerContainer = new DockerContainer();
			application.dockerContainer = dockerContainer;
			dockerContainer.sync.startContainer(application.manifest.getProvidesServicesCount(), application.dockerImageId, volumes, binds);

			// --->
			var ports = dockerContainer.getPublicPorts();
			var provided = application.manifest.getProvidesServicesWithHttp();

			for (var i = 0; i < provided.length; i++)
				{
				provided[i].port = ports[i].hostPort;
				provided[i].securePort = ports[i].secureHostPort;
				provided[i].containerPort = ports[i].containerPort;
				provided[i].secureContainerPort = ports[i].secureContainerPort;
				}

			_parent.preContainerRun(application.manifest.getUniqueName(), provided, dockerContainer.getIpAddress());
			// <---

			response = dockerContainer.sync.runApplication(application.manifest);	// [0] = output from the app, [1] = initialization status

			if (response[1] == config.APPLICATION_UNINITIALIZED)
				{
				matches = /;;(.+)::/.exec(response[0]);								// extract error string from the output

				matches = errorc.endWithDot(matches[1]);

				self.sync.stop(application.unique_name, true);						// Stop container

				throw language.E_START_INIT_FAILED.preFmt("RuntimeManager::run", {	"~err": matches,
																			"~type": language.APP_UPPER_CASE_DISPLAY_NAMES[managerType]});
				}
			}
		else //if (managerType == config.NATIVE_DEBIAN)
			{
			utility.execute.sync("systemctl", ["start", application.manifest.getUniqueNameAsSystemctlServiceName()], {}, null);
			}
		}
	catch(err)
		{
		ferr = language.E_RUN_FAILED_TO_RUN.preFmt("RuntimeManager::run", {"~type": language.APP_DISPLAY_NAMES[managerType], "~unique_name": application.unique_name});
		throw errorc.make(ferr, err);
		}
	});

self.stop = fibrous( function(unique_name, throws)
	{
	var dockerContainer;
	var application = self.getApplication(unique_name);

	if (application)
		{
		if (managerType == config.SPACELET || managerType == config.SANDBOXED || managerType == config.SANDBOXED_DEBIAN)
			{
			if ((dockerContainer = application.dockerContainer) != null)
				dockerContainer.sync.stopContainer(application.manifest, throws);
			}
		else //if (managerType == config.NATIVE_DEBIAN)
			{
			utility.execute.sync("systemctl", ["stop", application.manifest.getUniqueNameAsSystemctlServiceName()], {}, null);
			}

		application.dockerContainer = null;
		}
	});

var add = function(application)
	{
	applications[application.unique_name] = application;

	applicationsCount = Object.keys(applications).length;
	}

self.remove = fibrous( function(unique_name, throws)
	{
	if (typeof applications[unique_name] != "undefined")
		{
		self.sync.stop(unique_name, throws);

		delete applications[unique_name];

		applicationsCount = Object.keys(applications).length;

		return true;
		}

	return false;
	});

self.removeAll = fibrous( function(throws)
	{
	var unique_name;
	var removed = [];

	for (unique_name in applications)
		{
		if (self.sync.remove(unique_name, throws))
			removed.push(unique_name);
		}

	return removed;
	});

	// -- -- -- -- -- -- -- -- -- -- //
self.getApplicationCount = function()
	{
	return applicationsCount;
	}

self.getApplication = function(unique_name)
	{
	return (unique_name in applications ? applications[unique_name] : null);
	}

self.getApplicationByIp = function(ip)
	{ // Only sandboxed applications can return a unique IP 
	var dc;

	for (var unique_name in applications)
		{
		dc = applications[unique_name].dockerContainer;

		if (dc && dc.getIpAddress() == ip)
			return applications[unique_name];
		}

	return null;
	}

self.getUniqueNames = function()
	{
	var uniqueNames = [];

	for (var unique_name in applications)
		uniqueNames.push(unique_name);

	return uniqueNames;
	}

self.isRunning = fibrous( function(unique_name)
	{
	var status;
	var containers;
	var applicationIsRunning = false;
	var application = applications[unique_name];

	if(typeof application == "undefined")
		{
		return false;
		}
	else if ((managerType == config.SPACELET || managerType == config.SANDBOXED || managerType == config.SANDBOXED_DEBIAN) && application.dockerContainer)
		{ // Find a container having the ImageID
		containers = dockerHelper.listContainers();

		for (var i = 0; i < containers.length; i++)
			{
			if (containers[i].ImageID == application.dockerImageId)
				{
				applicationIsRunning = true;
				break;
				}
			}
		}
	else if (managerType == config.NATIVE_DEBIAN)
		{ // Use systemctl to find out is service running = active
		try {
			status = utility.execute.sync("systemctl", ["is-active", application.manifest.getUniqueNameAsSystemctlServiceName()], {}, null);

			if (status.stdout)
				{
				status = status.stdout.replace(/\n/g, "").toLowerCase();

				if (status == "active")
					applicationIsRunning = true;
				}
			}
		catch(err)
			{}
		}

	return applicationIsRunning;
	});

self.setDevelop = function(unique_name, develop_)
	{
	var application = applications[unique_name];

	if (typeof application != "undefined")
		application.isDevelop = develop_;
	}

self.isDevelop = function(unique_name)
	{
	var application = applications[unique_name];

	return (typeof application == "undefined" || !application.isDevelop ? false : true);
	}

}

module.exports = RuntimeManager;
