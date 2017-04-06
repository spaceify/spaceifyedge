"use strict";

navigator.getUserMedia = (	navigator.getUserMedia ||
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia ||
							navigator.msGetUserMedia);

function WebRtcClient(rtcConfig)
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
var SpaceifyLogger = null;
//var SpaceifyConfig = null;
var RpcCommunicator = null;
var WebSocketConnection = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	SpaceifyLogger = require(lib + "spaceifylogger");
	//SpaceifyConfig = require(lib + "spaceifyconfig");
	RpcCommunicator = require(lib + "rpccommunicator");
	WebSocketConnection = require(lib + "websocketconnection");
	}
else
	{
	lib = (window.WEBPACK_MAIN_LIBRARY ? window.WEBPACK_MAIN_LIBRARY : window);

	SpaceifyLogger = lib.SpaceifyLogger;
	//SpaceifyConfig = lib.SpaceifyConfig;
	RpcCommunicator = lib.RpcCommunicator;
	WebSocketConnection = lib.WebSocketConnection;
	}

var communicator = new RpcCommunicator();
var connection = new WebSocketConnection();
//var speconfig = SpaceifyConfig.getConfig();
var logger = new SpaceifyLogger("WebRtcClient");

var ownStream = null;
var connectionListener = null;
var rtcConnections = new Object();

self.setConnectionListener = function(lis)
	{
	connectionListener = lis;
	}

self.onIceCandidate = function(iceCandidate, partnerId)
	{
	logger.log("WebRtcClient::onIceCandidate - Got it, sending it to the other client");

	communicator.callRpc("offerIce", [iceCandidate, partnerId]);
	};

var createConnection = function(partnerId)
	{
	rtcConnections[partnerId] = new WebRtcConnection(rtcConfig);
	rtcConnections[partnerId].setPartnerId(partnerId);

	rtcConnections[partnerId].setIceListener(self);
	rtcConnections[partnerId].setStreamListener(self);
	rtcConnections[partnerId].setConnectionListener(self);
	rtcConnections[partnerId].setDataChannelListener(self);
	}

self.shutdown = function(e)
	{
	logger.log("WebRtcClient::onbeforeunload");

	for (var id in rtcConnections)
		{
		if (rtcConnections.hasOwnProperty(id))
			{
			rtcConnections[id].close();
			delete rtcConnections[id];
			}
		}
	}

// RPC methods

self.handleRtcOffer = function(descriptor, partnerId, connectionId)
	{
	logger.log("WebRtcClient::handleRtcOffer descriptor:", descriptor);

	if (!rtcConnections.hasOwnProperty(partnerId))
		{
		createConnection(partnerId);
		}

	rtcConnections[partnerId].onConnectionOfferReceived(descriptor, connectionId, function(answer)
		{
		logger.log("WebRtcClient::handleRtcOffer - onConnectionOfferReceived returned");

		communicator.callRpc("acceptConnectionOffer",[answer, partnerId]);
		});

	};

self.handleRtcAnswer = function(descriptor, partnerId, connectionId)
	{
	logger.log("WebRtcClient::handleRtcAnswer");

	rtcConnections[partnerId].onConnectionAnswerReceived(descriptor);
	};

self.handleIceCandidate = function(iceCandidate, partnerId, connectionId)
	{
	logger.log("WebRtcClient::handleIceCandidate");

	if (!rtcConnections.hasOwnProperty(partnerId))
		{
		createConnection(partnerId);
		}

	rtcConnections[partnerId].onIceCandidateReceived(iceCandidate);
	};

// Private methods

var connectToCoordinator = function(config, callback)
	{
	logger.log("WebRtcClient::connectToCoordinator", "> Websocket connecting to the coordinator");

	connection.connect(config, function()
		{
		logger.log("WebRtcClient::connectToCoordinator - Websocket Connected to the Coordinator");
		logger.log("> Creating RPCCommunicator for the Websocket");

		communicator.addConnection(connection);
		callback();
		});
	};

self.onDisconnected = function(partnerId)
	{
	logger.log("WebRtcClient::onDisconnected");

	if (rtcConnections.hasOwnProperty(partnerId))
		{
		var connection = rtcConnections[partnerId];
		connectionListener.onDisconnected(connection.getId());

		connection.close();
		delete rtcConnections[partnerId];
		}
	};

self.onDataChannelOpen = function(connection)
	{
	logger.log("WebRtcClient::onDataChannelOpen");

	connectionListener.addConnection(connection);
	};

self.onStream = function(stream, partnerId)
	{
	logger.log("WebRtcClient::onStream");
	};

self.onRemoveStream = function(stream, partnerId)
	{
	logger.log("WebRtcClient::onRemoveStream");

	self.onDisconnected(partnerId);
	};

var connectToPeers = function(announceId, callback)
	{
	logger.log("WebRtcClient::connectToPeers - Announcing to the Coordinator");

	communicator.callRpc("announce", [announceId], self, self.onPeerIdsArrived);
	};

//Callback of the connectToPeers RPC call

self.onPeerIdsArrived = function(err, data, id)
	{
	logger.log("WebRtcClient::onPeerIdsArrived - data.length:", data.length);

	var partnerId = 0;

	for (var i=0; i<data.length; i++)
		{
		partnerId = data[i];

		//Create a WebRTC connection and

		createConnection(partnerId);

		logger.log("WebRtcClient::onPeerIdsArrived - Trying to create offer to client id", partnerId);

		//Creating a connection offer

		rtcConnections[partnerId].createConnectionOffer(function(offer, peerId)
			{
			logger.log("WebRtcClient::onPeerIdsArrived - Offer created, sending it to the other client", peerId);

			communicator.callRpc("offerConnection", [offer, peerId]);
			});
		}

	if (data.length === 0)
		logger.log("> Announce returned 0 client ids, not connecting");
	};

self.run = function(config, callback)
	{
	logger.log("WebRtcClient::run");

	window.onbeforeunload = self.shutdown;

	communicator.exposeRpcMethod("handleRtcOffer", self, self.handleRtcOffer);
	communicator.exposeRpcMethod("handleRtcAnswer", self, self.handleRtcAnswer);
	communicator.exposeRpcMethod("handleIceCandidate", self, self.handleIceCandidate);

	connectToCoordinator(config, function()
		{
		logger.log("WebRtcClient::run - Connected to the coordinator");

		connectToPeers(config.announceId, function()
			{
			logger.log("WebRtcClient::run - connectToPeers returned");
			});

		if (callback)
			callback(communicator);
		});

	};
}

if (typeof exports !== "undefined")
	module.exports = WebRtcClient;
