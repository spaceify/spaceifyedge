"use strict";

/**
 * Spaceify core, 29.7.2015 Spaceify Oy
 *
 * @class SpaceifyCore
 */

function SpaceifyCore()
{
var self = this;

// NODE.JS / REAL SPACEIFY - - - - - - - - - - - - - - - - - - - -
var isNodeJs = (typeof window === "undefined" ? true : false);
var isRealSpaceify = (isNodeJs && typeof process.env.IS_REAL_SPACEIFY !== "undefined" ? true : false);

var lib = null;
var Connection = null;
var SpaceifyConfig = null;
var SpaceifyNetwork = null;
//var SpaceifyLogger = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	Connection = require(lib + "connection");
	SpaceifyConfig = require(lib + "spaceifyconfig");
	//SpaceifyLogger = require(lib + "spaceifylogger");
	SpaceifyNetwork = function() {};
	}
else
	{
	lib = (window.WEBPACK_MAIN_LIBRARY ? window.WEBPACK_MAIN_LIBRARY : window);

	Connection = lib.Connection;
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyNetwork = lib.SpaceifyNetwork;
	//SpaceifyLogger = lib.SpaceifyLogger;
	}

var connection = new Connection();
var network = new SpaceifyNetwork();
var config = SpaceifyConfig.getConfig();
//var logger = new SpaceifyLogger("SpaceifyCore");

var callQueue = [];

self.startSpacelet = function(unique_name, callback)
	{
	callRpc("startSpacelet", [unique_name], callback);
	}

self.registerService = function(service_name, ports, callback)
	{
	callRpc("registerService", [service_name, ports], callback);
	}

self.unregisterService = function(service_name, unique_name, callback)
	{
	callRpc("unregisterService", [service_name, unique_name], callback);
	}

self.getService = function(service_name, unique_name, callback)
	{
	callRpc("getService", [service_name, unique_name], callback);
	}

self.getServices = function(service_name, callback)
	{
	callRpc("getServices", [service_name], callback);
	}

self.getOpenServices = function(unique_names, getHttp, callback)
	{
	callRpc("getOpenServices", [unique_names, getHttp], callback);
	}

self.getManifest = function(unique_name, callback)
	{
	callRpc("getManifest", [unique_name], callback);
	}

self.isAdminLoggedIn = function(callback)
	{
	network.REST_POST(config.REST_API_DIR + config.REST_ISADMINLOGGEDIN, {}, function(err, data, id, ms)
		{
		callback((err ? err : null), (err ? false : data), id, ms);
		});
	}

self.getApplicationStatus = function(unique_name, callback)
	{
	callRpc("getApplicationStatus", [unique_name], callback);
	}

self.isApplicationRunning = function(unique_name, callback)
	{
	callRpc("isApplicationRunning", [unique_name], callback);
	}

self.getRuntimeServiceStates = function(sessionId, callback)
	{
	callRpc("getRuntimeServiceStates", [sessionId], callback);
	}

self.getApplicationData = function(callback)
	{
	callRpc("getApplicationData", [], callback);
	}

self.getApplicationURL = function(unique_name, callback)
	{
	callRpc("getApplicationURL", [unique_name], callback);
	}

self.setEventListeners = function(events, listeners, context, sessionId, callback)
	{
	callRpc("setEventListeners", [events], function(err, data, id, ms)
		{
		if (!err)
			{
			for (var i = 0; i < events.length; i++)
				connection.exposeRpcMethod(events[i], context, listeners[i]);
			}

		callback(err, data, id, ms);
		});
	}

self.getEdgeID = function(callback)
	{
	callRpc("getEdgeID", [], callback);
	}

	// CONNECTION -- -- -- -- -- -- -- -- -- -- //
var callRpc = function(method, params, callback)
	{
	var callObj, isSecure, port, hostname, caCrt;

	if (connection.isConnecting())
		{
		callQueue.push({ method: method, params: params, callback: callback });
		}
	else if (!connection.isConnected())
		{
		callQueue.push({ method: method, params: params, callback: callback });

		isSecure = (isNodeJs ? true : network.isSecure());
		port = (!isSecure ? config.CORE_PORT : config.CORE_PORT_SECURE);
		caCrt = (isNodeJs ? config.SPACEIFY_CODE_PATH + config.SPACEIFY_CRT_WWW : "");

		if (!isNodeJs)																		// Web page
			hostname = network.getEdgeURL({ protocol: "" });
		else if (isRealSpaceify)															// Node.js
			hostname = config.EDGE_IP;
		else																				// Develop mode
			hostname = config.CONNECTION_HOSTNAME;

		connection.connect({ hostname: hostname, port: port, isSecure: isSecure, caCrt: caCrt }, function(err, data)
			{
			if (err)
				{
				while(typeof (callObj = callQueue.shift()) !== "undefined")					// Pass connection failure to all calls
					callObj.callback(err, null, -1, 0);
				}
			else
				{
				nextRpcCall();
				}
			});
		}
	else
		{
		callQueue.push({ method: method, params: params, callback: callback });

		nextRpcCall();
		}
	}

var nextRpcCall = function()
	{
	var callObj = callQueue.shift();

	if (typeof callObj !== "undefined")
		{
		connection.callRpc(callObj.method, callObj.params, self, function()
			{
			callObj.callback.apply(this, arguments);

			nextRpcCall();
			});
		}
	}

self.close = function()
	{
	connection.close();
	}

}

if (typeof exports !== "undefined")
	module.exports = SpaceifyCore;
