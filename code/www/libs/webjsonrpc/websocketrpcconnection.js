"use strict";

/**
 * WebSocketRpcConnection, 12.5.2016 Spaceify Oy
 * 
 * @class WebSocketRpcConnection
 */

function WebSocketRpcConnection()
{
// NODE.JS / REAL SPACEIFY - - - - - - - - - - - - - - - - - - - -
var isNodeJs = (typeof exports !== "undefined" ? true : false);
var isRealSpaceify = (isNodeJs && typeof process.env.IS_REAL_SPACEIFY !== "undefined" ? true : false);
var apiPath = (isNodeJs && isRealSpaceify ? "/api/" : "/var/lib/spaceify/code/");

var SpaceifyError = (isNodeJs ? require(apiPath + "spaceifyerror") : SpaceifyError);
var SpaceifyUtility = (isNodeJs ? require(apiPath + "spaceifyutility") : SpaceifyUtility);
var RpcCommunicator = (isNodeJs ? require(apiPath + "rpccommunicator") : RpcCommunicator);
var WebSocketConnection = (isNodeJs ? require(apiPath + "websocketconnection") : WebSocketConnection);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var self = this;

var errorc = new SpaceifyError();
var utility = new SpaceifyUtility();
var communicator = new RpcCommunicator();
var connection = new WebSocketConnection();

self.connect = function(options, callback)
	{
	connection.connect(options, function(err, data)
		{
		if(!err)
			{
			communicator.addConnection(connection);

			var debug = ("debug" in options ? options.debug : false);
			communicator.setOptions({ debug: debug });

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

if(typeof exports !== "undefined")
	{
	module.exports = WebSocketRpcConnection;
	}
