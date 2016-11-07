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
	for(i in window.spConfig)
		self[i] = window.spConfig[i];
	}

self.makeRealApplicationPaths = function()
	{ // To make application development easier, the configuration paths are made to point to the real directories on the edge computer.
	  // After this running applications outside and inside docker containers is identical.
	if(typeof process == "undefined")
		return;

	var volumePath;
	var cwd = process.cwd();

	self["VOLUME_PATH"] = cwd;

	self["API_PATH"] = self["SPACEIFY_CODE_PATH"];
	self["API_WWW_PATH"] = self["SPACEIFY_WWW_PATH"];
	self["API_NODE_MODULES_DIRECTORY"] = self["SPACEIFY_NODE_MODULES_PATH"];

	try {
		require("fs").readFileSync(cwd + "/" + self["MANIFEST"], {encoding: "utf8"});
		volumePath = cwd.replace("/application", "/");

		self["APPLICATION_TLS_PATH"] = volumePath + "/tls/";
		self["APPLICATION_VOLUME_PATH"] = volumePath + "/application/";
		self["APPLICATION_WWW_PATH"] = volumePath + "/application/www/";
		}
	catch(err)
		{
		}
	}

}

if(typeof exports !== "undefined")
	module.exports = SpaceifyConfig;