"use strict";

/**
 * Spaceify Messages, 21.1.2016 Spaceify Oy
 *
 * For Spaceify's internal use.
 *
 * @class SpaceifyMessages
 */

function SpaceifyMessages()
{
var self = this;

var errorc = new SpaceifyError();
var config = new SpaceifyConfig();
var utility = new SpaceifyUtility();
var network = new SpaceifyNetwork();

var pipeId = null;

var messageId;
var errors = [];
var warnings = [];
var callerOrigin = null;
var managerOrigin = null;

var isNodeJs = (typeof exports !== "undefined" ? true : false);
var isSpaceifyNetwork = (typeof window.isSpaceifyNetwork !== "undefined" ? window.isSpaceifyNetwork : false);

var isConnected = false;
var connection = (isSpaceifyNetwork || isNodeJs ? new WebSocketRpcConnection() : piperClient);

self.connect = function(managerOrigin_, callerOrigin_)
	{
	errors = [];
	warnings = [];
	callerOrigin = callerOrigin_;
	managerOrigin = managerOrigin_;

	if(isConnected)
		return managerOrigin.connected();

	network.doOperation({ type: "requestMessageId" }, function(err, gotId)						// Request a messageId
		{
		if(err)
			return fail(err);

		messageId = gotId;

		connection.exposeRpcMethod("stdout", self, stdout);
		connection.exposeRpcMethod("fail", self, fail);
		connection.exposeRpcMethod("error", self, error);
		connection.exposeRpcMethod("warning", self, warning);
		connection.exposeRpcMethod("notify", self, notify);
		connection.exposeRpcMethod("message", self, message);
		connection.exposeRpcMethod("question", self, question);
		connection.exposeRpcMethod("questionTimedOut", self, questionTimedOut);
		connection.exposeRpcMethod("end", self, end);

		if(isSpaceifyNetwork || isNodeJs)
			{				
			connection.connect({hostname: config.EDGE_HOSTNAME, port: config.APPMAN_MESSAGE_PORT_SECURE, isSecure: true}, function(err, data)
				{
				if(err)
					return fail(err);

				isConnected = true;
				connection.callRpc("confirm", [messageId]);
				managerOrigin.connected();
				});
			}
		else
			{
			connection.createWebSocketPipe({host: config.EDGE_HOSTNAME, port: config.APPMAN_MESSAGE_PORT_SECURE, isSsl: true}, null, function(id)
				{
				pipeId = id;
				isConnected = true;
				piperClient.callClientRpc(pipeId, "confirm", [messageId]);
				managerOrigin.connected();
				});
			}
		});
	}

self.isConnected = function()
	{
	return isConnected;
	}

self.getErrors = function()
	{
	return errors;
	}

self.getWarnings = function()
	{
	return warnings;
	}

	// Exposed RPC methods -- -- -- -- -- -- -- -- -- -- //
var fail = function(err, connObj, callback)
	{
	isConnected = false;

	if(callerOrigin.fail)
		callerOrigin.fail(err);

	managerOrigin.fail(err);

	if(typeof callback === "function")
		callback(null, true);
	}

var error = function(err, connObj, callback)
	{
	errors.push(err);

	if(typeof callback === "function")
		callback(null, true);
	}

var warning = function(message_, code, connObj, callback)
	{
	warning.push({message: message_, code: code});

	if(callerOrigin.warning)
		callerOrigin.warning(message_, code);

	if(typeof callback === "function")
		callback(null, true);
	}

var notify = function(message_, code, connObj, callback)
	{
	if(callerOrigin.notify)
		callerOrigin.notify(message_, code, connObj, callback);

	if(typeof callback === "function")
		callback(null, true);
	}

var message = function(message_, connObj, callback)
	{
	if(callerOrigin.message)
		callerOrigin.message(message_);

	if(typeof callback === "function")
		callback(null, true);
	}

var stdout = function(message_, connObj, callback)
	{
	if(callerOrigin.stdout)
		callerOrigin.stdout(message_);

	if(typeof callback === "function")
		callback(null, true);
	}

var question = function(message_, choices, origin, answerCallBackId, connObj, callback)
	{
	if(callerOrigin.question)
		callerOrigin.question(message_, choices, origin, answerCallBackId);

	if(typeof callback === "function")
		callback(null, true);
	}
	
var questionTimedOut = function(message_, origin, answerCallBackId, connObj, callback)
	{
	if(callerOrigin.questionTimedOut)
		callerOrigin.questionTimedOut(message_, origin, answerCallBackId);

	if(typeof callback === "function")
		callback(null, true);
	}

var end = function(message_, connObj, callback)
	{
	managerOrigin.ready(1);

	if(typeof callback === "function")
		callback(null, true);
	}

	// Response methods -- -- -- -- -- -- -- -- -- -- //
self.sendAnswer = function(answer, answerCallBackId)
	{
	if (isSpaceifyNetwork || isNodeJs)
		connection.callRpc("answer", [messageId, answer, answerCallBackId]);
	else
		connection.callClientRpc(pipeId, "answer", [messageId, answer, answerCallBackId]);
	}

}

if(typeof exports !== "undefined")
	module.exports = SpaceifyMessages;