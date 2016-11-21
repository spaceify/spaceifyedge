
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("window.WebSocket"));
	else if(typeof define === 'function' && define.amd)
		define(["window.WebSocket"], factory);
	else if(typeof exports === 'object')
		exports["sp"] = factory(require("window.WebSocket"));
	else
		root["sp"] = factory(root["window.WebSocket"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =
	{
	Client: __webpack_require__(1),                                   
	WebRtcEndpoint: __webpack_require__(2),       
	WebRtcConnector: __webpack_require__(8), 
	CommunicationClient: __webpack_require__(3),  
	GameClient: __webpack_require__(10),

	RpcCommunicator: __webpack_require__(4),        
	WebRtcConnection: __webpack_require__(9),       
	WebSocketRpcConnection: __webpack_require__(11),
	CallBackbuffer: __webpack_require__(5),         
	WebrtcClient: __webpack_require__(12),
	WebSocketConnection: __webpack_require__(6)
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	// This class is used for representing remote clients in CommunicationClient
	// and GameClient

	function Client(clientId_, clientType_, arrivedBeforeUs )
	{
	var self = this;

	var clientId = clientId_;
	var clientType = clientType_;

	var webRtc = false;
	var localHub = false;

	var preferredConnectionId = null;

	var pipes = new Array();

	self.isArrivedBeforeUs = function()
		{
		return arrivedBeforeUs;
		};
		
	self.setClientId = function(id)
		{
		clientId = id;
		};
		
	self.setClientType = function(type)
		{
		clientType = type;
		};
		
	self.setWebRtc = function(rtc)
		{
		webRtc = rtc;
		};
		
	self.setPreferredConnectionId = function(conn)
		{
		preferredConnectionId = conn; 
		};

	self.getClientId = function()
		{
		return clientId;
		};
		
	self.getClientType = function()
		{
		return clientType;
		};
		
	self.isWebRtc = function()
		{
		return webRtc;
		};
		
	self.getPreferredConnectionId = function()
		{
		return preferredConnectionId; 
		};

	self.isLocalHub = function()
		{
		return localHub;
		};

	self.setLocalHub = function(val)
		{
		localHub = val;
		};
		
	self.addPipeId = function(id)
		{
		pipes.push(id);
		};
		
	self.getBinaryConnectionId = function()
		{
		return pipeId;	
		};
		
	self.getConnectionType = function()
		{
		if (webRtc)
			return "WebRtc";
			
		else if (localHub)	
			return "Local Hub";
		
		else 
			return "Cloud";
		};	
	};

	if (true)
		{
		module.exports = Client;
		}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict"

	function getGetParameter(val) 
		{
	    var result = null,
	    tmp = [];
	    location.search.substr(1).split("&").forEach(function (item) 
	    	{
	        tmp = item.split("=");
	        if (tmp[0] === val) 
	        		result = decodeURIComponent(tmp[1]);
	    	});
	    return result;
		}

	function getCookie(cname) 
		{
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    
	    for(var i=0; i<ca.length; i++) 
			{
			var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	    	}
	    return null;
		}

	function setCookie(cname, cvalue, exdays)
		{
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
		}

	function removeCookie(cname)
		{
		document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		}

	function WebRtcEndpoint()
	{
	var self = this;

	// Includes

	var RTCPeerConnection = null;
	var RTCSessionDescription = null;
	var RTCIceCandidate = null;
	var CommunicationClient = null;

	if (true)
		{
		RTCPeerConnection = global.RTCPeerConnection;
		RTCSessionDescription = global.RTCSessionDescription;
		RTCIceCandidate = global.RTCIceCandidate;
		CommunicationClient = __webpack_require__(3);
		}
	else
		{	
		RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
		RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
		RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
	    CommunicationClient = window.CommunicationClient;
	    }



	var mainUrl = "http://spaceify.net/games/";

	var ownId = null;

	var communicationClient = new CommunicationClient();

	communicationClient.setClientListener(self);
	communicationClient.setConnectionTypeListener(self);
	communicationClient.setBinaryListener(self);

	var clientConnectionListener = null;
	var clientDisconnectionListener = null;
	var binaryListener = null;

	self.connect = function(host, port, clientType, groupId, callback)
		{
		communicationClient.connect(host, port, clientType, groupId, function(givenId)
			{
			ownId = givenId;
			callback();
			});
		};
		
	self.notifyClients = function(clientType, method, params)
		{
		console.log("WebRtcEndpoint::notifyClients()");
		
		var clients = communicationClient.getClientsByType(clientType); 
		for (var i in clients)
			communicationClient.notifyClient(i, method, params);
		};

	self.notifyClient = function(id, method, params)
		{
		communicationClient.notifyClient(id, method, params);
		};
		
	self.callClientRpc = function(id, method, params, selfobj, callback)
		{
		communicationClient.callClientRpc(id, method, params, selfobj, callback);
		};
		
	self.exposeRpcMethod = function(name, object_, method_)
		{
		communicationClient.exposeRpcMethod(name, object_, method_);
		};

	self.getBufferedAmount = function(clientId)
		{
		return communicationClient.getBufferedAmount(clientId);
		};

	self.sendBinary = function(clientId, data)
		{
		communicationClient.sendBinaryToClient(clientId, data);
		};

	// ClientListener RPC interface implementation

	self.onClientConnected = function(client, connectionId, callback)
		{
		console.log("WebRtcEndpoint::onClientConnected() "+ client.getClientId() +" "+client.getClientType());
		
		if (typeof RTCPeerConnection !== "undefined" && client.isArrivedBeforeUs())	
				communicationClient.upgradeConnectionToWebRtc(client.getClientId());
				
		// Call no listener, clientConnectionListener will be called only after connectionType
		// changes to WebRtc
		
		};
		
	self.onClientDisconnected = function(client, connectionId, callback)
		{
		console.log("WebRtcEndpoint::onClientDisconnected() '"+ client.getClientId() +"'");
		
		if (clientDisconnectionListener)
			{
			clientDisconnectionListener.listener.call(clientDisconnectionListener.object, client.getClientId());
			}
		};

	// ConnectionTypeListener implementation

	self.onConnectionTypeUpdated = function(client, newConnectionType)
		{
		console.log("WebRtcEndpoint::onConnectionTypeUpdated() clientType: " + client.getClientType());
		
		if (clientConnectionListener != null && newConnectionType == "WebRtc")
			{
			clientConnectionListener.listener.call(clientConnectionListener.object, client.getClientId());
			}
		};

	// BinaryListener implementation

	self.onBinary = function(data, clientId)
		{
		console.log("WebRtcEndpoint::onBinary() from clientId: " + clientId);
		
		if (binaryListener != null)
			{
			binaryListener.listener.call(binaryListener.object, data, clientId);
			}
		};
		

	// Listener setters

	self.setClientConnectionListener = function(object_, listener_)
		{
		clientConnectionListener = {object: object_, listener: listener_}; 
		};
		
	self.setClientDisconnectionListener = function(object_, listener_)
		{
		clientDisconnectionListener = {object: object_, listener: listener_};
		};	

	self.setBinaryListener = function(object_, listener_)
		{
		binaryListener = {object: object_, listener: listener_};
		};	
	}

	if (true)
		{
		module.exports = WebRtcEndpoint;	
		}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"



	function ab2str(buf) 
		{
	  	return String.fromCharCode.apply(null, new Uint16Array(buf));
		}

	function CommunicationClient()
	{
	var self = this;

	// Includes
					
	var RpcCommunicator = null;
	var WebSocketConnection = null;
	var Client = null;
	var WebRtcConnector = null;

	if (true)
		{
		RpcCommunicator = __webpack_require__(4);
		WebSocketConnection = __webpack_require__(6);
		Client = __webpack_require__(1);
		WebRtcConnector = __webpack_require__(8);
		}
	else
		{
		RpcCommunicator =  window.RpcCommunicator;
		WebSocketConnection = window.WebSocketConnection;
		Client = window.Client; 
		WebRtcConnector = window.WebRtcConnector;
		}


	//var serverConnection = new WebSocketRpcConnection();

	var serverConnectionOptions = null;

	var clientType = null;
	var groupId = null;

	var localHubs = new Object();
	var ownId = null;

	var clientListener = null;
	var connectionTypeListener = null;		
	var binaryListener = null;
		
	var serverId = null;
	var communicator = new RpcCommunicator();	
	var serverConnection = new WebSocketConnection();

	var clients = new Object();
	var clientsByType = new Object();

	var pipes = new Object();

		
	var rtcCommunicator = new RpcCommunicator();

	var rtcConnector = null; 


	// Listener Interface for the WebRtcConnector
	self.addRtcConnection = function(connection)
		{
		console.log("CommunicationClient::addRtcConnection()");
		communicator.addConnection(connection);
		
		if (clients.hasOwnProperty(connection.getId()))
			clients[connection.getId()].setWebRtc(true);
			
		if (connectionTypeListener)
			connectionTypeListener.onConnectionTypeUpdated(clients[connection.getId()], clients[connection.getId()].getConnectionType());
		};
		
	self.onRtcDisconnected = function(connectionId)
		{	
		console.log("CommunicationClient::onRtcDisconnected()");
		communicator.onDisconnected(connectionId);
		};
		
	// --------------------------

	self.getConnectionType = function(clientId)
		{
		return clients[clientId].getConnectionType();
		};

	// BinaryListener Interface

	self.onBinary = function(data, connectionId)
		{
		console.log("CommunicationClient::onBinary(), bytelength: "+data.byteLength);
		//console.log("CommunicationClient::onBinary() from "+connectionId +" data: "+ab2str(data));
		
		if (binaryListener)
			{
			if (pipes.hasOwnProperty(connectionId))
				binaryListener.onBinary(data, pipes[connectionId], connectionId);
			else
				binaryListener.onBinary(data, connectionId);
			}
		};

	// --------------------------

	self.upgradeConnectionToWebRtc = function(clientId)
		{
		console.log("CommunicationClient::upgradeConnectionToWebRtc() + peerId: " + clientId);
		if (!clients[clientId].isWebRtc())
			rtcConnector.connectToPeer(clientId);
		};	

	self.createPipe = function(clientId, callback)
		{
		console.log("CommunicationClient::createPipe() + peerId: " + clientId);
		
		var pipeConnection =  new WebSocketConnection();
		var pipeId;
		
		pipeConnection.connect(serverConnectionOptions, function()
			{
			console.log("Pipe connected to the websocket server");
			
			pipeId = communicator.addConnection(pipeConnection);			
			
			communicator.callRpc("constructPipe", [clientId, ownId], self, function()
				{
				console.log("CommunicationClient::createPipe() pipe construction ready");	
				if (clients.hasOwnProperty(clientId))
					{
					clients[clientId].addPipeId(pipeId);
					pipes[pipeId] = clientId;
					}
				callback(pipeId);
				}, pipeId); 
			});
		};	
		
		
	self.requestPipe = function(targetId, originatorId, connectionId, callback)
		{
		console.log("CommunicationClient::requestPipe()");
		
		var pipeConnection =  new WebSocketConnection();
		var pipeId = null;
		
		
						
		pipeConnection.connect(serverConnectionOptions, function()
			{
			console.log("Pipe connected to the websocket server");
			
			pipeId = communicator.addConnection(pipeConnection);			
			
			communicator.callRpc("registerAsPipe", [targetId], self, function(err,data)
				{
				console.log("registerAsPipe returned");
				
				if (clients.hasOwnProperty(originatorId))
					{
					clients[originatorId].addPipeId(pipeId);
					pipes[pipeId] = originatorId;
					}
				
				callback(null, "Ok");
				}, pipeId);
			});
		};	
		
	self.pipeToExternalConnection = function(connectionId, externalConnection)
		{
		var extId = communicator.addConnection(externalConnection);
		communicator.setupPipe(connectionId, extId);
		};

	self.setClientListener = function(lis)
		{
		clientListener = lis;
		};				

	self.setConnectionTypeListener = function(lis)
		{
		connectionTypeListener = lis;
		};	

	self.setBinaryListener = function(lis)
		{
		binaryListener = lis;
		};

	// Handling of the clients and clientsByType Objects

	var addClient = function(clientId, clientType, arrivedBeforeUs)
		{
		var client = null;
		
		if (clients.hasOwnProperty(clientId))
			client = clients[clientId];
		else
			{
			client = new Client(clientId, clientType, arrivedBeforeUs);
			clients[clientId] = client; 
			}
			
		if (!clientsByType.hasOwnProperty(clientType))
			clientsByType[clientType] = new Object();
		
		clientsByType[clientType][clientId] = client;
		
		return client;
		};

	var removeClient = function(clientId)
		{
		delete clientsByType[clients[clientId].getClientType()] [clientId];
		delete clients[clientId];
		};


	var updateConnectedClients = function(hubId, callback)
		{
		console.log("CommunicationClient::updateConnectedClients()");
		var id = serverId;
		
		if (hubId)
			id = hubId;
			
		communicator.callRpc("getConnectedClients", [groupId], self, function(err, connectedClients)
			{
			console.log("CommunicationClient::getConnectedClientsFromHub() got answer from hub: "+JSON.stringify(connectedClients));
			var client = null;
			for (var i in connectedClients)
				{
				if (!clients.hasOwnProperty(i))
					{
					if (hubId == null)
						client = addClient(connectedClients[i].clientId, connectedClients[i].clientType, true);
					else
						client = addClient(connectedClients[i].clientId, connectedClients[i].clientType, false);
						
					if (!hubId && clientListener && client.getClientId() != ownId)
						clientListener.onClientConnected(client);
					}
					
				else if (hubId)
					{
					clients[i].setLocalHub(true);
					clients[i].setPreferredConnectionId(id);
					}
				
				}
			callback();	
			}, id);
		};
		
	var connectToLocalHubs = function(hubs, callback)
		{
		console.log("CommunicationCLient::connectToLocalHubs()");
		if (hubs == null)
			return;
			
		var port = null;
		var ip = null;
		var connection = null;
			
		for (var i in hubs)
			{
			port = hubs[i].port;
			
			//try to connect to one of the local ips of the hub
			
			for (var j = 0; j<hubs[i].localIps.length; j++)
				{
				ip = hubs[i].localIps[j];
				
				var opts = {host: ip, port: port, id: ownId};
				var hubId = null; 
				connection = new WebSocketConnection();
				
				connection.connect(opts, function()
					{
					console.log("Connected to local hub at ip: "+ip+" port: "+port);
					hubId = communicator.addConnection(connection);
					
					localHubs[hubId] = hubId;
					
					// Connected to the local hub, check which other clients are connected to this hub
					updateConnectedClients(hubId, function()
						{
						communicator.callRpc("registerAsClient", [ownId, clientType, groupId], self, function(err, givenId)
							{
							console.log("CommunicationClient::connectToLocalHubs() registered as client at local hub at ip: "+ip+" port: "+port);
							});	
						});
					});
				}
			}
		callback();		
		};

	var updateLocalHubs = function(callback)
		{
		console.log("Getting list of local hubs from the server");
		communicator.callRpc("getLocalHubs", [], self, function(err, hubs)
			{
			console.log("Following local hubs are available: "+JSON.stringify(hubs));
			if (hubs)
				connectToLocalHubs(hubs, callback);
			else
				callback();
			}, serverId);
		};
		


	self.sendBinaryToClient = function(clientId, data)
		{
		console.log("CommunicationClient::sendBinaryToClient() clientId: "+clientId);
		
		communicator.sendBinary(data, clientId);
		
		/*
		if (clients.hasOwnProperty(clientId))
			{
			console.log("CommunicationClient::sendBinaryToClient() client id found");
			var binaryConnectionId = clients[clientId].getBinaryConnectionId();
			if (binaryConnectionId)
				{
				console.log("CommunicationClient::sendBinaryToClient() binaryConnectionId found");
				communicator.sendBinary(data, binaryConnectionId);
				}
			}
		*/
		};

	self.notifyClient = function(clientId, method, params)
		{
		console.log("CommunicationClient::notifyClient() clientId: "+clientId + " method: "+method);
		
		if (clients.hasOwnProperty(clientId))
			{
			// Call through webrtc
			if (clients[clientId].isWebRtc())
				{
				console.log("Notifying client through WebRtc");
				params.push(ownId);
				communicator.callRpc(method, params, null, null, clientId);	
				}
			//call though a local hub
			else if (clients[clientId].isLocalHub())
				{
				console.log("Notifying client through local hub");
				communicator.callRpc("callClientRpc", [clientId, method, params], null, null, clients[clientId].getPreferredConnectionId());
				}
			else
				{
				// call through the server
				console.log("Notifying client through the server");
				communicator.callRpc("callClientRpc", [clientId, method, params], null, null, serverId);
				}	
			}
		else
			{
			//console.log("CommunicationClient::notifyClient() tried to make a call to unknown client clientId: "+clientId + " method: "+method);
			console.log("Making a RPC notification over pipe");
			params.push(ownId);
			communicator.callRpc(method, params, null, null, clientId);	
			}
		};


	self.callClientRpc = function(clientId, method, params, obj, callback)
		{
		console.log("CommunicationClient::callClientRpc() clientId: "+clientId + " method: "+method);
		
		if (clients.hasOwnProperty(clientId))
			{
			// Call through webrtc
			if (clients[clientId].isWebRtc())
				{
				console.log("Calling client RPC through WebRtc");
				params.push(ownId);
				communicator.callRpc(method, params, obj, callback, clientId);	
				}
			//call though a local hub
			else if (clients[clientId].isLocalHub())
				{
				console.log("Calling client RPC through local hub");
				communicator.callRpc("callClientRpc", [clientId, method, params], obj, callback, clients[clientId].getPreferredConnectionId());
				}
			else
				{
				// call through the server
				console.log("Notifying client RPC through the server");
				communicator.callRpc("callClientRpc", [clientId, method, params], obj, callback, serverId);
				}	
			}
		else
			{
			//console.log("CommunicationClient::callClientRpc() tried to make a call to unknown client clientId: "+clientId + " method: "+method);
			console.log("Making a RPC call over pipe");
			params.push(ownId);
			communicator.callRpc(method, params, obj, callback, clientId);
			}
		};



	self.exposeRpcMethod = function(name, object_, method_)
		{
		communicator.exposeRpcMethod(name, object_, method_);
		};


	// Only meaningful for WebRTC-connected clients 
	self.getBufferedAmount = function(clientId)
		{
		if (clients[clientId].isWebRtc())
			{
			return communicator.getConnection(clientId).getBufferedAmount();
			}
			
		return 0;	
		};

	// Returns an Object indexed by clientId
		
	self.getClientsByType = function(clientType)
		{
		return clientsByType[clientType];
		};


	self.connectWithOptions = function(options, clientType_, groupId_, callback)
		{
		clientType = clientType_;
		groupId = groupId_;
		
		communicator.setBinaryListener(self);
		
		if (!options.hasOwnProperty("id"))
			options.id = null;
		
		serverConnectionOptions = options;
						
		serverConnection.connect(serverConnectionOptions, function()
			{
			console.log("connected to the websocket server");
			
			serverId = communicator.addConnection(serverConnection);			
			
			rtcConnector = new WebRtcConnector(communicator, serverId, WEBRTC_CONFIG);
			rtcConnector.setConnectionListener(self);		
			
			communicator.callRpc("registerAsClient", [null, clientType, groupId], self, function(err, givenId)
				{
				console.log("Server replied to registerAsClient call: '"+ givenId+ "'");
				ownId = givenId;
				updateConnectedClients(null, function()
					{
					updateLocalHubs(function()
						{		
						callback(givenId);	
						});	
					});
				}, serverId);	
			});
		};

	self.connect = function(host, port, clientType_, groupId_, callback)
		{
		serverConnectionOptions = {host: host, port: port, id: null};
		return self.connectWithOptions(serverConnectionOptions, clientType_, groupId_, callback)
		};
			
	// ClientListener RPC interface implementation

	self.onClientConnected = function(clientData, connectionId, callback)
		{
		console.log("CommunicationClient::onClientConnected() from connectionId: "+connectionId);
		console.log("CommunicationClient::onClientConnected() localHubs was:");
		console.dir(localHubs);
		
		console.log("CommunicationClient::onClientConnected() '"+ JSON.stringify(clientData) +"'");
		
		
		
		if (localHubs.hasOwnProperty(connectionId))
			{
			if (clientData.clientId == ownId)
				return;
				
			console.log("CommunicationClient::onClientConnected() client connected through localhub, clientId: "+clientData.clientId);
			
			clients[clientData.clientId].setLocalHub(true);
			clients[clientData.clientId].setPreferredConnectionId(connectionId);
			return;
			}
		
		if (!clients.hasOwnProperty(clientData.clientId))
			{
			var client = addClient(clientData.clientId, clientData.clientType, false);
		
			if (clientListener && client.getClientId() != ownId)
				clientListener.onClientConnected(client);
			}
		};
		
	self.onClientDisconnected = function(clientData, connectionId, callback)
		{
		console.log("CommunicationClient::onClientDisconnected() '"+ JSON.stringify(clientData) +"'");
		
		if (clients.hasOwnProperty(clientData.clientId) && clientListener && clientData.clientId != ownId)
			{
			clientListener.onClientDisconnected(clients[clientData.clientId]);
			removeClient(clientData.clientId);
			}
		};
			
	self.onHubConnected = function(hubData, connectionId, callback)
		{
		console.log("CommunicationClient::onHubConnected() '"+ JSON.stringify(hubData) +"'");
		};
		
	self.onHubDisconnected = function(hubData,  connectionId, callback)
		{
		console.log("CommunicationClient::onHubDisconnected() '"+ JSON.stringify(hubData) +"'");
		};	



	communicator.exposeRpcMethod("onClientConnected", self, self.onClientConnected);		
	communicator.exposeRpcMethod("onClientDisconnected", self, self.onClientDisconnected);		
	communicator.exposeRpcMethod("onHubConnected", self, self.onHubConnected);		
	communicator.exposeRpcMethod("onHubDisconnected", self, self.onHubDisconnected);					
	communicator.exposeRpcMethod("requestPipe", self, self.requestPipe);
	}

	if (true)
		{
		module.exports = CommunicationClient;
		}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

			
	/* 
	* A class that implements the JSON-RPC 2.0 protocol.
	* Communicates with the outside world with WebSocketConnection or WebRTCConnection objects
	* on the layer below. This is a two-way class that implements both client and server functionality.
	*/

	function RpcCommunicator()
	{
	var self = this;

	// Includes

	var CallbackBuffer = null;

	if (true)
		{
		CallbackBuffer = __webpack_require__(5);
		}
	else
		{
		CallbackBuffer = window.CallbackBuffer;
		}	


	var callSequence = 1;
	var exposedRpcMethods = new Object();

	//var logger = new Logger();

	var connectionListener = null;
	var disconnectionListener = null;
	var binaryListener = null;

	var uri = "";
	var callbackBuffer = new CallbackBuffer();
	var connections = new Object();
	var connectionSequence = 0;
	var latestConnectionId = null;

	//** Upwards interface towards business logic

	self.exposeRpcMethod = function(name, object_, method_)
		{
		//console.log("RpcCommunicator::exposeRpcMethod name: "+name+", object_: "+object_+", method_: "+ method_);	
		try	{
			exposedRpcMethods[name] = {object: object_, method: method_};
			}
		catch(e)
			{
			console.log(e);
			}	
		};

	self.setConnectionListener = function(object_, listener_)
		{
		connectionListener = {object: object_, listener: listener_}; 
		};
		
	self.setDisconnectionListener = function(object_, listener_)
		{
		disconnectionListener = {object: object_, listener: listener_};
		};	

	self.setBinaryListener = function(lis)
		{
		binaryListener = lis;
		};

	self.connectionExists = function(connectionId)
		{
		if (typeof connectionId !== "undefined" && connections.hasOwnProperty(connectionId) )
			return true;
		else if (typeof connectionId === "undefined" && connections.hasOwnProperty(latestConnectionId))	
			return true;
		else 
			return false;
		};
		
	self.getConnection = function(connectionId)
		{
		return connections[connectionId];
		};
			
	//Outgoing RPC call

	self.callRpc =  function(method, params, object, listener, connectionId)
		{
		if (!self.connectionExists(connectionId))
			return;
		try	{
			if (typeof listener == "function")	// call: expects a response object
				{
				callbackBuffer.pushBack(callSequence, object, listener);
			
				console.log("RpcCommunicator::callRpc() pushed back callback");
			
				if (typeof connectionId !== "undefined")						
					sendMessage({"jsonrpc": "2.0", "method": method, "params": params, "id": ""+callSequence}, connectionId);	
				else
					sendMessage({"jsonrpc": "2.0", "method": method, "params": params, "id": ""+callSequence}, latestConnectionId);	//assume there is only one connection	
			
				console.log("RpcCommunicator::callRpc() sendMessage returned");
				callSequence++;			
				}
			else	
				{											// notification: doesn't expect a response object
				if (typeof connectionId != "undefined")
					sendMessage({"jsonrpc": "2.0", "method": method, "params": params}, connectionId);
				else
					sendMessage({"jsonrpc": "2.0", "method": method, "params": params}, latestConnectionId);
				}
			}
		catch(e)
			{
			console.log(e);	
			}		
		};

	// Sends a RPC notification to all connections	
	self.notifyAll =  function(method, params)
		{
		try	{
			for (var key in connections)
				{
				console.log("RpcCommunicator::notifyAll() sending message to "+key);
				sendMessage({"jsonrpc": "2.0", "method": method, "params": params, "id": null}, key);
				}
			console.log("RpcCommunicator::notifyAll() sending messages completed");
			}
		catch(e)
			{
			console.log(e);	
			}	
		};

	self.getBufferedAmount = function(connectionId)
		{
		return connections[connectionId].getBufferedAmount();	
		};
		
	self.sendBinary = function(data, connectionId)
		{
		//console.log("RPCCommunicator::sendBinary() "+data.byteLength);
		try	{
			connections[connectionId].sendBinary(data);	
			}
		catch (e)
			{
			console.log(e);
			}	
		};
	//** Private methods

	var sendMessage = function(message, connectionId)
		{
		//console.log(message);
		try	{
			connections[connectionId].send(JSON.stringify(message));	
			}
		catch (e)
			{
			console.log(e);
			}	
		};
	self.sendMessage = sendMessage;	//for testing, remove this later
	// Send the return value of the RPC call to the caller  
	var sendResponse = function(err, result, id, connectionId)
		{
		try	{
			if (err)
				{
				sendMessage({"jsonrpc": "2.0", "error": err, "id": id});	
				var code = (typeof err.code != "undefined" ? err.code : "");
				var path = (typeof err.path != "undefined" ? err.path : "");
				var msge = (typeof err.message != "undefined" ? err.message : "");
				console.log("Exception in executing a RPC method: " + code + " EngineIoCommunicator::onMessage() >> " + path + " " + msge);		
				}
			else
				sendMessage({"jsonrpc": "2.0", "result": result, "id": id}, connectionId);
			}
		catch (e)
			{
			console.log(e);
			}		
		};

	//Handle incoming RPC call
	var handleRPCCall = function(message, connectionId)
		{
		//console.log("RpcCommunicator::handleRpcCall() connectionId "+connectionId);
		try	{
			if ( !message.jsonrpc || message.jsonrpc != "2.0" || !message.method)		// Invalid JSON-RPC
				{
				sendMessage({"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid JSON-RPC."}, "id": null}, connectionId);
				return;
				}
		
			if (Object.prototype.toString.call(message.params) !== "[object Array]" )	
				{
				sendMessage({"jsonrpc": "2.0", "error": {"code": -32602, "message": "Parameters must be sent inside an array."}, "id": message.id}, connectionId);
				return;
				}
		
			if (!exposedRpcMethods.hasOwnProperty(message.method))				// Unknown method
				{
				if (message.id != null)
					{
					sendMessage({"jsonrpc": "2.0", "error": {"code": -32601, "message": "Method " + message.method + " not found."}, "id": message.id}, connectionId);
					return;
					}
				else
					{
					sendMessage({"jsonrpc": "2.0", "error": {"code": -32601, "message": "Method " + message.method + " not found."}, "id": null}, connectionId);
					return;
					}
				}
									// Method exists, call the method 
			var rpcMethod = exposedRpcMethods[message.method];
			
			if (typeof message.params === "undefined")
				message.params = new Array();

			//message.params.unshift(connectionId);	//add connectionId as the first parameter
			//message.params.push(connectionId);	//add connectionId as the last parameter
				
			if (message.id != null)		//It is a call		!!!!!!!!!!!!!!!! ToDO: fix this memory-hog! 
				{
				message.params.push(connectionId);      //add connectionId as the last parameter before callback
				message.params.push(function(err,result) {sendResponse(err, result, message.id, connectionId);});
				
				rpcMethod.method.apply(rpcMethod.object, message.params);
				}
				
			else	
				{					//It is a notification
				message.params.push(connectionId);      //add connectionId as the last parameter before callback
				message.params.push(function(err,result) {});
				rpcMethod.method.apply(rpcMethod.object, message.params);
				}
			}	
		catch (e)
			{
			console.log(e);
			}		
		};

	// Handle an incoming return value for a RPC call that we have made previously
	var handleReturnValue = function(message)
		{
		console.log(message);
		try	{
			var error = null;
			var result = null;
		
			if (typeof message.error !== "undefined")
				error = message.error;

			if (typeof message.result !== "undefined")
				result = message.result;
		
			if (message.id)
				callbackBuffer.callMethodAndPop(message.id, error, result);
			else
				console.log("RpcCommunicator::handleReturnValue() error: "+JSON.stringify(error));
			}
		catch (e)
			{
			console.log(e);
			}	
		};


	var handleMessage = function(message, connectionId)
		{
		try	{
			if (message.method) 			// Received an RPC Call from outside
				handleRPCCall(message, connectionId);
			else										// Received a return value to an RPC call made by us
				handleReturnValue(message);
			}
		catch (e)
			{
			console.log(e);
			}	
		};

	var generateRandomConnectionId = function()
		{
		connectionSequence++; 
		var ret = connectionSequence;
		
		while (true)
			{
			ret = Math.floor(Math.random() * 4294967296);	//2 to power 32
			if (!connections.hasOwnProperty(ret))
				break;
			}
			
		return ret;	
		}

	self.setupPipe = function(firstId, secondId)
		{
		console.log("RpcCommunicator::setupPipe() between: "+firstId+" and "+secondId);
		
		if (!connections.hasOwnProperty(firstId) || !connections.hasOwnProperty(secondId))  
			return;
		
		connections[firstId].setPipedTo(secondId);
		connections[secondId].setPipedTo(firstId);
		};
	//** Downwards interface towards a connection

	//** MessageListener interface implementation

	self.onMessage = function(messageData, connection)
		{
		//console.log("RpcCommunicator::onMessage() "+messageData);
		//console.log(typeof messageData);
		try	{
			var pipeTarget = connection.getPipedTo();
			
			if (pipeTarget != null)
				{
				console.log("RPCCommunicator::onMessage() relaying a piped message");
				
				connections[pipeTarget].send(messageData);
				return;
				}
				
			if (messageData instanceof ArrayBuffer)
				{
				//console.log("received arraybuffer ");
				if (binaryListener)
					binaryListener.onBinary(messageData, connection.getId());
				return;
				}
		
			var parsedMessage;
			try 
				{
				parsedMessage = JSON.parse(messageData);
				}
			catch (err)
				{
				sendMessage({"jsonrpc": "2.0", "error": {"code": -32700, "message": "Invalid JSON."}, "id": null}, connection.getId());
				return;
				}	
			handleMessage(parsedMessage, connection.getId());
			}
		catch(e)
			{
			console.log(e);
			}	
		};

	//** ConnectionListener interface implementation

	self.addConnection = function(conn)
		{
		try	{	
			console.log("RpcCommunicator::addConnection, connectionid was "+conn.getId());	
		
			//Use random connectionId to make ddos a little more difficult
			
			if (!conn.getId())
				{
				conn.setId(generateRandomConnectionId());
				}
				
			connections[conn.getId()] = conn;
			conn.setListener(self);	
			
			if (connectionListener)
				{
				connectionListener.listener.call(connectionListener.object, conn.getId());
				}
			
			latestConnectionId = conn.getId();	
			return conn.getId();
			}
		catch(e)
			{
			console.log(e);
			}	
		};
		
	self.onDisconnected = function(connectionId)	
		{
		try	{
			self.closeConnection(connectionId);
		
			if (disconnectionListener)
				disconnectionListener.listener.call(disconnectionListener.object, connectionId);
			}
		catch(e)
			{
			console.log(e);
			}	
		};

	//** ---------------------------------------

	self.closeConnection = function(connectionId)
		{
		try	{
			if (connectionId in connections)
				{
				connections[connectionId].close();
				delete connections[connectionId];

				//if(typeof options.connectionListener == "function")								// External connection listener
				//options.connectionListener("close", {remoteAddress: connection.remoteAddress, remotePort: connection.remotePort, origin: connection.origin, id: connection.id});
				}
			}
		catch(e)
			{
			console.log(e);
			}		
		};

	}

	// Do this only in node.js, not in the browser

	if (true)
		{
		module.exports = RpcCommunicator;
		}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";


	function CallbackBuffer(initialListSize)
	{
	var self = this;

	var callbacks = new Object();

	self.pushBack = function(id, object, method)
		{
		callbacks[id] = [object, method];
		};

	self.callMethodAndPop = function(id, error, result)
		{
		if (callbacks.hasOwnProperty(id))
			{
			(callbacks[id][1]).call(callbacks[id][0], error, result, id);	
			delete callbacks[id]; 
			}
		else
			throw {error: "CallbackBuffer::callMethodAndPop(). Callback not found"};	
		};
	}

	if (true)
		{
		module.exports = CallbackBuffer;
		}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";


		
	function WebSocketConnection()
	{
	var self = this;

	//Includes

	var WebSocket = null;

	if (true)
		{
		//global.WebSocket = require("websocket").client;
		WebSocket = __webpack_require__(7);
		//global.logger = require("winston");
		}

	if (typeof window !== "undefined")
		{
		WebSocket = window.WebSocket;
		}
	else
		{
		WebSocket = WebSocket.w3cwebsocket;
		}	
		
	var socket = null;
	var id = null;
	var remoteAddress = null;
	var remotePort = null;
	var origin = null;
	var listener = null;
	var pipedTo = null;

	//For client-side use, in both node and the browser

	self.connect = function(options, callback)
		{
		options.protocol = (!options.isSsl ? "ws" : "wss");	
		
		try	{	
			var url = options.protocol + "://" + options.host + ":" + options.port + "/"+"json-rpc";
			if (options.id)
				url += "?id="+options.id;
			socket = new WebSocket(url, "json-rpc");
			
			socket.binaryType = "arraybuffer";	
			socket.onopen = function() {callback(null); }; 
			socket.onmessage = onMessageEvent;
			socket.onclose = function(reasonCode, description) {onSocketClosed(reasonCode, description, self);};	
			}
		catch (e)
			{
			console.log(e);
			}
		};

	//For server-side node.js use only

	self.setSocket = function(val) 
		{
		console.log("WebSocketConnection::setSocket()");	
		try	{
			socket = val;		
			socket.on("message", onMessage);
			socket.on("close", function(reasonCode, description) {onSocketClosed(reasonCode, description, self);});
			}
		catch (e)
			{
			console.log(e);
			}	
		};
		
	self.setId = function(val) 
		{
		id = val;	
		};
		
	self.setPipedTo = function(targetId)
		{
		pipedTo = targetId;
		};
		
	self.getPipedTo = function()
		{
		return pipedTo;
		}	
		
	self.setRemoteAddress = function(val) 
		{
		remoteAddress	= val;
		};
		
	self.setRemotePort = function(val) 
		{
		remotePort = val;	
		};
		
	self.setOrigin = function(val) 
		{
		origin = val;	
		};
		
	self.setListener = function(val) 
		{
		listener = val;	
		};

	self.getId = function() 
		{
		return id;	
		};
		
	self.getRemoteAddress = function() 
		{
		return remoteAddress;
		};
		
	self.getRemotePort = function() 
		{
		return remotePort;	
		};
		
	self.getOrigin = function() 
		{
		return origin;	
		};
		
	var onMessage = function(message)
		{
		console.log("WebSocketConnection::onMessage() "+JSON.stringify(message));	
		try	{
			if (listener)
				{
				if (message.type == "utf8")
					listener.onMessage(message.utf8Data, self);
				if (message.type == "binary")
					listener.onMessage(message.binaryData, self);
				}
			}
		catch (e)
			{
			console.log(e);
			}	
		};

	var onMessageEvent = function(event)
		{
		//console.log("WebSocketConnection::onMessageEvent() " + JSON.stringify(event.data)); 
		try	{
			if (listener)
				listener.onMessage(event.data, self);
			}
		catch(e)
			{
			console.log(e);
			}	
		};
		
	var onSocketClosed = function(reasonCode, description, obj)
		{
		try	{
			if (listener)
				listener.onDisconnected(obj.getId());
			}
		catch(e)
			{
			console.log(e);
			}	
		};
		
	self.send = function(message)
		{
		try	{
			socket.send(message);	
			}
		catch(e)
			{
			console.log(e);
			}	
		};

	self.sendBinary = self.send;

	self.close = function()
		{
		try	{
			socket.close();
			}
		catch(e)
			{
			console.log(e);
			}	
		};
	}

	if (true)
		{
		module.exports = WebSocketConnection;	
		}


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	if (typeof window != "undefined")
		{
		navigator.getUserMedia = (navigator.getUserMedia || 
	                          navigator.webkitGetUserMedia || 
	                          navigator.mozGetUserMedia || 
	                          navigator.msGetUserMedia);
		}
		
	function WebRtcConnector(hubCommunicator, serverId, rtcConfig)
	{
	var self = this;

	// Includes

	var WebRtcConnection = null;

	if (true)
	    {
		WebRtcConnection = __webpack_require__(9);
		}
	else
		{
		WebRtcConnection = window.WebRtcConnection;
		}  

	var rtcConnections = new Object();
	var ownStream = null;
	var connectionListener = null;

		
	self.setConnectionListener = function(lis)
		{
		connectionListener = lis;
		};

	self.onIceCandidate = function(iceCandidate, partnerId)
		{
		console.log("iceCandidate got, sending it to the other client");
		
		hubCommunicator.callRpc("callClientRpc", [partnerId, "handleIceCandidate", [iceCandidate]], self, null, serverId);
		};
		
	var createConnection = function(partnerId)
		{
		rtcConnections[partnerId]= new WebRtcConnection(rtcConfig);
		rtcConnections[partnerId].setPartnerId(partnerId);
		rtcConnections[partnerId].setId(partnerId);
		rtcConnections[partnerId].setIceListener(self);
		rtcConnections[partnerId].setStreamListener(self);
		rtcConnections[partnerId].setConnectionListener(self);
		rtcConnections[partnerId].setDataChannelListener(self);
		};



	self.shutdown = function(e)
		{
		console.log("WebRtcConnector::onbeforeunload");
		for (var id in rtcConnections)
			{
			if (rtcConnections.hasOwnProperty(id))
				{
				rtcConnections[id].close();
				delete rtcConnections[id];
				}
			}
		};



	// Exposed RPC methods

	self.handleRtcOffer = function(descriptor, partnerId, connectionId)
		{
		console.log("WebRtcConnector::handleRtcOffer() descriptor: "+descriptor);
		
		if (!rtcConnections.hasOwnProperty(partnerId))
			{
			createConnection(partnerId);
			}
			
		rtcConnections[partnerId].onConnectionOfferReceived(descriptor, partnerId, function(answer)
			{
			console.log("WebRtcConnector::handleRtcOffer() onConnectionOfferReceived returned");
			console.log("Trying to call handleRtcAnswer on partner "+partnerId);
			hubCommunicator.callRpc("callClientRpc", [partnerId, "handleRtcAnswer", [answer]], self, null, serverId);
			console.log("handleRtcAnswer call done on partner "+partnerId);
			});
		
		};	

	self.handleRtcAnswer = function(descriptor, partnerId, connectionId)
		{
		console.log("WebRtcConnector::handleRtcAnswer()");			
		rtcConnections[partnerId].onConnectionAnswerReceived(descriptor);
		};	

	self.handleIceCandidate = function(iceCandidate, partnerId, connectionId)
		{
		console.log("WebRtcConnector::handleIceCandidate()");			
		
			
		if (!rtcConnections.hasOwnProperty(partnerId))
			{
			createConnection(partnerId);
			}
			
		rtcConnections[partnerId].onIceCandidateReceived(iceCandidate);
		};


	// Private methods
		

	self.onDisconnected = function(partnerId)
		{
		console.log("WebRtcConnector::onDisconnected() ");
		if (rtcConnections.hasOwnProperty(partnerId))
			{
			var connection = rtcConnections[partnerId]; 	
			connectionListener.onRtcDisconnected(connection.getId());
		
			connection.close();
			delete rtcConnections[partnerId];
			}
		};

	self.onDataChannelOpen = function(connection)
		{
		console.log("WebRtcConnecter::onDataChannelOpen() ");
		connectionListener.addRtcConnection(connection);
		};
								
	self.onStream = function(stream, partnerId)
		{
		console.log("WebRtcConnector::onStream()");
		};
		
	self.onRemoveStream = function(stream, partnerId)
		{
		console.log("WebRtcConnector::onRemoveStream()");
		self.onDisconnected(partnerId);
		};
		


	self.connectToPeer = function(partnerId)
		{
		console.log("WebRtcConnector::connectToPeer() partnerId: " + partnerId);
		if (rtcConnections.hasOwnProperty(partnerId))
			{
			console.log("WebRtcConnector::connectToPeer() connection to partnerId: " + partnerId +" already exists or is under construction, not connecting again");
			return;
			}
		
		createConnection(partnerId);
		rtcConnections[partnerId].createConnectionOffer(function(offer)
				{
				console.log("Offer created, sending it to the other client "+partnerId);
				hubCommunicator.callRpc("callClientRpc", [partnerId, "handleRtcOffer", [offer]], self, null, serverId);	
				});		
		};	
		
	if (typeof window !== "undefined")
		{
		window.onbeforeunload = self.shutdown;	
		}
		
	hubCommunicator.exposeRpcMethod("handleRtcOffer", self, self.handleRtcOffer);
	hubCommunicator.exposeRpcMethod("handleRtcAnswer", self, self.handleRtcAnswer);
	hubCommunicator.exposeRpcMethod("handleIceCandidate", self, self.handleIceCandidate);
					
	}

	if (true)
		{
		module.exports = WebRtcConnector;
		}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";


	     		
	function WebRtcConnection(rtcConfig)
	{
	var RTCPeerConnection = null;
	var RTCSessionDescription = null;
	var RTCIceCandidate = null;

	if (typeof window == "undefined")
		{
		RTCPeerConnection = global.RTCPeerConnection;
		RTCSessionDescription = global.RTCSessionDescription;
		RTCIceCandidate = global.RTCIceCandidate;
		}
	else
		{	
		RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
		RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
		RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
	    }


	var self = this;
	var id = null;
	var partnerId = null;
	var iceListener = null;
	var streamListener = null;
	var dataChannelListener = null;
	var connectionListener = null;
	var ownStream = null;
	var listener = null;

	var rtcOptions = { 'optional': [{'DtlsSrtpKeyAgreement': true}] };

	var peerConnection = new RTCPeerConnection(rtcConfig, rtcOptions);

	var dataChannel = null; 

	// If we receive a data channel from somebody else, this gets called

	peerConnection.ondatachannel = function (e) 
		{
	    var temp = e.channel || e; // Chrome sends event, FF sends raw channel
	    console.log("ondatachannel "+e);
	    dataChannel = temp;
	    dataChannel.binaryType = "arraybuffer";
	    dataChannel.onopen = self.onDataChannelOpen;
		dataChannel.onmessage = self.onMessage;
		};


	var onsignalingstatechange = function(state) 
		{
	    console.info('signaling state change:', state);
		//if ( connectionListener && peerConnection.signalingState == "closed")
		//	connectionListener.onDisconnected(partnerId);
		}

	var oniceconnectionstatechange = function(state) 
		{
	    console.info('ice connection state change:', state);
	   	if ( connectionListener && (peerConnection.iceConnectionState == "disconnected" || peerConnection.iceConnectionState == "closed"))
			connectionListener.onDisconnected(partnerId);
		};

	var onicegatheringstatechange = function(state) 
		{
	    console.info('ice gathering state change:', state);
		};

	var onIceCandidate = function(e)	
		{
		console.log("WebRtcConnection::onIceCanditate() partnerId: "+partnerId+" event: "+ e);
		
		console.log("iceListener oli "+iceListener);
		
		//A null ice canditate means that all canditates have
	    //been given
		
		if (e.candidate == null) 
	    	{
	        console.log("All Ice candidates listed");
	    	//iceListener.onIceCandidate(peerConnection.localDescription, partnerId);
	    	}
	    else
	    	{	
	    	iceListener.onIceCandidate(e.candidate, partnerId);
			}
		};

	peerConnection.onsignalingstatechange = onsignalingstatechange;
	peerConnection.oniceconnectionstatechange = oniceconnectionstatechange;
	peerConnection.onicegatheringstatechange = onicegatheringstatechange;
	peerConnection.onicecandidate = onIceCandidate;

	self.close = function()
		{
		console.log("WebRtcConnection::close");	
		//peerConnection.removeStream(ownStream);
		   
		
		//if (dataChannel && dataChannel.readyState != "closing" && dataChannel.readyState != "closed")
		//	dataChannel.close();
		
		if (peerConnection.signalingState != "closed" || peerConnection.signalingState != "closing")
			peerConnection.close();
		}

	self.send = function(message)
		{
		try	{
			if (dataChannel.readyState == "open")
				dataChannel.send(message);
			}
		catch(e)
			{
			console.log(e);
			}	
		};

	self.getBufferedAmount = function()
		{
		return dataChannel.bufferedAmount;
		};
		
	self.sendBinary = function(data)
		{
		try	{
			if (dataChannel.readyState == "open")
				dataChannel.send(data);
			}
		catch(e)
			{
			console.log(e);
			}	
		};

	self.onDataChannelClosed = function(e)
		{
		console.log("WebRtcConnection::onDataChannelClosed "+e);
		connectionListener.onDisconnected(self);
		}
		
	self.onDataChannelOpen = function(e)
		{
		console.log("WebRtcConnection::onDataChannelOpen "+e);
		dataChannel.binaryType = "arraybuffer";
		dataChannel.onclose = self.onDataChannelClosed;
		dataChannel.onmessage = self.onMessage;
		if (dataChannelListener)
			dataChannelListener.onDataChannelOpen(self);
		}
		
	self.onMessage = function(message)	
		{
		//console.log("WebRtcConnection::onMessage "+message.data);
		try	{
			if (listener)
				listener.onMessage(message.data, self);
			}
		catch (e)
			{
			console.log(e);
			}	
		};



	self.setId = function(id_)
		{
		id = id_;
		//console.log("WebRtcConnection::setId() "+id);
		};

	self.getId = function()
		{
		//console.log("WebRtcConnection::getId() "+id);
		return id;
		};
		
	self.getPartnerId = function()
		{
		//console.log("WebRtcConnection::getPartnerId() "+partnerId);
		return partnerId;
		};
						
	self.setPartnerId = function(id_)
		{
		partnerId = id_;
		};

	self.setDataChannelListener = function(lis)
		{
		dataChannelListener = lis;
		};

	self.setListener = function(lis)
		{
		listener = lis;
		};


	self.setIceListener = function(lis)
		{
		iceListener = lis;
		//peerConnection.onicecandidate = function(cand) {self.onIceCandidate(cand);};
		console.log("WebRtcConnection::setIceListener()"+ lis);
		};

	self.setStreamListener = function(lis)
		{
		streamListener = lis;
		peerConnection.onaddstream = function(e) {self.onStream(e);};
		peerConnection.onremovestream = function(e) {self.onRemoveStream(e);};
		};
		
	self.setConnectionListener = function(lis)
		{
		connectionListener = lis;
		//peerConnection.onaddstream = function(e) {self.onStream(e);};
		};	
		

	self.onStream = function(e)
		{	
		console.log("WebRtcConnection::onStream"+ e);
		streamListener.onStream(e.stream, partnerId);
		}
		
	self.onRemoveStream = function(e)
		{	
		console.log("WebRtcConnection::onStream"+ e);
		streamListener.onRemoveStream(e.stream, partnerId);
		}

	self.addStream = function(stream)
		{
		ownStream = stream;
		peerConnection.addStream(stream);
		}

	self.createConnectionOffer = function(callback)
		{
		var localDescription = null;
		
		dataChannel = peerConnection.createDataChannel("jsonrpcchannel", {reliable: true});
		dataChannel.binaryType = "arraybuffer";
		dataChannel.onopen = self.onDataChannelOpen;
		dataChannel.onmessage = self.onMessage;
				
		peerConnection.createOffer(function (desc)
			{
			console.log("peerConnection::createOffer called its callback: "+ desc);
	    	localDescription = desc;
	    	
	    	/*
	    	peerConnection.onicecandidate = function(e)
	    		{
	    		console.log(e.candidate);
	    		if (e.candidate == null) 
	    			{
	        		console.log("All Ice candidates listed");
	    			//iceListener.onIceCandidate(peerConnection.localDescription, partnerId);
	    			callback(peerConnection.localDescription, partnerId);
	    			}
	    		};
	    	*/
	    	
	    	peerConnection.setLocalDescription(desc, function() 
	    								{
	    								callback(peerConnection.localDescription, partnerId);
	    								},
	    								function(err)
	    									{
	    									console.log("WebRtcConnection::createConnectionOffer() setLocalDescription error");
	    									},								
	    								{});
	    	},function(err) {console.log(err);}); 
	    };	

	//Interface for messages coming from the partner ove websocket

	self.onConnectionAnswerReceived = function(descriptor)
		{
		console.log("WebRtcConnection::onConnectionAnswerReceived(), descriptor: "+descriptor);
		
		peerConnection.setRemoteDescription(new RTCSessionDescription(descriptor),function()
			{
			console.log("WebRtcConnection::onConnectionAnswerReceived() setRemoteDescription returned OK");
			}, 
			function(err) 
				{console.log("WebRtcConnection::onConnectionAnswerReceived() setRemoteDescription returned error "+err);}  );
		
		};
		
		
	self.onConnectionOfferReceived = function(descriptor, connectionId, callback)
		{
		console.log("WebRtcConnection::onConnectionOfferReceived");
		
		console.log("WebRtcConnection::onConnectionOfferReceived trying to set remote description");	
		var desc = new RTCSessionDescription(descriptor);
		peerConnection.setRemoteDescription(desc, function() 
			{
			console.log("WebRtcConnection::onConnectionOfferReceived remote description set");
			peerConnection.createAnswer(function (answer) 
					{
					/*
					peerConnection.onicecandidate = function(e)
	    				{
	    				if (e.candidate == null) 
	    					{
	        				console.log("All Ice candidates listed");
	    					//iceListener.onIceCandidate(peerConnection.localDescription, partnerId);
	    					callback(peerConnection.localDescription);
	    					}
	    				};
					*/
					peerConnection.setLocalDescription(answer, function () 
						{
						callback(peerConnection.localDescription);
						//callback(answer);
						}, 
						function(err) { console.log(err); } 
						);
					},
					function(err) { console.log(err); }
					);	
			}, function(err) {console.log("WebRtcConnection::onConnectionOfferReceived setting remote description failed "+err);}
			
			);
		
		};
		
	self.onIceCandidateReceived = function(iceCandidate)
		{	
		peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate),
	            function () {console.log("WebRtcConnection::onIceCandidateReceived adding Ice candidate succeeded");},  
	            function(err) {console.log("WebRtcConnection::onIceCandidateReceived adding Ice candidate failed "+err);});
		};         	

	// Dummy implementation for websocket compatibility

	self.setPipedTo = function(targetId)
		{
		};
		
	self.getPipedTo = function()
		{
		return null;
		};	
		
	}

	if (true)
		{
		module.exports = WebRtcConnection;	
		}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict"

	function getGetParameter(val) 
		{
	    var result = null,
	    tmp = [];
	    location.search.substr(1).split("&").forEach(function (item) 
	    	{
	        tmp = item.split("=");
	        if (tmp[0] === val) 
	        		result = decodeURIComponent(tmp[1]);
	    	});
	    return result;
		}

	function getCookie(cname) 
		{
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    
	    for(var i=0; i<ca.length; i++) 
			{
			var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	    	}
	    return null;
		}

	function setCookie(cname, cvalue, exdays)
		{
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
		}

	function removeCookie(cname)
		{
		document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		}

	function GameClient()
	{
	var self = this;

	var RTCPeerConnection = null;
	var RTCSessionDescription = null;
	var RTCIceCandidate = null;

	if (typeof window == "undefined")
		{
		RTCPeerConnection = global.RTCPeerConnection;
		RTCSessionDescription = global.RTCSessionDescription;
		RTCIceCandidate = global.RTCIceCandidate;
		}
	else
		{	
		RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
		RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
		RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
	    }


	// Includes

	var CommunicationClient = null;

	if (true)
		{
		CommunicationClient = __webpack_require__(3);
		}
		
	else
		{
		CommunicationClient = window.CommunicationClient;
		}
		
	var mainUrl = "http://spaceify.net/games/";

	var rtts = new Array();
	var logging = false;
	var loggerUrl = null;
	var loggerMeasurementInterval = -1;
	var loggingId = 1;
	var loggerBatchSize = 1000;


	var measurementTimer = null;

	var ownId = null;

	var communicationClient = new CommunicationClient();

	communicationClient.setClientListener(self);
	communicationClient.setConnectionTypeListener(self);

	var controllerConnectionListener = null;
	var controllerDisconnectionListener = null;
	var screenConnectionListener = null;
	var screenDisconnectionListener = null;
	var screenConnectionTypeListener = null;

	self.connect = function(host, port, clientType, groupId, callback)
		{
		communicationClient.exposeRpcMethod("getRtt", self, self.getRtt);
		communicationClient.connect(host, port, clientType, groupId, function(givenId)
			{
			ownId = givenId;
			callback();
			});
		};

	self.connectAsScreen = function(gameName, urlTag, qrCodeTag, callback)
		{
		var url = mainUrl + gameName +"/connectiondetails";
		var groupId = getCookie(gameName+"_groupid");
		if (groupId != null)
			{
			url += "/"+groupId;
			}
		
		var request = new XMLHttpRequest();
		
		
		console.log("Trying to make a xmlhttprequest to "+url);
		
		request.onreadystatechange = function() 
			{
	    	if (request.readyState == 4 && request.status == 200) 
	    		{
	        	console.log("Received from xhmlhttprequest: "+ request.responseText);
	        	
	        	var ret = JSON.parse(request.responseText);
	        	
	        	logging = ret.logging;
	        	loggerUrl = ret.loggerUrl;
	        	loggerMeasurementInterval = ret.loggerMeasurementInterval;
	        	loggerBatchSize = ret.loggerBatchSize;
	        	
	        	urlTag.innerHTML = ret.controllerUrl;
	        	qrCodeTag.src = ret.qrCodeUrl;
	    		
	    		self.connect(ret.hubHost, ret.hubPort, "screen", ret.groupId, callback);
	    		}
			};
		request.open("GET", url, true);
		request.send();
		};

	self.connectAsController = function(callback)
		{
		var groupId = getGetParameter("id");
		var hubHost = getGetParameter("host");
		var hubPort = getGetParameter("port");
		
		loggingId = getCookie("loggingId");
		console.log("GameClient::loggingId " +loggingId);
		if(!loggingId){
			loggingId = Math.floor(Math.random()*10000);
		}
		
		self.connect(hubHost, hubPort, "controller", groupId, callback);
		};	
		
	self.notifyScreens = function(method, params)
		{
		console.log("GameClient::notifyScreens(), screens were: " + JSON.stringify(screens));
		
		var screens = communicationClient.getClientsByType("screen"); 
		for (var i in screens)
			communicationClient.notifyClient(i, method, params);
		};

	self.callClientRpc = function(id, method, params, selfobj, callback)
		{
		communicationClient.callClientRpc(id, method, params, selfobj, callback);
		};

	self.notifyController = function(id, method, params)
		{
		console.log("GameClient::notifyController(), id: " + id);
		
		//var screens = communicationClient.getClientsByType("controller"); 
		communicationClient.notifyClient(id, method, params);
		};

		
	self.exposeRpcMethod = function(name, object_, method_)
		{
		communicationClient.exposeRpcMethod(name, object_, method_);
		};

	// --------------- RTT measurement -----------------------------------

	self.sendLogs = function()
		{
		
		var request = new XMLHttpRequest();
		
		
		console.log("Trying to send logs to " + loggerUrl);
		
		var data = JSON.stringify(rtts);
		
		rtts.splice(0, rtts.length);
		
		request.open("POST", loggerUrl, true);
		request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		
		request.send(data);
		};
		
	self.getRtt = function(originalTime, callerId, connectionId, callback)
		{
		if (loggingId)
			{
			
			callback(null, [loggingId, originalTime, communicationClient.getConnectionType(callerId)]);
			}
		};

	self.getRttReturned = function(err, data)
		{
		console.log("GameClient::getRttReturned() loggingId: "+data[0]+" rtt: " + (Date.now() - data[1]) + " connectionType: "+data[2]);
		
		rtts.push({loggingId: data[0], timestamp: data[1], rtt: (Date.now() - data[1]), connectionType: data[2]});
		
		if (rtts.length >= loggerBatchSize)
			self.sendLogs();
		};

	self.measureRtts = function()
		{
		console.log("GameClient::measureRtts");
		var controllers = communicationClient.getClientsByType("controller"); 
		
		for (var i in controllers)
			{
				console.log("GameClient::measureRtts "+i);
			communicationClient.callClientRpc(i, "getRtt", [Date.now()], self, self.getRttReturned);
			}
		};

	// --------------- RTT measurement ends ----------------------------

		
	// ClientListener RPC interface implementation

	self.onClientConnected = function(client, connectionId, callback)
		{
		console.log("GameClient::onClientConnected() "+ client.getClientId() +" "+client.getClientType());
		
		if (!measurementTimer && logging)
			{
			measurementTimer = setInterval(self.measureRtts, loggerMeasurementInterval);
			}
		
		if (client.getClientType() == "screen")
			{
			if (screenConnectionListener)
				{
				screenConnectionListener.listener.call(screenConnectionListener.object, client.getClientId());
				}
			if (typeof RTCPeerConnection !== "undefined")	
				communicationClient.upgradeConnectionToWebRtc(client.getClientId());
			}
				
		if (client.getClientType() == "controller")
			{
			if (controllerConnectionListener)
				{
				controllerConnectionListener.listener.call(controllerConnectionListener.object, client.getClientId());
				}
			}
		};
		
	self.onClientDisconnected = function(client, connectionId, callback)
		{
		console.log("GameClient::onClientDisconnected() '"+ client.getClientId() +"'");
		if (client.getClientType() == "screen")
			{
			if (screenDisconnectionListener)
				{
				screenDisconnectionListener.listener.call(screenDisconnectionListener.object, client.getClientId());
				}
			}
			
		if (client.getClientType() == "controller")
			{
			if (controllerDisconnectionListener)
				{
				controllerDisconnectionListener.listener.call(controllerDisconnectionListener.object, client.getClientId());
				}
			}
		};

	// ConnectionTypeListener implementation

	self.onConnectionTypeUpdated = function(client, newConnectionType)
		{
		console.log("GameClient::onConnectionTypeUpdated() clientType: " + client.getClientType());
		if (screenConnectionTypeListener != null && client.getClientType() == "screen")
			{
			screenConnectionTypeListener.listener.call(screenConnectionTypeListener.object, newConnectionType, client.getClientId());
			}
		};

	// Listener setters

	self.setControllerConnectionListener = function(object_, listener_)
		{
		controllerConnectionListener = {object: object_, listener: listener_}; 
		};
		
	self.setControllerDisconnectionListener = function(object_, listener_)
		{
		controllerDisconnectionListener = {object: object_, listener: listener_};
		};	

	self.setScreenConnectionListener = function(object_, listener_)
		{
		screenConnectionListener = {object: object_, listener: listener_}; 
		};
		
	self.setScreenDisconnectionListener = function(object_, listener_)
		{
		screenDisconnectionListener = {object: object_, listener: listener_};
		};	

	self.setScreenConnectionTypeListener = function(object_, listener_)
		{
		screenConnectionTypeListener = {object: object_, listener: listener_}; 
		};
	}

	if (true)
		{
		module.exports = GameClient;
		}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	        
	function WebSocketRpcConnection()
	{
	var self = this;


	// Includes

	var RpcCommunicator = null;
	var WebSocketConnection = null;

	if (true)
	    {
		RpcCommunicator = __webpack_require__(4);
		WebSocketConnection = __webpack_require__(6);
		}
	else
		{
		RpcCommunicator	= window.RpcCommunicator;
		WebSocketConnection = window.WebSocketConnection;
		}    
		
	var connection = new WebSocketConnection();
	var communicator = new RpcCommunicator();	

	self.callRpc =  function(method, params, object, listener)
		{
		return communicator.callRpc(method, params, object, listener);
		}


	self.connect = function(options, callback)
			{
			console.log("WebSocketRpcConnection::connect()");
			connection.connect(options, function()
				{
				console.log("WebsocketRpcConnection Connected");	
				//console.log("Creating RPCCommunicator for the Websocket");
								
				communicator.addConnection(connection);
				
				console.log("WebsocketRpcConnection added to communicator");   
				callback(null, null); 
				});
			};
			
			
	self.close = function()
		{	
		};			

	self.getCommunicator = function()
		{
		return communicator;
		};
	}

	if (true)
	        {
		module.exports = WebSocketRpcConnection;
		}
	                        

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	navigator.getUserMedia = (navigator.getUserMedia || 
	                          navigator.webkitGetUserMedia || 
	                          navigator.mozGetUserMedia || 
	                          navigator.msGetUserMedia);

	function WebRtcClient(serverAddress, rtcConfig)
	{
	var self = this;

	// Includes

	var WebRtcConnection = null;
	var WebSocketConnection = null;
	var RpcCommunicator = null;

	if (true)
	    {
		WebRtcConnection = __webpack_require__(9);
		WebSocketConnection = __webpack_require__(6);
		RpcCommunicator = __webpack_require__(4);
		}
	else
		{
		WebRtcConnection = window.WebRtcConnection;
		WebSocketConnection = window.WebSocketConnection;
		RpcCommunicator = window.RpcCommunicator;
		}    


	var connection = new WebSocketConnection();
	var communicator = new RpcCommunicator();

	var rtcConnections = new Object();
	var ownStream = null;
	var connectionListener = null;

		
	self.setConnectionListener = function(lis)
		{
		connectionListener = lis;
		}

	self.onIceCandidate = function(iceCandidate, partnerId)
		{
		console.log("iceCandidate got, sending it to the other client");
		communicator.callRpc("offerIce", [iceCandidate, partnerId]);
		};
		
	var createConnection = function(partnerId)
		{
		rtcConnections[partnerId]= new WebRtcConnection(rtcConfig);
		rtcConnections[partnerId].setPartnerId(partnerId);
		
		rtcConnections[partnerId].setIceListener(self);
		rtcConnections[partnerId].setStreamListener(self);
		rtcConnections[partnerId].setConnectionListener(self);
		rtcConnections[partnerId].setDataChannelListener(self);
		}



	self.shutdown = function(e)
		{
		console.log("WebRtcClient::onbeforeunload");
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
		console.log("WebRtcClient::handleRtcOffer() descriptor: "+descriptor);
		
		if (!rtcConnections.hasOwnProperty(partnerId))
			{
			createConnection(partnerId);
			}
			
		rtcConnections[partnerId].onConnectionOfferReceived(descriptor, connectionId, function(answer)
			{
			console.log("WebRtcClient::handleRtcOffer() onConnectionOfferReceived returned");
			communicator.callRpc("acceptConnectionOffer",[answer, partnerId]);
			});
		
		};	

	self.handleRtcAnswer = function(descriptor, partnerId, connectionId)
		{
		console.log("WebRtcClient::handleRtcAnswer()");			
		rtcConnections[partnerId].onConnectionAnswerReceived(descriptor);
		};	

	self.handleIceCandidate = function(iceCandidate, partnerId, connectionId)
		{
		console.log("WebRtcClient::handleIceCandidate()");			
		
			
		if (!rtcConnections.hasOwnProperty(partnerId))
			{
			createConnection(partnerId);
			}
			
		rtcConnections[partnerId].onIceCandidateReceived(iceCandidate);
		};


		


		
	// Private methods
		
	var connectToCoordinator = function(callback)
		{
		console.log("WebRtcClient::connectToCoordinator()");
		console.log("Websocket connecting to the coordinator");

		connection.connect(serverAddress, function()
				{
				console.log("Websocket Connected to the Coordinator");	
				console.log("Creating RPCCommunicator for the Websocket");
								
				communicator.addConnection(connection);
				callback(); 
				});
		};

	self.onDisconnected = function(partnerId)
		{
		console.log("WebRtcClient::onDisconnected() ");
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
		console.log("WebRtcClient::onDataChannelOpen() ");
		connectionListener.addConnection(connection);
		};
								
	self.onStream = function(stream, partnerId)
		{
		console.log("WebRtcClient::onStream()");
		};
		
	self.onRemoveStream = function(stream, partnerId)
		{
		console.log("WebRtcClient::onRemoveStream()");
		self.onDisconnected(partnerId);
		};
		
	var connectToPeers = function(announceId, callback)
		{
		console.log("WebRtcClient::connectToPeers()");				
		console.log("Announcing to the Coordinator");		
						
		communicator.callRpc("announce", [announceId], self, self.onPeerIdsArrived);									
		};	


	//Callback of the connectToPeers RPC call

	self.onPeerIdsArrived = function(err, data, id)
		{
		console.log("WebRtcClient::onPeerIdsArrived(), data.length: "+data.length);
		var partnerId = 0;
		
		for (var i=0; i<data.length; i++)	
			{
			partnerId = data[i];
			
			//Create a WebRTC connection and 
			
			createConnection(partnerId);
			
			console.log("Trying to create offer to client id " + partnerId);
			
			//Creating a connection offer 
			
			rtcConnections[partnerId].createConnectionOffer(function(offer, peerId)
				{
				console.log("Offer created, sending it to the other client "+peerId);
				communicator.callRpc("offerConnection", [offer, peerId]);	
				});					
			}
		if (data.length === 0)
			console.log("Announce returned 0 client ids, not connecting");	
		};
		
	self.run = function(announceId, callback)
		{
		console.log("WebRtcClient::run()");
		
		window.onbeforeunload = self.shutdown;	
		
		communicator.exposeRpcMethod("handleRtcOffer", self, self.handleRtcOffer);
		communicator.exposeRpcMethod("handleRtcAnswer", self, self.handleRtcAnswer);
		communicator.exposeRpcMethod("handleIceCandidate", self, self.handleIceCandidate);
		
		
	    connectToCoordinator(function() 
			{
			console.log("WebRtcClient::run() connected to the coordinator");		
			connectToPeers(announceId, function()
				{
				console.log("WebRtcClient::run() connectToPeers returned");
				});
			if (callback)	
				callback(communicator);
			}); 
	        	
		};			
	}

	if (true)
		{
		module.exports = WebRtcClient;	
		}

