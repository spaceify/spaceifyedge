"use strict";

/**
 * Logger wrapper for Spaceify edge, 5.4.2017 Spaceify Oy
 *
 * @class SpaceifyLogger
 */

function SpaceifyLogger(class_)
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var Logger = null;
var SpaceifyError = null;

if (isNodeJs)
	{
	var apipath = "/var/lib/spaceify/code/";

	try { Logger = require("./logger"); } catch (e) { Logger = require(apipath + "logger"); }
	try { SpaceifyError = require("./spaceifyerror"); } catch (e) { SpaceifyError = require(apipath + "spaceifyerror"); }
	}
else if (typeof window !== "undefined")
	{
	Logger = (window.Logger ? window.Logger : null);
	SpaceifyError = (window.SpaceifyError ? window.SpaceifyError : null);
	}

var errorc = new SpaceifyError();
var logger = Logger.getLogger(class_);

self.log		= function() { logger.log.apply(self, logger.convertArguments(arguments)); }
self.dir		= function() { logger.dir.apply(self, logger.convertArguments(arguments)); }
self.info		= function() { logger.info.apply(self, logger.convertArguments(arguments)); }
self.warn		= function() { logger.warnapply(self, logger.convertArguments(arguments)); }
self.force		= function() { logger.force.apply(self, logger.convertArguments(arguments)); }
self.stdout		= function() { logger.stdout.apply(self, logger.convertArguments(arguments)); }
self.error		= function(err, path, code, type)
	{
	var message = (errorc ? errorc.errorToString(err, path, code) : err);

	if (type == logger.ERROR)
		logger.error(logger.ERROR, false, [message]);
	else if (type == logger.FORCE)
		logger.force(message);

	return message;
	}

self.setOptions = function(options)
	{
	logger.setOptions(options);
	};

self.clone = function(logger_)
	{
	logger.setOptions(logger_);
	};

self.getEnabled = function()
	{
	return logger.getEnabled();
	};

self.cloneInstanceToBaseConfiguration = function()
	{
	logger.cloneInstanceToBaseConfiguration();
	};

}

if (typeof exports !== "undefined")
	module.exports = SpaceifyLogger;
