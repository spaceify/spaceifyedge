"use strict";

/**
 * Config, 2.3.2017 Spaceify Oy
 *
 * @class Config
 */

function Config()
{
var self = this;

//console.log("in Config::Config()");

var baseConfig = null;
var overridingConfig = null;
var config = null;
var path = null;

// Hack to use real require in webpack
var doRequire = function(module)
	{
	return eval("require")(module);
	};

// Load the default speconfig.js file and apply overrides in the order:
// 1. make base config global
// 2. module.parent.speconfig
// 3. "speconfig.js"
// 4. process.cwd()/speconfig.js

var globalObj = (typeof(window) === "undefined" ? global : window);

if (typeof globalObj.speBaseConfig_)
	{
	baseConfig = globalObj.speBaseConfig_;
	}

if (typeof window === "undefined") //in node.js
	{
	path = require('path');

	if (!baseConfig)
		{
		try	{
			var apipath = "/var/lib/spaceify/code/";
			baseConfig = doRequire(path.resolve(apipath, "spebaseconfig.js"));

			//console.log("Loaded base config from /var/lib/spaceify/code/");
			}
		catch (e)
			{
			baseConfig = require("./spebaseconfig.js");

			//console.log("Loaded base config from the spaceifyconnect package");
			}
		}

	if (!baseConfig)
		{
		//console.log("Error loading base config, exiting");

		process.exit(1);
		}

	// load and apply the overriding configs

	try	{
		overridingConfig = doRequire(module.parent.speconfig);
		Config.overrideConfigValues(baseConfig, overridingConfig);

		//console.log("Loaded overriding config from module.parent.speconfig");
		}
	catch (e)
		{}
	finally
		{
		try
			{
			overridingConfig = doRequire("speconfig");
			Config.overrideConfigValues(baseConfig, overridingConfig);

			//console.log("Loaded overriding config from \"speconfig\"");
			}
		catch (e)
			{}
		finally
			{
			try
				{
				//console.log("Trying to load overriding config from working directory "+process.cwd());

				overridingConfig = doRequire(path.resolve(process.cwd(), "speconfig.js"));
				Config.overrideConfigValues(baseConfig, overridingConfig);

				//console.log("Loaded overriding config from working directory");
				}
			catch (e)
				{
				//console.log(e);
				}
			finally
				{
				//console.log("Loading config files completed");
				}
			}
		}

	}
else if (typeof window !== "undefined")	//in browser
	{
	var lib = window;

	if (window.WEBPACK_MAIN_LIBRARY)	// browser using a bundled spaceifyedge
		{
		lib = window.WEBPACK_MAIN_LIBRARY;
		}

	if (!baseConfig)
		baseConfig = lib.SpeBaseConfig;

	if (lib.SpeConfig)
		Config.overrideConfigValues(baseConfig, lib.SpeConfig);
	}

/*
if (!baseConfig)						// Default configuration not found
	{
	config = {};
	}
else
	{
	config = {};

	// Apply configuration from webpack or window or nodejs config
	if(ConfigClass["defaultConfig"])							// Set defaultConfig as base
		config = ConfigLoader.overrideConfigValues(config, ConfigClass.defaultConfig);

	if (ConfigClass[class_])										// Class found
		config = ConfigLoader.overrideConfigValues(config, ConfigClass[class_]);

	if (ConfigClass["globalConfigOverride"])						// Global override
		config = ConfigLoader.overrideConfigValues(config, ConfigClass["globalConfigOverride"]);

	if(override_)												// User override (when calling this function)
		config = ConfigLoader.overrideConfigValues(config, override_);
	}
*/
//console.log("Config::Config() "+JSON.stringify(baseConfig));

globalObj.speBaseConfig_ = baseConfig;

self.getConfig = function()
	{
	return baseConfig;
	}

}

Config.overrideConfigValues = function(obj1, obj2)
	{
	for (var p in obj2)
		{
		try
			{
			// Property in destination object set; update its value.
			if ( obj2[p].constructor==Object )
				{
				obj1[p] = Config.overrideConfigValues(obj1[p], obj2[p]);
				}
			else
				{
				obj1[p] = obj2[p];
				}
			}

		catch(e)
			{
			// Property in destination object not set; create it and set its value.
			obj1[p] = obj2[p];
			}
		}

	return obj1;
	}

/*
Config.overrideConfigValues = function(config, overridingValues)
	{
	var newConfig = config;

	for (var g in overridingValues)
		{
		if (overridingValues[g] !== null)
			newConfig[g] = overrideValues_[g];
		}
	return newConfig;
	};
*/
Config.destroySingleton = function()
	{
	var globalObj = null;

	if (typeof(window) === "undefined") //nodejs
		globalObj = global;
	else
		globalObj = window;

	globalObj.speConfigInstance_ = null;
	};

Config.getConfig = function()
	{
	var globalObj = null;

	if (typeof(window) === "undefined") //nodejs
		globalObj = global;
	else
		globalObj = window;

	if (!globalObj.speConfigInstance_)
		{
		globalObj.speConfigInstance_ = new Config();
		Object.freeze(globalObj.speConfigInstance_);
		}

	return globalObj.speConfigInstance_.getConfig();
	};

if(typeof exports !== "undefined")
	module.exports = Config;
