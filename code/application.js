"use strict";

/**
 * Application, 2015 Spaceify Oy
 * 
 * @class Application
 */

var fibrous = require("./fibrous");
var DockerHelper = require("./dockerhelper");
var SpaceifyUnique = require("./spaceifyunique");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyUtility = require("./spaceifyutility");

function Application(manifest, develop)
{
var self = this;

var unique = new SpaceifyUnique();
var config = new SpaceifyConfig();
var utility = new SpaceifyUtility();
var dockerHelper = new DockerHelper();

var docker_image_id = "";
var dockerContainer = null;

var runtimeServices = [];

// MANIFEST FIELDS
self.getManifest = function()
	{
	return manifest;
	}

self.getName = function()
	{
	return manifest.name;
	}

self.getVersion = function()
	{
	return manifest.version;
	}

self.getStartCommand = function()
	{
	return manifest.start_command;
	}

self.getStopCommand = function()
	{
	return (manifest.stop_command ? manifest.stop_command : "");
	}

self.getUniqueName = function()
	{
	return manifest.unique_name;
	}

self.getUniqueNameAsServiceName = function()
	{
	return unique.getSystemctlServiceName(manifest.unique_name);
	}
	
self.isShared = function()
	{
	return manifest.shared;
	}

self.getType = function()
	{
	return manifest.type;
	}

self.getUniqueDirectory = function()
	{
	return unique.getUniqueDirectory(manifest.unique_name);
	}

self.getProvidesServices = function()
	{
	return manifest.provides_services ? manifest.provides_services : [];
	}

self.getProvidesServicesCount = function()
	{
	return self.getProvidesServices().length;
	}

self.getProvidedService = function(service_name)
	{
	var service = null;
	var gps = self.getProvidesServices();

	for(var i = 0; i < gps.length; i++)
		{
		if(gps[i].service_name == service_name)
			{
			service = gps[i];
			break;
			}
		}

	return service;
	}

self.getRequiresServices = function()
	{
	return manifest.requires_services ? manifest.requires_services : [];
	}

self.getRequiresServicesCount = function()
	{
	return self.getRequiresServices().length;
	}

self.getInstallCommands = function()
	{
	return (manifest.install_commands ? manifest.install_commands : []);
	}

// GENERATED
self.getInstallationPath = function()
	{
	return unique.getAppPath(self.getType(), self.getUniqueName(), config);
	}

self.setDockerContainer = function(container)
	{
	dockerContainer = container;
	}

self.getDockerContainer = function()
	{
	return dockerContainer;
	}

self.setDockerImageId = function(id)
	{
	docker_image_id = id;
	}

self.getDockerImageId = function()
	{
	return docker_image_id;
	}

self.isRunning = fibrous( function()
	{
	var status;
	var containers;
	var type = self.getType();
	var applicationIsRunning = false;

	if((type == config.SPACELET || type == config.SANDBOXED || type == config.SANDBOXED_DEBIAN) && dockerContainer)
		{ // Find a container having the ImageID
		containers = dockerHelper.listContainers();
		for(var i = 0; i < containers.length; i++)
			{
			if(containers[i].ImageID == self.getDockerImageId())
				{
				applicationIsRunning = true;
				break;
				}
			}
		}
	else if(type == config.NATIVE_DEBIAN)
		{ // Use systemctl to find out is service running = active
		try {
			status = utility.execute.sync("systemctl", ["is-active", self.getUniqueNameAsServiceName()], {}, null);

			if(status.stdout)
				{
				status = status.stdout.replace(/\n/g, "").toLowerCase();

				if(status == "active")
					applicationIsRunning = true;
				}
			}
		catch(err)
			{}
		}

	return applicationIsRunning;
	});

self.implementsWebServer = function()
	{
	return (manifest.implements && manifest.implements.indexOf(config.WEB_SERVER) != -1 ? true : false);
	}

self.createRuntimeServices = function(ports, ip)
	{ // Create runtime services with their ports and IPs attached to the provided services
	var gps = self.getProvidesServices();
	var fp = config.FIRST_SERVICE_PORT;
	var fps = config.FIRST_SERVICE_PORT_SECURE;

	self.clearRuntimeServices();

	for(var i = 0; i < gps.length; i++)
		{
		runtimeServices.push(	{
								service_name: gps[i].service_name,
								service_type: gps[i].service_type,
								port: ports[i * 2],
								securePort: ports[i * 2 + 1],
								containerPort: fp + i,
								secureContainerPort: fps + i,
								ip: ip,
								isRegistered: false,
								unique_name: self.getUniqueName(),
								type: self.getType()
								});
		}

		runtimeServices.push(	{
								service_name: config.HTTP,
								service_type: config.HTTP,
								port: ports[ports.length - 2],
								securePort: ports[ports.length - 1],
								containerPort: 80,
								secureContainerPort: 443,
								ip: ip,
								isRegistered: true,
								unique_name: self.getUniqueName(),
								type: self.getType()
								});
	}

self.createRuntimeService = function(service_name, ports, ip)
	{
	// Create runtime service with ports and IP attached to its provided service.
	// Use only for develop mode and native debian applications.
	var s, service = self.getProvidedService(service_name);

	if(!service && service_name != config.HTTP)
		return null;

	for(s = 0; s < runtimeServices.length; s++)
		{
		if(runtimeServices[s].service_name == service_name)
			break;
		}

	service =	{
				service_name: (service_name != config.HTTP ? service.service_name : config.HTTP),
				service_type: (service_name != config.HTTP ? service.service_type : config.HTTP),
				port: ports.port,
				securePort: ports.securePort,
				containerPort: null,
				secureContainerPort: null,
				ip: ip,
				isRegistered: false,
				unique_name: ports.unique_name,
				type: self.getType()
				};

	if(s == runtimeServices.length)
		runtimeServices.push(service);
	else
		runtimeServices[s] = service;

	return service;
	}

self.getRuntimeServices = function()
	{
	return runtimeServices;
	}

self.getRuntimeServicesCount = function()
	{
	return runtimeServices.length;
	}

self.getRuntimeService = function(service_name, unique_name)
	{
	var UNIQUE_NAME;
	var SERVICE_NAME;

	for(var s = 0; s < runtimeServices.length; s++)
		{
		UNIQUE_NAME = runtimeServices[s].unique_name;
		SERVICE_NAME = runtimeServices[s].service_name;

		// 1:
		// Multiple applications can have the same service name. Return the first matching service.
		// Without checking the unique_name the HTTP service of the first application would always be returned.
		// 2:
		// The service belongs to the requested unique application
		if( /*1*/ (!unique_name && service_name == SERVICE_NAME && service_name != config.HTTP) ||
			/*2*/ (unique_name && unique_name == UNIQUE_NAME && service_name == SERVICE_NAME) )
			return runtimeServices[s];
		}

	return null;
	}

self.clearRuntimeServices = function()
	{
	runtimeServices = [];
	}

self.registerService = function(service_name, ports, state)
	{ // Returns runtime services when successfully registered/unregistered, null if no such service
	for(var s = 0; s < runtimeServices.length; s++)
		{
		if(runtimeServices[s].service_name == service_name)
			{
			runtimeServices[s].isRegistered = state;						// false = unregistered, true = registered

			if(ports)														// develop mode, native debian and sandboxed debian
				{															// applications can set their own ports
				runtimeServices[s].port = ports.port;
				runtimeServices[s].securePort = ports.securePort;
				}

			return runtimeServices[s];
			}
		}

	return null;
	}

self.isDevelop = function()
	{
	return (develop == 0 ? false : true);
	}

}

module.exports = Application;