"use strict";

/**
 * Spaceify configuration, 28.1.2016 Spaceify Oy
 *
 * @class SpaceifyConfig
 */

function SpaceifyConfig()
{
var self = this;

self.initialize = function(mode_)
	{
	var i, file, configs;
	var mode = (typeof mode_ !== "undefined" ? mode_ : "");

	if(mode == "webpack" || typeof window === "undefined")								// webpack or Node.js
		{
		if(mode == "webpack")
			file = require("fs").readFileSync(__dirname + "/config.json", "utf8");
		else
			file = require("fs").readFileSync("/var/lib/spaceify/code/config.json", "utf8");

		configs = JSON.parse(file);

		for(i in configs)
			self[i] = configs[i];
		}
	else																				// Webpage
		{
		for(i in window.speconfig)
			self[i] = window.speconfig[i];
		}

	if(mode == "realpaths")																// Node.js and post-processing
		self.makeRealApplicationPaths();

	return self;
	}

self.get = function(c)
	{
	return (c in self ? self[c] : null);
	}

self.toMinifiedJSONString = function()
	{
	var str = "", config = "";

	for(var c in self)
		{
		if(typeof self[c] !== "function" && typeof self[c] !== "object")
			{
			config = self[c];

			if(typeof config === "string")
				config = config.replace(/\\/g, "\\\\");

			str += (str != "" ? "," : "") + '"' + c + '":"' + config + '"';
			}
		}

	return "{" + str + "}";
	}

self.makeRealApplicationPaths = function()
	{ // To make application development easier, the configuration paths are made to point to the real directories on the edge computer.
	  // After running this method the applications outside and inside Spaceify / docker containers is identical.
	if(typeof window !== "undefined")
		return;

	var manifest;
	var pathParts;
	var volumePath;
	var cwd = process.cwd();

	var SpaceifyUnique = require("/var/lib/spaceify/code/spaceifyunique");
	var unique = new SpaceifyUnique();

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

SpaceifyConfig.getConfig = function(mode_)
	{
	var config = new SpaceifyConfig();

	return config.initialize(mode_);
	}

if(typeof exports !== "undefined")
	module.exports = SpaceifyConfig;
