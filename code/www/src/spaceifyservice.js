"use strict";

/**
 * Spaceify Service, 29.7.2015 Spaceify Oy
 *
 * A class for connecting required services and opening servers for provided services.
 * This class can be used by Node.js applications and web pages.
 *
 * @class SpaceifyService
 */

function SpaceifyService()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
//var Logger = null;
var fibrous = null;
var Service = null;
var Connection = null;
var SpaceifyCore = null;
var SpaceifyError = null;
var SpaceifyConfig = null;
var SpaceifyNetwork = null;
var WebSocketRpcServer = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	//Logger = require(lib + "logger");
	Service = require(lib + "service");
	SpaceifyCore = require(lib + "spaceifycore");
	SpaceifyError = require(lib + "spaceifyerror");
	SpaceifyConfig = require(lib + "spaceifyconfig");
	SpaceifyNetwork = require(lib + "spaceifynetwork");
	WebSocketRpcServer = require(lib + "websocketrpcserver");
	Connection = require(lib + "connection");
	fibrous = require(lib + "fibrous");
	}
else
	{
	lib = (window.WEBPACK_MAIN_LIBRARY ? window.WEBPACK_MAIN_LIBRARY : window);

	//Logger = lib.Logger;
	Service = lib.Service;
	SpaceifyCore = lib.SpaceifyCore;
	SpaceifyError = lib.SpaceifyError;
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyNetwork = lib.SpaceifyNetwork;
	WebSocketRpcServer = null;
	Connection = lib.Connection;
	fibrous = function(fn) { return fn; };
	}

var core = new SpaceifyCore();
var errorc = new SpaceifyError();
var network = new SpaceifyNetwork();
var config = SpaceifyConfig.getConfig("realpaths");
//var logger = Logger.getLogger("SpaceifyService");

var required = {};									// <= Clients (required services)
var requiredSecure = {};

var provided = {};									// <= Servers (provided services)
var providedSecure = {};

var keepServerUp = true;
var keepConnectionUp = true;
var keepConnectionUpTimerIds = {};

var caCrt = config.SPACEIFY_CODE_PATH + config.SPACEIFY_CRT_WWW;
var key = config.VOLUME_TLS_PATH + config.SERVER_KEY;
var crt = config.VOLUME_TLS_PATH + config.SERVER_CRT;

var errobj = errorc.makeErrorObject("not_open", "Connection is not ready.", "SpaceifyService::connect");

	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// CLIENT SIDE - THE REQUIRED SERVICES - NODE.JS / WEB PAGES -- -- -- -- -- -- -- -- -- -- //
self.connect = function(serviceObj, isSecure, callback)
	{ // serviceObj = object (service object) or string (service name)
	var service_name = (typeof serviceObj === "object" ? serviceObj.service_name : serviceObj);

	if(service_name == config.HTTP)
		return callback(errobj, null);

	if(typeof isSecure === "function")										// From web page or not defined
		{
		callback = isSecure;
		isSecure = (isNodeJs ? false : network.isSecure());
		}
	else																	// Web page always checks the protocol
		{
		isSecure = (isNodeJs ? isSecure : network.isSecure());
		}

	open(serviceObj, (!isSecure ? required : requiredSecure), isSecure, callback);
	}

function open(serviceObj, service, isSecure, callback)
	{
	var port;
	var service_name = (typeof serviceObj === "object" ? serviceObj.service_name : serviceObj);

	if(!service[service_name])
		{
		service[service_name] = new Service(service_name, false, new Connection());
		service[service_name].setConnectionListener(connectionListener);
		service[service_name].setDisconnectionListener(disconnectionListener);
		}

	if(typeof serviceObj === "object")
		{
		port = (!isSecure ? serviceObj.port : serviceObj.securePort);

		connect(service[service_name], port, isSecure, function()
			{
			if(typeof callback === "function")
				callback(null, service[service_name]);
			});
		}
	else
		{
		core.getService(service_name, "", function(err, serviceObj)
			{
			if(!serviceObj || err)
				{
				if(!service[service_name].getIsOpen())											// Let the automaton get the connection up
					disconnectionListener(-1, service_name, isSecure);

				if(typeof callback === "function")
					callback(errobj, null);
				}
			else
				{
				port = (!isSecure ? serviceObj.port : serviceObj.securePort);

				connect(service[service_name], port, isSecure, function()
					{
					if(typeof callback === "function")
						callback(null, service[service_name]);
					});
				}
			});
		}
	}

var connect = function(service, port, isSecure, callback)
	{
	if(service.getIsOpen())																	// Don't reopen connections!
		return callback();

	service.getConnection().connect({ hostname: config.EDGE_HOSTNAME, port: port, isSecure: isSecure, caCrt: caCrt }, callback);
	}

