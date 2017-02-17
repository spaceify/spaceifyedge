"use strict";

/**
 * Messaging, 18.3.2016 Spaceify Oy
 * 
 * @class Messaging
 */

var Logger = require("./logger");
var fibrous = require("./fibrous");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyUtility = require("./spaceifyutility");
var WebSocketRpcServer = require("./websocketrpcserver");

function Messaging()
{
var self = this;

var webSocketRpcServer = null;
var utility = new SpaceifyUtility();
var config = SpaceifyConfig.getConfig();
var logger = Logger.getLogger("Messaging");

var connections = {};
var confirmedConnections = {};

var key = config.SPACEIFY_TLS_PATH + config.SERVER_KEY;
var crt = config.SPACEIFY_TLS_PATH + config.SERVER_CRT;
var caCrt = config.SPACEIFY_WWW_PATH + config.SPACEIFY_CRT;

var answerListener = null;

	// CONSTANTS -- -- -- -- -- -- -- -- -- -- //
var GARBAGE_INTERVAL = 60000;

self.MESSAGE = "message";
self.MESSAGE_END = "end";
self.MESSAGE_ERROR = "error";
self.MESSAGE_STDOUT = "stdout";
self.MESSAGE_WARNING = "warning";
self.MESSAGE_NOTIFY = "notify";
self.MESSAGE_QUESTION = "question";
self.MESSAGE_CONFIRM = "confirm";
self.MESSAGE_FAILED = "failed";
self.MESSAGE_TIMED_OUT = "questionTimedOut";
self.MESSAGE_ANSWER = "answer";

self.listen = function(port, callback)
	{
	try {
		webSocketRpcServer = new WebSocketRpcServer();

		webSocketRpcServer.setServerDownListener(serverDownListener);

		webSocketRpcServer.setConnectionListener(connectionListener);
		webSocketRpcServer.setDisconnectionListener(disconnectionListener);

		webSocketRpcServer.exposeRpcMethodSync(self.MESSAGE_ANSWER, self, answering);
		webSocketRpcServer.exposeRpcMethodSync(self.MESSAGE_CONFIRM, self, confirming);

		webSocketRpcServer.listen({hostname: config.ALL_IPV4_LOCAL, port: port, isSecure: true, key: key, crt: crt, caCrt: caCrt, keepUp: true}, callback);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	}

self.close = function()
	{
	webSocketRpcServer.close();

	connections = {};
	confirmedConnections = {};
	}

var connectionListener = function(connectionId)
	{
	try	{
		connections[connectionId] = { timestamp: Date.now() };
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	}

var disconnectionListener = function(connectionId)
	{
	var messageId, messageIds;

	try	{
		messageIds = Object.keys(confirmedConnections);

		for(var i = 0; i < messageIds.length; i++)
			{
			messageId = messageIds[i];

			if(confirmedConnections[messageId].connectionId == connectionId)
				delete confirmedConnections[messageId];
			}
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	}

var answering = fibrous( function(messageId, answer, answerCallBackId, connObj)
	{ // The owner of the instance of this class sets listeners
	if(answerListener && messageId in confirmedConnections && confirmedConnections[messageId].connectionId)
		answerListener(answer, answerCallBackId);
	});
	
var confirming = fibrous( function(messageId, connObj)
	{
	var connectionId = arguments[arguments.length-1].connectionId;

	try {
		if(messageId in confirmedConnections)									// Accept the confirmation when messageId can be paired with a connection
			confirmedConnections[messageId].connectionId = connectionId;
		else																	// Close the connection otherwise
			{
			connections[connectionId].close();
			delete connections[connectionId];
			}
		}
	catch(err)
		{}
	});

	// -- -- -- -- -- -- -- -- -- -- //
var serverDownListener = function()
	{
	connections = {};
	confirmedConnections = {};
	}

self.setAnswerListener = function(listener)
	{
	answerListener = (typeof listener == "function" ? listener : null);
	}

self.sendMessage = function(messages, callback)
	{
	if(messages.length == 0)
		return callback(null, true);

	var message = messages.shift();

	if(typeof message == "string")
		message = {type: self.MESSAGE, data: [message]};

	var connectionIds = [];
	for(var messageId in confirmedConnections)									// Send messages to the confirmed connections
		{
		if(confirmedConnections[messageId].connectionId)
			connectionIds.push(confirmedConnections[messageId].connectionId);
		}

	sendToConnections(connectionIds, message, messages, callback);
	}

var sendToConnections = function(connectionIds, message, messages, callback)
	{
	if(connectionIds.length == 0)
		return self.sendMessage(messages, callback);

	var connectionId = connectionIds.shift();

	webSocketRpcServer.callRpc(message.type, message.data, self, function(err, data)
		{
		sendToConnections(connectionIds, message, messages, callback);
		}, connectionId);
	}

self.messageIdRequested = function()
	{
	var messageId = utility.randomString(64, true);

	confirmedConnections[messageId] = { timestamp: Date.now(), connectionId: null };

	return messageId;
	}

var carbageCollection = function()
	{
	var i, ts;
	var connectionId, connectionIds, messageIds, messageId;

	// Allow one minute to confirm a messageId
	messageIds = Object.keys(confirmedConnections);
	for(i = 0; i < messageIds.length; i++)
		{
		messageId = messageIds[i];

		ts = Date.now() - confirmedConnections[messageId].timestamp;

		if(ts >= GARBAGE_INTERVAL)
			delete confirmedConnections[messageId];
		}

	// Allow connections unconfirmed with a messageId to be open for one minute before disconnecting
	connectionIds = Object.keys(connections);
	for(i = 0; i < connectionIds.length; i++)
		{
		connectionId = connectionIds[i];

		ts = Date.now() - connections[connectionId].timestamp;

		if(ts >= GARBAGE_INTERVAL)
			{
			connections[connectionId].close();
			delete connections[connectionId];
			}
		}
	}

}

module.exports = Messaging;