/***/ }
/******/ ])
});
;"use strict"

function HttpParser()
{
var self = this;

var contentBegin = null;
var header = null;

var headerValues = new Object();
var statusCode = null;

self.getStatusCode = function()
	{
	return parseInt(statusCode);
	};

self.getContentBegin = function()
	{
	return contentBegin;
	};

self.getHeaderValueAsInt = function(key)
	{
	key = key.toLowerCase();

	if (headerValues.hasOwnProperty(key))
		{
		return parseInt(headerValues[key]);
		}
	};

self.getHeaderValue = function(key)
	{
	key = key.toLowerCase();

	if (headerValues.hasOwnProperty(key))
		{
		return headerValues[key];
		}
	};

var findContentBegin = function(arr)
	{
	for (var i=0; i < arr.byteLength; i+=1)
		{
		if ((i+4) < arr.byteLength && arr[i]==13 && arr[i+1]==10 && arr[i+2]==13 && arr[i+3]==10)
			{
			contentBegin = i+4;
			console.log(arr[contentBegin]);
			break;
			}

		}
	};

var parseHeader = function(arr)
	{
	headerValues = {};

	if (contentBegin)
		header = String.fromCharCode.apply(null, arr.subarray(0, contentBegin));
	else
		header = String.fromCharCode.apply(null, arr);

	console.log("Trying to parse header: " + header);
	var rows = header.split("\n");

	var firstRow = rows[0].split(" ");
	statusCode = firstRow[1];

	var item = null;

	for (var i=1; i<rows.length; i++)
		{
		var separatorIndex = rows[i].indexOf(":");

		if (separatorIndex > -1)
			{
			var hkey = rows[i].substring(0, separatorIndex);
			hkey = hkey.toLowerCase();

			var hvalue = "";
			if (rows[i].length > separatorIndex)
				hvalue = rows[i].substring(separatorIndex+1).trim();

			// XMLHttpRequest.getResponseHeader() style comma-space pair separator for multi-headers like Set-Cookie
			headerValues[hkey] = (hkey in headerValues ? headerValues[hkey] + ", " + hvalue : hvalue);
			}
		}

	console.dir(headerValues);
	};

self.parse = function(arr)
	{
	findContentBegin(arr);
	parseHeader(arr);
	};

}

