"use strict";

/**
 * WebSocketRpcConnection, 12.5.2016 Spaceify Oy
 *
 * @class WebSocketRpcConnection
 */

function WebSocketRpcConnection()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
var SpaceifyError = null;
var SpaceifyUtility = null;
var RpcCommunicator = null;
//var SpaceifyLogger = null;
var WebSocketConnection = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	SpaceifyError = require(lib + "spaceifyerror");
	//SpaceifyLogger = require(lib + "spaceifylogger");
	SpaceifyUtility = require(lib + "spaceifyutility");
	RpcCommunicator = require(lib + "rpccommunicator");
	WebSocketConnection = require(lib + "websocketconnection");
	}
else
	{
	lib = (window.WEBPACK_MAIN_LIBRARY ? window.WEBPACK_MAIN_LIBRARY : window);

	//SpaceifyLogger = lib.SpaceifyLogger;
	SpaceifyError = lib.SpaceifyError;
	SpaceifyUtility = lib.SpaceifyUtility;
	RpcCommunicator = lib.RpcCommunicator;
	WebSocketConnection = lib.WebSocketConnection;
	}

var errorc = new SpaceifyError();
var utility = new SpaceifyUtility();
var communicator = new RpcCommunicator();
var connection = new WebSocketConnection();
//var logger = new SpaceifyLogger("WebSocketRpcConnection");

self.connect = function(options, callback)
	{
	connection.connect(options, function(err, data)
		{
		if(!err)
			{
			communicator.addConnection(connection);

			if(options.logger)
				communicator.setOptions({ logger: options.logger });

			if(callback)
				callback(null, true);
			}
		else
			{
			if(callback)
				callback(errorc.makeErrorObject("wsrpcc", "Failed to open WebsocketRpcConnection.", "WebSocketRpcConnection::connect"), null);
			}
		});
	};

self.close = function()
	{
	};

self.getCommunicator = function()
	{
	return communicator;
	};

self.getConnection = function()
	{
	return connection;
	};

// Inherited methods
self.exposeRpcMethod = function(name, object, method)
	{
	communicator.exposeRpcMethod(name, object, method);
	}

self.exposeRpcMethodSync = function(name, object, method)
	{
	communicator.exposeRpcMethodSync(name, object, method);
	}

self.callRpc = function(method, params, object, listener)
	{
	return communicator.callRpc(method, params, object, listener, connection.getId());
	}

self.getIsOpen = function()
	{
	return connection.getIsOpen();
	}

self.getIsSecure = function()
	{
	return connection.getIsSecure();
	}

self.getPort = function()
	{
	return connection.getPort();
	}

self.getId = function()
	{
	return connection.getId();
	}

// External event listeners
self.setConnectionListener = function(listener)
	{
	communicator.setConnectionListener(listener);
	};

self.setDisconnectionListener = function(listener)
	{
	communicator.setDisconnectionListener(listener);
	};

}

if (typeof exports !== "undefined")
	module.exports = WebSocketRpcConnection;
