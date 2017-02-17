"use strict";

/**
 * LoggerConfig, 8.2.2017 Spaceify Oy
 *
 * This configuration is used in Spaceify project.
 *
 * Supported console output types:
 *   log, dir, info, error and warn
 *
 * The configuration logic is based on 'enable output' and operates with boolean values:
 *   false = output is disabled
 *    true = output is enabled
 *
 * The individual console output types can be overridden with the 'all' configuration.
 * The override takes three values:
 *   false = all the output types are disabled
 *    true = all the output types are enabled
 *    null = the override is not applied to the output types
 *
 * If the configuration for a class is not found, the default (default_) configuration
 * is used as a fallback. The default configuration operates identically to the individual
 * class configurations.
 *
 * There is a global (global_) override configuration. The global oveverride is applied
 * to all of the corresponding output types of all the individual class configurations.
 * The override takes three values:
 *   false = the output type of all the individual classes are disabled
 *    true = the output type of all the individual classes are enabled
 *    null = the override is not applied to the output type of the class
 *
 * NOTICE: the global_ and default_ configurations are mandatory variables in the loggerconfig.js file!
 *
 * Order of precedence of the configurations
 *   Global configuration takes precedencence of class configurations
 * Order of precedence of the console output types
 *   'all' in a configuration (global or class) takes precedence the output types
 *
 * e.g.
 *      MyClass is unaltered
 *      global_ = { log: null, dir: null, info: null, error: null, warn: null, all: null };
 *      MyClass = { log: true, dir: true, info: true, error: true, warn: true, all: null };
 *   => MyClass = { log: true, dir: true, info: true, error: true, warn: true, all: null };
 *
 *      MyClass 'all' overrides its output types
 *      global_ = { log: null,  dir: null,  info: null,  error: null,  warn: null, all: null };
 *      MyClass = { log: true,  dir: true,  info: true,  error: true,  warn: true,  all: false };
 *   => MyClass = { log: false, dir: false, info: false, error: false, warn: false, all: false };
 *
 *      Global error is set to false and overrides MyClass error with false
 *      global_ = { log: null, dir: null, info: null, error: false, warn: null, all: null };
 *      MyClass = { log: true, dir: true, info: true, error: true,  warn: true, all: null };
 *   => MyClass = { log: true, dir: true, info: true, error: false, warn: true, all: null };
 *
 *      Global 'all' is set to false and all the output types of MyClass are overridden with false
 *      global_ = { log: null,  dir: null,  info: null,  error: null,  warn: null, all: false };
 *      MyClass = { log: true,  dir: true,  info: true,  error: true,  warn: true, all: null };
 *   => MyClass = { log: false, dir: false, info: false, error: false, warn: false, all: null };
 *
 * @class LoggerConfig
 */

function LoggerConfig()
{
var self = this;

	// MANDATORY CONFIGURATION - Global configuration overrides the individual class configurations
self.globale =
	{
	log: null,
	dir: null,
	info: null,
	error: null,
	warn: null,
	all: null
	};

	// MANDATORY CONFIGURATION - Default configuration is used if class configuration does not exist
self.default_ =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

	// Class configurations
self.Manifest =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.ApplicationManager =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.AppManService =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.BinaryRpcCommunicator =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.Core =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.Database =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.DHCPDLog =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.DockerContainer =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.DockerHelper =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.DockerImage =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.EdgeSpaceifyNet =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.HttpService =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.Iptables =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.Main =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.Manager =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.Messaging =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.PubSub =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.RpcCommunicator =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SecurityModel =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.Service =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyApplication =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyApplicationManager =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyConfig =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyCore =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyError =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyMessages =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyNet =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyNetwork =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyService =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyUtility =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.Spacelet =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SPM =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: false
	};

self.ValidateApplication =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.WebOperation =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.WebRtcClient =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.WebRtcConnection =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.WebServer =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.WebSocketConnection =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.WebSocketRpcConnection =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.WebSocketRpcServer =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.WebSocketServer =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

}

LoggerConfig.getConfig = function()
	{
	return new LoggerConfig();
	};

if(typeof exports !== "undefined")
	module.exports = LoggerConfig;
