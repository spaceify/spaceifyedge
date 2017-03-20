"use strict";

/**
 * Logger, 18.12.2013 Spaceify Oy
 *
 * @class Logger
 */

function Logger(config)
{
var self = this;

var errorc = null;

var isNodeJs = (typeof window === "undefined" ? true : false);

if(isNodeJs)
	{
	var apipath = "/var/lib/spaceify/code/spaceifyerror";

	if(Logger.ifFileExists("./spaceifyerror.js"))
		errorc = require("./spaceifyerror");
	else if(Logger.ifFileExists(apipath))
		errorc = require(apipath);
	}
else if(typeof window !== "undefined")
	{
	errorc = (window.SpaceifyError ? window.SpaceifyError : null);
	}

if(errorc)
	errorc = new errorc();

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
self.error		= function() { printErrors.apply(this, arguments); }
self.warn		= function() { out(WARN, false, arguments); }
self.force		= function() { out(FORCE, false, arguments); }
self.stdout		= function() { out(STDOUT, true, arguments); }

	// -- -- -- -- -- -- -- -- -- -- //
var out = function(type, fromStdout)
	{
	if(!enabled[type] && type != FORCE)
		return;

	var str = "", strs = arguments[2], strp;

	if(isNodeJs)
		{
		for(var i = 0; i < strs.length; i++)						// Concatenate strings passed in the arguments, separate strings with space
			{
			strp = (typeof strs[i] == "string" ? strs[i] : JSON.stringify(strs[i]));
			str += (str != "" && str != "\n" && str != "\r" && str != "\r\n" ? " " : "") + strp;
			}

		str = str.replace(/[\x00-\x09\x0b-\x0c\x0e-\x1f]/g, "");	// Replace control characters 0-9, 11-12, 14-31

		process.stdout.write(labels[type] + str + (fromStdout ? "" : "\n"));
		}
	else
		{
		if(type == DIR && console.dir)
			console.dir.apply(this, arguments[2]);
		else if(type == ERROR && console.error)
			console.error.apply(this, arguments[2])
		else if(type == INFO && console.info)
			console.info.apply(this, arguments[2]);
		else if(type == WARN && console.warn)
			console.warn.apply(this, arguments[2]);
		else
			console.log.apply(this, arguments[2]);
		}
	}

var printErrors = function(err, printPath, printCode, printType)
	{
	var message = (errorc ? errorc.errorToString(err, printPath, printCode) : err);

	if(printType == ERROR)
		out.call(self, ERROR, false, [message]);
	else if(printType == FORCE)
		self.force(message);

	return message;
	}

self.setOptions = function(options)
	{
	for(var type in options)
		enabled[type] = options[type];
	}

self.clone = function(logger)
	{
	var enabled_ = logger.getEnabled();

	enabled[LOG]	= enabled_[LOG];
	enabled[DIR]	= enabled_[DIR];
	enabled[INFO]	= enabled_[INFO];
	enabled[ERROR]	= enabled_[ERROR];
	enabled[WARN]	= enabled_[WARN];
	}

self.getEnabled = function()
	{
	return enabled;
	}

}

Logger.ifFileExists = function(path)
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

Logger.getLogger = function(class_, override_)
	{
	var lib;
	var ConfigLoader;

	if(typeof window === "undefined")
		{
		var apipath = "/var/lib/spaceify/code/";

		if(Logger.ifFileExists(__dirname + "/configloader.js"))
			ConfigLoader = require(__dirname + "/configloader.js");
		else if(Logger.ifFileExists(apipath + "configloader.js"))
			ConfigLoader = require(apipath + "configloader.js");
		}
	else if(typeof window !== "undefined")
		{
		lib = (window.WEBPACK_MAIN_LIBRARY ? window.WEBPACK_MAIN_LIBRARY : window);
		ConfigLoader = (lib.ConfigLoader ? lib.ConfigLoader : null);
		}

	var config = ConfigLoader(class_, override_);

	var all_ = (typeof config.all !== "undefined" ? config.all : null);
	if(all_ !== null)											// Class specific override
		{
		config['log'] = all_;
		config['dir'] = all_;
		config['info'] = all_;
		config['error'] = all_;
		config['warn'] = all_;
		}

	return new Logger(config);
	};

if(typeof exports !== "undefined")
	module.exports = Logger;
