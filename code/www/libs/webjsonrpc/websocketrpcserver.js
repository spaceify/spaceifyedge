"use strict";

/**
 * WebSocketRpcServer, 21.6.2016 Spaceify Oy
 * 
 * @class WebSocketRpcServer
 */

function WebSocketRpcServer()
{
// NODE.JS / REAL SPACEIFY - - - - - - - - - - - - - - - - - - - -
var apiPath = "/var/lib/spaceify/code/";
var isNodeJs = (typeof window === "undefined" ? true : false);

//var Logger = (isNodeJs ? require(apiPath + "logger") : window.Logger);
var SpaceifyConfig = (isNodeJs ? require(apiPath + "spaceifyconfig") : window.SpaceifyConfig);
var RpcCommunicator = (isNodeJs ? require(apiPath + "rpccommunicator") : window.RpcCommunicator);
var WebSocketServer = (isNodeJs ? require(apiPath + "websocketserver") : window.WebSocketServer);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var self = this;

var config = new SpaceifyConfig();
var communicator = new RpcCommunicator();
var webSocketServer = new WebSocketServer();
//var logger = new Logger("WebSocketRpcServer", "selogs");

webSocketServer.setEventListener(communicator);

var connectionListener = null;
var disconnectionListener = null;

self.listen = function(options, callback)
	{
	communicator.setConnectionListener(listenConnections);
	communicator.setDisconnectionListener(listenDisconnections);

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

if(typeof window === "undefined")
	module.exports = WebSocketRpcServer;
