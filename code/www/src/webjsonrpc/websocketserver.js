"use strict";

/**
 * WebSocketServer, 21.6.2016 Spaceify Oy
 *
 * @class WebSocketServer
 */

function WebSocketServer()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
var SpaceifyLogger = null;
var SpaceifyConfig = null;
var SpaceifyUtility = null;
var WebSocketConnection = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	SpaceifyLogger = require(lib + "spaceifylogger");
	SpaceifyConfig = require(lib + "spaceifyconfig");
	SpaceifyUtility = require(lib + "spaceifyutility.js");
	WebSocketConnection = require(lib + "websocketconnection");

	global.fs = require("fs");
	global.URL = require("url");
	global.http = require("http");
	global.https = require("https");
	global.WSServer = require("websocket").server;
	}
else
	{
	lib = (window.WEBPACK_MAIN_LIBRARY ? window.WEBPACK_MAIN_LIBRARY : window);

	SpaceifyLogger = window.SpaceifyLogger;
	SpaceifyConfig = window.SpaceifyConfig;
	SpaceifyUtility = window.SpaceifyUtility;
	WebSocketConnection = window.WebSocketConnection;
	}

var utility = new SpaceifyUtility();
var config = SpaceifyConfig.getConfig();
var logger = new SpaceifyLogger("WebSocketServer");

var options = {};
var manuallyClosed = false;
var serverDownTimerId = null;

var wsServer = null;
var webServer = null;

var eventListener = null;
var externalServerUpListener = null;
var externalServerDownListener = null;

self.listen = function(opts, callback)
	{
	try	{
		if(!("id" in options))														// Set only once
			{
			options.hostname = opts.hostname || null;
			options.port = opts.port || 0;
			options.key = opts.key || "";
			options.crt = opts.crt || "";
			options.caCrt = opts.caCrt || "";
			options.isSecure = opts.isSecure || false;
			options.keepUp = opts.keepUp || "";
			options.protocol = (!options.isSecure ? "ws" : "wss");
			options.subprotocol = opts.subprotocol || "json-rpc";
			options.id = opts.id || utility.generateRandomConnectionId({});
			}

		logger.log(utility.replace("WebSocketServer::listen() protocol: ~pr, subprotocol: ~s, hostname: ~h, port: ~po",
									{"~pr": options.protocol, "~s": options.subprotocol, "~h": options.hostname, "~po": options.port}));

		manuallyClosed = false;

			// CREATE HTTP SERVER -- -- -- -- -- -- -- -- -- -- //
		if (!options.isSecure)																// Start a http server
			{
			webServer = http.createServer(function(request, response)
				{
				response.writeHead(501);
				response.end("Not implemented");
				});
			}
		else																				// Start a https server
			{
			var key = fs.readFileSync(options.key);
			var crt = fs.readFileSync(options.crt);
			var caCrt = fs.readFileSync(options.caCrt, "utf8");

			webServer = https.createServer({ key: key, cert: crt, ca: caCrt }, function(request, response)
				{
				response.writeHead(501);
				response.end("Not implemented");
				});
			}

		webServer.listen(options.port, options.hostname, 511, function()
			{
			options.port = webServer.address().port;

			serverUpListener();

			if(typeof callback == "function")
				callback(null, true);
			});

		webServer.on("error", function(err)
			{
			logger.error("WebSocketServer::onError()", true, true, logger.ERROR);

			serverDownListener();

			if(typeof callback == "function")
				callback(err, null);
			});

		webServer.on("close", function()
			{
			serverDownListener();
			});

			// CREATE WEBSOCKET SERVER -- -- -- -- -- -- -- -- -- -- //
		wsServer = new WSServer(
			{
			httpServer: webServer,
			autoAcceptConnections: false,

			keepalive: true,																// Keepalive connections and
			keepaliveInterval: 60000,														// ping them once a minute and
			dropConnectionOnKeepaliveTimeout: true,											// drop a connection if there's no answer
			keepaliveGracePeriod: 10000														// within the grace period.
			});

		// Connection request
		wsServer.on("request", function(request)
			{
			try
				{
				var connection = new WebSocketConnection();
				connection.setSocket(request.accept(options.subprotocol, request.origin));
				connection.setRemoteAddress(request.remoteAddress);
				connection.setRemotePort(request.remotePort);
				connection.setOrigin(request.origin);
				connection.setIsSecure(options.isSecure);

				var query = URL.parse(request.resourceURL, true).query;
				if (query && query.id)
					connection.setId(query.id);

				eventListener.addConnection(connection);

				logger.log(utility.replace("WebSocketServer::request(~lp) protocol: ~p, remoteAddress: ~ra, remotePort: ~rp, origin: ~o, id: ~i",
						{"~lp": options.port, "~p": options.protocol, "~ra": request.remoteAddress, "~rp": request.remotePort, "~o": request.origin, "~i": connection.getId()}, "-"));
				}
			catch(err)
				{
				logger.error(err, true, true, logger.ERROR);
				return;
				}
			});

		// Connection is accepted
		wsServer.on("connect", function(webSocketConnection)
			{
			});

		// Connection closed
		wsServer.on("close", function(webSocketConnection, closeReason, description)
			{
			});
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.close = function()
	{
	try	{
		logger.log(utility.replace("WebSocketServer::close() protocol: :pr, subprotocol: :s, hostname: :h, port: :po",
									{":pr": options.protocol, ":s": options.subprotocol, ":h": options.hostname, ":po": options.port}));

		manuallyClosed = true;

		if(wsServer)
			{
			wsServer.shutDown();
			wsServer = null;
			}

		if(webServer)
			{
			webServer.close();
			webServer = null;
			}
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.getPort = function()
	{
	return options.port;
	}

self.getIsOpen = function()
	{
	return (webServer && wsServer ? true : false);
	}

self.getIsSecure = function()
	{
	return options.isSecure;
	}

self.getId = function()
	{
	return options.id;
	}

self.setEventListener = function(listener)
	{
	eventListener = listener;
	};

// INTERNAL SERVER UP AND DOWN LISTENERS AND KEEPUP LOGIC
var serverUpListener = function()
	{
	if(externalServerUpListener)
		externalServerUpListener(options.id);
	}

var serverDownListener = function()
	{
	if(externalServerDownListener)
		externalServerDownListener(options.id);

	if(options.keepUp && serverDownTimerId == null && !manuallyClosed)
		{
		serverDownTimerId = setTimeout(function()
			{
			serverDownTimerId = null;
			self.listen(options, null);
			}, config.RECONNECT_WAIT);
		}
	}

	// EXTERNAL SERVER UP AND DOWN LISTENERS
self.setServerUpListener = function(listener)
	{
	externalServerUpListener = (typeof listener == "function" ? listener : null);
	}

self.setServerDownListener = function(listener)
	{
	externalServerDownListener = (typeof listener == "function" ? listener : null);
	}

}

if (typeof exports !== "undefined")
	module.exports = WebSocketServer;
