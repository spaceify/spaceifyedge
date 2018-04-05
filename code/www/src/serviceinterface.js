"use strict";

/**
 * Service Logic, 29.7.2015 Spaceify Oy
 *
 * A class for connecting required services and opening servers for provided services.
 * This class can be used in Node.js applications and web pages.
 *
 * @class ServiceInterface
 */

function ServiceInterface()
{
var self = this;

var isNodeJs = (typeof window == "undefined" ? true : false);

var lib = null;
var fibrous = null;
var Service = null;
var Connection = null;
var SpaceifyCore = null;
var SpaceifyError = null;
var SpaceifyConfig = null;
var SpaceifyNetwork = null;
var ServiceSelector = null;
//var SpaceifyLogger = null;
var WebSocketRpcServer = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	Service = require(lib + "service");
	SpaceifyCore = require(lib + "spaceifycore");
	SpaceifyError = require(lib + "spaceifyerror");
	SpaceifyConfig = require(lib + "spaceifyconfig");
	SpaceifyNetwork = require(lib + "spaceifynetwork");
	ServiceSelector = require(lib + "serviceselector");
	//SpaceifyLogger = require(lib + "spaceifylogger");
	WebSocketRpcServer = require(lib + "websocketrpcserver");
	Connection = require(lib + "connection");
	fibrous = require(lib + "fibrous");
	}
else
	{
	lib = (window.WEBPACK_MAIN_LIBRARY ? window.WEBPACK_MAIN_LIBRARY : window);

	Service = lib.Service;
	SpaceifyCore = lib.SpaceifyCore;
	SpaceifyError = lib.SpaceifyError;
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyNetwork = lib.SpaceifyNetwork;
	ServiceSelector = lib.ServiceSelector;
	//SpaceifyLogger = lib.SpaceifyLogger;
	WebSocketRpcServer = null;
	Connection = lib.Connection;
	fibrous = function(fn) { return fn; };
	}

var core = new SpaceifyCore();
var errorc = new SpaceifyError();
var network = new SpaceifyNetwork();
var config = SpaceifyConfig.getConfig("realpaths");
//var logger = new SpaceifyLogger("ServiceInterface");

var required = {};																				// <= Clients (required services)
var provided = {};																				// <= Servers (provided services)

var keepServerUp = true;
var keepConnectionUp = true;
var keepConnectionUpTimerIds = {};

var caCrt = config.SPACEIFY_CODE_PATH + config.SPACEIFY_CRT_WWW;
var key = config.VOLUME_TLS_PATH + config.SERVER_KEY;
var crt = config.VOLUME_TLS_PATH + config.SERVER_CRT;

var typeError = errorc.makeErrorObject("1000", "Service type not supported.", "ServiceInterface::connect");
var openError = errorc.makeErrorObject("1001", "Service connection already open.", "ServiceInterface::connect");

	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// CLIENT SIDE - THE REQUIRED SERVICES - NODE.JS / WEB PAGES -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //

self.connect = function(service_name, unique_name, isSecure, callback)
	{
	var service;

	if (service_name == config.HTTP)
		return (typeof callback == "function" ? callback(typeError, null) : false);

	if (!required[service_name])																// Every service has a selector
		required[service_name] = new ServiceSelector();

	service = required[service_name].getService(isSecure);

	if (!service)
		{
		service = new Service(service_name, unique_name, false, new Connection());

		service.setConnectionListener(connectionListener);
		service.setDisconnectionListener(disconnectionListener);

		required[service_name].add(service, isSecure);
		}

	if (service.getIsOpen())																	// Don't reopen connections!
		return (typeof callback == "function" ? callback(openError, null) : false);

	core.getService(service_name, unique_name, function(err, serviceobj)						// Always get the up-to-date service object
		{
		if (!serviceobj || err)
			{
			disconnectionListener(-1, service_name, isSecure, unique_name);						// Let the automaton get the connection up

			if (typeof callback == "function")
				callback(err, null);
			}
		else
			{
			service.getConnection().connect({ hostname: config.EDGE_HOSTNAME, port: (!isSecure ? serviceobj.port : serviceobj.securePort), isSecure: isSecure, caCrt: caCrt }, function(err, data)
				{
				if (err)
					disconnectionListener(-1, service_name, isSecure, unique_name);

				if (typeof callback == "function")
					callback(null, serviceobj);
				})

			}
		});
	}

