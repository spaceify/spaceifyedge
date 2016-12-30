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
;