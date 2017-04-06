"use strict";

/**
 * WebSocketRpcServer, 21.6.2016 Spaceify Oy
 *
 * @class WebSocketRpcServer
 */

function WebSocketRpcServer()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
//var SpaceifyLogger = null;
//var SpaceifyConfig = null;
var RpcCommunicator = null;
var WebSocketServer = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	//SpaceifyLogger = require(lib + "spaceifylogger");
	//SpaceifyConfig = require(lib + "spaceifyconfig");
	RpcCommunicator = require(lib + "rpccommunicator");
	WebSocketServer = require(lib + "websocketserver");
	}
else
	{
	lib = (window.WEBPACK_MAIN_LIBRARY ? window.WEBPACK_MAIN_LIBRARY : window);

	//SpaceifyLogger = window.SpaceifyLogger;
	//SpaceifyConfig = window.SpaceifyConfig;
	RpcCommunicator = window.RpcCommunicator;
	WebSocketServer = window.WebSocketServer;
	}

//var config = SpaceifyConfig.getConfig();
var communicator = new RpcCommunicator();
var webSocketServer = new WebSocketServer();
//var logger = new SpaceifyLogger("WebSocketRpcServer");

webSocketServer.setEventListener(communicator);

var connectionListener = null;
var disconnectionListener = null;

self.listen = function(options, callback)
	{
	communicator.setConnectionListener(listenConnections);
	communicator.setDisconnectionListener(listenDisconnections);

	if(options.logger)
		communicator.setOptions({ logger: options.logger });

	try {
		webSocketServer.listen(options, callback);
		}
	catch(err)
		{}
	}

self.close = function()
	{
	webSocketServer.close();
	}

self.getCommunicator = function()
	{
	return communicator;
	}

self.getServer = function()
	{
	return webSocketServer;
	}

// Inherited methods
self.getPort = function()
	{
	return webSocketServer.getPort();
	}

self.getIsOpen = function()
	{
	return webSocketServer.getIsOpen();
	}

self.getIsSecure = function()
	{
	return webSocketServer.getIsSecure();
	}

self.getId = function()
	{
	return webSocketServer.getId();
	}

self.exposeRpcMethod = function(name, object, method)
	{
	communicator.exposeRpcMethod(name, object, method);
	}

self.exposeRpcMethodSync = function(name, object, method)
	{
	communicator.exposeRpcMethodSync(name, object, method);
	}

self.nofifyAll = function(method, params)
	{
	communicator.nofifyAll(method, params);
	}

self.callRpc = function()
	{ // arguments contains a connection id!
	communicator.callRpc.apply(this, arguments);
	}

self.closeConnection = function(connectionId)
	{
	communicator.closeConnection(connectionId);
	}

self.setConnectionListener = function(listener)
	{
	connectionListener = (typeof listener == "function" ? listener : null);
	}

self.setDisconnectionListener = function(listener)
	{
	disconnectionListener = (typeof listener == "function" ? listener : null);
	}

self.setServerUpListener = function(listener)
	{
	webSocketServer.setServerUpListener(typeof listener == "function" ? listener : null);
	}

self.setServerDownListener = function(listener)
	{
	webSocketServer.setServerDownListener(typeof listener == "function" ? listener : null);
	}

	// Call listeners with additional server information
var listenConnections = function(id)
	{
	if(typeof connectionListener == "function")
		connectionListener(id, self.getId(), self.getIsSecure());
	}

var listenDisconnections = function(id)
	{
	if(typeof disconnectionListener == "function")
		disconnectionListener(id, self.getId(), self.getIsSecure());
	}

}

if (typeof exports !== "undefined")
	module.exports = WebSocketRpcServer;