if (typeof exports !== "undefined")
	{
	module.exports = HttpParser;
	}"use strict"

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
"use strict"

/**
 * Implements the XMLHttpRequest interface.
 * References the GLOBAL variable piperClient to implement its functionality
 */

function SpXMLHttpRequest()
{
var self = this;

var xhr = null;

var url = null;
var method = null;
var async = null;

var contentLength = null;
var bodyBytesReceived = null;
var contentType = null;
var overridedMimeType = null;
var fragments = new Array();

var httpParser = new HttpParser();

self.UNSENT = 0;
self.OPENED = 1;
self.HEADERS_RECEIVED = 2;
self.LOADING = 3;
self.DONE = 4;

self.responseText = "";

var requestHeaders = [];

self.open = function(method_, url_, async_)
	{
	method = method_;
	url = url_;
	async = async_;
	};

self.onBinary = function(data)
	{
	var arr = new Uint8Array(data);
	//console.log("SpXMLHttpRequest::onBinary()" +" data: "+ab2str(arr));

	if (!contentLength)		//This is the header chunk
		{
		httpParser.parse(arr);

		console.log("SpXMLHttpRequest::onBinary() HTTP server replied with statusCode "+httpParser.getStatusCode());

		if (httpParser.getStatusCode() == 301 || httpParser.getStatusCode() == 302)
			{
			url = httpParser.getHeaderValue("Location");
			console.log("SpXMLHttpRequest::onBinary() redirecting to : " + url);
			self.send();
			return;
			}

		contentLength = httpParser.getHeaderValueAsInt("Content-Length");
		contentType = httpParser.getHeaderValue("Content-Type");

		if (contentLength)
			{
			var temp = arr.subarray(httpParser.getContentBegin());

			fragments.push(temp);
			bodyBytesReceived = fragments[0].byteLength;
			}
		}
	else		//This is some other chunk
		{
		fragments.push(arr);
		bodyBytesReceived += arr.byteLength;
		}

	console.log(bodyBytesReceived + " / " + contentLength + " bytes of " + url + " received" );

	/*if (contentLength && contentLength < bodyBytesReceived)
		{
		saveByteArray(fragments, 'example.js');
		}*/

	if (contentLength && contentLength == bodyBytesReceived)
		{
		if (!overridedMimeType)
			self.response = new Blob(fragments, {type : contentType} );
		else
			self.response = new Blob(fragments, {type : overridedMimeType} );

		for (var i = 0; i < fragments.length; i++)
			{
			if (fragments[i])
				self.responseText += ab2str(fragments[i]);
			}

		self.readyState = 4;
		self.status = 200;
		self.onreadystatechange();
		}
	};

self.overrideMimeType = function(mime)
	{
	overridedMimeType = mime;
	};

self.send = function(body)
	{
	//reference global piperClient

	var host = "localhost";
	var hostname = "localhost";
	var port = "80";

	if (url.indexOf("//") != -1)
		{
		//it is an absolute url
		var tempUrl = new URL(url);

		if (tempUrl.hostname=="10.0.0.1")
			{
			tempUrl.hostname = "localhost";
			}

		host = tempUrl.host;

		if (tempUrl.hostname)
			hostname = tempUrl.hostname;

		if (tempUrl.port)
			port = tempUrl.port;

		url = tempUrl.toString();
		}
	else
		{
		if (url.charAt(0)!="/")
			url="/"+url;
		}

	var request = method + " " + url + " HTTP/1.1\r\nHost: " + host;

	var cookies = getSession("sessionCookies");

	if (cookies)
		request = request + "\r\nCookie: " + cookies;

	for(var i = 0; i < requestHeaders.length; i++)
		request += "\r\n" + requestHeaders[i].header + ": " + requestHeaders[i].value;
	requestHeaders = [];

	if(body)
		{
		request += "\r\nContent-Length: " + body.length + "\r\n";
		request += body;
		}

	request = request + "\r\n\r\n";

	var data = toab(request);

	console.log("SpXMLHttpRequest::send() making request: " + request);

	piperClient.createTcpPipe(hostname, port, self.onBinary, function(pipeId)
		{
		piperClient.sendTcpBinary(pipeId, data);
		});
	};

self.setRequestHeader = function(header, value)
	{
	requestHeaders.push({header: header, value: value});
	}

self.getResponseHeader = function(name)
	{
	return httpParser.getHeaderValue(name);
	}

}
//window.XMLHttpRequest = SpXMLHttpRequest;
"use strict"

