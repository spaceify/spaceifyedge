"use strict";

/**
 * Spaceify configuration, 28.1.2016 Spaceify Oy
 *
 * @class SpaceifyConfig
 */

function SpaceifyConfig()
{
var self = this;

if(typeof exports !== "undefined")
	{
	var i, file = require("fs").readFileSync("/var/lib/spaceify/code/www/libs/config.json", "utf8");

	var config = JSON.parse(file);
	for(i in config)
		self[i] = config[i];
	}
else
	{
	for(i in window.sconfig)
		self[i] = window.sconfig[i];
	}

self.makeRealApplicationPaths = function()
	{ // To make application development easier, the configuration paths are made to point to the real directories on the edge computer.
	  // After this, running applications outside and inside docker containers is identical.
	try {
		var routines = new (require(config.SPACEIFY_CODE_PATH + "routines"))();

		var manifest = require("fs").readFileSync(config.APPLICATION_PATH + config.MANIFEST, {encoding: "utf8"});
		manifest =  JSON.parse(manifest);

		var applicationPath = "";
		if(manifest.type == config.SPACELET)
			applicationPath = config.SPACELETS_PATH;
		else if(manifest.type == config.SANDBOXED)
			applicationPath = config.SANDBOXED_PATH;
		//else if(manifest.type == config.NATIVE)
		//	applicationPath = config.NATIVE_PATH;

		var volumePathOnEdge = applicationPath + routines.makeUniqueDirectory(manifest.unique_name) + config.VOLUME_DIRECTORY;

		config.VOLUME_PATH = volumePathOnEdge;
		config.API_PATH = config.SPACEIFY_CODE_PATH;
		config.API_WWW_PATH = config.SPACEIFY_WWW_PATH;
		config.APPLICATION_TLS_PATH = volumePathOnEdge + "tls/";
		config.APPLICATION_PATH = volumePathOnEdge + "application/";
		config.APPLICATION_WWW_PATH = volumePathOnEdge + "application/www/";
		}
	catch(err)
		{}
	}

}

if(typeof exports !== "undefined")
	module.exports = SpaceifyConfig;