self.disconnect = function(service_names, callback)
	{ // Disconnect one service, listed services or all services
	var keys;

	if(!service_names)																		// All the services
		keys = Object.keys(required);
	else if(service_name.constructor !== Array)												// One service (string)
		keys = [service_names];

	for(var i = 0; i<keys.length; i++)
		{
		if(keys[i] in required)
			required[keys[i]].getConnection().close();

		if(keys[i] in requiredSecure)
			requiredSecure[keys[i]].getConnection().close();
		}
	}

var connectionListener = function(id, service_name, isSecure)
	{
	}

var disconnectionListener = function(id, service_name, isSecure)
	{
	if(!keepConnectionUp)
		return;

	var timerIdName = service_name + (!isSecure ? "F" : "T");								// Services have their own timers and
	if(timerIdName in keepConnectionUpTimerIds)												// only one timer can be running at a time
		return;

	var service = (!isSecure ? required[service_name] : requiredSecure[service_name]);

	keepConnectionUpTimerIds[timerIdName] = setTimeout(waitConnectionAttempt, config.RECONNECT_WAIT, id, service_name, isSecure, timerIdName, service);
	}

var waitConnectionAttempt = function(id, service_name, isSecure, timerIdName, service)
	{
	core.getService(service_name, "", function(err, serviceObj)
		{
		delete keepConnectionUpTimerIds[timerIdName];										// Timer can now be retriggered

		if(serviceObj)
			connect(service, (!isSecure ? serviceObj.port : serviceObj.securePort), isSecure, function() {});
		else
			disconnectionListener(id, service_name, isSecure);
		});
	}

self.getRequiredService = function(service_name)
	{
	return (required[service_name] ? required[service_name] : null);
	}

self.getRequiredServiceSecure = function(service_name)
	{
	return (requiredSecure[service_name] ? requiredSecure[service_name] : null);
	}

self.keepConnectionUp = function(val)
	{
	keepConnectionUp = (typeof val == "boolean" ? val : false);
	}

	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// SERVER SIDE - THE PROVIDED SERVICES - NODE.JS -- -- -- -- -- -- -- -- -- -- //
self.listen = fibrous( function(service_name, unique_name, port, securePort, listenUnsecure, listenSecure)
	{
	if(typeof listenUnsecure == "undefined")
		listenUnsecure = true;

	if(typeof listenSecure == "undefined")
		listenSecure = true;

	if(!provided[service_name])																// Create the connection objects
		provided[service_name] = new Service(service_name, true, new WebSocketRpcServer());

	if(!providedSecure[service_name])
		providedSecure[service_name] = new Service(service_name, true, new WebSocketRpcServer());

	if(listenUnsecure)
		listen.sync(provided[service_name], port, false);

	if(listenSecure)
		listen.sync(providedSecure[service_name], securePort, true);

	if(!port || !securePort)
		{ // If port was null or 0 the real port number is known only after the server is listening
		if(listenUnsecure)
			port = provided[service_name].getServer().getPort();

		if(listenSecure)
			securePort = providedSecure[service_name].getServer().getPort();

		console.log("    LISTEN -----> " + service_name + " - port: " + port + ", secure port: " + securePort);
		}

	core.sync.registerService(service_name, {unique_name: unique_name, port: port, securePort: securePort});
	});

var listen = fibrous( function(service, port, isSecure)
	{
	if(service.getIsOpen())
		return;

	service.getServer().sync.listen({ hostname: null, port: port, isSecure: isSecure, key: key, crt: crt, caCrt: caCrt, keepUp: keepServerUp });
	});

self.close = function(service_name)
	{ // Close one service, listed services or all services
	var keys;

	if(typeof service_names == "undefined")																		// All the services
		keys = Object.keys(provided);
	else if(typeof service_names != "undefined" && service_name.constructor !== Array)							// One service (string)
		keys = [service_names];

	for(var i = 0; i < keys.length; i++)
		{
		if(keys[i] in provided)
			provided[keys[i]].getServer().close();
		if(keys[i] in providedSecure)
			providedSecure[keys[i]].getServer().close();
		}
	}

self.getProvidedService = function(service_name)
	{
	return (provided[service_name] ? provided[service_name] : null);
	}

self.getProvidedServiceSecure = function(service_name)
	{
	return (providedSecure[service_name] ? providedSecure[service_name] : null);
	}

self.keepServerUp = function(val)
	{
	keepServerUp = (typeof val == "boolean" ? val : false);
	}

}

if(typeof exports !== "undefined")
	module.exports = SpaceifyService;