"use strict";

/**
 * Manifest, 2015 Spaceify Oy
 * 
 * @class Manifest
 */

var fibrous = require("./fibrous");
//var SpaceifyLogger = require("./spaceifylogger");
var SpaceifyUnique = require("./spaceifyunique");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyUtility = require("./spaceifyutility");

function Manifest(manifest_)
{
var self = this;

var unique = new SpaceifyUnique();
var utility = new SpaceifyUtility();
var config = SpaceifyConfig.getConfig();
//var logger = new SpaceifyLogger("Manifest");

var manifest = manifest_;

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

self.getRequiresServicesCount = function()
	{
	return self.getRequiresServices().length;
	}

self.getProvidesServicesWithHttp = function()
	{
	var services = (manifest && manifest.provides_services ? manifest.provides_services : []), _services = [];

	for (var s = 0; s < services.length; s++)
		_services.push(services[s]);

	_services.push({ service_name: config.HTTP, service_type: config.HTTP });

	return _services;
	}

self.getUniqueNameAsSystemctlServiceName = function()
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

self.implementsWebServer = function()
	{
	return (manifest && manifest.implements && manifest.implements.indexOf(config.WEB_SERVER) != -1 ? true : false);
	}

self.hasTile = function()
	{
	var tileFile = unique.getWwwPath(self.getType(), self.getUniqueName(), config) + config.TILEFILE;

	return utility.sync.isFile(tileFile);
	}

}

	//  -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	// INITIALIZE   -- -- -- -- -- -- -- -- -- -- //
Manifest.load = function(typeOrPath, unique_name)
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

		manifest = new Manifest(manifest);
		}
	catch(err)
		{
		manifest = null;
		}

	return manifest;
	}

module.exports = Manifest;