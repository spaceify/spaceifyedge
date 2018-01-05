"use strict";

/**
 * Spaceify Cache, 29.7.2015 Spaceify Oy
 *
 * Keep this class dependency free!!!
 *
 * A cache class to reduce unnecessary RPC calls by storing application data.
 * For Spaceify's internal use.
 *
 * @class SpaceifyCache
 */

function SpaceifyCache()
{
var self = this;

var ready_counter = 0;

var applications = {};
var EXPIRATION_TIME = 60 * 1000;

var config = SpaceifyConfig.getConfig();

self.setApplication = function(application)
	{
	if(!applications[application.unique_name])
		applications[application.unique_name] = {};

	applications[application.unique_name].manifest = application;
	applications[application.unique_name].isRunning = application.isRunning;
	}

self.getApplication = function(unique_name)
	{
	return (unique_name in applications ? applications[unique_name] : null);
	}

	// SERVICES -- -- -- -- -- -- -- -- -- -- //
self.setService = function(service, unique_name)
	{
	if(service.service_type != config.HTTP)
		return;

	if(!applications[unique_name])
		applications[unique_name] = {};

	if(!applications[unique_name].services)
		applications[unique_name].services = [];

	applications[unique_name].services.push(service);
	}

self.getService = function(service_name, unique_name)
	{ // Get service either by service name (when unique_name is not set) or by service name and unique_name.
	for(var UNIQUE_NAME in applications)														// Iterate all applications
		{
		var services = (applications[UNIQUE_NAME].services ? applications[UNIQUE_NAME].services : []);	// Find from the services they have
		for(var s = 0; s < services.length; s++)
			{
			var SERVICE_NAME = services[s].service_name;

			// 1:
			// Multiple applications can have the same service name. Return the first matching service.
			// Without checking the unique_name the HTTP service of the first application would always be returned.
			// 2:
			// The service belongs to the requested unique application
			if( /*1*/ (!unique_name && service_name == SERVICE_NAME && service_name != config.HTTP) ||
			    /*2*/ (unique_name && unique_name == UNIQUE_NAME && service_name == SERVICE_NAME) )
				return services[s];
			}
		}

	return null;
	}

	// MANIFEST -- -- -- -- -- -- -- -- -- -- //
self.setManifest = function(unique_name, manifest)
	{
	if(!applications[unique_name])
		applications[unique_name] = {};

	applications[unique_name].manifest = manifest;
	}

self.getManifest = function(unique_name)
	{
	return (applications[unique_name] && applications[unique_name].manifest ? applications[unique_name].manifest : null);
	}

	// RUNNING STATUS -- -- -- -- -- -- -- -- -- -- //
self.setRunning = function(unique_name, isRunning)
	{
	if(!applications[unique_name])
		applications[unique_name] = {};

	applications[unique_name].isRunning = isRunning;
	applications[unique_name].isRunningStart = Date.now();
	}

self.isRunning = function(unique_name)
	{
	if(!applications[unique_name] || !applications[unique_name].hasOwnProperty("isRunning"))
		return null;

	var run_time = Date.now() - applications[unique_name].isRunningStart;			// Running status expires after the expiration time
	return (run_time > EXPIRATION_TIME ? null : applications[unique_name].isRunning);
	}

	// APPLICATION URLS -- -- -- -- -- -- -- -- -- -- //
self.setApplicationURL = function(unique_name, urls)
	{
	if(!applications[unique_name])
		applications[unique_name] = {};

	applications[unique_name].urls = urls;
	applications[unique_name].urls_start = Date.now();
	}

self.getApplicationURL = function(unique_name)
	{
	if(!applications[unique_name] || !applications[unique_name].hasOwnProperty("urls"))
		return null;

	var urls_time = Date.now() - applications[unique_name].urls_start;				// URLs expire after the expiration time
	return (urls_time > EXPIRATION_TIME ? null : applications[unique_name].urls);
	}

}

if(typeof exports !== "undefined")
	module.exports = SpaceifyCache;
