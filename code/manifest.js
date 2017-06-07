"use strict";

/**
 * Manifest, 2015 Spaceify Oy
 * 
 * @class Manifest
 */

var fibrous = require("./fibrous");
var DockerHelper = require("./dockerhelper");
//var SpaceifyLogger = require("./spaceifylogger");
var SpaceifyUnique = require("./spaceifyunique");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyUtility = require("./spaceifyutility");

function Manifest(manifest_, develop)
{
var self = this;

var unique = new SpaceifyUnique();
var utility = new SpaceifyUtility();
var dockerHelper = new DockerHelper();
var config = SpaceifyConfig.getConfig();
//var logger = new SpaceifyLogger("Manifest");

var manifest = manifest_;

var docker_image_id = "";
var dockerContainer = null;

var runtimeServices = [];

// MANIFEST FIELDS
self.getManifest = function()
	{
	return manifest;
	}

self.getUniqueName = function()
	{
	return (manifest && manifest.unique_name ? manifest.unique_name : "");
	}

self.getName = function()
	{
	return (manifest && manifest.name ? manifest.name : "");
	}

self.getVersion = function()
	{
	return (manifest && manifest.version ? manifest.version : "");
	}

self.getType = function()
	{
	return (manifest && manifest.type ? manifest.type : "");
	}

self.getCategory = function()
	{
	return (manifest && manifest.category ? manifest.category : "");	
	}

self.getProvidesServices = function()
	{
	return (manifest && manifest.provides_services ? manifest.provides_services : []);
	}

self.getRequiresServices = function()
	{
	return (manifest && manifest.requires_services ? manifest.requires_services : []);
	}

self.isShared = function()
	{
	return (manifest && manifest.shared ? manifest.shared : false);
	}

self.getOrigins = function()
	{
	return (manifest && manifest.origins ? manifest.origins : null);	
	}

self.getInjectIdentifier = function()
	{
	return (manifest && manifest.inject_identifier ? manifest.inject_identifier : "");	
	}

self.getInjectHostnames = function()
	{
	return (manifest && manifest.inject_hostnames ? manifest.inject_hostnames : null);
	}

self.getInjectFiles = function()
	{
	return (manifest && manifest.inject_files ? manifest.inject_files : null);	
	}

self.getStartCommand = function()
	{
	return (manifest && manifest.start_command ? manifest.start_command : "");
	}

self.getStopCommand = function()
	{
	return (manifest && manifest.stop_command ? manifest.stop_command : "");
	}

self.getInstallCommands = function()
	{
	return (manifest && manifest.install_commands ? manifest.install_commands : []);
	}

self.getShortDescription = function()
	{
	return (manifest && manifest.short_description ? manifest.short_description : "");	
	}

self.getAppstoreDescription = function()
	{
	return (manifest && manifest.appstore_description ? manifest.appstore_description : "");	
	}

self.getDeveloper = function()
	{
	return (manifest && manifest.developer ? manifest.developer : null);	
	}

self.getContributors = function()
	{
	return (manifest && manifest.contributors ? manifest.contributors : null);	
	}

self.getKeywords = function()
	{
	return (manifest && manifest.keywords ? manifest.keywords : null);	
	}

self.getLicense = function()
	{
	return (manifest && manifest.license ? manifest.license : "");	
	}

self.getCreationDate = function()
	{
	return (manifest && manifest.creation_date ? manifest.creation_date : "");	
	}

self.getRepository = function()
	{
	return (manifest && manifest.repository ? manifest.repository : "");	
	}

self.getWebUrl = function()
	{
	return (manifest && manifest.web_url ? manifest.web_url : "");	
	}

self.getBugs = function()
	{
	return (manifest && manifest.bugs ? manifest.bugs : "");	
	}

self.getDockerImage = function()
	{
	return (manifest && manifest.docker_image ? manifest.docker_image : false);	
	}

self.getImages = function()
	{
	return (manifest && manifest.images ? manifest.images : null);	
	}

self.getAptRepositories = function()
	{
	return (manifest && manifest.apt_repositories ? manifest.apt_repositories : null);	
	}

self.getAptPackages = function()
	{
	return (manifest && manifest.apt_packages ? manifest.apt_packages : null);	
	}

self.getDebPackages = function()
	{
	return (manifest && manifest.deb_packages ? manifest.deb_packages : null);	
	}

	//  -- -- -- -- -- -- -- -- -- -- -- -- -- //
	// GENERATED -- -- -- -- -- -- -- -- -- -- //
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

self.getRequiresServicesCount = function()
	{
	return self.getRequiresServices().length;
	}

self.getUniqueNameAsServiceName = function()
	{
	return (manifest && manifest.unique_name ? unique.getSystemctlServiceName(manifest.unique_name) : "");
	}

self.getUniqueDirectory = function()
	{
	return (manifest && manifest.unique_name ? unique.getUniqueDirectory(manifest.unique_name) : "");
	}

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
	return (manifest && manifest.implements && manifest.implements.indexOf(config.WEB_SERVER) != -1 ? true : false);
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

self.setDevelop = function(develop_)
	{
	develop = develop_;
	}

self.isDevelop = function()
	{
	return (develop == 0 ? false : true);
	}

self.hasTile = function()
	{
	var tileFile = unique.getWwwPath(self.getType(), self.getUniqueName(), config) + config.TILEFILE;

	return utility.sync.isFile(tileFile);
	}

}

Manifest.load = function(typeOrPath, unique_name, develop)
	{
	var path;
	var manifest;
	var unique = new SpaceifyUnique();
	var config = SpaceifyConfig.getConfig();
	var utility = new SpaceifyUtility();

	try {
		if(!unique_name)																		// Path to manifest
			path = typeOrPath;
		else																					// Resolve the path by type and unique name
			path = unique.getAppPath(typeOrPath, unique_name, config) + config.MANIFEST;

		if((manifest = utility.sync.loadJSON(path, true)) == null)
			throw false;

		manifest = new Manifest(manifest, develop);
		}
	catch(err)
		{
// var x = JSON.stringify(err);
// require("fs").writeFileSync("/tmp/ok.txt", x);
		manifest = null;
		}

	return manifest;
	}

module.exports = Manifest;