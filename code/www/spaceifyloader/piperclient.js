"use strict"

function PiperClient()
{
var self = this;

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
	communicationClient.sendBinaryToClient(connectionId, data);
	};

self.createTcpPipe = function(host, port, listener, callback)
	{
	var hostnameAndPort = host + port;

	for(var pipeId in pipes)
		{
		if(pipes[pipeId].hostnameAndPort == hostnameAndPort)
			{
			pipes[pipeId].listener = listener;
			callback(pipeId);
			return;
			}
		}

	communicationClient.createPipe(targetId, function(pipeId)
		{
		console.log("pipe ready for TCP");

		communicationClient.callClientRpc(pipeId, "pipeTcp", [host, port], self, function()
			{
			console.log("Tcp Pipe ready to "+ host+":"+port);
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

self.createWebSocketPipe = function(options, listener, callback)
	{
	communicationClient.createPipe(targetId, function(pipeId)
		{
		console.log("pipe ready for Websocket");

		communicationClient.callClientRpc(pipeId, "pipeWebSocket", [options], self, function()
			{
			console.log("Websocket Pipe ready to " + options.host + ":" + options.port);
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
	console.log("PiperClient::onBinary() from: "+ clientId);

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
		console.log("PieperClient::onClientConnected() "+JSON.stringify(client));
		if (client.getClientType() == "piper")
			{
			console.log("piper found, trying to build a pipe to it");
			communicationClient.createPipe(client.getClientId(), function()
				{
				console.log("pipe ready");

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

self.sendBinary = function(data)
	{
	communicationClient.sendBinaryToClient(targetId, data);
	};

self.connect = function(host, port, callback)
	{
	pipeReadyListener = callback;

	communicationClient.setClientListener(self);
	communicationClient.setBinaryListener(self);
	communicationClient.connectWithOptions({host: host, port: port, isSsl:true}, "screen", "jounigroupx", function()
		{
		console.log("Hub Connection succeeded");
		});
	};

}
