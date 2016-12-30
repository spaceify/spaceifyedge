"use strict"

function PiperClient()
{
var self = this;

// Includes

var sp = null;

if (typeof exports !== "undefined")
	{
	sp = require("../libs/spaceifyconnect.bundle.js")
	}
else
	sp = window.sp;

var pipes = new Object();

var webSocketPipes = new Object();

var pipeReadyListener = null;

var targetId = null;

var communicationClient = new sp.CommunicationClient();

var binaryListener = null;

var cookies = null;

// this is a hack, we need a separate cookie storage at some point!

self.setCookies = function(c)
	{
	cookies = c;
	};

self.getCookies = function()
	{
	return cookies;
	}

self.sendTcpBinary = function(connectionId, data)
	{
	communicationClient.sendBinaryOnConnection(connectionId, data);
	};

self.createTcpTunnel = function(host, port, listener, callback)
	{

	var hostnameAndPort = host + port;

	for (var pipeId in pipes)
		{
		if(pipes[pipeId].hostnameAndPort == hostnameAndPort)
			{
			pipes[pipeId].listener = listener;
			callback(pipeId);
			return;
			}
		}

	communicationClient.createDirectConnection(targetId, function(pipeId)
		{
		//console.log("Direct Connection Ready for TCP tunnel");

		communicationClient.callRpcOnConnection(pipeId, "tunnelTcp", [host, port], self, function()
			{
			//console.log("Tunnel Pipe ready to "+ host+":"+port);

			pipes[pipeId] = {listener: listener, hostnameAndPort: hostnameAndPort};

			callback(pipeId);
			});
		});
	};

self.exposeRpcMethod = function(name, object_, method_)
	{
	communicationClient.exposeRpcMethod(name, object_, method_);
	};

self.callClientRpc = function(id, method, params, selfobj, callback)
	{
	communicationClient.callClientRpc(id, method, params, selfobj, callback);
	};

self.createWebSocketTunnel = function(options, listener, callback)
	{
	communicationClient.createPipe(targetId, function(pipeId)
		{
		//console.log("pipe ready for Websocket");

		communicationClient.callClientRpc(pipeId, "pipeWebSocket", [options], self, function()
			{
			//console.log("Websocket Pipe ready to " + options.host + ":" + options.port);
			webSocketPipes[pipeId] = listener;
			callback(pipeId);
			});
		});
	};

self.setBinaryListener = function(lis)
	{
	binaryListener = lis;
	};

self.onBinary = function(data, clientId, connectionId)
	{
	//console.log("PiperClient::onBinary() from: "+ clientId);

	if (pipes.hasOwnProperty(connectionId))
		{
		pipes[connectionId].listener(data);
		}
	};

self.onClientDisconnected = function(client)
	{
	};

self.onClientConnected = function(client)
	{
	if (client)
		{
		//console.log("PieperClient::onClientConnected() "+JSON.stringify(client));
		if (client.getClientType() == "piper")
			{
			//console.log("SpaceifyPiper found, trying to build a direct connection it");
			communicationClient.createDirectConnection(client.getClientId(), function()
				{
				//console.log("Direct connection ready");

				targetId = client.getClientId();

				if (pipeReadyListener)
					pipeReadyListener();

				/*
				var request = "GET /index.html HTTP/1.1\r\nHost: localhost\r\n\r\n";
				var data = toab(request);
				communicationClient.sendBinaryToClient(client.getClientId(), data);
				*/
				});
			}
		}
	};

self.upgradeToWebRtc = function(callback)
	{
	/*
	communicationClient.setConnectionTypeListener(new function()
		{
		var self = this;
		self.onConnectionTypeUpdated = function(client, newConnectionType)
			{
			callback();
			};
		});
	*/
	communicationClient.upgradeToWebRtc(targetId, function()
		{
		//console.log("PiperClient::upgradeToWebRtc() completed");
		callback();
		});
	};

self.sendBinary = function(data)
	{
	communicationClient.sendBinaryToClient(targetId, data);
	};

self.connect = function(host, port, callback)
	{
	pipeReadyListener = callback;

	communicationClient.setClientListener(self);
	communicationClient.setBinaryListener(self);
	communicationClient.connectWithOptions({host: host, port: port, isSsl:false}, "piperclient", "jounigroupx", function()
		{
		//console.log("Hub Connection succeeded");
		//callback();
		});
	};

// -- // -- // -- // -- //
var totaltime = 0;
var repetitions = 1000;
self.testPing = function(callback)
	{
	communicationClient.createDirectConnection(targetId, function(pipeId)
		{
		ping(0, pipeId, callback);
		});
	}

var ping = function(index, pipeId, callback)
	{
	if(++index == repetitions + 1)
		{
		callback(totaltime, repetitions);
		return;
		}

	var startTime = Date.now();

	communicationClient.callRpcOnConnection(pipeId, "hello", [], self, function(err, data)
		{
		totaltime += Date.now() - startTime;
		console.log("index: " + index + ", time: " + ((Date.now() - startTime) / 1000) + ", length: " + data.length);

		ping(index, pipeId, callback);
		});
	}

}

if (typeof exports !== "undefined")
	{
	module.exports = PiperClient;
	}