self.disconnect = function(service_names, callback)
	{ // service_names = disconnect one service (= string), liste of services (= array) or all services ( = undefined || null)
	var keys;

	if (!service_names)																			// All the services
		keys = Object.keys(required);
	else if (service_name.constructor !== Array)												// One service (string)
		keys = [service_names];

	for (var i = 0; i < keys.length; i++)
		{
		required[keys[i]].closeServiceConnection();
		}
	}

var connectionListener = function(id, service_name, isSecure)
	{
	}

var disconnectionListener = function(id, service_name, isSecure, unique_name)
	{
	var timerIdName, service;

	if (!keepConnectionUp)
		return;

	timerIdName = service_name + (!isSecure ? "F" : "T");										// Services have their own timers and
	if (timerIdName in keepConnectionUpTimerIds)												// only one timer can be running at a time
		return;

	service = required[service_name].getService(isSecure);										// Make sure the service is not open
	if (!service || service.getIsOpen())
		return;

	keepConnectionUpTimerIds[timerIdName] = setTimeout(function()
		{
		delete keepConnectionUpTimerIds[timerIdName];												// Timer can now be retriggered

		self.connect(service_name, unique_name, isSecure, null);
		}, config.RECONNECT_WAIT, id, service_name, isSecure, unique_name, timerIdName);
	}

self.keepConnectionUp = function(val)
	{
	keepConnectionUp = (typeof val == "boolean" ? val : false);
	}

self.getRequiredService = function(service_name, isSecure)
	{
	return (required[service_name] ? required[service_name].getService(isSecure) : null);
	}

	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// SERVER SIDE - THE PROVIDED SERVICES - NODE.JS -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //

self.listen = fibrous( function(service_name, unique_name, port, securePort, listenUnsecure, listenSecure)
	{
	var service;

	if (!provided[service_name])
		{
		provided[service_name] = new ServiceSelector();

		service = new Service(service_name, unique_name, true, new WebSocketRpcServer());
		provided[service_name].add(service, false);

		service = new Service(service_name, unique_name, true, new WebSocketRpcServer());
		provided[service_name].add(service, true);
		}

	listenUnsecure = (typeof listenUnsecure == "undefined" ? true : listenUnsecure);
	listenSecure = (typeof listenSecure == "undefined" ? true : listenSecure);

	if (listenUnsecure)
		listen.sync(service_name, port, false);

	if (listenSecure)
		listen.sync(service_name, securePort, true);

	if (!port || !securePort)
		{ // If port was null or 0 the real port number is known only after the server is listening
		if (listenUnsecure)
			port = provided[service_name].getService(false).getPort();

		if (listenSecure)
			securePort = provided[service_name].getService(true).getPort();

		console.log("    LISTEN -----> " + service_name + " - port: " + port + ", secure port: " + securePort);
		}

	core.sync.registerService(service_name, {unique_name: unique_name, port: port, securePort: securePort});
	});

var listen = fibrous( function(service_name, port, isSecure)
	{
	var service = provided[service_name].getService(isSecure);

	if (!service || service.getIsOpen())
		return;

	service.getConnection().sync.listen({ hostname: null, port: port, isSecure: isSecure, key: key, crt: crt, caCrt: caCrt, keepUp: keepServerUp });
	});

self.close = function(service_name)
	{  // service_names = disconnect one service (= string), liste of services (= array) or all services ( = undefined || null)
	var keys;

	if (typeof service_names == "undefined")													// All the services
		keys = Object.keys(provided);
	else if (typeof service_names != "undefined" && service_name.constructor !== Array)			// One service (string)
		keys = [service_names];

	for (var i = 0; i < keys.length; i++)
		{
		provided[keys[i]].closeServiceConnection();
		}
	}

self.getProvidedService = function(service_name, isSecure)
	{
	return (provided[service_name] ? provided[service_name].getService(isSecure) : null);
	}

self.keepServerUp = function(val)
	{
	keepServerUp = (typeof val == "boolean" ? val : false);
	}

	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// BOTH SIDES -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //

self.getServiceById = function(connectionId)
	{
	var i, names, service;

	names = Object.keys(provided);
	for (i = 0; i < names.length; i++)
		{
		if ((service = provided[names[i]].getServiceById(connectionId)))
			return service;
		}

	names = Object.keys(required);
	for (i = 0; i < names.length; i++)
		{
		if ((service = required[names[i]].getServiceById(connectionId)))
			return service;
		}

	return null;
	}

}

if (typeof exports !== "undefined")
	module.exports = ServiceInterface;