/**
 * Global methods and variables used in the remote operation classes
 */

/*
var saveByteArray = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, name) {
        var blob = new Blob(data, {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());
*/

function Utf8ArrayToStr(array)
{
	var out, i, len, c;
	var char2, char3;

	out = "";
	len = array.length || array.byteLength;
	i = 0;
	while(i < len)
		{
		c = array[i++];
		switch(c >> 4)
		{
		case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
			// 0xxxxxxx
			out += String.fromCharCode(c);
		break;
		case 12: case 13:
			// 110x xxxx   10xx xxxx
			char2 = array[i++];
			out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
		break;
		case 14:
			// 1110 xxxx  10xx xxxx  10xx xxxx
			char2 = array[i++];
			char3 = array[i++];
			out += String.fromCharCode(((c & 0x0F) << 12) |
							((char2 & 0x3F) << 6) |
							((char3 & 0x3F) << 0));
		break;
		}
	}

	return out;
}

function ab2str(buf)
	{
	return Utf8ArrayToStr(buf);
	//return String.fromCharCode.apply(null, new Uint8Array(buf));
	}

function str2ab(str)
	{
	var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
	var bufView = new Uint16Array(buf);
	for (var i=0, strLen=str.length; i<strLen; i++)
		{
		bufView[i] = str.charCodeAt(i);
		}
	return buf;
	}

