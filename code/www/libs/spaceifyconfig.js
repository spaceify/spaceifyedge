"use strict";

/**
 * Spaceify configuration, 28.1.2016 Spaceify Oy
 *
 * @class SpaceifyConfig
 */

function SpaceifyConfig()
{
// NODE.JS / REAL SPACEIFY - - - - - - - - - - - - - - - - - - - -
var apiPath = "/var/lib/spaceify/code/";
var isNodeJs = (typeof window === "undefined" ? true : false);

//var Logger = (isNodeJs ? require(apiPath + "logger") : window.Logger);
var SpaceifyUnique = (isNodeJs ? require(apiPath + "spaceifyunique") : window.SpaceifyUnique);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var self = this;

var unique = new SpaceifyUnique();
//var logger = new Logger("SpaceifyConfig", "selogs");

if(isNodeJs)
	{
	var i, file = require("fs").readFileSync("/var/lib/spaceify/code/www/libs/config.json", "utf8");

	var config = JSON.parse(file);
	for(i in config)
		self[i] = config[i];
	}
else
	{
	for(i in window.seconfig)
		self[i] = window.seconfig[i];
	}

self.get = function(c)
	{
	return (c in self ? self[c] : null);
	}

self.makeRealApplicationPaths = function()
	{ // To make application development easier, the configuration paths are made to point to the real directories on the edge computer.
	  // After this running applications outside and inside Spaceify / docker containers is identical.
	if(!isNodeJs)																// Web page
		return;

	var manifest;
	var pathParts;
	var volumePath;
	var cwd = process.cwd();

	self["API_PATH"] = self["SPACEIFY_CODE_PATH"];
	self["API_WWW_PATH"] = self["SPACEIFY_WWW_PATH"];
	self["API_NODE_MODULES_DIRECTORY"] = self["SPACEIFY_NODE_MODULES_PATH"];

	pathParts = cwd.split("/");

	if(pathParts[pathParts.length - 1] == self["APPLICATION_ROOT"])
		{
		manifest = getManifest(cwd);

			// Application path with manifest -> cwd is most likely a real application directory
		if(manifest)
			{
			volumePath = cwd.replace("/" + self["APPLICATION_ROOT"], "/");

			self["VOLUME_PATH"] = volumePath;
			self["VOLUME_TLS_PATH"] = volumePath + self["TLS_DIRECTORY"];
			self["VOLUME_APPLICATION_PATH"] = volumePath + self["APPLICATION_DIRECTORY"];
			self["VOLUME_APPLICATION_WWW_PATH"] = volumePath + self["APPLICATION_DIRECTORY"] + self["WWW_DIRECTORY"];
			}
		}
	else
		{
		// Not an application path -> lets handle it as volume directory
		volumePath = cwd + "/";

		manifest = getManifest(cwd);

			// External application such as native application or debug mode application
		if(manifest)
			{
				// Lets assume all the necessary directories are in the current working directory
			self["VOLUME_PATH"] = volumePath;
			self["VOLUME_APPLICATION_PATH"] = volumePath;
			self["VOLUME_APPLICATION_WWW_PATH"] = volumePath + self["WWW_DIRECTORY"];

				// Lets assume there is an installed application and with certificate directory
			self["VOLUME_TLS_PATH"] = unique.getVolPath(manifest.type, manifest.unique_name, self) + self["VOLUME_TLS_PATH"];
			}
		}
	}

var getManifest = function(path)
	{
	var manifest = null;

	try {
		manifest = require("fs").readFileSync(path + "/" + self["MANIFEST"], "utf8");

		manifest = JSON.parse(manifest);
		}
	catch(err)
		{
		}

	return manifest;
	}

}

if(typeof exports !== "undefined")
	module.exports = SpaceifyConfig;
