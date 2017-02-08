"use strict";

/**
 * Logger, 18.12.2013 Spaceify Oy
 *
 * @class Logger
 */

function Logger(class_, jsonfile_, set_)
{
var self = this;

var errorc = null;

var isNodeJs = (typeof window === "undefined" ? true : false);

var isAccessible = function(path, fs) { try { fs.accessSync(path, fs.F_OK); return true; } catch(err) { return false; } }

if(isNodeJs)
	{
	var file;
	var fs = require("fs");
	var apiPath = "/var/lib/spaceify/code/";

	if(isAccessible(apiPath + "spaceifyerror.js"), fs)
		errorc = require(apiPath + "spaceifyerror");

	if(isAccessible("./" + jsonfile_ + ".json", fs))
		file = fs.readFileSync("./" + jsonfile_ + ".json", "utf8");
	else if(isAccessible(apiPath + jsonfile_ + ".json", fs))
		file = fs.readFileSync(apiPath + jsonfile_ + ".json", "utf8");
	else
		file = "{}";

	jsonfile_ = JSON.parse(file);
	}
else if(typeof window !== "undefined")
	{
	errorc = (window.SpaceifyError ? window.SpaceifyError : null);
	}

if(errorc)
	errorc = new errorc();

self.RETURN				= 1;
var LOG					= "log";
var DIR					= "dir";
var INFO				= "info";
self.ERROR				= "error";
var ERROR_ = self.ERROR;
var WARN				= "warn";
self.FORCE				= "force";
var FORCE_ = self.FORCE;
var STDOUT				= "stdout";
var ALL					= "all";

	// Labels -- -- -- -- -- -- -- -- -- -- //
var labels = {};
labels[LOG]				= "[i] ";
labels[DIR]				= "[d] ";
labels[INFO]			= "[i] ";
labels[ERROR_]			= "[e] ";
labels[WARN]			= "[w] ";
labels[FORCE_]			= "";
labels[STDOUT]			= "";

	// -- -- -- -- -- -- -- -- -- -- //
var disabled = (class_ && jsonfile_ && jsonfile_[class_] ? jsonfile_[class_] : {});

if(set_)
	{
	for(var type in set_)
		disabled[type] = set_[type];
	}

// Local: disabled = true, not disabled = false (default)
disabled[LOG]			= (typeof disabled[LOG] !== "undefined" && disabled[LOG] ? disabled[LOG] : false);
disabled[DIR]			= (typeof disabled[DIR] !== "undefined" && disabled[DIR] ? disabled[DIR] : false);
disabled[INFO]			= (typeof disabled[INFO] !== "undefined" && disabled[INFO] ? disabled[INFO] : false);
disabled[ERROR_]		= (typeof disabled[ERROR_] !== "undefined" && disabled[ERROR_] ? disabled[ERROR_] : false);
disabled[WARN]			= (typeof disabled[WARN] !== "undefined" && disabled[WARN] ? disabled[WARN] : false);
disabled[ALL]			= (typeof disabled[ALL] !== "undefined" && disabled[ALL] ? disabled[ALL] : false);

// Global: disabled = true, not disabled = false (default)
if(jsonfile_.global)
	{
	var global_ = jsonfile_.global;

	disabled[LOG]		= (typeof global_[LOG] !== "undefined" && global_[LOG] ? global_[LOG] : disabled[LOG]);
	disabled[DIR]		= (typeof global_[DIR] !== "undefined" && global_[DIR] ? global_[DIR] : disabled[DIR]);
	disabled[INFO]		= (typeof global_[INFO] !== "undefined" && global_[INFO] ? global_[INFO] : disabled[INFO]);
	disabled[ERROR_]	= (typeof global_[ERROR_] !== "undefined" && global_[ERROR_] ? global_[ERROR_] : disabled[ERROR_]);
	disabled[WARN]		= (typeof global_[WARN] !== "undefined" && global_[WARN] ? global_[WARN] : disabled[WARN]);
	disabled[ALL]		= (typeof global_[ALL] !== "undefined" && global_[ALL] ? global_[ALL] : disabled[ALL]);
	}

disabled[FORCE_]		= false;

	// -- -- -- -- -- -- -- -- -- -- //
self.log				= function() { out(LOG, false, arguments); }
self.dir				= function() { out(DIR, false, arguments); }
self.info				= function() { out(INFO, false, arguments); }
self.error				= function() { printErrors.apply(this, arguments); }
self.warn				= function() { out(WARN, false, arguments); }
self.force				= function() { out(FORCE_, false, arguments); }
self.stdout				= function() { out(STDOUT, true, arguments); }

	// -- -- -- -- -- -- -- -- -- -- //
var out = function(type, fromStdout)
	{
	if((disabled[ALL] || disabled[type]) && type != FORCE_)
		return;

	var str = "", strs = arguments[2], strp, arp;

	if(isNodeJs)
		{
		for(var i = 0; i < strs.length; i++)								// Concatenate strings passed in the arguments, separate strings with space
			{
			strp = (typeof strs[i] == "string" ? strs[i] : JSON.stringify(strs[i]));
			str += (str != "" && str != "\n" && str != "\r" && str != "\r\n" ? " " : "") + strp;
			}

		str = str.replace(/[\x00-\x09\x0b-\x0c\x0e-\x1f]/g, "");			// Replace control characters 0-9, 11-12, 14-31

		process.stdout.write(labels[type] + str + (fromStdout ? "" : "\n"));
		}
	else
		{
		arp = Array.prototype.slice.call(arguments[2]);

		if(type == DIR && console.dir)
			console.dir.apply(this, arp);
		else if(type == ERROR_ && console.error)
			console.error.apply(this, arp)
		else if(type == INFO && console.info)
			console.info.apply(this, arp);
		else if(type == WARN && console.warn)
			console.warn.apply(this, arp);
		else
			console.log.apply(this, arp);
		}
	}

var printErrors = function(err, printPath, printCode, printType)
	{
	var message = (errorc ? errorc.errorToString(err, printPath, printCode) : err);

	if(printType == ERROR_)
		out.call(self, ERROR_, false, [message]);
	else if(printType == FORCE_)
		self.force(message);

	return message;
	}

self.setOptions = function(options)
	{
	for(var type in options)
		disabled[type] = options[type];
	}
}

if(typeof exports !== "undefined")
	module.exports = Logger;