function toab(str)
	{
	var buf = new ArrayBuffer(str.length); // 2 bytes for each char
	var bufView = new Uint8Array(buf);
	for (var i=0, strLen=str.length; i<strLen; i++)
		{
		bufView[i] = str.charCodeAt(i);
		}
	return buf;
	}

var getSession = function(sessionItem)
	{
console.log("GETTING GETTING", sessionItem, sessionStorage.getItem(sessionItem));
	if (sessionStorage.getItem(sessionItem))
		return sessionStorage.getItem(sessionItem);
	else
		return "";
	};

var setSession = function(sessionItem, value)
	{
console.log("SETTING SETTING", sessionItem, value);
	if(!value)
		value = "";

	sessionStorage.setItem(sessionItem, value.trim());
	};

var SERVER_ADDRESS = {host: "spaceify.net", port: 1980};
var WEBRTC_CONFIG = {"iceServers":[{url:"stun:kandela.tv"},{url :"turn:kandela.tv", username:"webrtcuser", credential:"jeejeejee"}]};

var piperClient = new PiperClient();
"use strict"

/**
 * Implements the page and resource loader interface.
 * References the GLOBAL variable piperClient to implement some of its functionality
 */

function SpaceifyLoader()
{
var self = this;

var spHost = null;
var speHost = null;

var connected = false;
var connectionListener = null;

var elements = null;
var elementIndex = 0;

self.loadData = function(element, callback)
	{
	var sp_type, sp_host, type, url, xhr = new SpXMLHttpRequest();

	if(element.getAttribute("sp_src"))
		{ sp_type = "sp_src"; type = "src"; }
	else if(element.getAttribute("spe_src"))
		{ sp_type = "spe_src"; type = "src"; }
	else if(element.getAttribute("sp_href"))
		{ sp_type = "sp_href"; type = "href"; }
	else if(element.getAttribute("spe_href"))
		{ sp_type = "spe_href"; type = "href"; }

	url = element.getAttribute(sp_type);

	sp_host = (sp_type == "spe_src" || sp_type == "spe_href" ? speHost : spHost);

	if(url.indexOf("//") == -1 && sp_host)							// Relative URLs fail to load without host
		url = new URL(url, sp_host).toString()

	if(!url)
		{
		callback();
		return;
		}

	xhr.onreadystatechange = function()
		{
		if (xhr.readyState == 4)
			{
			var blob = xhr.response;
			element.onload = function(e)
				{
				window.URL.revokeObjectURL(element[type]);			// Clean up after yourself
				};
			element[type] = window.URL.createObjectURL(blob);
			element.removeAttribute(sp_type);
			callback();
			}
		};

	xhr.open("GET", url, true);
	xhr.responseType = "blob";
	xhr.send();
	};

self.postData = function(url, post, responseType, callback)
	{
	var sessionTokenName = getSessionTokenName(url);

	var xhr = new SpXMLHttpRequest();

	xhr.onreadystatechange = function()
		{
		if (xhr.readyState == 4)
			{
			setSession("sessionCookies", xhr.getResponseHeader("Set-Cookie"));
			setSession(sessionTokenName, xhr.getResponseHeader(sessionTokenName));

			if (xhr.status != 200)
				callback(xhr.status, null);
			else if(xhr.response instanceof Blob)
				{
				var reader = new FileReader();
				reader.onload = function(err)
					{
					callback(null, reader.result);
					}
				reader.readAsText(xhr.response.data, "UTF-8");
				}
			else
				callback(null, JSON.stringify(xhr.response));
			}
		};

	var boundary = "---------------------------" + Date.now().toString(16);

	var body = "";
	for(var i = 0; i < post.length; i++)
		{
		body += "\r\n--" + boundary + "\r\n";

		body += post[i].content;
		body += "\r\n\r\n" + post[i].data + "\r\n";
		}
	body += "\r\n--" + boundary + "--";

	xhr.withCredentials = true;
	xhr.open("POST", url, true);
	xhr.setRequestHeader(sessionTokenName, getSession(sessionTokenName));
	xhr.responseType = (responseType ? responseType : "text");
	xhr.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + boundary);
	xhr.send(body);
	};

