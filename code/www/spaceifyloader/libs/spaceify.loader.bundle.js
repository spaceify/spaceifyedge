
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("wrtc"), require("websocket"));
	else if(typeof define === 'function' && define.amd)
		define(["wrtc", "websocket"], factory);
	else if(typeof exports === 'object')
		exports["sp"] = factory(require("wrtc"), require("websocket"));
	else
		root["sp"] = factory(root["wrtc"], root["websocket"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_10__) {
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
	WebRtcConnector: __webpack_require__(2), 
	CommunicationClient: __webpack_require__(6),  
	RpcCommunicator: __webpack_require__(7),        
	WebRtcPeerConnection: __webpack_require__(3),       
	WebSocketRpcConnection: __webpack_require__(11),
	CallBackbuffer: __webpack_require__(8),         
	WebSocketConnection: __webpack_require__(9)
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


	self.toJSON = function()
		{
		var ret = 	{	
					clientId: clientId, 
					clientType: clientType,
					webRtc: webRtc,
					localHub: localHub,
					preferredConnectionId: preferredConnectionId
					};
						
		return ret;
		};

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

	"use strict"

	if (typeof window != "undefined")
		{
		navigator.getUserMedia = (navigator.getUserMedia || 
	                          navigator.webkitGetUserMedia || 
	                          navigator.mozGetUserMedia || 
	                          navigator.msGetUserMedia);
		}

	/*
	*
	* This class communicates over a CommunicationHub (a WebSocket relay) with peers in order to 
	* establish WebRTC connections. Upon successful STUN/TURN negotiation, a WebRTCPeerConnection 
	* instance is created.
	*/
		
	function WebRtcConnector(communicator, serverId, rtcConfig)
	{
	var self = this;

	// Includes

	var WebRtcPeerConnection = null;

	if (true)
	    {
		WebRtcPeerConnection = __webpack_require__(3);
		}
	else
		WebRtcPeerConnection = window.WebRtcPeerConnection;

	var logger = console;

	// rtcConnections object is indexed with clientId, which means only one 
	// rtcPeerConnection per client

	var rtcConnections = new Object();
	var connectionReadyCallbacks = new Object();

	var ownStream = null;
	var connectionListener = null;

		
	self.setConnectionListener = function(lis)
		{
		connectionListener = lis;
		};

	self.onIceCandidate = function(iceCandidate, partnerId)
		{
		//logger.log("iceCandidate got, sending it to the other client");
		
		communicator.callRpc("callClientRpc", [partnerId, "handleIceCandidate", [iceCandidate]], self, null, serverId);
		};
		
	var createConnection = function(partnerId)
		{
		rtcConnections[partnerId]= new WebRtcPeerConnection(rtcConfig);
		rtcConnections[partnerId].setPartnerId(partnerId);
		//rtcConnections[partnerId].setId(partnerId);
		rtcConnections[partnerId].setIceListener(self);
		rtcConnections[partnerId].setStreamListener(self);
		rtcConnections[partnerId].setConnectionListener(self);
		rtcConnections[partnerId].setDataChannelListener(self);
		};



	self.shutdown = function(e)
		{
		//logger.log("WebRtcConnector::onbeforeunload");
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
		//logger.log("WebRtcConnector::handleRtcOffer() descriptor: "+descriptor);
		
		if (!rtcConnections.hasOwnProperty(partnerId))
			{
			createConnection(partnerId);
			}
			
		rtcConnections[partnerId].onConnectionOfferReceived(descriptor, partnerId, function(answer)
			{
			//logger.log("WebRtcConnector::handleRtcOffer() onConnectionOfferReceived returned");
			//logger.log("Trying to call handleRtcAnswer on partner "+partnerId);
			communicator.callRpc("callClientRpc", [partnerId, "handleRtcAnswer", [answer]], self, null, serverId);
			//logger.log("handleRtcAnswer call done on partner "+partnerId);
			});
		
		};	

	self.handleRtcAnswer = function(descriptor, partnerId, connectionId)
		{
		//logger.log("WebRtcConnector::handleRtcAnswer()");			
		rtcConnections[partnerId].onConnectionAnswerReceived(descriptor);
		};	

	self.handleIceCandidate = function(iceCandidate, partnerId, connectionId)
		{
		//logger.log("WebRtcConnector::handleIceCandidate()");			
		
			
		if (!rtcConnections.hasOwnProperty(partnerId))
			{
			createConnection(partnerId);
			}
			
		rtcConnections[partnerId].onIceCandidateReceived(iceCandidate);
		};


	// Private methods
		

	self.onDisconnected = function(partnerId)
		{
		//logger.log("WebRtcConnector::onDisconnected() ");
		if (rtcConnections.hasOwnProperty(partnerId))
			{
			var connection = rtcConnections[partnerId]; 	
			
			
			var dconns = connection.getDataChannelConnections();
			
			for (var i=0; i < dconns.length; i++)	
				communicator.onDisconnected(dconns[i]);
			
			connectionListener.onWebRtcDisconnected(partnerId);
		
			connection.close();
			delete rtcConnections[partnerId];
			}
		};


	self.onPrimaryDataChannelOpen = function(clientId, dataChannelConnection)
		{
		//logger.log("WebRtcConnector::onPrimaryDataChannelOpen() ");
		
		var connectionId = communicator.addConnection(dataChannelConnection);
		if (connectionListener)
			connectionListener.onWebRtcConnected(clientId, connectionId);
		
		if (connectionReadyCallbacks.hasOwnProperty(clientId))
			connectionReadyCallbacks[clientId].apply();
		};

	self.onAdditionalDataChannelOpen = function(clientId, dataChannelConnection)
		{
		//logger.log("WebRtcConnector::onAdditionalDataChannelOpen() ");
		
		var connectionId = communicator.addConnection(dataChannelConnection);
		
		if (connectionListener)
			connectionListener.onAdditionalDataChannelOpen(clientId, connectionId);
		};
								
	self.onStream = function(stream, partnerId)
		{
		//logger.log("WebRtcConnector::onStream()");
		};
		
	self.onRemoveStream = function(stream, partnerId)
		{
		//logger.log("WebRtcConnector::onRemoveStream()");
		self.onDisconnected(partnerId);
		};
		


	self.connectToPeer = function(partnerId, callback)
		{
		//logger.log("WebRtcConnector::connectToPeer() partnerId: " + partnerId);
		if (rtcConnections.hasOwnProperty(partnerId))
			{
			//logger.log("WebRtcConnector::connectToPeer() connection to partnerId: " + partnerId +" already exists or is under construction, not connecting again");
			return;
			}
		
		createConnection(partnerId);
		if (callback)
			connectionReadyCallbacks[partnerId] = callback;

		rtcConnections[partnerId].createConnectionOffer(function(offer)
				{
				//logger.log("Offer created, sending it to the other client "+partnerId);
				communicator.callRpc("callClientRpc", [partnerId, "handleRtcOffer", [offer]], self, null, serverId);	
				});		
		};	
		
		
	/**
	*
	* Creates an additional DataChannelConnection on top of an existing WebRtcPeerConnection,
	* and adds the connection to the RpcCommunicator.
	*
	* @clientId the id of the remote client to create the connection to
	* @callback the callback function with signature "function(connectionId)" to be called when the is ready 
	*
	*/	

	self.createDataChannelConnection = function(clientId, callback)
		{
		rtcConnections[clientId].createDataChannelConnection(function(dataChannelConnection)
			{
			//logger.log("WebRtcConnector::createDataChannelConnection() callback returned");
			
			var connectionId = communicator.addConnection(dataChannelConnection);
			callback(connectionId);
			});
		};	
		
	if (typeof window !== "undefined")
		{
		window.onbeforeunload = self.shutdown;	
		}
		
	communicator.exposeRpcMethod("handleRtcOffer", self, self.handleRtcOffer);
	communicator.exposeRpcMethod("handleRtcAnswer", self, self.handleRtcAnswer);
	communicator.exposeRpcMethod("handleIceCandidate", self, self.handleIceCandidate);
					
	}

	if (true)
		{
		module.exports = WebRtcConnector;
		}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	     		
	function WebRtcPeerConnection(rtcConfig)
	{
	var self = this;

	var RTCPeerConnection = null;
	var RTCSessionDescription = null;
	var RTCIceCandidate = null;
	var DataChannelConnection = null;


	if (true)
		{
		DataChannelConnection = __webpack_require__(4);
		
		var webrtclib = __webpack_require__(5);

		RTCPeerConnection     = webrtclib.RTCPeerConnection;
		RTCSessionDescription = webrtclib.RTCSessionDescription;
		RTCIceCandidate       = webrtclib.RTCIceCandidate;
		}

	else
		{
		DataChannelConnection = window.DataChannelConnection;
		}	

			
	if (typeof window !== "undefined")
		{	
		RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
		RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
		RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
	    }

	var logger = console;
	var id = null;
	var partnerId = null;
	var iceListener = null;
	var streamListener = null;
	var dataChannelListener = null;
	var connectionListener = null;
	var ownStream = null;
	var listener = null;

	var dataChannelConnections = new Array();

	var rtcOptions = { 'optional': [{'DtlsSrtpKeyAgreement': true}] };

	var peerConnection = new RTCPeerConnection(rtcConfig, rtcOptions);

	var primaryDataChannel = null; 		// The default datachannel that is always opened

	//var additionalDataChannels = new Object();	// Other datachannels indexed by datachannel id


	var dataChannelNumber = 0;

	// --------------- DataChannel -related functions

	/**
	*
	* Creates a new DataChannelConnection on an existing WebRtcPeerConnection
	*
	* @param callback the callback function with signature "function(dataChannelConnection)" to be called on success
	*
	*
	*/

	self.createDataChannelConnection = function(callback)
		{
		dataChannelNumber++;
		
		var channel = peerConnection.createDataChannel(dataChannelNumber, {reliable: true});
		channel.onopen = function()
			{
			//console.log("WebRtcPeerConnection::channel.onopen");	
			
			//callback(newChannel);	
			};
		
		channel.binaryType = "arraybuffer";
		
		//logger.log("WebRtcPeerConnection::createDataChannelConnection()");	
		
		// This additional handshake is required because of a bug in node-wrtc
		// that prevents onopen to firing
		
		channel.onmessage = function()
			{
			var newChannel = new DataChannelConnection(channel);
			dataChannelConnections.push(newChannel);
			callback(newChannel);	
			};
			
		//additionalDataChannels[channel.id] = channel;
		};


	// If we receive a data channel from somebody else, this gets called

	peerConnection.ondatachannel = function (e) 
		{
	    var temp = e.channel || e; // Chrome sends event, FF sends raw channel
	    //logger.log("WebRtcPeerConnection::ondatachannel() "+temp);
	    
	    temp.binaryType = "arraybuffer";
	    
	    if (primaryDataChannel == null)
	    	{
	    	primaryDataChannel = new DataChannelConnection(temp);
	    	
	    	
	    	temp.onopen = self.onPrimaryDataChannelOpen;
	    	}
	   
	   else
			{
			var additionalDataChannel = new DataChannelConnection(temp);
			
			
			
			temp.onopen = function()
				{
				//logger.log("WebRtcPeerConnection::temp.onopen");	
				
				// This additional handshake is required because of a bug in node-wrtc
				// that prevents onopen to firing
				temp.send("OK");
				
				dataChannelConnections.push(additionalDataChannel);
				
				if (dataChannelListener)
					dataChannelListener.onAdditionalDataChannelOpen(partnerId, additionalDataChannel);
				}
			}
				
		//dataChannel.onmessage = self.onMessage;		
		};


		
	self.onPrimaryDataChannelOpen = function(e)
		{
		//logger.log("WebRtcPeerConnection::onPrimaryDataChannelOpen "+e);
		
		//primaryDataChannel.binaryType = "arraybuffer";
		//primaryDataChannel.onclose = self.onPrimaryDataChannelClosed;
		
		//dataChannel.onmessage = self.onMessage;
		
		dataChannelConnections.push(primaryDataChannel);
		
		if (dataChannelListener)
			dataChannelListener.onPrimaryDataChannelOpen(partnerId, primaryDataChannel);
		};

	self.onAdditionalDataChannelOpen = function(e)
		{
		//logger.log("WebRtcPeerConnection::onAdditionalDataChannelOpen "+e);
		
		//if (dataChannelListener)
		//	dataChannelListener.onAdditionalDataChannelOpen(partnerId, primaryDataChannel);
		};	
		
	self.getDataChannelConnections = function()
		{
		return dataChannelConnections;
		};	
		
	self.onPrimaryDataChannelClosed = function(e)
		{
		//logger.log("WebRtcPeerConnectiononDataChannelClosed "+e);
		connectionListener.onDisconnected(partnerId);
		}

	self.setDataChannelListener = function(lis)
		{
		dataChannelListener = lis;
		};

		
	//---------------- DataChannel -related functions end




	var onsignalingstatechange = function(state) 
		{
	    //console.info('signaling state change:', state);
		//if ( connectionListener && peerConnection.signalingState == "closed")
		//	connectionListener.onDisconnected(partnerId);
		}

	var oniceconnectionstatechange = function(state) 
		{
	    //console.info('ice connection state change:', state);
	   	if ( connectionListener && (peerConnection.iceConnectionState == "disconnected" || peerConnection.iceConnectionState == "closed"))
			connectionListener.onDisconnected(partnerId);
		};

	var onicegatheringstatechange = function(state) 
		{
	    //console.info('ice gathering state change:', state);
		};

	var onIceCandidate = function(e)	
		{
		//logger.log("WebRtcPeerConnectiononIceCanditate() partnerId: "+partnerId+" event: "+ e);
		
		//logger.log("iceListener oli "+iceListener);
		
		//A null ice canditate means that all canditates have
	    //been given
		
		if (e.candidate == null) 
	    	{
	        //logger.log("All Ice candidates listed");
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
		//logger.log("WebRtcPeerConnectionclose");	
		//peerConnection.removeStream(ownStream);
		   
		
		//if (dataChannel && dataChannel.readyState != "closing" && dataChannel.readyState != "closed")
		//	dataChannel.close();
		
		if (peerConnection.signalingState != "closed" || peerConnection.signalingState != "closing")
			peerConnection.close();
		};

		
	self.getPartnerId = function()
		{
		//logger.log("WebRtcPeerConnectiongetPartnerId() "+partnerId);
		return partnerId;
		};
						
	self.setPartnerId = function(id_)
		{
		partnerId = id_;
		};

	self.setIceListener = function(lis)
		{
		iceListener = lis;
		//peerConnection.onicecandidate = function(cand) {self.onIceCandidate(cand);};
		//logger.log("WebRtcPeerConnectionsetIceListener()"+ lis);
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
		//logger.log("WebRtcPeerConnectiononStream"+ e);
		streamListener.onStream(e.stream, partnerId);
		}
		
	self.onRemoveStream = function(e)
		{	
		//logger.log("WebRtcPeerConnectiononStream"+ e);
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
		
		var channel = peerConnection.createDataChannel("jsonrpcchannel", {reliable: true});
		
		channel.binaryType = "arraybuffer";
		channel.onopen = self.onPrimaryDataChannelOpen;
		
		primaryDataChannel = new DataChannelConnection(channel);
		
				
		peerConnection.createOffer(function (desc)
			{
			//logger.log("peerConnection::createOffer called its callback: "+ desc);
	    	localDescription = desc;
	    	
	    	/*
	    	peerConnection.onicecandidate = function(e)
	    		{
	    		logger.log(e.candidate);
	    		if (e.candidate == null) 
	    			{
	        		logger.log("All Ice candidates listed");
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
	    									logger.log("WebRtcPeerConnectioncreateConnectionOffer() setLocalDescription error");
	    									},								
	    								{});
	    	},function(err) {logger.log(err);}); 
	    };	

	//Interface for messages coming from the partner ove websocket

	self.onConnectionAnswerReceived = function(descriptor)
		{
		//logger.log("WebRtcPeerConnectiononConnectionAnswerReceived(), descriptor: "+descriptor);
		
		peerConnection.setRemoteDescription(new RTCSessionDescription(descriptor),function()
			{
			//logger.log("WebRtcPeerConnectiononConnectionAnswerReceived() setRemoteDescription returned OK");
			}, 
			function(err) 
				{logger.log("WebRtcPeerConnectiononConnectionAnswerReceived() setRemoteDescription returned error "+err);}  );
		
		};
		
		
	self.onConnectionOfferReceived = function(descriptor, connectionId, callback)
		{
		//logger.log("WebRtcPeerConnectiononConnectionOfferReceived");
		
		//logger.log("WebRtcPeerConnectiononConnectionOfferReceived trying to set remote description");	
		var desc = new RTCSessionDescription(descriptor);
		peerConnection.setRemoteDescription(desc, function() 
			{
			//logger.log("WebRtcPeerConnectiononConnectionOfferReceived remote description set");
			peerConnection.createAnswer(function (answer) 
					{
					/*
					peerConnection.onicecandidate = function(e)
	    				{
	    				if (e.candidate == null) 
	    					{
	        				//logger.log("All Ice candidates listed");
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
						function(err) { logger.log(err); } 
						);
					},
					function(err) { logger.log(err); }
					);	
			}, function(err) {logger.log("WebRtcPeerConnectiononConnectionOfferReceived setting remote description failed "+err);}
			
			);
		
		};
		
	self.onIceCandidateReceived = function(iceCandidate)
		{	
		peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate),
	            function () {
		            //logger.log("WebRtcPeerConnectiononIceCandidateReceived adding Ice candidate succeeded");
		            },  
	            function(err) {logger.log("WebRtcPeerConnectiononIceCandidateReceived adding Ice candidate failed "+err);});
		};         	
		
	}

	if (true)
		{
		module.exports = WebRtcPeerConnection;	
		}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	     		
	function DataChannelConnection(dataChannel)
	{
	var self = this;

	var logger = console;

	var id = null;
	var listener = null;



	// Connection interface implementation	
	self.send = function(message)
		{
		//logger.log("DataChannelConnection::send()" +message);
		try	{
			if (dataChannel.readyState == "open")
				{
				dataChannel.send(message);
				}
			}
		catch(e)
			{
			logger.log(e);
			}	
		};
		
	self.close = function()
		{
		//console.log("DataChannelConnection::close");	
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

	self.getBufferedAmount = function()
		{
		return dataChannel.bufferedAmount;
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
		
		
	self.setListener = function(lis)
		{
		listener = lis;
		};	
		

	// Downwards interface towards the DataChannel
	self.onMessage = function(message)	
		{
		//logger.log("DataChannelConnection::onMessage() ");
		//logger.log("DataChannelConnection::onMessage "+message.data);
		try	{
			if (listener)
				listener.onMessage(message.data, self);
			}
		catch (e)
			{
			console.log(e);
			}	
		};

	// Dummy implementation for websocket compatibility

	self.setPipedTo = function(targetId)
		{
		};
		
	self.getPipedTo = function()
		{
		return null;
		};		


	dataChannel.onmessage = self.onMessage;
	}


	// Do this only in node.js, not in the browser

	if (true)
		{
		module.exports = DataChannelConnection;
		}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
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
		RpcCommunicator = __webpack_require__(7);
		WebSocketConnection = __webpack_require__(9);
		Client = __webpack_require__(1);
		WebRtcConnector = __webpack_require__(2);
		}
	else
		{
		RpcCommunicator =  window.RpcCommunicator;
		WebSocketConnection = window.WebSocketConnection;
		Client = window.Client; 
		WebRtcConnector = window.WebRtcConnector;
		}


	var logger = console;

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


	/*
	* Implementation of the ClientCommunicator Interface
	*/
	//----------------------------------------------------------------------

	/**
	* Calls an JSON-RPC method on a remote client identified by clientId. The fastest available connection is is
	* used for making the call, and callback will be called when the RPC call returns
	*
	* @param clientId The id of the client the RPC call should be made on.
	* @param methodName The name of the RPC method to be called.
	* @param params An Array of parameters to be passed to the RPC method 
	* @param obj The "this" parameter to be used when the callback is called
	* @param callback Reference to the callback function.
	*  
	*/ 

	self.callRpcOnClient = function(clientId, methodName, params, obj, callback)
		{
		//logger.log("CommunicationClient::callRpcOnClient() clientId: "+clientId + " methodName: "+methodName);
		
		if (clients.hasOwnProperty(clientId))
			{
			// Call through webrtc
			if (clients[clientId].isWebRtc())
				{
				//logger.log("Calling client RPC through WebRtc, preferredConnectionId was: "+clients[clientId].getPreferredConnectionId());
				params.push(ownId);
				communicator.callRpc(methodName, params, obj, callback,  clients[clientId].getPreferredConnectionId());	
				}
			//call though a local hub
			else if (clients[clientId].isLocalHub())
				{
				//logger.log("Calling client RPC through local hub");
				communicator.callRpc("callClientRpc", [clientId, methodName, params], obj, callback, clients[clientId].getPreferredConnectionId());
				}
			else
				{
				// call through the server
				//logger.log("Notifying client RPC through the server");
				communicator.callRpc("callClientRpc", [clientId, methodName, params], obj, callback, serverId);
				}	
			}
		};


	/**
	* Calls an JSON-RPC method on a connection created by createDirectConnection() call.
	* In practice, the connection is either a WebSocket pipe, or a WebRTC DataChannelConnection. 
	* A callback will be called when the RPC call returns
	*
	* @param connectionId The id of the connection the RPC call should be made on.
	* @param methodName The name of the RPC method to be called.
	* @param params An Array of parameters to be passed to the RPC method 
	* @param obj The "this" parameter to be used when the callback is called
	* @param callback Reference to the callback function.
	*  
	*/ 

	self.callRpcOnConnection = function(connectionId, methodName, params, obj, callback)
		{
		//logger.log("CommunicationClient::callRpcOnConnection() connectionId: "+connectionId + " methodName: "+methodName);
		
		//logger.log("Making a RPC call over direct connection");
		params.push(ownId);
		communicator.callRpc(methodName, params, obj, callback, connectionId);	
		};

	/**
	* Makes a JSON-RPC notification (= void function call)  on a remote client identified by clientId. 
	* The fastest available connection is is used for making the call.
	*
	* @param clientId The id of the client the RPC call should be made on.
	* @param methodName The name of the RPC method to be called.
	* @param params An Array of parameters to be passed to the RPC method  
	*/ 

	self.notifyClient = function(clientId, methodName, params)
		{
		//logger.log("CommunicationClient::notifyClient() clientId: "+clientId + " methodName: "+methodName);
		
		if (clients.hasOwnProperty(clientId))
			{
			// Call through webrtc
			if (clients[clientId].isWebRtc())
				{
				//logger.log("Notifying client through WebRtc");
				params.push(ownId);
				communicator.callRpc(methodName, params, null, null,  clients[clientId].getPreferredConnectionId());	
				}
			//call though a local hub
			else if (clients[clientId].isLocalHub())
				{
				//logger.log("Notifying client through local hub");
				communicator.callRpc("callClientRpc", [clientId, methodName, params], null, null, clients[clientId].getPreferredConnectionId());
				}
			else
				{
				// call through the server
				//logger.log("Notifying client through the server");
				communicator.callRpc("callClientRpc", [clientId, methodName, params], null, null, serverId);
				}	
			}
		
		};

	/**
	* Sends binary data over a connection created by createDirectConnection() call.
	* In practice, the connection is either a WebSocket pipe, or a WebRTC DataChannelConnection 
	*
	* @param connectionId The id of the connection the data should be sent on.
	* @param methodName The data to be sent as a ArrayBuffer
	*  
	*/ 

	self.sendBinaryOnConnection = function(connectionId, data)
		{
		communicator.sendBinary(data, connectionId);
		};
		
	/**
	* 
	* Returns the connected remote clients of a specific application-defined type.
	*
	* @param clientType a application-defined String representing the client type such as "screen" or "controller"
	* @return the found clients of the requested type as an Object that is indexed by clientId.
	*  
	*/ 	
		
	self.getClientsByType = function(clientType)
		{
		return clientsByType[clientType];
		};	
		
		
	/**
	* 
	* Returns type of connection the specific client is connected with.
	*
	* @param clientId the id of the client
	* @return the type of the connection
	*  
	*/ 		
		
	self.getConnectionType = function(clientId)
		{
		return clients[clientId].getConnectionType();
		};

	/**
	* 
	* Tries to upgrade the connectionType of the client to WebRtc.
	*
	* @param clientId the id of the client
	* @param callback the callback "function(clientId, connectionId)" to be called when the WebRtc connection is ready
	*  
	*/ 	

	self.upgradeToWebRtc = function(clientId, callback)
		{
		//logger.log("CommunicationClient::upgradeToWebRtc() + clientId: " + clientId);
		if (!clients[clientId].isWebRtc())
			rtcConnector.connectToPeer(clientId, callback);
		};	
		
	/**
	* 
	* Returns the amount of outgoing data buffered on this particular connection.
	*
	* @param connectionId the id of the connection
	* @return the amount of outgoing data buffered on the connection 
	*/ 	
			 
	self.getBufferedAmount = function(connectionId)
		{
		return communicator.getConnection(connectionId).getBufferedAmount();
		};
		
		
	/**
	*
	* Creates a direct connection to a remote client using the fastest available connection type.
	* The direct connection can be subsequently used for both JSON-RPC and binary communication with the remote client.
	* Note, that creating a direct connection is only REQUIRED for binary communication, and creating
	* such a connection merely for JSON-RPC communications brings no benefits. In JSON-RPC use,
	* using callRpcOnClient() is just as fast.  
	*
	* @param clientId the id of the client to be connected to
	* @param callback the callback with signature "function(err, connectionId)" to be called on success or failure
	*/	

	self.createDirectConnection = function(clientId, callback)
		{
		if (clients[clientId].isWebRtc())
			{
			rtcConnector.createDataChannelConnection(clientId, function(connectionId)
				{
				//logger.log("CommunicationClient::createDirectConnection() callback returned connectionId: "+connectionId);
				pipes[connectionId] = clientId;
				callback(connectionId)
				});
			
			}
		else
			createPipe(clientId, callback);
		};
		
	//----------------------------------------------------------------------------------	
	// Implementation of the ClientCommunicator Interface ends



	// Listener Interface for the WebRtcConnector

	/**
	*
	* This callback gets called by the WebRtcConnector when WebRtc connection is established to
	* a remote client. This may happen either spontaneously (ie. initiated by the remote client) or 
	* or as a result of calling connectToPeer() on the WebRtcConnector.
	*
	* @param clientId the id of the remote client the connection was established with
	* @connectionId the id of the default DataChannelConnection connected to the remote client over the communicator 
	*
	*/

	self.onWebRtcConnected = function(clientId, connectionId)
		{
		//logger.log("CommunicationClient::onWebRtcConnected()");
		
		if (clients.hasOwnProperty(clientId))
			{
			clients[clientId].setWebRtc(true);
			clients[clientId].setPreferredConnectionId(connectionId);
			}
			
		if (connectionTypeListener)
			connectionTypeListener.onConnectionTypeUpdated(clients[clientId], clients[clientId].getConnectionType());
		};
		
	self.onWebRtcDisconnected = function(partnerId)
		{	
		//logger.log("CommunicationClient::onWebRtcDisconnected()");
		
		// ToDo: fallback to websockets if possible!!
		};
		

	self.onAdditionalDataChannelOpen = function(clientId, connectionId)
		{
		//logger.log("CommunicationClient::onAdditionalDataChannelOpen()");
		pipes[connectionId] = clientId;
		};	
		


	var createPipe = function(clientId, callback)
		{
		//logger.log("CommunicationClient::createPipe() + peerId: " + clientId);
		
		var pipeConnection =  new WebSocketConnection();
		var pipeId;
		
		pipeConnection.connect(serverConnectionOptions, function()
			{
			//logger.log("Pipe connected to the websocket server");
			
			pipeId = communicator.addConnection(pipeConnection);			
			
			communicator.callRpc("constructPipe", [clientId, ownId], self, function()
				{
				//logger.log("CommunicationClient::createPipe() pipe construction ready");	
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
		//logger.log("CommunicationClient::requestPipe()");
		
		var pipeConnection =  new WebSocketConnection();
		var pipeId = null;
		
		
						
		pipeConnection.connect(serverConnectionOptions, function()
			{
			//logger.log("Pipe connected to the websocket server");
			
			pipeId = communicator.addConnection(pipeConnection);			
			
			communicator.callRpc("registerAsPipe", [targetId], self, function(err,data)
				{
				//logger.log("registerAsPipe returned");
				
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

		
	// --------------------------


	// BinaryListener Interface

	self.onBinary = function(data, connectionId)
		{
		//logger.log("CommunicationClient::onBinary(), bytelength: "+data.byteLength);
		//logger.log("CommunicationClient::onBinary() from "+connectionId +" data: "+ab2str(data));
		
		if (binaryListener)
			{
			if (pipes.hasOwnProperty(connectionId))
				binaryListener.onBinary(data, pipes[connectionId], connectionId);
			else
				binaryListener.onBinary(data, connectionId);
			}
		};

	// --------------------------




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
		//logger.log("CommunicationClient::updateConnectedClients()");
		var id = serverId;
		
		if (hubId)
			id = hubId;
			
		communicator.callRpc("getConnectedClients", [groupId], self, function(err, connectedClients)
			{
			//logger.log("CommunicationClient::getConnectedClientsFromHub() got answer from hub: "+JSON.stringify(connectedClients));
			var client = null;
			for (var i in connectedClients)
				{
				if (!clients.hasOwnProperty(i) && connectedClients[i].clientId!= ownId)
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
		//logger.log("CommunicationCLient::connectToLocalHubs()");
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
					//logger.log("Connected to local hub at ip: "+ip+" port: "+port);
					hubId = communicator.addConnection(connection);
					
					localHubs[hubId] = hubId;
					
					// Connected to the local hub, check which other clients are connected to this hub
					updateConnectedClients(hubId, function()
						{
						communicator.callRpc("registerAsClient", [ownId, clientType, groupId], self, function(err, givenId)
							{
							//logger.log("CommunicationClient::connectToLocalHubs() registered as client at local hub at ip: "+ip+" port: "+port);
							});	
						});
					});
				}
			}
		callback();		
		};

	var updateLocalHubs = function(callback)
		{
		//logger.log("Getting list of local hubs from the server");
		communicator.callRpc("getLocalHubs", [], self, function(err, hubs)
			{
			//logger.log("Following local hubs are available: "+JSON.stringify(hubs));
			if (hubs)
				connectToLocalHubs(hubs, callback);
			else
				callback();
			}, serverId);
		};
		
	self.exposeRpcMethod = function(name, object_, method_)
		{
		communicator.exposeRpcMethod(name, object_, method_);
		};

	self.connectWithOptions = function(options, clientType_, groupId_, callback)
		{
		//logger.log("CommunicationClient::connectWithOptions()");
		clientType = clientType_;
		groupId = groupId_;
		
		communicator.setBinaryListener(self);
		
		if (!options.hasOwnProperty("id"))
			options.id = null;
		
		serverConnectionOptions = options;
						
		serverConnection.connect(serverConnectionOptions, function()
			{
			//logger.log("connected to the websocket server");
			
			serverId = communicator.addConnection(serverConnection);			
			
			rtcConnector = new WebRtcConnector(communicator, serverId, LoaderUtil.WEBRTC_CONFIG);
			rtcConnector.setConnectionListener(self);		
			
			communicator.callRpc("registerAsClient", [null, clientType, groupId], self, function(err, givenId)
				{
				//logger.log("Server replied to registerAsClient call: '"+ givenId+ "'");
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
		//logger.log("CommunicationClient::onClientConnected() from connectionId: "+connectionId);
		//logger.log("CommunicationClient::onClientConnected() localHubs was:");
		//console.dir(localHubs);
		
		//logger.log("CommunicationClient::onClientConnected(), ownId: "+ownId+", newClient: '"+ JSON.stringify(clientData) +"'");
		
		if (clientData.clientId == ownId)
			return;
				
		if (localHubs.hasOwnProperty(connectionId))
			{
				
			//logger.log("CommunicationClient::onClientConnected() client connected through localhub, clientId: "+clientData.clientId);
			
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
		//logger.log("CommunicationClient::onClientDisconnected() '"+ JSON.stringify(clientData) +"'");
		
		if (clients.hasOwnProperty(clientData.clientId) && clientListener && clientData.clientId != ownId)
			{
			clientListener.onClientDisconnected(clients[clientData.clientId]);
			removeClient(clientData.clientId);
			}
		};
			
	self.onHubConnected = function(hubData, connectionId, callback)
		{
		//logger.log("CommunicationClient::onHubConnected() '"+ JSON.stringify(hubData) +"'");
		};
		
	self.onHubDisconnected = function(hubData,  connectionId, callback)
		{
		//logger.log("CommunicationClient::onHubDisconnected() '"+ JSON.stringify(hubData) +"'");
		};	

	self.getConnectedClients = function()
		{
		return clients;
		};

	self.getOwnId = function()
		{
		return ownId;
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
/* 7 */
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
		CallbackBuffer = __webpack_require__(8);
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
				//console.log("Exception in executing a RPC method: " + code + " EngineIoCommunicator::onMessage() >> " + path + " " + msge);		
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
		//console.log(message);
		try	{
			var error = null;
			var result = null;
		
			if (typeof message.error !== "undefined")
				error = message.error;

			if (typeof message.result !== "undefined")
				result = message.result;
		
			if (message.id)
				callbackBuffer.callMethodAndPop(message.id, error, result);
			//else
				//console.log("RpcCommunicator::handleReturnValue() error: "+JSON.stringify(error));
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
		};


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
			
				//console.log("RpcCommunicator::callRpc() pushed back callback");
			
				if (typeof connectionId !== "undefined")						
					sendMessage({"jsonrpc": "2.0", "method": method, "params": params, "id": ""+callSequence}, connectionId);	
				else
					sendMessage({"jsonrpc": "2.0", "method": method, "params": params, "id": ""+callSequence}, latestConnectionId);	//assume there is only one connection	
			
				//console.log("RpcCommunicator::callRpc() sendMessage returned");
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
				//console.log("RpcCommunicator::notifyAll() sending message to "+key);
				sendMessage({"jsonrpc": "2.0", "method": method, "params": params, "id": null}, key);
				}
			//console.log("RpcCommunicator::notifyAll() sending messages completed");
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

	self.setupPipe = function(firstId, secondId)
		{
		//console.log("RpcCommunicator::setupPipe() between: "+firstId+" and "+secondId);
		
		if (!connections.hasOwnProperty(firstId) || !connections.hasOwnProperty(secondId))  
			return;
		
		connections[firstId].setPipedTo(secondId);
		connections[secondId].setPipedTo(firstId);
		};

	self.closeConnection = function(connectionId)
		{
		try	{
			if (connectionId in connections)
				{
				connections[connectionId].close();
				delete connections[connectionId];

				//if(typeof options.connectionListener == "function")		// External connection listener
				//options.connectionListener("close", {remoteAddress: connection.remoteAddress, remotePort: connection.remotePort, origin: connection.origin, id: connection.id});
				}
			}
		catch(e)
			{
			console.log(e);
			}		
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
				//console.log("RPCCommunicator::onMessage() relaying a piped message");
				
				connections[pipeTarget].send(messageData);
				return;
				}
				
			if (messageData instanceof ArrayBuffer)
				{
				//console.log("RPCCommunicator::onMessage() received arraybuffer");
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
			//console.log("RpcCommunicator::addConnection, connectionid was "+conn.getId());	
		
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

	}

	// Do this only in node.js, not in the browser

	if (true)
		{
		module.exports = RpcCommunicator;
		}


/***/ },
/* 8 */
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
/* 9 */
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
		
		WebSocket = __webpack_require__(10);
		
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
		
	var logger = console;	
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
		//logger.log("WebSocketConnection::connect()");
		options.protocol = (!options.isSsl ? "ws" : "wss");	
		
		try	{	
			var url = options.protocol + "://" + options.host + ":" + options.port + "/"+"json-rpc";

			if (options.id)
				url += "?id="+options.id;
			
			//logger.log("WebSocketConnection::connect()" + url);
			socket = new WebSocket(url, "json-rpc", null, null, (options.isSsl ? { rejectUnauthorized: false } : null));

			socket.binaryType = "arraybuffer";	
			socket.onopen = function() {callback(null); }; 
			socket.onmessage = onMessageEvent;
			socket.onclose = function(reasonCode, description) {onSocketClosed(reasonCode, description, self);};	
			}
		catch (e)
			{
			logger.log(e);
			}
		};

	//For server-side node.js use only

	self.setSocket = function(val) 
		{
		//logger.log("WebSocketConnection::setSocket()");	
		try	{
			socket = val;		
			socket.on("message", onMessage);
			socket.on("close", function(reasonCode, description) {onSocketClosed(reasonCode, description, self);});
			}
		catch (e)
			{
			logger.log(e);
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
		//logger.log("WebSocketConnection::onMessage() "+JSON.stringify(message));	
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
			logger.log(e);
			}	
		};

	var onMessageEvent = function(event)
		{
		//logger.log("WebSocketConnection::onMessageEvent() " + JSON.stringify(event.data)); 
		try	{
			if (listener)
				listener.onMessage(event.data, self);
			}
		catch(e)
			{
			logger.log(e);
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
			logger.log(e);
			}	
		};
		
	self.send = function(message)
		{
		try	{
			socket.send(message);	
			}
		catch(e)
			{
			logger.log(e);
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
			logger.log(e);
			}	
		};
	}

	if (true)
		{
		module.exports = WebSocketConnection;	
		}


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

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
		RpcCommunicator = __webpack_require__(7);
		WebSocketConnection = __webpack_require__(9);
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
			//console.log("WebSocketRpcConnection::connect()");
			connection.connect(options, function()
				{
				//console.log("WebsocketRpcConnection Connected");	
				//console.log("Creating RPCCommunicator for the Websocket");
								
				communicator.addConnection(connection);
				
				//console.log("WebsocketRpcConnection added to communicator");   
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
	                        

/***/ }
/******/ ])
});
;"use strict"

function HttpParser()
{
var self = this;

var header = null;
var headerSize = 0;
var contentBegin = null;
var rawHeaders = "";
var headerValues = {};

var statusCode = null;
var statusText = null;

var logger = console;

self.getStatusCode = function()
	{
	return parseInt(statusCode);
	};

self.getStatusText = function()
	{
	return statusText;
	};

self.getContentBegin = function()
	{
	return contentBegin;
	};

self.getHeaderSize = function()
	{
	return headerSize;
	}

self.getHeaderValueAsInt = function(key)
	{
	key = key.toLowerCase();

	if (headerValues.hasOwnProperty(key))
		{
		return parseInt(headerValues[key]);
		}
	else
		return null;
	};

self.getHeaderValue = function(key)
	{
	key = key.toLowerCase();

	if (headerValues.hasOwnProperty(key))
		{
		return headerValues[key];
		}
	};

self.getHeaders = function()
	{
	return headerValues;
	};

self.getRawHeaders = function()
	{
	return rawHeaders;
	};

var findContentBegin = function(arr)
	{
	for (var i = 0; i < arr.byteLength; i+=1)
		{
		if ((i + 4) < arr.byteLength && arr[i] == 13 && arr[i + 1] == 10 && arr[i + 2] == 13 && arr[i + 3] == 10)
			{
			contentBegin = i + 4;
			//logger.log(arr[contentBegin]);
			break;
			}
		}

	headerSize = (!contentBegin ? arr.byteLength : contentBegin);
	};

var parseHeader = function(arr)
	{
	rawHeaders = "";
	headerValues = {};

	if (contentBegin)
		header = String.fromCharCode.apply(null, arr.subarray(0, contentBegin));
	else
		header = String.fromCharCode.apply(null, arr);

	//logger.log("Trying to parse header: " + header);
	var rows = header.split("\n");

	var firstRow = rows[0].split(" ");
	statusCode = firstRow[1];
	statusText = (firstRow.length >= 3 ? firstRow[2] : "OK");

	var item = null;

	for (var i = 1; i < rows.length; i++)
		{
		var separatorIndex = rows[i].indexOf(":");

		if (separatorIndex > -1)
			{
			var hkey = rows[i].substring(0, separatorIndex);
			hkey = hkey.toLowerCase();

			var hvalue = "";
			if (rows[i].length > separatorIndex)
				hvalue = rows[i].substring(separatorIndex + 1).trim();

			// XMLHttpRequest.getResponseHeader() style comma-space pair separator for multi-headers like Set-Cookie
			headerValues[hkey] = (hkey in headerValues ? headerValues[hkey] + ", " + hvalue : hvalue);

			rawHeaders += (rawHeaders != "" ? "\r\n" : "") + hkey + ": " + hvalue;
			}
		}

	//logger.dir(headerValues);
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
"use strict"

/**
 * Implements the XMLHttpRequest interface.
 * References the GLOBAL variable piperClient to implement its functionality
 *
 * Logics / comments from https://xhr.spec.whatwg.org/ and https://developer.mozilla.org/
 *
 * Not implemented:
 *   XMLHttpRequestUpload object
 *   CORS
 *   Synchronous load
 *
 * Object.defineProperty() for read-only properties???
 */

/*var handler = {
	get: function(target, property, receiver)
		{
		console.log("\nGET PROXY: ", property, target.responseURL);
		return target[property];
		},

	set: function(target, property, value, receiver)
		{
		console.log("\SET PROXY:", property + "=" + value);

		target[property] = value;

		return true;
		},

	apply: function(target, thisArg, argumentsList)
		{
		console.log("\APPLY PROXY:");
		}
	};*/

function SpXMLHttpRequest()
{
var self = this;

var xhr = (SpXMLHttpRequest.OriginalXMLHttpRequest ? new SpXMLHttpRequest.OriginalXMLHttpRequest() : null);

var logger = console;

	// Includes -- -- -- -- -- -- -- -- -- -- //
var URL = null;
var HttpParser = null;
var piperClient = null;
//var LoaderUtil = null;

if (typeof exports !== "undefined")
	{
	URL = require("urlutils");
	HttpParser = require("./httpparser");
	LoaderUtil = require("./loaderutil");
	piperClient = LoaderUtil.piperClient;
	}
else
	{
	URL = window.URL;
	HttpParser = window.HttpParser;
	//LoaderUtil = new window.LoaderUtil();
	piperClient = LoaderUtil.piperClient;
	}

var httpParser = new HttpParser();

	// Stored method arguments and xhr state information (flags) -- -- -- -- -- -- -- -- -- -- //
var url = "";
var parsedUrl = "";
var method = "GET";
var username = null;
var password = null;

var openFlag = false;
var sendFlag = false;
var redirectingFlag = false;
var synchronousFlag = false;
var stopTimeoutFlag = false;
var uploadListenerFlag = false;
var uploadCompleteFlag = false;

var timeoutId = null;
var milliseconds = 0;

var body = null;

	// Connection / Network -- -- -- -- -- -- -- -- -- -- //
var responseArrayBuffer = null;
var responseBlob = null;
var responseDocument = null;
var responseJSON = null;

var contentType = null;
var contentLength = null;
var bodyBytesReceived = 0;
var overridedMimeType = null;
var authorRequestHeaders = [];

var allowedHttpHeaderMethods = ["GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"];
var blockedHttpHeaderHeaders = ["CONNECT", "TRACE", "TRACK"];

var port = "80";
var host = "localhost";
var hostname = "localhost";

var request = "";
var TerminationReason = { none: "", abort: "end-user abort", fatal: "fatal", timeout: "timeout" };
var ResponseType = { basic: "basic", cors: "cors", default: "default", error: "error", opaque: "opaque", opaqueredirect: "opaqueredirect" };
var response =	{
				type: ResponseType.default,
				terminationReason: TerminationReason.none,
				url: null,
				urlList: [],
				status: 200,
				statusText: "OK",
				headers: {},
				body: null,
				trailer: {},
				httpsState: "none",
				CSPList: [],
				CORSExposedHeaderNameList: [],
				locationURL: null // (null, failure, or a URL)
				};

var bytesToTransmit = 0;
var transmittedBytes = 0;

	// Internal constants / Variables -- -- -- -- -- -- -- -- -- -- //

/*enum*/var XMLHttpRequestResponseType = {	DOMSTRING: "",
											BLOB: "blob",
											JSON: "json",
											TEXT: "text",
											DOCUMENT: "document",
											ARRAYBUFFER: "arraybuffer",
											MOZ_BLOB: "moz-blob",									// Non-standard
											MOZ_CHUNKED_TEXT: "moz-chunked-text",
											MOZ_CHUNKED_ARRAYBUFFER: "moz-chunked-arraybuffer",
											MS_STREAM: "ms-stream" };

var forbiddenHeaderNames  = "^(Accept-Charset)$|^(Accept-Encoding)$|^(Access-Control-Request-Headers)$|^(Access-Control-Request-Method)$|";
	forbiddenHeaderNames += "^(Connection)$|^(Content-Length)$|^(Cookie)$|^(Cookie2)$|^(Date)$|^(DNT)$|^(Expect)$|^(Host)$|^(Keep-Alive)$|";
	forbiddenHeaderNames += "^(Origin)$|^(Referer)$|^(TE)$|^(Trailer)$|^(Transfer-Encoding)$|^(Upgrade)$|^(Via)$|^(Proxy-.*)|^(Sec-.*)";
	forbiddenHeaderNames = new RegExp(forbiddenHeaderNames, "i");

	// XHR variables - set default values
self.readyState = SpXMLHttpRequest.UNSENT;
self.response = "";
self.responseText = null;
self.responseType = XMLHttpRequestResponseType.DOMSTRING;
self.responseURL = "";
self.responseXML = null;
self.status = 0;
self.statusText = "";
self.timeout = 0;
self.withCredentials = false;
self.upload = 	{	// The upload process
				onabort: null,
				onerror: null,
				ontimeout: null,
				onprogress: null,
				onloadstart: null,
				onload: null,
				onloadend: null
				};

	// XHR events - onloadstart -> onprogress -> onload || onerror -> onloadend
self.onabort = null;				// When the fetch has been aborted. For instance, by invoking the abort() method.
self.onerror = null;				// The fetch failed.
self.ontimeout = null;				// The author specified timeout has passed before the fetch completed.
self.onprogress = null;				// Transmitting data.
self.onloadstart = null;			// The fetch initiates.
self.onload = null;					// The fetch succeeded.
self.onloadend = null;				// The fetch completed (success or failure).
self.onreadystatechange = null;		// The readyState attribute changes value, except when it changes to UNSENT.
var eventListeners = {};
var eventListenerTypes = ["abort", "error", "timeout", "progress", "loadstart", "load", "loadend", "readystatechange"];

	// REAL XHR EVENT HANDLERS
var onTimeOut = function(e)
	{
	getXhrAttributes();

	//logger.log("SpXMLHttpRequest::onTimeOut()");

	if (typeof self.ontimeout == "function")
		self.ontimeout(e);
	};

var onProgress = function(e)
	{
	getXhrAttributes();

	//logger.log("SpXMLHttpRequest::onProgress()");

	if (typeof self.onprogress == "function")
		self.onprogress(e);
	};

var onAbort = function(e)
	{
	getXhrAttributes();

	//logger.log("SpXMLHttpRequest::onAbort()");

	if (typeof self.onabort == "function")
		self.onabort(e);
	};

var onError = function(e)
	{
	getXhrAttributes();

	//logger.log("SpXMLHttpRequest::onError()");

	if (typeof self.onerror == "function")
		self.onerror(e);
	};

var onLoadStart = function(e)
	{
	getXhrAttributes();

	//logger.log("SpXMLHttpRequest::onLoadStart()");

	if (typeof self.onloadstart == "function")
		self.onloadstart(e);
	};

var onLoad = function(e)
	{
	getXhrAttributes();

	//logger.log("SpXMLHttpRequest::onLoad()");

	if (typeof self.onload == "function")
		self.onload(e);
	};

var onLoadEnd = function(e)
	{
	getXhrAttributes();

	//logger.log("SpXMLHttpRequest::onLoadEnd()");

	if (typeof self.onloadend == "function")
		self.onloadend(e);
	};

var onReadyStateChange = function(e)
	{
	getXhrAttributes();

	//logger.log("SpXMLHttpRequest::onReadyStateChange()", readyState, (self.onreadystatechange ? "YES" : "NO"));

	if (typeof self.onreadystatechange == "function")
		self.onreadystatechange(e);
	};

if(xhr)
	{
	xhr.ontimeout = onTimeOut;
	xhr.onprogress = onProgress;
	xhr.onabort = onAbort;
	xhr.onerror = onError;
	xhr.onloadstart = onLoadStart;
	xhr.onload = onLoad;
	xhr.onloadend = onLoadEnd;
	xhr.onreadystatechange = onReadyStateChange;
	}

	// Public XHR methods -- -- -- -- -- -- -- -- -- -- //
self.open = function(method_, url_, async_, user_, pass_)
	{
	//logger.log("SpXMLHttpRequest::open()");

	if(xhr)
		openXHR(method_, url_, async_, user_, pass_);
	else
		openSpXHR(method_, url_, async_, user_, pass_);
	}

var openXHR = function(method_, url_, async_, user_, pass_)
	{
	method = method_;
	isAsync = (async_ !== "undefined" ? async_ : true);
	username = (user_ !== "undefined" ? user_ : null);
	password = (pass_ !== "undefined" ? pass_ : null);

	xhr.open(method_, url_, isAsync, username, password);
	}

var openSpXHR = function(method_, url_, async_, user_, pass_)
	{
	if (openFlag)
		return;

	/*
	 * 1. If context object's relevant settings object has a responsible document and it is not fully active, throw an InvalidStateError exception.
	 */

// 	ToDo

		// Method - Do not throw exceptions, fail quietely.
	method_ = method_.toUpperCase();

	/*
	 * 2. If method is not a method, throw a SyntaxError exception.
	 */

	if (allowedHttpHeaderMethods.indexOf(method_) == -1)
		return;

	/*
	 * 3. If method is a forbidden method, throw a SecurityError exception.
	 */

	if (blockedHttpHeaderHeaders.indexOf(method_) != -1)
		return;

	/*
	 * 4. Normalize method.
	 */

	method = method_;

	// URL
	/*
	 * 5. Let parsedURL be the result of parsing url with context object's relevant settings object's API base URL.
	 * 6. If parsedURL is failure, throw a SyntaxError exception. - Do not throw exception, fail quietely.
	 */

	parseURL(url_);

	/*
	 * 7. If the async argument is omitted, set async to true, and set username and password to null.
	 */

	if (async_ === "undefined")
		{
		async_ = true;
		user_ = null;
		pass_ = null;
		}

	username = (user_ ? user_ : null);
	password = (pass_ ? pass_ : null);

	/*
	 * 8. If parsedURL's host is non-null, run these substeps:
	 */

	if (host)
		{
		var auth = "";

		// 8.1. If the username argument is not null, set the username given parsedURL and username.
		if (username)
			auth = username;

		// 8.2. If the password argument is not null, set the password given parsedURL and password.
		if (password && auth)
			auth += ":" + password;

		if (auth)
			host = auth + "@" + host;
		}

	/*
	 * 9. If async is false, entry settings object's global object is a Window object, and the timeout attribute value is not zero or the
	 *    responseType attribute value is not the empty string, then throw an InvalidAccessError exception. ?
	 */

// 	ToDo
// 	Synchronous calls are not supported yet.

	/*
	 * 10. Terminate the request. (Note: A fetch can be ongoing at this point.)
	 */

// 	ToDo

	/*
	 * 11. Set variables associated with the object as follows:
	 */

	sendFlag = false;														// Unset the send() flag, stop timeout flag, and upload listener flag.
	stopTimeoutFlag = false;
	uploadListenerFlag = false;

	// Set request method to method. (see 4.)

// 	ToDo
// 	Set request URL to parsedURL.

	synchronousFlag = (async_ ? false : true);								// Set the synchronous flag, if async is false, and unset the synchronous flag otherwise.

	authorRequestHeaders = [];												// Empty author request headers.

	response.type = ResponseType.error;										// Set response to a network error.
	response.status = 0;													// Set received bytes to the empty byte sequence.
	response.statusText = "";
	response.headers = {};
	response.body = null;
	response.trailer = {};

	responseArrayBuffer = null;												// Set response ArrayBuffer object to null.

	responseBlob = null;													// Set response Blob object to null.

	responseDocument = null;												// Set response Document object to null.

	responseJSON = null;													// Set response JSON object to null.

	/*
	 * 12. If the state is not opened, run these substeps:
	 */

	openFlag = true;														// Set state to opened.

	changeReadyState(SpXMLHttpRequest.OPENED);								// Fire an event named readystatechange.
	};

self.send = function(body_)
	{
	if(xhr)
		sendXHR(body_);
	else
		sendSpXHR(body_);
	}

var sendXHR = function(body_)
	{
	//logger.log("SpXMLHttpRequest::send()");

	if(isAsync)														// Setting type is allowed only for asynchronous calls
		xhr.responseType = self.responseType;

	return xhr.send(body_);
	};

var sendSpXHR = function(body_)
	{
	// References global piperClient
	//logger.log("SpXMLHttpRequest::send()");

	if (body_)
		body = body_;

	bodyBytesReceived = 0;

	/*
	 * 1. If state is not opened, throw an InvalidStateError exception.
	 */
	if (!openFlag)
		return;

	/*
	 * 2. If the send() flag is set, throw an InvalidStateError exception.
	 */
	if (sendFlag && !redirectingFlag)
		return;

	/*
	 * 3. If the request method is GET or HEAD, set body to null.
	 */
	if (method == "GET" || method == "HEAD")
		body = null;

	/*
	 * 4. If body is null, go to the next step.
	 */
// 	ToDo
// 	if (body)
// 		{
//
// 		}

	/*
	 * 5. If one or more event listeners are registered on the associated XMLHttpRequestUpload object, then set upload listener flag.
	 */
	 if (self.upload.onabort || self.upload.onerror || self.upload.ontimeout || self.upload.onprogress ||
		self.upload.onloadstart || self.upload.onload || self.upload.onloadend)
		uploadListenerFlag = true;

	/*
	 * 6. Let req be a new request, initialized as follows:
	 */
	request = method + " " + parsedUrl + " HTTP/1.1\r\nHost: " + host;					// 	method - request method
																						// 	url - request URL

	for(var i = 0; i < authorRequestHeaders.length; i++)								// 	header list - author request headers
		request += "\r\n" + authorRequestHeaders[i].header + ": " + authorRequestHeaders[i].value;

// 	ToDo
// 	unsafe-request flag - Set.

	if (body)																			// 	body - request body
		{
		request += "\r\nContent-Length: " + body.length + "\r\n";
		request += body;
		}

	request = request + "\r\n\r\n";

	var data = LoaderUtil.toab(request);
	bytesToTransmit = data.byteLength;

//	ToDo
// 	client - context object's relevant settings object
// 	synchronous flag - Set if the synchronous flag is set.
// 	mode - "cors"
// 	use-CORS-preflight flag - Set if upload listener flag is set.
// 	credentials mode - If the withCredentials attribute value is true, "include", and "same-origin" otherwise.
// 	use URL credentials flag - Set if either request URL's username is not the empty string or request URL's password is non-null.

	/*
	 * 7. Unset the upload complete flag.
	 */
	uploadCompleteFlag = false;

	/*
	 * 8. If req's body is null, set the upload complete flag.
	 */
	if (!body)
		uploadCompleteFlag = true;

	/*
	 * 9. Set the send() flag.
	 */
	sendFlag = true;

	/*
	 * 10. If the synchronous flag is unset, run these substeps:
	 */
	if (!synchronousFlag)
		{
		// 10.1 Fire a progress event named loadstart with 0 and 0.
		if (typeof self.onloadstart === "function" && !redirectingFlag)
			self.onloadstart(createEvent("loadstart", {loaded: 0, total: 0, lengthComputable: false, target: self}));

		// 10.2 If the upload complete flag is unset and upload listener flag is set, then fire a progress event named
		//      loadstart on the XMLHttpRequestUpload object with 0 and req's body's total bytes.
		if (!uploadCompleteFlag && uploadListenerFlag)
			{
			if (typeof self.upload.onloadstart === "function" && !redirectingFlag)
				self.upload.onloadstart(createEvent("loadstart", {loaded: 0, total: request.length, lengthComputable: true, target: self}));
			}

		// 10.3 Fetch req. Handle the tasks queued on the networking task source per below.

		// Run these subsubsteps in parallel:
		// 1. Let milliseconds be zero.
		// 2. Every millisecond, as long as the stop timeout flag is unset, queue a microtask to run these subsubsubsteps:
		// 2.1 Increase milliseconds by one.
		// 2.2 If milliseconds is equal or greater than the timeout attribute value and the timeout attribute value is not zero,
		//     terminate fetching with reason timeout.
		if (timeoutId)
			clearInterval(timeoutId);

		timeoutId = null;
		milliseconds = 0;

		if (self.timeout > 0)
			{
			timeoutId = setInterval(function()
				{
				if (stopTimeoutFlag)
					{
					clearInterval(timeoutId);
					}
				else
					{
					if (++milliseconds >= self.timeout)
						{
						clearInterval(timeoutId);

						// ToDo - timeout event
						}
					}
				}, 1);
			}

		// To process request body for request, run these subsubsteps:
		// See ### below
		}
	/*
	 * 11. Otherwise, if the synchronous flag is set, run these substeps:
	 */
	else
		{
// 	ToDo
// 	Synchronous calls are not supported yet.
		}

	/*
	 * ###
	 */
	transmittedBytes = 0;

	piperClient.createTcpTunnel(hostname, port, onBinary, function(pipeId)
		{
		// To process request body for request, run these subsubsteps:
		piperClient.sendTcpBinary(pipeId, data);

		// Note: These subsubsteps are only invoked when new bytes are transmitted.
		// >>>>>>>>>> This could a listener receiving the number of transmitted bytes. ToDo: Is it possible to monitor connection and get the send bytes?
		transmittedBytes = bytesToTransmit;

		// 1. If not roughly 50ms have passed since these subsubsteps were last invoked, terminate these subsubsteps.
// ToDo

		// 2. If upload listener flag is set, then fire a progress event named progress on the XMLHttpRequestUpload object with
		//    request's body's transmitted bytes and request's body's total bytes.
// ToDo
		// <<<<<<<<<<

		requestEndOfBody();

		redirectingFlag = false;

		// Upload phase is ready. The reponse steps of 10. are in onBinary event handler below.
		});
	};

self.setRequestHeader = function(header, value)
	{
	//logger.log("SpXMLHttpRequest::setRequestHeader()");

	if(xhr)
		xhr.setRequestHeader(header, value);
	else
		{
		// 1. If state is not opened, throw an InvalidStateError exception.
		if (!openFlag)
			return;

		// 2. If the send() flag is set, throw an InvalidStateError exception.
		if (sendFlag)
			return;

		// 3. Normalize value.
		header = header.trim().toLowerCase();

		// 4. If name is not a name or value is not a value, throw a SyntaxError exception.
		// Note: An empty byte sequence represents an empty header value.
		// ToDo: Check against real header field names
		if(!header || !value)
			return;

		// 5. Terminate these steps if name is a forbidden header name.
		if(header.match(forbiddenHeaderNames))
			return;

		// 6. Combine name/value in author request headers.
		authorRequestHeaders.push({header: header, value: value});
		}
	}

self.abort = function()
	{
	//logger.log("SpXMLHttpRequest::abort()", URL);

	if(xhr)
		{
		self.readyState = SpXMLHttpRequest.UNSENT;

		xhr.abort();
		}
	else
		{
// ToDo
		// 1. Terminate the request.
		// 2. If state is either opened with the send() flag set, headers received, or loading, run the request error steps for event abort.
		// 3. If state is done, set state to unsent.
		// Note: No readystatechange event is dispatched.
		}
	};

self.getResponseHeader = function(header)
	{
	//logger.log("SpXMLHttpRequest::getResponseHeader()");

	if(xhr)
		return xhr.getResponseHeader(header);
	else
		return httpParser.getHeaderValue(header);
	}

self.getAllResponseHeaders = function()
	{
	if(xhr)
		return xhr.getAllResponseHeaders();
	else
		{
		// 1. Let output be an empty byte sequence.
		// 2. Let headers be the result of running sort and combine with response's header list.
		// 3. For each header in headers, run these substeps:
		// 3.1 Append header's name, followed by a 0x3A 0x20 byte pair, followed by header's value, to output.
		// 3.2 If header is not the last pair in headers, then append a 0x0D 0x0A byte pair, to output.
		// 4. Return output.
		return httpParser.getRawHeaders();
		}
	}

self.overrideMimeType = function(mime)
	{
	//logger.log("SpXMLHttpRequest::overrideMimeType()");

	if(xhr)
		return xhr.overrideMimeType(mime);
	else
		{
		// 1. If state is loading or done, throw an InvalidStateError exception.
		if(self.readyState == SpXMLHttpRequest.LOADING || self.readyState == SpXMLHttpRequest.DONE)
			return;

		// 2. If parsing mime analogously to the value of the `Content-Type` header fails, throw a SyntaxError exception.
		// 3. If mime is successfully parsed, set override MIME type to its MIME type, excluding any parameters, and converted to ASCII lowercase.
		mime = mime.toLowerCase();
		// 4. If a `charset` parameter is successfully parsed, set override charset to its value.
		overridedMimeType = mime;
		}
	};

self.addEventListener = function(type, listener, obj)
	{
	var options = obj;

	if (xhr)
		xhr.addEventListener(type, listener, obj);
	else
		{
		if(eventListenerTypes.indexOf(type) === -1)
			return;

		if(typeof obj === "boolean")
			options = { capture: obj, once: false, passive: false };

		}

	// eventListeners[type] = { listener: listener, options: options };
	}

self.removeEventListener = function(type, listener, obj)
	{
	var options = obj;

	if (xhr)
		xhr.removeEventListener(type, listener, obj);
	else
		{
		if(typeof obj === "boolean")
			options = { capture: obj, passive: false };

		}
	}

self.dispatchEvent = function(event)
	{
	if (xhr)
		xhr.dispatchEvent(event);
	else
		{

		}
	}

	// Private methods -- -- -- -- -- -- -- -- -- -- //
var onBinary = function(data)
	{ // Follows roughly "10. If the synchronous flag is unset, run these substeps:"
	// To process response for response, run these subsubsteps:

	// 1. If the stop timeout flag is unset, set the stop timeout flag.
	stopTimeoutFlag = true;

	var arr = new Uint8Array(data);
	//logger.log("SpXMLHttpRequest::onBinary()" + " data: " + ab2str(arr));

	/*
	 * This is the header chunk
	 */
	if (!contentLength)
		{
		httpParser.parse(arr);

		//logger.log("SpXMLHttpRequest::onBinary() HTTP server replied with statusCode " + httpParser.getStatusCode());

		/*
		 * Redirect
		 */
		if (httpParser.getStatusCode() == 301 || httpParser.getStatusCode() == 302)
			{
			//logger.log("SpXMLHttpRequest::onBinary() redirecting to : " + parsedUrl);

			redirectingFlag = true;
			parseURL(httpParser.getHeaderValue("Location"));
			self.send();

			return;
			}

		/*
		 * Header fields
		 */
		contentType = httpParser.getHeaderValue("Content-Type");
		contentLength = httpParser.getHeaderValueAsInt("Content-Length");		// this class can handle only unpacked bodies

// ToDo
		// 2. Set response to response.
		response.headers = httpParser.getHeaders();
		response.body = [];

		// 3. Handle errors for response.
		/*
		if (#error#)
			{
			response.type = ResponseType.error;
			response.terminationReason = TerminationReason.fatal;
			response.status = 0;
			response.statusText = "";
			response.headers = {};
			response.body = null;
			}
		*/

		// 4. If response is a network error, return.
		/*
		if (isNetworkError())
			{
			return;
			}
		*/

		// 5. Set state to headers received.
		// 6. Fire an event named readystatechange.
		changeReadyState(SpXMLHttpRequest.HEADERS_RECEIVED);

		// 7. If state is not headers received, then return.
		// Assume the headers are always received

		/*
		 * Plain header bytes
		 */
		if (!contentLength)
			{
			// 8. If response's body is null, then run handle response end-of-body and return.
			responseEndOfBody(true);
			}
		/*
		 * Header + Content (body) bytes
		 */
		else
			{
			addBytesToFetched(arr.subarray(httpParser.getContentBegin()));
			}

		// 9. Let reader be the result of getting a reader from response's body's stream.
		// We do not have a reader
		}
	/*
	 * This is some other chunk
	 */
	else
		{
		addBytesToFetched(arr);
		}

	//logger.log(bodyBytesReceived + " / " + contentLength + " bytes of " + parsedUrl + " received" );

	/*
	 *  Body loaded
	 */
	if (contentLength && contentLength == bodyBytesReceived)
		{
		//!!!!!!!!!!!!!!!!!!commented out for testing in node
		//if (!overridedMimeType)
		//	self.response = new Blob(response.body, {type : contentType} );
		//else
		//	self.response = new Blob(response.body, {type : overridedMimeType} );
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

		for (var i = 0; i < response.body.length; i++)
			{
			if (response.body[i])
				self.responseText += LoaderUtil.ab2str(response.body[i]);
			}

		responseEndOfBody(false);
		}

// onerror == network level error!!! onerror and onload never fire simultaneously. It's either one or the other. However onloadend fires in both cases and is the last event in the row
	};

var addBytesToFetched = function(arr)
	{
	// 10. Let read be the result of reading a chunk from response's body's stream with reader.

	// When read is fulfilled with an object whose done property is false and whose value property is a Uint8Array object,
	// run these subsubsubsteps and then run the above subsubstep again:

	// 10.1. Append the value property to received bytes.
	response.body.push(arr);
	bodyBytesReceived += arr.byteLength;

	// 10.2. If not roughly 50ms have passed since these subsubsubsteps were last invoked, then terminate these subsubsubsteps.

	// 10.3. If state is headers received, then set state to loading.
	// State is already set to headers received in onBytes
	// 10.4. Fire an event named readystatechange.
	//	Note: Web compatibility is the reason readystatechange fires more often than state changes.
	changeReadyState(SpXMLHttpRequest.LOADING, true);

	// 10.5. Fire a progress event named progress with response's body's transmitted bytes and response's body's total bytes.
	if (typeof self.onprogress === "function")
		self.onprogress(createEvent("progress", {loaded: bodyBytesReceived, total: contentLength, lengthComputable: true, target: self}));

	// When read is fulfilled with an object whose done property is true, run handle response end-of-body for response.
	// This is handled in onBytes

	// When read is rejected with an exception, run handle errors for response.
	// We do not have a reader
	}

var requestEndOfBody = function()
	{
	// https://xhr.spec.whatwg.org/#the-send()-method, step 10.
	// To process request end-of-body for request, run these subsubsteps:

	// 1. Set the upload complete flag.
	uploadCompleteFlag = true;

	// 2. If upload listener flag is unset, then terminate these subsubsteps.
	if (!uploadListenerFlag || redirectingFlag)
		return;

	// 3. Let transmitted be request's body's transmitted bytes.
	// 4. Let length be request's body's total bytes.

	// 5. Fire a progress event named progress on the XMLHttpRequestUpload object with transmitted and length.
	if (typeof self.upload.onprogress === "function")
		self.upload.onprogress(createEvent("progress", {loaded: transmittedBytes, total: bytesToTransmit, lengthComputable: true, target: self}));

	// 6. Fire a progress event named load on the XMLHttpRequestUpload object with transmitted and length.
	if (typeof self.upload.onload === "function")
		self.upload.onload(createEvent("load", {loaded: transmittedBytes, total: bytesToTransmit, lengthComputable: true, target: self}));

	// 7. Fire a progress event named loadend on the XMLHttpRequestUpload object with transmitted and length.
	if (typeof self.upload.onloadend === "function")
		self.upload.onloadend(createEvent("loadend", {loaded: transmittedBytes, total: bytesToTransmit, lengthComputable: true, target: self}));
	}

var responseEndOfBody = function(plainHeader)
	{
	self.status = httpParser.getStatusCode();
	self.statusText = httpParser.getStatusText();

	// To handle response end-of-body for response, run these steps:

// ToDo
	// 1. If the synchronous flag is set, set response to response.
	// 2. Handle errors for response.
	// 3. If response is a network error, return.
	// 4. If the synchronous flag is unset, update response's body using response.

	// 5. Fire a progress event named progress with transmitted and length.
	if (plainHeader && typeof self.onprogress === "function")
		self.onprogress(createEvent("progress", {loaded: 0, total: 0, lengthComputable: true, target: self}));

	// 6. Set state to done.
	// 7. Unset the send() flag.
	// 8. Fire an event named readystatechange.
	sendFlag = false;
	changeReadyState(SpXMLHttpRequest.DONE);

	// 9. Let transmitted be response's body's transmitted bytes.
	// 10. Let length be response's body's total bytes.
	// 11. Fire a progress event named load with transmitted and length.
	// 12. Fire a progress event named loadend with transmitted and length.
	if (typeof self.onload === "function")
		self.onload(createEvent("load", {loaded: bodyBytesReceived, total: (contentLength ? contentLength : 0), lengthComputable: true, target: self}));

	if (typeof self.onloadend === "function")
		self.onloadend(createEvent("loadend", {loaded: bodyBytesReceived, total: (contentLength ? contentLength : 0), lengthComputable: true, target: self}));
	}

var responseError = function()
	{
	}

var requestError = function(type)
	{
	}

var createEvent = function(type, options)
	{
	var evt;

	/*if (typeof exports === "undefined")
		{
		evt = document.createEvent("Event");
		evt.initEvent(type, false, false);
		}
	else
		{
		evt = {type: type};
		}*/
	evt = {type: type};

	if (options)
		{
		for(var i in options)
			evt[i] = options[i];
		}

	return evt;
	}

var changeReadyState = function(newReadyState, repeat/**/)
	{
	if (self.readyState != newReadyState || repeat)
		{
		self.readyState = newReadyState;

		if (typeof self.onreadystatechange === "function")
			self.onreadystatechange(createEvent("readystatechange", {target: self}));
		}
	}

var parseURL = function(url_)
	{
	var tempUrl;

	if (url_.indexOf("//") != -1)											// It is an absolute url
		{
		tempUrl = new URL(url_);

		if (tempUrl.hostname == "10.0.0.1")
			tempUrl.hostname = "localhost";

		host = tempUrl.host;

		if (tempUrl.hostname)
			hostname = tempUrl.hostname;

		if (tempUrl.port)
			port = tempUrl.port;

		parsedUrl = tempUrl.toString();
		}
	else
		{
		tempUrl = url_;

		if (tempUrl.charAt(0) != "/")
			tempUrl = "/" + tempUrl;

		parsedUrl = tempUrl;
		}

	url = url_;
	}

var getXhrAttributes = function()
	{
	self.status = xhr.status;
	self.statusText = xhr.statusText;
	self.response = xhr.response;
	self.readyState = xhr.readyState;
	self.responseURL = xhr.responseURL;
	self.responseType = xhr.responseType;

	if(self.responseType == XMLHttpRequestResponseType.DOMSTRING || self.responseType == XMLHttpRequestResponseType.TEXT)
		self.responseText = xhr.responseText;

	if(self.responseType == XMLHttpRequestResponseType.DOCUMENT && isAsync)
		self.responseXML = xhr.responseXML;

	self.upload = xhr.upload;
	self.timeout = xhr.timeout;
	self.withCredentials = xhr.withCredentials;
	};

var isNetworkError = function()
	{
	return (response.type == ResponseType.error && response.status == 0 && response.statusText == "" &&
			Object.keys(response.headers) == 0 && response.body == null && Object.keys(response.trailer) == 0 ? true : false);
	}

	//return new Proxy(self, handler);
}

	// Const
SpXMLHttpRequest.UNSENT = 0;
SpXMLHttpRequest.OPENED = 1;
SpXMLHttpRequest.HEADERS_RECEIVED = 2;
SpXMLHttpRequest.LOADING = 3;
SpXMLHttpRequest.DONE = 4;

SpXMLHttpRequest.OriginalXMLHttpRequest = (typeof window !== "undefined" ? window.XMLHttpRequest : null);

if (typeof exports !== "undefined")
	{
	module.exports = SpXMLHttpRequest;
	}"use strict"

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

function LoaderUtil()
{
var self = this;

var sessionStorage = null;

if (typeof exports !== "undefined")
	{
	sessionStorage = require("sessionstorage"); 	
	}
else
	{
	sessionStorage = window.sessionStorage;	
	}
	
self.Utf8ArrayToStr = function(array)
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
	};

self.ab2str = function(buf)
	{
	return self.Utf8ArrayToStr(buf);
	//return String.fromCharCode.apply(null, new Uint8Array(buf));
	};

self.str2ab = function(str)
	{
	var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
	var bufView = new Uint16Array(buf);
	for (var i=0, strLen=str.length; i<strLen; i++)
		{
		bufView[i] = str.charCodeAt(i);
		}
	return buf;
	};

self.toab = function(str)
	{
	var buf = new ArrayBuffer(str.length); // 2 bytes for each char
	var bufView = new Uint8Array(buf);
	for (var i=0, strLen=str.length; i<strLen; i++)
		{
		bufView[i] = str.charCodeAt(i);
		}
	return buf;
	};

self.getSession = function(sessionItem)
	{
	//console.log("GETTING GETTING", sessionItem, sessionStorage.getItem(sessionItem));
	if (sessionStorage.getItem(sessionItem))
		return sessionStorage.getItem(sessionItem);
	else
		return "";
	};

self.setSession = function(sessionItem, value)
	{
	//console.log("SETTING SETTING", sessionItem, value);
	if(!value)
		value = "";

	sessionStorage.setItem(sessionItem, value.trim());
	};
}

if (typeof exports !== "undefined")
	{
	var PiperClient = require("./piperclient");
	}

	// static variables
LoaderUtil.prototype.SERVER_ADDRESS = (function() { return {host: "spaceify.net", port: 1979} })();
LoaderUtil.prototype.WEBRTC_CONFIG = (function() { return {"iceServers":[{url:"stun:kandela.tv"},{url :"turn:kandela.tv", username:"webrtcuser", credential:"jeejeejee"}]} })();
LoaderUtil.prototype.piperClient = (function() { return new PiperClient(); })();

	// Overrides
if(window)
	{
	window.openOriginal = window.open;

	window.open = function(unique_name, sp_path, name, specs, callback)
		{
		var core = new SpaceifyCore();
		var network = new SpaceifyNetwork();

		var xhr, url, query, opened;
		var src, port, sp_host, spe_host;

		core.getApplicationURL(unique_name, function(err, appURL)
			{
			if(err)
				{
				if(typeof callback == "function")
					callback(null);

				return;
				}

			port = (!network.isSecure() ? appURL.port : appURL.securePort);
			spe_host = network.getEdgeURL(false, false, true);

			if(appURL.implementsWebServer && port)
				sp_host = network.getEdgeURL(false, port, true);
			else
				sp_host = network.externalResourceURL(unique_name);

			xhr = new XMLHttpRequest();
			xhr.addEventListener("loadend", function(e)
				{
				if (xhr.readyState == 4)
					{
					if(xhr.response)
						{
						url = window.URL.createObjectURL(xhr.response);

						query = network.parseQuery(sp_path);

						query.url = "blob";
						query.sp_host = encodeURIComponent(sp_host);
						query.sp_path = encodeURIComponent(sp_path);
						query.spe_host = encodeURIComponent(spe_host);

						url = url + network.remakeQueryString(query, {}, {}, "", true);

						opened = window.openOriginal(url, (name ? name : "_blank"), (specs ? specs : ""));

						opened.addEventListener("load", function()
							{
							window.URL.revokeObjectURL(this.location.href);

							if(typeof callback == "function")
								callback(this);
							});
						}
					else
						{
						if(typeof callback == "function")
							callback(null);
						}
					}
				});

			xhr.open("GET", sp_host + sp_path, true);
			xhr.responseType = "blob";
			xhr.send();
			});
		}
	}

if (typeof exports !== "undefined")
	{
	module.exports = new LoaderUtil();

	global.SERVER_ADDRESS = module.exports.SERVER_ADDRESS;
	global.WEBRTC_CONFIG = module.exports.WEBRTC_CONFIG;
	}
else
	LoaderUtil = new LoaderUtil();"use strict"

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

var sessionTokenName = "x-edge-session";

self.loadData = function(element, callback)
	{
	var sp_type, sp_host, type, url, xhr = new XMLHttpRequest();

	if (element.getAttribute("sp_src"))
		{ sp_type = "sp_src"; type = "src"; }
	else if (element.getAttribute("spe_src"))
		{ sp_type = "spe_src"; type = "src"; }
	else if (element.getAttribute("sp_href"))
		{ sp_type = "sp_href"; type = "href"; }
	else if (element.getAttribute("spe_href"))
		{ sp_type = "spe_href"; type = "href"; }
	else if (element.getAttribute("sp_bgnd"))
		{ sp_type = "sp_bgnd"; type = ""; }

	url = element.getAttribute(sp_type);

	sp_host = (sp_type == "spe_src" || sp_type == "spe_href" ? speHost : spHost);

	if (url.indexOf("//") == -1 && sp_host)							// Relative URLs fail to load without host
		url = new URL(url, sp_host).toString()

	if (!url)
		{
		if (typeof callback === "function")
			callback();

		return;
		}

	//xhr.onreadystatechange = function()
	xhr.addEventListener("loadend", function(e)
		{
		if (xhr.readyState == 4)
			{
			var blob = xhr.response;
			element.onload = function(e)
				{
				if(sp_type != "sp_bgnd")
					window.URL.revokeObjectURL(element[type]);			// Clean up after yourself

				if (typeof callback === "function")
					callback();
				};

			if(sp_type == "sp_bgnd")
				{
				var reader = new window.FileReader();
				reader.readAsDataURL(blob);
				reader.onloadend = function()
					{
					element.style.backgroundImage = "url(" + reader.result + ")";
					}
				}
			else
				element[type] = window.URL.createObjectURL(blob);

			element.removeAttribute(sp_type);
			}
		});

	xhr.open("GET", url, true);
	xhr.responseType = "blob";
	xhr.send();
	};

self.postData = function(url, post, responseType, callback)
	{
	var hvalue;
	var xhr = new XMLHttpRequest();

	//xhr.onreadystatechange = function()
	xhr.addEventListener("loadend", function(e)
		{
		if (xhr.readyState == 4)
			{
			LoaderUtil.setSession("sessionCookies", xhr.getResponseHeader("Set-Cookie"));

			if ((hvalue = xhr.getResponseHeader(sessionTokenName)))
				LoaderUtil.setSession(sessionTokenName, hvalue);

			if (xhr.status != 200)
				{
				if (typeof callback === "function")
					callback(xhr.status, null);
				}
			else if (xhr.response instanceof Blob)
				{
				var reader = new FileReader();
				reader.onload = function(err)
					{
					if (typeof callback === "function")
						callback(null, reader.result);
					}
				reader.readAsText(xhr.response.data, "UTF-8");
				}
			else
				{
				if (typeof callback === "function")
					callback(null, JSON.stringify(xhr.response));
				}
			}
		});

	var boundary = "---------------------------" + Date.now().toString(16);

	var body = "";
	for (var i = 0; i < post.length; i++)
		{
		body += "\r\n--" + boundary + "\r\n";

		body += post[i].content;
		body += "\r\n\r\n" + post[i].data + "\r\n";
		}
	body += "\r\n--" + boundary + "--";

	xhr.withCredentials = true;
	xhr.open("POST", url, true);
	xhr.responseType = (responseType ? responseType : "text");
	xhr.setRequestHeader("Cookie", LoaderUtil.getSession("sessionCookies"));
	xhr.setRequestHeader(sessionTokenName, LoaderUtil.getSession(sessionTokenName));
	xhr.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + boundary);
	xhr.send(body);
	};

self.loadPage = function(url, spHost_, speHost_)
	{
	var xhr = new XMLHttpRequest();

	//xhr.onreadystatechange = function()
	xhr.addEventListener("loadend", function(e)
		{
		//console.log("SpaceifyLoader::loadPage() content arrived, readyState==" + xhr.readyState);

		if (xhr.readyState == 4)
			{
			LoaderUtil.setSession("sessionCookies", xhr.getResponseHeader("Set-Cookie"));

			if ((hvalue = xhr.getResponseHeader(sessionTokenName)))
				LoaderUtil.setSession(sessionTokenName, hvalue);

			var newDoc = document.open("text/html", "replace");
			newDoc.write(xhr.responseText);
			newDoc.close();

			newDoc.loadPageSpHost = spHost_;
			newDoc.loadPageSpeHost = speHost_;
			}
		});

	xhr.withCredentials = true;
	xhr.open("GET", url, true);
	xhr.setRequestHeader("Cookie", LoaderUtil.getSession("sessionCookies"));
	xhr.setRequestHeader(sessionTokenName, LoaderUtil.getSession(sessionTokenName));
	xhr.send(null);
	};

self.getAllElements = function()
	{
	var sp_src = Array.prototype.slice.call(document.querySelectorAll("[sp_src]"));

	var spe_src = Array.prototype.slice.call(document.querySelectorAll("[spe_src]"));

	var sp_href = Array.prototype.slice.call(document.querySelectorAll("[sp_href]"));

	var spe_href = Array.prototype.slice.call(document.querySelectorAll("[spe_href]"));

	var sp_bgnd = Array.prototype.slice.call(document.querySelectorAll("[sp_bgnd]"));

	elements = spe_href.concat(sp_href, spe_src, sp_src, sp_bgnd);						// Order: edge css, local css, edge resource, local resource, css background

	console.log("SpaceifyLoader::loadAll() :: Number of elements with sp_src:", sp_src.length, "spe_src:", spe_src.length, "sp_href:", sp_href.length, "spe_href:", spe_href.length, "sp_bgnd:", sp_bgnd.length);
	};

self.hasElements = function()
	{
	return (elements && elements.length > 0 ? true : false);
	}

self.recurseElements = function()
	{
	if (elementIndex < elements.length)
		{
		self.loadData(elements[elementIndex], function()
			{
			elementIndex++;
			self.recurseElements();
			});
		}
	else
		{
		var evt = document.createEvent("Event");
		evt.initEvent("spaceifyReady", true, true);
		window.dispatchEvent(evt);
		}
	}

self.parseQuery = function(url)
	{ // Adapted from http://james.padolsey.com/snippets/parsing-urls-with-the-dom/
	var parameters = {}, part, pair, pairs;

	url = decodeURIComponent(url);

	url = url.replace(/#.*$/, "");

	part = url.split("?");

	part = (part.length < 2 ? part[0] : part[1]);

	pairs = part.split("&");

	for (var i = 0, length = pairs.length; i < length; i++)
		{
		if (!pairs[i])
			continue;

		pair = pairs[i].split("=");
		parameters[pair[0]] = (pair.length == 2 ? pair[1] : null);
		}

	return parameters;
	}

self.setSpHosts = function(hosts)
	{
	spHost = hosts.sp_host;
	speHost = hosts.spe_host;
	}

self.connect = function(host, port, callback)
	{
	LoaderUtil.piperClient.connect(host, port, function()
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
var spaceifyLoader = new SpaceifyLoader();

function getNetworkInfo(callback)
	{
	/*
	window.isSpaceifyNetwork = false;

	//var xhr = (SpXMLHttpRequest.OriginalXMLHttpRequest ? new SpXMLHttpRequest.OriginalXMLHttpRequest() : new XMLHttpRequest());
	var xhr = new window.XMLHttpRequest();

	xhr.open("HEAD", window.location.protocol + "//10.0.0.1/templates/test.txt", true);
	xhr.timeout = 1000;
	xhr.onreadystatechange = function()
		{
		if (xhr.readyState == 4)
			{
			window.isSpaceifyNetwork = (xhr.status >= 200 && xhr.status < 304 ? true : false);
			callback();
			}
		};
	xhr.send();
	*/

	window.isSpaceifyNetwork = false;

	var protocol = window.location.href.replace("blob:", "");
	var pos = protocol.indexOf(":");

	if(pos != -1)
		protocol = protocol.substring(0, pos + 1);
	else
		protocol = window.location.protocol;

	var ws = new WebSocket((protocol == "http:" ? "ws" : "wss") + "://edge.spaceify.net:2947", "json-rpc");

	ws.onopen = function()
		{
		window.isSpaceifyNetwork = true;
		ws.close();
		callback();
		}

	ws.onerror = function(err)
		{
		ws.close();
		callback();
		}
	}

function prepareLoader(hosts)
	{
	spaceifyLoader.setSpHosts(hosts);

	if (window.isSpaceifyNetwork)
		window.XMLHttpRequest = SpXMLHttpRequest.OriginalXMLHttpRequest;
	else
		{
		window.isSpaceifyNetwork = false;

		window.XMLHttpRequest = SpXMLHttpRequest;

		spaceifyLoader.connect(LoaderUtil.SERVER_ADDRESS.host, LoaderUtil.SERVER_ADDRESS.port, function()
			{
			});
		}
	}

function loadPageOrElements(hosts)
	{
	spaceifyLoader.getAllElements();

	if (!spaceifyLoader.hasElements())
		spaceifyLoader.loadPage(hosts.sp_host + hosts.sp_path, hosts.sp_host, hosts.spe_host);
	else
		{
		elementIndex = 0;
		spaceifyLoader.recurseElements();
		}
	}

window.onload = function()
	{
	var sp_host, spe_host;

	var hosts = spaceifyLoader.parseQuery(window.location.href);
	if (!hosts.sp_host)
		{
		sp_host = spe_host = window.location.protocol + "//" + window.location.hostname + "/";

		if (typeof document.loadPageSpHost != "undefined")
			sp_host = document.loadPageSpHost;

		if (typeof document.loadPageSpeHost != "undefined")
			spe_host = document.loadPageSpeHost;

		hosts = { sp_host: sp_host, spe_host: spe_host, sp_path: "index.html" };
		}

	getNetworkInfo(function()
		{
		if (!window.isSpaceifyNetwork)
			{
			spaceifyLoader.setConnectionListener(function()
				{
				loadPageOrElements(hosts);
				});

			prepareLoader(hosts);
			}
		else
			{
			prepareLoader(hosts);
			loadPageOrElements(hosts);
			}
		});
	};
