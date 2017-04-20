"use strict";

/**
 * Logger, 18.12.2013 Spaceify Oy
 *
 * @class Logger
 */

function Logger(config, class_)
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

self.RETURN		= 1;
var LOG			= "log";
var DIR			= "dir";
var INFO		= "info";
self.ERROR		= "error";
var ERROR = self.ERROR;
var WARN		= "warn";
self.FORCE		= "force";
var FORCE = self.FORCE;
var STDOUT		= "stdout";

	// Labels -- -- -- -- -- -- -- -- -- -- //
var labels = {};
labels[LOG]		= "[i] ";
labels[DIR]		= "[d] ";
labels[INFO]	= "[i] ";
labels[ERROR]	= "[e] ";
labels[WARN]	= "[w] ";
labels[FORCE]	= "";
labels[STDOUT]	= "";

	// -- -- -- -- -- -- -- -- -- -- //
var enabled = (config ? config : {});

// Local: enabled = true (default), not enabled = false
enabled[LOG]	= (typeof enabled[LOG] !== "undefined" ? enabled[LOG] : true);
enabled[DIR]	= (typeof enabled[DIR] !== "undefined"  ? enabled[DIR] : true);
enabled[INFO]	= (typeof enabled[INFO] !== "undefined"  ? enabled[INFO] : true);
enabled[ERROR]	= (typeof enabled[ERROR] !== "undefined"  ? enabled[ERROR] : true);
enabled[WARN]	= (typeof enabled[WARN] !== "undefined"  ? enabled[WARN] : true);
enabled[FORCE]	= true;
enabled[STDOUT]	= true;

	// -- -- -- -- -- -- -- -- -- -- //
self.log		= function() { out(LOG, false, arguments); }
self.dir		= function() { out(DIR, false, arguments); }
self.info		= function() { out(INFO, false, arguments); }
self.error		= function() { out(ERROR, false, arguments); }
self.warn		= function() { out(WARN, false, arguments); }
self.force		= function() { out(FORCE, false, arguments); }
self.stdout		= function() { out(STDOUT, true, arguments); }

	// -- -- -- -- -- -- -- -- -- -- //

var out = function(type, useStdout)
	{
	if (!enabled[type] && type != FORCE)
		return;

	var str = "";
	var strs = arguments[2];
	var strp = null;

	for (var i = 0; i < strs.length; i++)							// Concatenate strings passed in the arguments, separate strings with space
		{
		strp = (typeof strs[i] == "string" ? strs[i] : JSON.stringify(strs[i]));
		str += (str != "" && str != "\n" && str != "\r" && str != "\r\n" ? " " : "") + strp;
		}

	if (type==ERROR)
		{
		str += new Error().stack;
		}

	str = str.replace(/[\x00-\x09\x0b-\x0c\x0e-\x1f]/g, "");		// Replace control characters 0-9, 11-12, 14-31

	if (!useStdout)
		{
		var dateString = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

		str = dateString +" "+labels[type]+"["+class_+"] "+ str;
		}

	if (isNodeJs)
		{
		if (!useStdout)												// console.log prints new line
			console.log(str);
		else														// stdout.write doesn't
			process.stdout.write(str);
		}
	else
		{
		if (type == DIR && console.dir)
			console.dir(str);

		else if (type == ERROR && console.error)
			console.error(str);

		else if (type == INFO && console.info)
			console.info(str);

		else if (type == WARN && console.warn)
			console.warn(str);

		else
			console.log(str);
		}
	};

self.setOptions = function(options)
	{
	for(var type in options)
		enabled[type] = options[type];
	};

self.clone = function(logger)
	{
	var enabled_ = logger.getEnabled();

	enabled[LOG]	= enabled_[LOG];
	enabled[DIR]	= enabled_[DIR];
	enabled[INFO]	= enabled_[INFO];
	enabled[ERROR]	= enabled_[ERROR];
	enabled[WARN]	= enabled_[WARN];
	};

self.getEnabled = function()
	{
	return enabled;
	};

}

Logger.createLogger_ = function(class_)
	{
	console.log("Logger::CreateLogger() creating new logger for "+class_);
	var lib;
	var Config;

	if (typeof window === "undefined")
		{
		try
			{
			Config = require("./config.js");
			}
		catch (e)
			{
			var apipath = "/var/lib/spaceify/code/";
			Config = require(apipath + "config.js");
			}
		}
	else if (typeof window !== "undefined")
		{
		lib = (window.WEBPACK_MAIN_LIBRARY ? window.WEBPACK_MAIN_LIBRARY : window);
		Config = (lib.Config ? lib.Config : null);
		}

	var config = Config.getConfig();

	//console.log("Logger::getLogger()" + JSON.stringify(config));

	var loggerConfig = {};

	// Get base config
	Config.overrideConfigValues(loggerConfig, config.logger.defaultLoggerConfig);

	// Override with class-specific properties

	if (config.logger.hasOwnProperty(class_))
		{
		Config.overrideConfigValues(loggerConfig, config.logger[class_]);
		}

	// Override with global override
	Config.overrideConfigValues(loggerConfig, config.logger.globalConfigOverride);


	// Apply the "all" keyword

	var all_ = (typeof loggerConfig.all !== "undefined" ? loggerConfig.all : null);

	if (all_ !== null)											// Class specific override
		{
		loggerConfig['log'] = all_;
		loggerConfig['dir'] = all_;
		loggerConfig['info'] = all_;
		loggerConfig['error'] = all_;
		loggerConfig['warn'] = all_;
		}

	return new Logger(loggerConfig, class_);
	};

Logger.getLogger = function(class_)
	{
	if (!class_)
		class_ = "mainlog";

	var globalObj = null;

	if (typeof(window) === "undefined") //nodejs
		globalObj = global;

	else
		globalObj = window;


	if (!globalObj.hasOwnProperty("spLoggerInstances_"))
		{
		globalObj["spLoggerInstances_"] = new Object();
		}

	if (!globalObj.spLoggerInstances_.hasOwnProperty(class_))
		{
		globalObj.spLoggerInstances_[class_] = Logger.createLogger_(class_);
		}

	return globalObj.spLoggerInstances_[class_];
	};

if (typeof exports !== "undefined")
	module.exports = Logger;