self.loadPage = function(url, spHost_, speHost_)
	{
	var sessionTokenName = getSessionTokenName(url);

	var xhr = new SpXMLHttpRequest();

	xhr.onreadystatechange = function()
		{
		//console.log("SpaceifyLoader::loadPage() content arrived, readyState=="+xhr.readyState);

		if (xhr.readyState == 4)
			{
			setSession("sessionCookies", xhr.getResponseHeader("Set-Cookie"));
			setSession(sessionTokenName, xhr.getResponseHeader(sessionTokenName));

			var newDoc = document.open("text/html", "replace");
			newDoc.write(xhr.responseText);
			newDoc.close();

			newDoc.loadPageSpHost = spHost_;
			newDoc.loadPageSpeHost = speHost_;
			}

		}

	xhr.withCredentials = true;
	xhr.open("GET", url, true);
	xhr.setRequestHeader(sessionTokenName, getSession(sessionTokenName));
	xhr.send(null);
	};

self.getAllElements = function()
	{
	var sp_src = Array.prototype.slice.call(document.querySelectorAll("[sp_src]"));

	var spe_src = Array.prototype.slice.call(document.querySelectorAll("[spe_src]"));

	var sp_href = Array.prototype.slice.call(document.querySelectorAll("[sp_href]"));

	var spe_href = Array.prototype.slice.call(document.querySelectorAll("[spe_href]"));

	elements = spe_href.concat(sp_href, spe_src, sp_src);							// Order: edge css, local css, edge resource, local resource

	console.log("SpaceifyLoader::loadAll() :: Number of elements with sp_src:", sp_src.length, "spe_src:", spe_src.length, "sp_href:", sp_href.length, "spe_href:", spe_href.length);
	};

