"use strict";

/**
 * ConfigLoader, 2.3.2017 Spaceify Oy
 *
 * @class ConfigLoader
 */

var ConfigLoader = function(class_, override_)
	{
		// Get configuration file -- -- -- -- -- -- -- -- -- -- //
	var ConfigClass = null;
	var lib = null;

	if(typeof window === "undefined")
		{
		var apipath = "/var/lib/spaceify/code/";

		//if(ConfigLoader.ifFileExists(__dirname + "/config.custom.js"))
		//	ConfigClass = require(__dirname + "/config.custom.js");
		//else if(ConfigLoader.ifFileExists(apipath + "config.custom.js"))
		//	ConfigClass = require(apipath + "config.custom.js");
		//else
		if(ConfigLoader.ifFileExists(__dirname + "/config.js"))
			ConfigClass = require(__dirname + "/config.js");
		else if(ConfigLoader.ifFileExists(apipath + "config.js"))
			ConfigClass = require(apipath + "config.js");
		}
	else if(typeof window !== "undefined")
		{
		if (window.Config)
			lib = window;

		else if (window.WEBPACK_MAIN_LIBRARY)
			lib = window.WEBPACK_MAIN_LIBRARY;

		ConfigClass = (lib.Config ? lib.Config : null);
		}

		// Process configuration
	var config;
	if(!ConfigClass)												// Configuration not found
		{
		config = {};
		}
	else
		{
		config = {};

		// Apply configuration from webpack or window or nodejs config
		if(ConfigClass["defaultConfig"])							// Set defaultConfig as base
			config = ConfigLoader.overrideConfigValues(config, ConfigClass.defaultConfig);

		if(ConfigClass[class_])										// Class found
			config = ConfigLoader.overrideConfigValues(config, ConfigClass[class_]);

		if(ConfigClass["globalConfigOverride"])						// Global override
			config = ConfigLoader.overrideConfigValues(config, ConfigClass["globalConfigOverride"]);

		if(override_)												// User override (when calling this function)
			config = ConfigLoader.overrideConfigValues(config, override_);
		}

	return config;
	}

ConfigLoader.ifFileExists = function(path)
	{
	try {
		var fs = require("fs");
		fs.accessSync(path, fs.F_OK);
		return true;
		}
	catch(err)
		{
		return false;
		}
	}

ConfigLoader.overrideConfigValues = function(config_, overrideValues_)
	{
	var newConfig = JSON.parse(JSON.stringify(config_));
	for(var g in overrideValues_)
		{
		if(overrideValues_[g] !== null)
			newConfig[g] = overrideValues_[g];
		}
	return newConfig;
	}



if(typeof exports !== "undefined")
	module.exports = ConfigLoader;
