"use strict";

/**
 * Spaceify application, 25.1.2016 Spaceify Oy
 * This class can be used in Node.js applications and web pages.
 *
 * @class SpaceifyApplication
 */

function SpaceifyApplication()
{
// NODE.JS / REAL SPACEIFY - - - - - - - - - - - - - - - - - - - -

var isNodeJs = (typeof window === "undefined" ? true : false);
var isRealSpaceify = (isNodeJs && typeof process.env.IS_REAL_SPACEIFY !== "undefined" ? true : false);

var lib = null;
var WebServer = null;
var SpaceifyCore = null;
var SpaceifyConfig = null;
var SpaceifyLogger = null;
var SpaceifyUtility = null;
var ServiceInterface = null;
var fibrous = null;

if(isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	WebServer = require(lib + "webserver");
	SpaceifyCore = require(lib + "spaceifycore");
	SpaceifyConfig = require(lib + "spaceifyconfig");
	SpaceifyLogger = require(lib + "spaceifylogger");
	SpaceifyUtility = require(lib + "spaceifyutility");
	ServiceInterface = require(lib + "serviceinterface");
	fibrous = require(lib + "fibrous");
	}
else
	{
	lib = (window.WEBPACK_MAIN_LIBRARY ? window.WEBPACK_MAIN_LIBRARY : window);

	WebServer = function() {};
	SpaceifyCore = lib.SpaceifyCore;
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyLogger = lib.SpaceifyLogger;
	SpaceifyUtility = lib.SpaceifyUtility;
	ServiceInterface = lib.ServiceInterface;
	fibrous = function(fn) { return fn; };
	}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var self = this;

var httpServer = new WebServer();
var httpsServer = new WebServer();
var utility = new SpaceifyUtility();
var spaceifyCore = new SpaceifyCore();
var serviceInterface = new ServiceInterface();
var config = SpaceifyConfig.getConfig("realpaths");
var logger = new SpaceifyLogger("SpaceifyApplication");

var manifest = null;
var application = null;

var HTTP_PORT = (isRealSpaceify ? 80 : null);
var HTTPS_PORT = (isRealSpaceify ? 443 : null);

self.start = function()
	{
	if(isNodeJs)
		start.apply(self, arguments);
	else
		self.connect.apply(self, arguments);
	}

var start = function(application_, options)
	{
	fibrous.run( function()
		{
		var server;
		var port;
		var securePort;
		var registerHttp;
		var hasWebServers;
		var listenHttp = false;
		var listenHttps = false;
		var listenSecure = true;
		var listenUnsecure = true;

		application = application_;

			// OPTIONS -- -- -- -- -- -- -- -- -- -- //
		options = options || {};

		hasWebServers = (options.webservers || options.webServers ? true : false);

		if(hasWebServers)
			{
			server = options.webservers || options.webServers;
			listenHttp = ("http" in server ? server.http : false);
			listenHttps = ("https" in server ? server.https : false);
			}

		if(options.websocketservers || options.webSocketServers)
			{
			server = options.websocketservers || options.webSocketServers;
			listenSecure = ("secure" in server ? server.secure : false);
			listenUnsecure = ("unsecure" in server ? server.unsecure : false);
			}

			// APPLICATION -- -- -- -- -- -- -- -- -- -- //
		try {
			manifest = utility.sync.loadJSON(config.VOLUME_APPLICATION_PATH + config.MANIFEST, true, true);

				// SERVICES -- -- -- -- -- -- -- -- -- -- //
			if(manifest.provides_services)														// <= SERVERS - PROVIDES SERVICES
				{
				var services = manifest.provides_services;

				for(var i = 0; i < services.length; i++)
					{
					if(services.service_type == config.ALIEN)
						continue;

					port = (isRealSpaceify ? config.FIRST_SERVICE_PORT + i : null);
					securePort = (isRealSpaceify ? config.FIRST_SERVICE_PORT_SECURE + i : null);

					serviceInterface.sync.listen(services[i].service_name, manifest.unique_name, port, securePort, listenUnsecure, listenSecure);
					}
				}

			if(manifest.requires_services)														// <= CLIENTS - REQUIRES SERVICES
				{
				createRequiredServices.sync(manifest.requires_services, 0, false);
				createRequiredServices.sync(manifest.requires_services, 0, true);
				}

				// START APPLICATIONS HTTP AND HTTPS WEB SERVERS -- -- -- -- -- -- -- -- -- -- //
			if(hasWebServers)
				{
				var opts =	{
							hostname: config.ALL_IPV4_LOCAL,
							key: config.VOLUME_TLS_PATH + config.SERVER_KEY,
							crt: config.VOLUME_TLS_PATH + config.SERVER_CRT,
							caCrt: config.API_WWW_PATH + config.SPACEIFY_CRT,
							wwwPath: config.VOLUME_APPLICATION_WWW_PATH,
							indexFile: config.INDEX_FILE,
							serverName: manifest.name + " Server"
							};

				registerHttp = false;

				if(listenHttp && !httpServer.getIsOpen())
					{
					opts.isSecure = false;
					opts.port = HTTP_PORT;
					opts.mappedPort = (isRealSpaceify ? process.env["PORT_80"] : null);
					httpServer.setSessionListener(null, config.SESSION_TOKEN_NAME);
					httpServer.listen.sync(opts);

					HTTP_PORT = httpServer.getPort();											// Get the port because native and develop mode applications
																								// do not have knowledge of port numbers beforehand
					registerHttp = true;
					}

				if(listenHttps && !httpsServer.getIsOpen())
					{
					opts.isSecure = true;
					opts.port = HTTPS_PORT;
					opts.mappedPort = (isRealSpaceify ? process.env["PORT_443"] : null);
					httpsServer.setSessionListener(null, config.SESSION_TOKEN_NAME);
					httpsServer.listen.sync(opts);

					HTTPS_PORT = httpsServer.getPort();

					registerHttp = true;
					}

				if(registerHttp && !isRealSpaceify)
					{
					spaceifyCore.sync.registerService("http", {unique_name: manifest.unique_name, port: HTTP_PORT, securePort: HTTPS_PORT});
					console.log("    LISTEN -----> " + config.HTTP + " - port: " + HTTP_PORT + ", secure port: " + HTTPS_PORT);
					}
				}

			if(application && application.start && typeof application.start == "function")
				application.start();

				// APPLICATION INITIALIALIZED SUCCESSFULLY -- -- -- -- -- -- -- -- -- -- //
			console.log(config.APPLICATION_INITIALIZED, "---", manifest.unique_name);
			}
		catch(err)
			{
			initFail.sync(err);
			}
		}, function(err, data)
			{
			//initFail.sync(err);
			});
	}

self.connect = function(application_, unique_names, options)
	{ // Setup connections to open services of applications and spacelets; open, open_local or both depending from where this method is called
	try {
		application = application_;

		if(unique_names.constructor !== Array)													// getOpenServices takes an array of unique names
			unique_names = [unique_names];

		spaceifyCore.getOpenServices(unique_names, false, function(err, services)
			{
			if(err)
				throw err;
			else
				connectServices(application, services);
			});
		}
	catch(err)
		{
		if(typeof application == "function")
			application(err, false);
		else if(application && application.fail && typeof application.fail == "function")
			application.fail(err);
		}
	}

var connectServices = function(application_, services)
	{ // Connect to services in the array one at a time
	var service = services.shift();

	application = application_;

	if(typeof service === "undefined")
		{
		if(typeof application == "function")
			application(null, true);
		else if(application && application.start && typeof application.start == "function")
			application.start();

		return;
		}

	serviceInterface.connect(service.service_name, function(err, data)
		{
		connectServices(application, services);
		});
	}

var initFail = fibrous( function(err)
	{ // FAILED TO INITIALIALIZE THE APPLICATION. -- -- -- -- -- -- -- -- -- -- //
	logger.error([";;", err, "::"], true, true, logger.ERROR);
	console.log(manifest.unique_name + config.APPLICATION_UNINITIALIZED);						// console.log is used intentionally!!!

	stop.sync(err);
	});

var stop = fibrous( function(err)
	{
	httpServer.close();
	httpsServer.close();

	serviceInterface.disconnect();																// Disconnect clients
	serviceInterface.close();																	// Close servers

	spaceifyCore.close();

	if(application && application.fail && typeof application.fail == "function")
		application.fail(err);
	});

var createRequiredServices = function(services, position, isSecure, callback)
	{
	if(position == services.length)
		{
		callback();
		}
	else
		{
		serviceInterface.connect(services[position++].service_name, isSecure, function(err, data)
			{
			createRequiredServices(services, position, isSecure, callback);
			});
		}
	}

	// METHODS -- -- -- -- -- -- -- -- -- -- //
self.getOwnUrl = function(isSecure)
	{
	if(!isNodeJs)
		return null;

	var ownUrl = (!isSecure ? "http://" : "https://") + config.EDGE_HOSTNAME + ":" + (!isSecure ? HTTP_PORT : HTTPS_PORT);

	return ownUrl;
	}

self.getManifest = function()
	{
	return manifest;
	}

	// REQUIRED (= CLIENT) / PROVIDED (= SERVICE) -- -- -- -- -- -- -- -- -- -- //
self.getRequiredService = function(service_name)
	{
	return serviceInterface.getRequiredService(service_name);
	}

self.getProvidedService = function(service_name)
	{
	return serviceInterface.getProvidedService(service_name);
	}

self.setDisconnectionListeners = function(service_name, listener)
	{ // Get service, check its type before setting
	var service;

	if (typeof listener != "function")
		return;

	if ((service = serviceInterface.getProvidedService(service_name, false)))
		{
		if (!service.getIsSecure())
			service.setDisconnectionListener(listener);
		}

	if ((service = serviceInterface.getProvidedService(service_name, true)))
		{
		if (service.getIsSecure())
			service.setDisconnectionListener(listener);
		}

	if ((service = serviceInterface.getRequiredService(service_name, false)))
		{
		if (!service.getIsSecure())
			service.setDisconnectionListener(listener);
		}

	if ((service = serviceInterface.getRequiredService(service_name, true)))
		{
		if (service.getIsSecure())
			service.setDisconnectionListener(listener);
		}
	}

self.setConnectionListeners = function(service_name, listener)
	{ // Get service, check its type before setting
	var service;

	if (typeof listener != "function")
		return;

	if ((service = serviceInterface.getProvidedService(service_name, false)))
		{
		if (!service.getIsSecure())
			service.setConnectionListener(listener);
		}

	if ((service = serviceInterface.getProvidedService(service_name, true)))
		{
		if (service.getIsSecure())
			service.setConnectionListener(listener);
		}
	}

self.callRpcByConnectionId = function(connectionId, method, params, object, callback)
	{
	var service = serviceInterface.getServiceById(connectionId);

	if (service)
		service.callRpc(method, params, object, callback);
	}

}

if(typeof exports !== "undefined")
	module.exports = (typeof window === "undefined" ? new SpaceifyApplication() : SpaceifyApplication);