self.loadAllElements = function()
	{
	elementIndex = 0;
	recurseElements();
	};

self.hasElements = function()
	{
	return (elements && elements.length > 0 ? true : false);
	}

	// functions from former contentloader.js end -- -- -- -- -- -- -- -- -- -- //
var recurseElements = function()
	{
	if (elementIndex < elements.length)
		{
		self.loadData(elements[elementIndex], function()
			{
			elementIndex++;
			recurseElements();
			});
		}
	}

var getSessionTokenName = function(url)
	{
	var sessionTokenName = "X-Edge-Session";

	if(url.indexOf("//") != -1)									// CORS preflight - OPTIONS Access-Control-Request-Headers <-> Access-Control-Allow-Headers
		{														// Notice: recirections like 302 do not work with this preflight
		var spltUrl = url.split("://");

		if(spltUrl[0] == "https")
			sessionTokenName = "X-Edge-Session-Secure";
		}

	return sessionTokenName;
	}

self.parseQuery = function(url)
	{ // Adapted from http://james.padolsey.com/snippets/parsing-urls-with-the-dom/
	var parameters = {}, part, pair, pairs;

	url = decodeURIComponent(url);

	part = url.split("?");												// url with search or just the search
	part = (part.length < 2 ? part[0] : part[1]);

	pairs = part.split("&");

	for(var i = 0, length = pairs.length; i < length; i++)
		{
		if(!pairs[i])
			continue;

		pair = pairs[i].split("=");
		parameters[pair[0]] = (pair.length == 2 ? pair[1] : null);
		}

	return parameters;
	}

self.setSpHosts = function(spHost_, speHost_)
	{
	spHost = spHost_;
	speHost = speHost_;
	}

self.connect = function(host, port, callback)
	{
	piperClient.connect(host, port, function()
		{
		if (connectionListener)
			connectionListener();
		callback();
		});
	};

self.setConnectionListener = function(lis)
	{
	connectionListener = lis;
	if (connected)
		lis();
	};

}

	// -- -- -- -- -- -- -- -- -- -- //
function getNetworkInfo(callback)
	{
	window.isSpaceifyNetwork = false;

	var xhr = new XMLHttpRequest();
	xhr.open("HEAD", window.location.protocol + "//10.0.0.1/templates/test.txt", true);
	xhr.timeout = 1000;
	xhr.onreadystatechange = function()
		{
		if(xhr.readyState == 4)
			{
			window.isSpaceifyNetwork = (xhr.status >= 200 && xhr.status < 304 ? true : false);
			callback();
			}
		};
	xhr.send();
	}

var spaceifyLoader = new SpaceifyLoader();
var contentLoader = spaceifyLoader;										// for leagacy templates compatibility
function prepareLoader(sp_host, spe_host)
	{
	spaceifyLoader.setSpHosts(sp_host, spe_host);

	if(window.isSpaceifyNetwork)
		{
		SpXMLHttpRequest = window.XMLHttpRequest;
		}
	else
		{
		window.isSpaceifyNetwork = false;

		spaceifyLoader.connect(SERVER_ADDRESS.host, SERVER_ADDRESS.port, function()
			{
			});
		}
	}

function loadPageOrElements(params)
{
	spaceifyLoader.getAllElements();

	if(!spaceifyLoader.hasElements())
		spaceifyLoader.loadPage(params.sp_host + params.sp_path, params.sp_host, params.spe_host);
	else
		spaceifyLoader.loadAllElements();
}

window.onload = function()
	{
	var sp_host, spe_host;

	var params = spaceifyLoader.parseQuery(window.location.href);
	if(!params.sp_host)
		{
		sp_host = spe_host = window.location.protocol + "//" + window.location.hostname + "/";

		if(typeof document.loadPageSpHost != "undefined")
			sp_host = document.loadPageSpHost;

		if(typeof document.loadPageSpeHost != "undefined")
			spe_host = document.loadPageSpeHost;

		params = { sp_host: sp_host, spe_host: spe_host, sp_path: "index.html" };
		}

	getNetworkInfo(function()
		{
		if(!window.isSpaceifyNetwork)
			{
			spaceifyLoader.setConnectionListener(function()
				{
				loadPageOrElements(params);
				});

			prepareLoader(params.sp_host, params.spe_host);
			}
		else
			{
			prepareLoader(params.sp_host, params.spe_host);
			loadPageOrElements(params);
			}
		});
	};
