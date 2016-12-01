(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("wrtc"), require("websocket"));
	else if(typeof define === 'function' && define.amd)
		define(["wrtc", "websocket"], factory);
	else if(typeof exports === 'object')
		exports["spl"] = factory(require("wrtc"), require("websocket"));
	else
		root["spl"] = factory(root["wrtc"], root["websocket"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__) {
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
	LoaderUtil: __webpack_require__(1), 
	HttpParser: __webpack_require__(7),       
	PiperClient: __webpack_require__(8),     
	SpXMLHttpRequest: __webpack_require__(12),
	SpaceifyLoader: __webpack_require__(19)
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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

	function LoaderUtil()
	{
	var self = this;

	var sessionStorage = null;

	if (true)
		{
		sessionStorage = __webpack_require__(2); 	
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
		console.log("GETTING GETTING", sessionItem, sessionStorage.getItem(sessionItem));
		if (sessionStorage.getItem(sessionItem))
			return sessionStorage.getItem(sessionItem);
		else
			return "";
		};

	self.setSession = function(sessionItem, value)
		{
		console.log("SETTING SETTING", sessionItem, value);
		if(!value)
			value = "";

		sessionStorage.setItem(sessionItem, value.trim());
		};
	}


	//SERVER_ADDRESS = {host: "spaceify.net", port: 1980};
	//WEBRTC_CONFIG = {"iceServers":[{url:"stun:kandela.tv"},{url :"turn:kandela.tv", username:"webrtcuser", credential:"jeejeejee"}]};

	//var piperClient = new PiperClient();


	if (true)
		{
		module.exports = new LoaderUtil(); 
		}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (function store() {
	  'use strict';

	  function nope() { /* Fallback for when no store is supported */ }

	  try {
	    sessionStorage.setItem('foo', 'bar');
	    if (sessionStorage.getItem('foo') !== 'bar') throw 1;
	  } catch (e) {
	    var storage = __webpack_require__(3)
	      , koekje = __webpack_require__(5);

	    return storage.supported ? storage : (koekje.supported ? koekje : {
	      length: 0,
	      getItem: nope, setItem: nope, removeItem: nope, clear: nope
	    });
	  }

	  return sessionStorage;
	}());


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var has = Object.prototype.hasOwnProperty
	  , qs = __webpack_require__(4)
	  , storage = {}
	  , prefix = '§';

	/**
	 * Refresh the storage as other users might also be writing against it.
	 *
	 * @api private
	 */
	function update() {
	  if (!windowStorage.supported) return;

	  var data = window.name
	    , length = 0
	    , key;

	  storage = data.charAt(0) === prefix
	    ? qs.parse(data.slice(1))
	    : {};

	  for (key in storage) {
	    if (has.call(storage, key)) length++;
	  }

	  windowStorage.length = length;
	}

	/**
	 * A DOM storage wrapper which abuses the window.name property to temporarily
	 * store values in the browser.
	 *
	 * @type {Object}
	 * @public
	 */
	var windowStorage = module.exports = {
	  /**
	   * The total number items stored in the storage.
	   *
	   * @type {Number}
	   * @public
	   */
	  length: 0,

	  /**
	   * Find an item in the storage.
	   *
	   * @param {String} key Name of the value we lookup.
	   * @returns {String|Null} Found item or null.
	   * @api public
	   */
	  getItem: function getItem(key) {
	    if (has.call(storage, key)) return storage[key];
	    return null;
	  },

	  /**
	   * Add a new item in the storage.
	   *
	   * @param {String} key Name under which we store the value.
	   * @param {String} value Value for the key.
	   * @returns {Undefined}
	   * @api public
	   */
	  setItem: function setItem(key, value) {
	    storage[key] = value;
	    window.name = qs.stringify(storage, prefix);

	    windowStorage.length++;
	  },

	  /**
	   * Remove a single item from the storage.
	   *
	   * @param {String} key Name of the value we need to remove.
	   * @returns {Undefined}
	   * @api pubilc
	   */
	  removeItem: function removeItem(key) {
	    delete storage[key];
	    window.name = qs.stringify(storage, prefix);

	    windowStorage.length--;
	  },

	  /**
	   * Completely remove all items from the store.
	   *
	   * @returns {Undefined}
	   * @api pubilc
	   */
	  clear: function clear() {
	    storage = {};
	    window.name = '';
	    windowStorage.length = 0;
	  },

	  /**
	   * Is this storage system supported in the current environment.
	   *
	   * @type {Boolean}
	   * @public
	   */
	  supported: (function supported() {
	    return 'object' === typeof window && 'string' === typeof window.name;
	  }())
	};

	//
	// Make sure that we initialize the storage so it pre-fills the `.length`
	//
	update();


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var has = Object.prototype.hasOwnProperty;

	/**
	 * Simple query string parser.
	 *
	 * @param {String} query The query string that needs to be parsed.
	 * @returns {Object}
	 * @api public
	 */
	function querystring(query) {
	  var parser = /([^=?&]+)=?([^&]*)/g
	    , result = {}
	    , part;

	  //
	  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
	  // the lastIndex property so we can continue executing this loop until we've
	  // parsed all results.
	  //
	  for (;
	    part = parser.exec(query);
	    result[decodeURIComponent(part[1])] = decodeURIComponent(part[2])
	  );

	  return result;
	}

	/**
	 * Transform a query string to an object.
	 *
	 * @param {Object} obj Object that should be transformed.
	 * @param {String} prefix Optional prefix.
	 * @returns {String}
	 * @api public
	 */
	function querystringify(obj, prefix) {
	  prefix = prefix || '';

	  var pairs = [];

	  //
	  // Optionally prefix with a '?' if needed
	  //
	  if ('string' !== typeof prefix) prefix = '?';

	  for (var key in obj) {
	    if (has.call(obj, key)) {
	      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
	    }
	  }

	  return pairs.length ? prefix + pairs.join('&') : '';
	}

	//
	// Expose the module.
	//
	exports.stringify = querystringify;
	exports.parse = querystring;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var has = Object.prototype.hasOwnProperty
	  , monster = __webpack_require__(6)
	  , qs = __webpack_require__(4)
	  , storage = {}
	  , prefix = '§'
	  , cookie;

	//
	// The export interface of the cookie-monster module is quite odd, if there is
	// no `document` in global it will simply not export the `get` and `set`
	// methods. Causing this module to fail on `undefined` function calls. Default
	// to an empty object when document doesn't exists solves it.
	//
	cookie = monster('undefined' !== typeof document ? document : {});

	/**
	 * Refresh the storage as other users might also be writing against it.
	 *
	 * @api private
	 */
	function update() {
	  if (!koekje.supported) return;

	  var data = cookie.get('koekje')
	    , length = 0
	    , key;

	  storage = data && data.charAt(0) === prefix
	    ? qs.parse(data.slice(1))
	    : {};

	  for (key in storage) {
	    if (has.call(storage, key)) length++;
	  }

	  koekje.length = length;
	}

	var koekje = module.exports = {
	  /**
	   * The total number items stored in the storage.
	   *
	   * @type {Number}
	   * @public
	   */
	  length: 0,

	  /**
	   * Find an item in the storage.
	   *
	   * @param {String} key Name of the value we lookup.
	   * @returns {String|Null} Found item or null.
	   * @api public
	   */
	  getItem: function getItem(key) {
	    if (has.call(storage, key)) return storage[key];
	    return null;
	  },

	  /**
	   * Add a new item in the storage.
	   *
	   * @param {String} key Name under which we store the value.
	   * @param {String} value Value for the key.
	   * @returns {Undefined}
	   * @api public
	   */
	  setItem: function setItem(key, value) {
	    storage[key] = value;
	    cookie.set('koekje', qs.stringify(storage, prefix));

	    koekje.length++;
	  },

	  /**
	   * Remove a single item from the storage.
	   *
	   * @param {String} key Name of the value we need to remove.
	   * @returns {Undefined}
	   * @api pubilc
	   */
	  removeItem: function removeItem(key) {
	    delete storage[key];
	    cookie.set('koekje', qs.stringify(storage, prefix));

	    koekje.length--;
	  },

	  /**
	   * Completely remove all items from the store.
	   *
	   * @returns {Undefined}
	   * @api pubilc
	   */
	  clear: function clear() {
	    storage = {};

	    cookie.set('koekje', '', {
	      expires: new Date(0)
	    });

	    koekje.length = 0;
	  },

	  /**
	   * Is this storage system supported in the current environment.
	   *
	   * @type {Boolean}
	   * @public
	   */
	  supported: (function supported() {
	    return 'object' === typeof navigator && navigator.cookieEnabled;
	  }()),

	  /**
	   * Completely re-initiate the storage.
	   *
	   * @type {Function}
	   * @api private
	   */
	  update: update
	};

	//
	// Make sure that we initialize the storage so it pre-fills the `.length`
	//
	update();


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	exports = module.exports = function (doc) {
	  if (!doc) doc = {};
	  if (typeof doc === 'string') doc = { cookie: doc };
	  if (doc.cookie === undefined) doc.cookie = '';

	  var self = {};
	  self.get = function (key) {
	    var cookiesSplat = doc.cookie.split(/;\s*/);
	    for (var i = 0; i < cookiesSplat.length; i++) {
	      var ps = cookiesSplat[i].split('=');
	      var k = decodeURIComponent(ps[0]);
	      if (k === key) return decodeURIComponent(ps[1]);
	    }
	  };

	  self.set = function (key, value, opts) {
	    if (!opts) opts = {};
	    var newCookie = encodeURIComponent(key) + '=' + encodeURIComponent(value);

	    if (opts.hasOwnProperty('expires')){
	      newCookie += '; expires=' + opts.expires;
	    }

	    if (opts.hasOwnProperty('path')) {
	      newCookie += '; path=' + opts.path;
	    }

	    if (opts.hasOwnProperty('domain')) {
	      newCookie += '; domain=' + opts.domain;
	    }

	    if (opts.hasOwnProperty('secure')) {
	      newCookie += '; secure';
	    }

	    doc.cookie = newCookie;

	    return newCookie;
	  };
	  return self;
	};

	if (typeof document !== 'undefined') {
	  var cookie = exports(document);
	  exports.get = cookie.get;
	  exports.set = cookie.set;
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

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

	if (true)
		{
		module.exports = HttpParser;
		}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	function PiperClient()
	{
	var self = this;

	// Includes

	var sp = null;

	if (true)
		{
		sp = __webpack_require__(9)
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
		/*
		for (var pipeId in pipes)
			{
			if(pipes[pipeId].hostnameAndPort == hostnameAndPort)
				{
				pipes[pipeId].listener = listener;
				callback(pipeId);
				return;
				}
			}
		*/
		
		communicationClient.createDirectConnection(targetId, function(pipeId)
			{
			console.log("Direct Connection Ready for TCP tunnel");

			communicationClient.callRpcOnConnection(pipeId, "tunnelTcp", [host, port], self, function()
				{
				console.log("Tunnel Pipe ready to "+ host+":"+port);
				
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
				console.log("SpaceifyPiper found, trying to build a direct connection it");
				communicationClient.createDirectConnection(client.getClientId(), function()
					{
					console.log("Direct connection ready");

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
			console.log("PiperClient::upgradeToWebRtc() completed");
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
		communicationClient.connectWithOptions({host: host, port: port, isSsl:false}, "piperclient", "petrigroupx", function()
			{
			console.log("Hub Connection succeeded");
			//callback();
			});
		};

	}

	if (true)
		{
		module.exports = PiperClient;
		}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(10), __webpack_require__(11));
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
			logger.log("iceCandidate got, sending it to the other client");
			
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
			logger.log("WebRtcConnector::onbeforeunload");
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
			logger.log("WebRtcConnector::handleRtcOffer() descriptor: "+descriptor);
			
			if (!rtcConnections.hasOwnProperty(partnerId))
				{
				createConnection(partnerId);
				}
				
			rtcConnections[partnerId].onConnectionOfferReceived(descriptor, partnerId, function(answer)
				{
				logger.log("WebRtcConnector::handleRtcOffer() onConnectionOfferReceived returned");
				logger.log("Trying to call handleRtcAnswer on partner "+partnerId);
				communicator.callRpc("callClientRpc", [partnerId, "handleRtcAnswer", [answer]], self, null, serverId);
				logger.log("handleRtcAnswer call done on partner "+partnerId);
				});
			
			};	

		self.handleRtcAnswer = function(descriptor, partnerId, connectionId)
			{
			logger.log("WebRtcConnector::handleRtcAnswer()");			
			rtcConnections[partnerId].onConnectionAnswerReceived(descriptor);
			};	

		self.handleIceCandidate = function(iceCandidate, partnerId, connectionId)
			{
			logger.log("WebRtcConnector::handleIceCandidate()");			
			
				
			if (!rtcConnections.hasOwnProperty(partnerId))
				{
				createConnection(partnerId);
				}
				
			rtcConnections[partnerId].onIceCandidateReceived(iceCandidate);
			};


		// Private methods
			

		self.onDisconnected = function(partnerId)
			{
			logger.log("WebRtcConnector::onDisconnected() ");
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
			logger.log("WebRtcConnector::onPrimaryDataChannelOpen() ");
			
			var connectionId = communicator.addConnection(dataChannelConnection);
			if (connectionListener)
				connectionListener.onWebRtcConnected(clientId, connectionId);
			
			if (connectionReadyCallbacks.hasOwnProperty(clientId))
				connectionReadyCallbacks[clientId].apply();
			};

		self.onAdditionalDataChannelOpen = function(clientId, dataChannelConnection)
			{
			logger.log("WebRtcConnector::onAdditionalDataChannelOpen() ");
			
			var connectionId = communicator.addConnection(dataChannelConnection);
			
			if (connectionListener)
				connectionListener.onAdditionalDataChannelOpen(clientId, connectionId);
			};
									
		self.onStream = function(stream, partnerId)
			{
			logger.log("WebRtcConnector::onStream()");
			};
			
		self.onRemoveStream = function(stream, partnerId)
			{
			logger.log("WebRtcConnector::onRemoveStream()");
			self.onDisconnected(partnerId);
			};
			


		self.connectToPeer = function(partnerId, callback)
			{
			logger.log("WebRtcConnector::connectToPeer() partnerId: " + partnerId);
			if (rtcConnections.hasOwnProperty(partnerId))
				{
				logger.log("WebRtcConnector::connectToPeer() connection to partnerId: " + partnerId +" already exists or is under construction, not connecting again");
				return;
				}
			
			createConnection(partnerId);
			if (callback)
				connectionReadyCallbacks[partnerId] = callback;
			
			rtcConnections[partnerId].createConnectionOffer(function(offer)
					{
					logger.log("Offer created, sending it to the other client "+partnerId);
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
				logger.log("WebRtcConnector::createDataChannelConnection() callback returned");
				
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
				console.log("WebRtcPeerConnection::channel.onopen");	
				
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
		    logger.log("WebRtcPeerConnection::ondatachannel() "+temp);
		    
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
					logger.log("WebRtcPeerConnection::temp.onopen");	
					
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
			logger.log("WebRtcPeerConnection::onPrimaryDataChannelOpen "+e);
			
			//primaryDataChannel.binaryType = "arraybuffer";
			//primaryDataChannel.onclose = self.onPrimaryDataChannelClosed;
			
			//dataChannel.onmessage = self.onMessage;
			
			dataChannelConnections.push(primaryDataChannel);
			
			if (dataChannelListener)
				dataChannelListener.onPrimaryDataChannelOpen(partnerId, primaryDataChannel);
			};

		self.onAdditionalDataChannelOpen = function(e)
			{
			logger.log("WebRtcPeerConnection::onAdditionalDataChannelOpen "+e);
			
			//if (dataChannelListener)
			//	dataChannelListener.onAdditionalDataChannelOpen(partnerId, primaryDataChannel);
			};	
			
		self.getDataChannelConnections = function()
			{
			return dataChannelConnections;
			};	
			
		self.onPrimaryDataChannelClosed = function(e)
			{
			logger.log("WebRtcPeerConnectiononDataChannelClosed "+e);
			connectionListener.onDisconnected(partnerId);
			}

		self.setDataChannelListener = function(lis)
			{
			dataChannelListener = lis;
			};

			
		//---------------- DataChannel -related functions end




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
			logger.log("WebRtcPeerConnectiononIceCanditate() partnerId: "+partnerId+" event: "+ e);
			
			logger.log("iceListener oli "+iceListener);
			
			//A null ice canditate means that all canditates have
		    //been given
			
			if (e.candidate == null) 
		    	{
		        logger.log("All Ice candidates listed");
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
			logger.log("WebRtcPeerConnectionclose");	
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
			logger.log("WebRtcPeerConnectionsetIceListener()"+ lis);
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
			logger.log("WebRtcPeerConnectiononStream"+ e);
			streamListener.onStream(e.stream, partnerId);
			}
			
		self.onRemoveStream = function(e)
			{	
			logger.log("WebRtcPeerConnectiononStream"+ e);
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
				logger.log("peerConnection::createOffer called its callback: "+ desc);
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
			logger.log("WebRtcPeerConnectiononConnectionAnswerReceived(), descriptor: "+descriptor);
			
			peerConnection.setRemoteDescription(new RTCSessionDescription(descriptor),function()
				{
				logger.log("WebRtcPeerConnectiononConnectionAnswerReceived() setRemoteDescription returned OK");
				}, 
				function(err) 
					{logger.log("WebRtcPeerConnectiononConnectionAnswerReceived() setRemoteDescription returned error "+err);}  );
			
			};
			
			
		self.onConnectionOfferReceived = function(descriptor, connectionId, callback)
			{
			logger.log("WebRtcPeerConnectiononConnectionOfferReceived");
			
			logger.log("WebRtcPeerConnectiononConnectionOfferReceived trying to set remote description");	
			var desc = new RTCSessionDescription(descriptor);
			peerConnection.setRemoteDescription(desc, function() 
				{
				logger.log("WebRtcPeerConnectiononConnectionOfferReceived remote description set");
				peerConnection.createAnswer(function (answer) 
						{
						/*
						peerConnection.onicecandidate = function(e)
		    				{
		    				if (e.candidate == null) 
		    					{
		        				logger.log("All Ice candidates listed");
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
		            function () {logger.log("WebRtcPeerConnectiononIceCandidateReceived adding Ice candidate succeeded");},  
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
			logger.log("DataChannelConnection::send()" +message);
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
			console.log("DataChannelConnection::close");	
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
			logger.log("DataChannelConnection::onMessage() ");
			logger.log("DataChannelConnection::onMessage "+message.data);
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
			logger.log("CommunicationClient::callRpcOnClient() clientId: "+clientId + " methodName: "+methodName);
			
			if (clients.hasOwnProperty(clientId))
				{
				// Call through webrtc
				if (clients[clientId].isWebRtc())
					{
					logger.log("Calling client RPC through WebRtc, preferredConnectionId was: "+clients[clientId].getPreferredConnectionId());
					params.push(ownId);
					communicator.callRpc(methodName, params, obj, callback,  clients[clientId].getPreferredConnectionId());	
					}
				//call though a local hub
				else if (clients[clientId].isLocalHub())
					{
					logger.log("Calling client RPC through local hub");
					communicator.callRpc("callClientRpc", [clientId, methodName, params], obj, callback, clients[clientId].getPreferredConnectionId());
					}
				else
					{
					// call through the server
					logger.log("Notifying client RPC through the server");
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
			logger.log("CommunicationClient::callRpcOnConnection() connectionId: "+connectionId + " methodName: "+methodName);
			
			logger.log("Making a RPC call over direct connection");
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
			logger.log("CommunicationClient::notifyClient() clientId: "+clientId + " methodName: "+methodName);
			
			if (clients.hasOwnProperty(clientId))
				{
				// Call through webrtc
				if (clients[clientId].isWebRtc())
					{
					logger.log("Notifying client through WebRtc");
					params.push(ownId);
					communicator.callRpc(methodName, params, null, null,  clients[clientId].getPreferredConnectionId());	
					}
				//call though a local hub
				else if (clients[clientId].isLocalHub())
					{
					logger.log("Notifying client through local hub");
					communicator.callRpc("callClientRpc", [clientId, methodName, params], null, null, clients[clientId].getPreferredConnectionId());
					}
				else
					{
					// call through the server
					logger.log("Notifying client through the server");
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
			logger.log("CommunicationClient::upgradeToWebRtc() + clientId: " + clientId);
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
					logger.log("CommunicationClient::createDirectConnection() callback returned connectionId: "+connectionId);
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
			logger.log("CommunicationClient::onWebRtcConnected()");
			
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
			logger.log("CommunicationClient::onWebRtcDisconnected()");
			
			// ToDo: fallback to websockets if possible!!
			};
			

		self.onAdditionalDataChannelOpen = function(clientId, connectionId)
			{
			logger.log("CommunicationClient::onAdditionalDataChannelOpen()");
			pipes[connectionId] = clientId;
			};	
			


		var createPipe = function(clientId, callback)
			{
			logger.log("CommunicationClient::createPipe() + peerId: " + clientId);
			
			var pipeConnection =  new WebSocketConnection();
			var pipeId;
			
			pipeConnection.connect(serverConnectionOptions, function()
				{
				logger.log("Pipe connected to the websocket server");
				
				pipeId = communicator.addConnection(pipeConnection);			
				
				communicator.callRpc("constructPipe", [clientId, ownId], self, function()
					{
					logger.log("CommunicationClient::createPipe() pipe construction ready");	
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
			logger.log("CommunicationClient::requestPipe()");
			
			var pipeConnection =  new WebSocketConnection();
			var pipeId = null;
			
			
							
			pipeConnection.connect(serverConnectionOptions, function()
				{
				logger.log("Pipe connected to the websocket server");
				
				pipeId = communicator.addConnection(pipeConnection);			
				
				communicator.callRpc("registerAsPipe", [targetId], self, function(err,data)
					{
					logger.log("registerAsPipe returned");
					
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
			logger.log("CommunicationClient::updateConnectedClients()");
			var id = serverId;
			
			if (hubId)
				id = hubId;
				
			communicator.callRpc("getConnectedClients", [groupId], self, function(err, connectedClients)
				{
				logger.log("CommunicationClient::getConnectedClientsFromHub() got answer from hub: "+JSON.stringify(connectedClients));
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
			logger.log("CommunicationCLient::connectToLocalHubs()");
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
						logger.log("Connected to local hub at ip: "+ip+" port: "+port);
						hubId = communicator.addConnection(connection);
						
						localHubs[hubId] = hubId;
						
						// Connected to the local hub, check which other clients are connected to this hub
						updateConnectedClients(hubId, function()
							{
							communicator.callRpc("registerAsClient", [ownId, clientType, groupId], self, function(err, givenId)
								{
								logger.log("CommunicationClient::connectToLocalHubs() registered as client at local hub at ip: "+ip+" port: "+port);
								});	
							});
						});
					}
				}
			callback();		
			};

		var updateLocalHubs = function(callback)
			{
			logger.log("Getting list of local hubs from the server");
			communicator.callRpc("getLocalHubs", [], self, function(err, hubs)
				{
				logger.log("Following local hubs are available: "+JSON.stringify(hubs));
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
			logger.log("CommunicationClient::connectWithOptions()");
			clientType = clientType_;
			groupId = groupId_;
			
			communicator.setBinaryListener(self);
			
			if (!options.hasOwnProperty("id"))
				options.id = null;
			
			serverConnectionOptions = options;
							
			serverConnection.connect(serverConnectionOptions, function()
				{
				logger.log("connected to the websocket server");
				
				serverId = communicator.addConnection(serverConnection);			
				
				rtcConnector = new WebRtcConnector(communicator, serverId, WEBRTC_CONFIG);
				rtcConnector.setConnectionListener(self);		
				
				communicator.callRpc("registerAsClient", [null, clientType, groupId], self, function(err, givenId)
					{
					logger.log("Server replied to registerAsClient call: '"+ givenId+ "'");
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
			logger.log("CommunicationClient::onClientConnected() from connectionId: "+connectionId);
			logger.log("CommunicationClient::onClientConnected() localHubs was:");
			console.dir(localHubs);
			
			logger.log("CommunicationClient::onClientConnected(), ownId: "+ownId+", newClient: '"+ JSON.stringify(clientData) +"'");
			
			if (clientData.clientId == ownId)
				return;
					
			if (localHubs.hasOwnProperty(connectionId))
				{
					
				logger.log("CommunicationClient::onClientConnected() client connected through localhub, clientId: "+clientData.clientId);
				
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
			logger.log("CommunicationClient::onClientDisconnected() '"+ JSON.stringify(clientData) +"'");
			
			if (clients.hasOwnProperty(clientData.clientId) && clientListener && clientData.clientId != ownId)
				{
				clientListener.onClientDisconnected(clients[clientData.clientId]);
				removeClient(clientData.clientId);
				}
			};
				
		self.onHubConnected = function(hubData, connectionId, callback)
			{
			logger.log("CommunicationClient::onHubConnected() '"+ JSON.stringify(hubData) +"'");
			};
			
		self.onHubDisconnected = function(hubData,  connectionId, callback)
			{
			logger.log("CommunicationClient::onHubDisconnected() '"+ JSON.stringify(hubData) +"'");
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
			console.log("RpcCommunicator::setupPipe() between: "+firstId+" and "+secondId);
			
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
					console.log("RPCCommunicator::onMessage() received arraybuffer");
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
			logger.log("WebSocketConnection::connect()");
			options.protocol = (!options.isSsl ? "ws" : "wss");	
			
			try	{	
				var url = options.protocol + "://" + options.host + ":" + options.port + "/"+"json-rpc";
				if (options.id)
					url += "?id="+options.id;
				
				logger.log("WebSocketConnection::connect()" + url);
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
			logger.log("WebSocketConnection::setSocket()");	
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
			logger.log("WebSocketConnection::onMessage() "+JSON.stringify(message));	
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
		                        

	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict"

	/**
	 * Implements the XMLHttpRequest interface.
	 * References the GLOBAL variable piperClient to implement its functionality
	 */


	function SpXMLHttpRequest()
	{
	var self = this;

	// Includes 

	var HttpParser = null;
	var URL = null;
	var LoaderUtil = null;
	var piperClient = null;

	if (true)
		{
		HttpParser = __webpack_require__(7);
		URL = __webpack_require__(13);
		LoaderUtil = __webpack_require__(1);
		piperClient = global.piperClient;
		}
	else
		{
		HttpParser = window.HttpParser;
		URL = window.URL;
		LoaderUtil = new window.LoaderUtil();
		piperClient = window.piperClient;
		}
		
	var logger = console;

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
		//logger.log("SpXMLHttpRequest::onBinary()" +" data: "+ab2str(arr));

		if (!contentLength)		//This is the header chunk
			{
			httpParser.parse(arr);

			logger.log("SpXMLHttpRequest::onBinary() HTTP server replied with statusCode "+httpParser.getStatusCode());

			if (httpParser.getStatusCode() == 301 || httpParser.getStatusCode() == 302)
				{
				url = httpParser.getHeaderValue("Location");
				logger.log("SpXMLHttpRequest::onBinary() redirecting to : " + url);
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

		logger.log(bodyBytesReceived + " / " + contentLength + " bytes of " + url + " received" );

		/*if (contentLength && contentLength < bodyBytesReceived)
			{
			saveByteArray(fragments, 'example.js');
			}*/

		if (contentLength && contentLength == bodyBytesReceived)
			{
			//!!!!!!!!!!!!!!!!!!commented out for testing in node
			//if (!overridedMimeType)
			//	self.response = new Blob(fragments, {type : contentType} );
			//else
			//	self.response = new Blob(fragments, {type : overridedMimeType} );
			//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

			for (var i = 0; i < fragments.length; i++)
				{
				if (fragments[i])
					self.responseText += LoaderUtil.ab2str(fragments[i]);
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

		var cookies = LoaderUtil.getSession("sessionCookies");

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

		var data = LoaderUtil.toab(request);

		logger.log("SpXMLHttpRequest::send() making request: " + request);

		piperClient.createTcpTunnel(hostname, port, self.onBinary, function(pipeId)
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
	SpXMLHttpRequest.UNSENT = 0;
	SpXMLHttpRequest.OPENED = 1;
	SpXMLHttpRequest.HEADERS_RECEIVED = 2;
	SpXMLHttpRequest.LOADING = 3;
	SpXMLHttpRequest.DONE = 4;

	if (true)
		{
		module.exports = SpXMLHttpRequest;
		}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var URI = __webpack_require__(14);

	var URL = function (url, base) {
	  var uri = URI(url);

	  if (typeof base === 'string') {
	    uri = uri.absoluteTo(base);
	  }

	  var url = Object.create(URL.prototype);
	 
	  Object.defineProperty(url, 'origin', {
	    get: function () {
	      return uri.protocol() + '://' + uri.host();
	    }
	  });

	  Object.defineProperty(url, 'protocol', {
	    get: function () {
	      return uri.protocol() + ':';
	    }
	  });

	  'hash host hostname href password pathname port search username'
	    .split(/\s+/)
	    .forEach(function (property) {
	      Object.defineProperty(url, property, {
	        get: function () {
	          return uri[property]();
	        },
	        set: function (value) {
	          uri[property](value);
	          return uri[property]();
	        }
	      });
	    });

	  url.prototype = this.prototype;

	  return url;
	};

	URL.prototype.toString = function () {
	  return this.href;
	};

	module.exports = URL;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * URI.js - Mutating URLs
	 *
	 * Version: 1.16.1
	 *
	 * Author: Rodney Rehm
	 * Web: http://medialize.github.io/URI.js/
	 *
	 * Licensed under
	 *   MIT License http://www.opensource.org/licenses/mit-license
	 *   GPL v3 http://opensource.org/licenses/GPL-3.0
	 *
	 */
	(function (root, factory) {
	  'use strict';
	  // https://github.com/umdjs/umd/blob/master/returnExports.js
	  if (true) {
	    // Node
	    module.exports = factory(__webpack_require__(15), __webpack_require__(17), __webpack_require__(18));
	  } else if (typeof define === 'function' && define.amd) {
	    // AMD. Register as an anonymous module.
	    define(['./punycode', './IPv6', './SecondLevelDomains'], factory);
	  } else {
	    // Browser globals (root is window)
	    root.URI = factory(root.punycode, root.IPv6, root.SecondLevelDomains, root);
	  }
	}(this, function (punycode, IPv6, SLD, root) {
	  'use strict';
	  /*global location, escape, unescape */
	  // FIXME: v2.0.0 renamce non-camelCase properties to uppercase
	  /*jshint camelcase: false */

	  // save current URI variable, if any
	  var _URI = root && root.URI;

	  function URI(url, base) {
	    var _urlSupplied = arguments.length >= 1;
	    var _baseSupplied = arguments.length >= 2;

	    // Allow instantiation without the 'new' keyword
	    if (!(this instanceof URI)) {
	      if (_urlSupplied) {
	        if (_baseSupplied) {
	          return new URI(url, base);
	        }

	        return new URI(url);
	      }

	      return new URI();
	    }

	    if (url === undefined) {
	      if (_urlSupplied) {
	        throw new TypeError('undefined is not a valid argument for URI');
	      }

	      if (typeof location !== 'undefined') {
	        url = location.href + '';
	      } else {
	        url = '';
	      }
	    }

	    this.href(url);

	    // resolve to base according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#constructor
	    if (base !== undefined) {
	      return this.absoluteTo(base);
	    }

	    return this;
	  }

	  URI.version = '1.16.1';

	  var p = URI.prototype;
	  var hasOwn = Object.prototype.hasOwnProperty;

	  function escapeRegEx(string) {
	    // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
	    return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	  }

	  function getType(value) {
	    // IE8 doesn't return [Object Undefined] but [Object Object] for undefined value
	    if (value === undefined) {
	      return 'Undefined';
	    }

	    return String(Object.prototype.toString.call(value)).slice(8, -1);
	  }

	  function isArray(obj) {
	    return getType(obj) === 'Array';
	  }

	  function filterArrayValues(data, value) {
	    var lookup = {};
	    var i, length;

	    if (getType(value) === 'RegExp') {
	      lookup = null;
	    } else if (isArray(value)) {
	      for (i = 0, length = value.length; i < length; i++) {
	        lookup[value[i]] = true;
	      }
	    } else {
	      lookup[value] = true;
	    }

	    for (i = 0, length = data.length; i < length; i++) {
	      /*jshint laxbreak: true */
	      var _match = lookup && lookup[data[i]] !== undefined
	        || !lookup && value.test(data[i]);
	      /*jshint laxbreak: false */
	      if (_match) {
	        data.splice(i, 1);
	        length--;
	        i--;
	      }
	    }

	    return data;
	  }

	  function arrayContains(list, value) {
	    var i, length;

	    // value may be string, number, array, regexp
	    if (isArray(value)) {
	      // Note: this can be optimized to O(n) (instead of current O(m * n))
	      for (i = 0, length = value.length; i < length; i++) {
	        if (!arrayContains(list, value[i])) {
	          return false;
	        }
	      }

	      return true;
	    }

	    var _type = getType(value);
	    for (i = 0, length = list.length; i < length; i++) {
	      if (_type === 'RegExp') {
	        if (typeof list[i] === 'string' && list[i].match(value)) {
	          return true;
	        }
	      } else if (list[i] === value) {
	        return true;
	      }
	    }

	    return false;
	  }

	  function arraysEqual(one, two) {
	    if (!isArray(one) || !isArray(two)) {
	      return false;
	    }

	    // arrays can't be equal if they have different amount of content
	    if (one.length !== two.length) {
	      return false;
	    }

	    one.sort();
	    two.sort();

	    for (var i = 0, l = one.length; i < l; i++) {
	      if (one[i] !== two[i]) {
	        return false;
	      }
	    }

	    return true;
	  }

	  URI._parts = function() {
	    return {
	      protocol: null,
	      username: null,
	      password: null,
	      hostname: null,
	      urn: null,
	      port: null,
	      path: null,
	      query: null,
	      fragment: null,
	      // state
	      duplicateQueryParameters: URI.duplicateQueryParameters,
	      escapeQuerySpace: URI.escapeQuerySpace
	    };
	  };
	  // state: allow duplicate query parameters (a=1&a=1)
	  URI.duplicateQueryParameters = false;
	  // state: replaces + with %20 (space in query strings)
	  URI.escapeQuerySpace = true;
	  // static properties
	  URI.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
	  URI.idn_expression = /[^a-z0-9\.-]/i;
	  URI.punycode_expression = /(xn--)/i;
	  // well, 333.444.555.666 matches, but it sure ain't no IPv4 - do we care?
	  URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
	  // credits to Rich Brown
	  // source: http://forums.intermapper.com/viewtopic.php?p=1096#1096
	  // specification: http://www.ietf.org/rfc/rfc4291.txt
	  URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
	  // expression used is "gruber revised" (@gruber v2) determined to be the
	  // best solution in a regex-golf we did a couple of ages ago at
	  // * http://mathiasbynens.be/demo/url-regex
	  // * http://rodneyrehm.de/t/url-regex.html
	  URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
	  URI.findUri = {
	    // valid "scheme://" or "www."
	    start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
	    // everything up to the next whitespace
	    end: /[\s\r\n]|$/,
	    // trim trailing punctuation captured by end RegExp
	    trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/
	  };
	  // http://www.iana.org/assignments/uri-schemes.html
	  // http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports
	  URI.defaultPorts = {
	    http: '80',
	    https: '443',
	    ftp: '21',
	    gopher: '70',
	    ws: '80',
	    wss: '443'
	  };
	  // allowed hostname characters according to RFC 3986
	  // ALPHA DIGIT "-" "." "_" "~" "!" "$" "&" "'" "(" ")" "*" "+" "," ";" "=" %encoded
	  // I've never seen a (non-IDN) hostname other than: ALPHA DIGIT . -
	  URI.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/;
	  // map DOM Elements to their URI attribute
	  URI.domAttributes = {
	    'a': 'href',
	    'blockquote': 'cite',
	    'link': 'href',
	    'base': 'href',
	    'script': 'src',
	    'form': 'action',
	    'img': 'src',
	    'area': 'href',
	    'iframe': 'src',
	    'embed': 'src',
	    'source': 'src',
	    'track': 'src',
	    'input': 'src', // but only if type="image"
	    'audio': 'src',
	    'video': 'src'
	  };
	  URI.getDomAttribute = function(node) {
	    if (!node || !node.nodeName) {
	      return undefined;
	    }

	    var nodeName = node.nodeName.toLowerCase();
	    // <input> should only expose src for type="image"
	    if (nodeName === 'input' && node.type !== 'image') {
	      return undefined;
	    }

	    return URI.domAttributes[nodeName];
	  };

	  function escapeForDumbFirefox36(value) {
	    // https://github.com/medialize/URI.js/issues/91
	    return escape(value);
	  }

	  // encoding / decoding according to RFC3986
	  function strictEncodeURIComponent(string) {
	    // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
	    return encodeURIComponent(string)
	      .replace(/[!'()*]/g, escapeForDumbFirefox36)
	      .replace(/\*/g, '%2A');
	  }
	  URI.encode = strictEncodeURIComponent;
	  URI.decode = decodeURIComponent;
	  URI.iso8859 = function() {
	    URI.encode = escape;
	    URI.decode = unescape;
	  };
	  URI.unicode = function() {
	    URI.encode = strictEncodeURIComponent;
	    URI.decode = decodeURIComponent;
	  };
	  URI.characters = {
	    pathname: {
	      encode: {
	        // RFC3986 2.1: For consistency, URI producers and normalizers should
	        // use uppercase hexadecimal digits for all percent-encodings.
	        expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
	        map: {
	          // -._~!'()*
	          '%24': '$',
	          '%26': '&',
	          '%2B': '+',
	          '%2C': ',',
	          '%3B': ';',
	          '%3D': '=',
	          '%3A': ':',
	          '%40': '@'
	        }
	      },
	      decode: {
	        expression: /[\/\?#]/g,
	        map: {
	          '/': '%2F',
	          '?': '%3F',
	          '#': '%23'
	        }
	      }
	    },
	    reserved: {
	      encode: {
	        // RFC3986 2.1: For consistency, URI producers and normalizers should
	        // use uppercase hexadecimal digits for all percent-encodings.
	        expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
	        map: {
	          // gen-delims
	          '%3A': ':',
	          '%2F': '/',
	          '%3F': '?',
	          '%23': '#',
	          '%5B': '[',
	          '%5D': ']',
	          '%40': '@',
	          // sub-delims
	          '%21': '!',
	          '%24': '$',
	          '%26': '&',
	          '%27': '\'',
	          '%28': '(',
	          '%29': ')',
	          '%2A': '*',
	          '%2B': '+',
	          '%2C': ',',
	          '%3B': ';',
	          '%3D': '='
	        }
	      }
	    },
	    urnpath: {
	      // The characters under `encode` are the characters called out by RFC 2141 as being acceptable
	      // for usage in a URN. RFC2141 also calls out "-", ".", and "_" as acceptable characters, but
	      // these aren't encoded by encodeURIComponent, so we don't have to call them out here. Also
	      // note that the colon character is not featured in the encoding map; this is because URI.js
	      // gives the colons in URNs semantic meaning as the delimiters of path segements, and so it
	      // should not appear unencoded in a segment itself.
	      // See also the note above about RFC3986 and capitalalized hex digits.
	      encode: {
	        expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,
	        map: {
	          '%21': '!',
	          '%24': '$',
	          '%27': '\'',
	          '%28': '(',
	          '%29': ')',
	          '%2A': '*',
	          '%2B': '+',
	          '%2C': ',',
	          '%3B': ';',
	          '%3D': '=',
	          '%40': '@'
	        }
	      },
	      // These characters are the characters called out by RFC2141 as "reserved" characters that
	      // should never appear in a URN, plus the colon character (see note above).
	      decode: {
	        expression: /[\/\?#:]/g,
	        map: {
	          '/': '%2F',
	          '?': '%3F',
	          '#': '%23',
	          ':': '%3A'
	        }
	      }
	    }
	  };
	  URI.encodeQuery = function(string, escapeQuerySpace) {
	    var escaped = URI.encode(string + '');
	    if (escapeQuerySpace === undefined) {
	      escapeQuerySpace = URI.escapeQuerySpace;
	    }

	    return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
	  };
	  URI.decodeQuery = function(string, escapeQuerySpace) {
	    string += '';
	    if (escapeQuerySpace === undefined) {
	      escapeQuerySpace = URI.escapeQuerySpace;
	    }

	    try {
	      return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
	    } catch(e) {
	      // we're not going to mess with weird encodings,
	      // give up and return the undecoded original string
	      // see https://github.com/medialize/URI.js/issues/87
	      // see https://github.com/medialize/URI.js/issues/92
	      return string;
	    }
	  };
	  // generate encode/decode path functions
	  var _parts = {'encode':'encode', 'decode':'decode'};
	  var _part;
	  var generateAccessor = function(_group, _part) {
	    return function(string) {
	      try {
	        return URI[_part](string + '').replace(URI.characters[_group][_part].expression, function(c) {
	          return URI.characters[_group][_part].map[c];
	        });
	      } catch (e) {
	        // we're not going to mess with weird encodings,
	        // give up and return the undecoded original string
	        // see https://github.com/medialize/URI.js/issues/87
	        // see https://github.com/medialize/URI.js/issues/92
	        return string;
	      }
	    };
	  };

	  for (_part in _parts) {
	    URI[_part + 'PathSegment'] = generateAccessor('pathname', _parts[_part]);
	    URI[_part + 'UrnPathSegment'] = generateAccessor('urnpath', _parts[_part]);
	  }

	  var generateSegmentedPathFunction = function(_sep, _codingFuncName, _innerCodingFuncName) {
	    return function(string) {
	      // Why pass in names of functions, rather than the function objects themselves? The
	      // definitions of some functions (but in particular, URI.decode) will occasionally change due
	      // to URI.js having ISO8859 and Unicode modes. Passing in the name and getting it will ensure
	      // that the functions we use here are "fresh".
	      var actualCodingFunc;
	      if (!_innerCodingFuncName) {
	        actualCodingFunc = URI[_codingFuncName];
	      } else {
	        actualCodingFunc = function(string) {
	          return URI[_codingFuncName](URI[_innerCodingFuncName](string));
	        };
	      }

	      var segments = (string + '').split(_sep);

	      for (var i = 0, length = segments.length; i < length; i++) {
	        segments[i] = actualCodingFunc(segments[i]);
	      }

	      return segments.join(_sep);
	    };
	  };

	  // This takes place outside the above loop because we don't want, e.g., encodeUrnPath functions.
	  URI.decodePath = generateSegmentedPathFunction('/', 'decodePathSegment');
	  URI.decodeUrnPath = generateSegmentedPathFunction(':', 'decodeUrnPathSegment');
	  URI.recodePath = generateSegmentedPathFunction('/', 'encodePathSegment', 'decode');
	  URI.recodeUrnPath = generateSegmentedPathFunction(':', 'encodeUrnPathSegment', 'decode');

	  URI.encodeReserved = generateAccessor('reserved', 'encode');

	  URI.parse = function(string, parts) {
	    var pos;
	    if (!parts) {
	      parts = {};
	    }
	    // [protocol"://"[username[":"password]"@"]hostname[":"port]"/"?][path]["?"querystring]["#"fragment]

	    // extract fragment
	    pos = string.indexOf('#');
	    if (pos > -1) {
	      // escaping?
	      parts.fragment = string.substring(pos + 1) || null;
	      string = string.substring(0, pos);
	    }

	    // extract query
	    pos = string.indexOf('?');
	    if (pos > -1) {
	      // escaping?
	      parts.query = string.substring(pos + 1) || null;
	      string = string.substring(0, pos);
	    }

	    // extract protocol
	    if (string.substring(0, 2) === '//') {
	      // relative-scheme
	      parts.protocol = null;
	      string = string.substring(2);
	      // extract "user:pass@host:port"
	      string = URI.parseAuthority(string, parts);
	    } else {
	      pos = string.indexOf(':');
	      if (pos > -1) {
	        parts.protocol = string.substring(0, pos) || null;
	        if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
	          // : may be within the path
	          parts.protocol = undefined;
	        } else if (string.substring(pos + 1, pos + 3) === '//') {
	          string = string.substring(pos + 3);

	          // extract "user:pass@host:port"
	          string = URI.parseAuthority(string, parts);
	        } else {
	          string = string.substring(pos + 1);
	          parts.urn = true;
	        }
	      }
	    }

	    // what's left must be the path
	    parts.path = string;

	    // and we're done
	    return parts;
	  };
	  URI.parseHost = function(string, parts) {
	    // Copy chrome, IE, opera backslash-handling behavior.
	    // Back slashes before the query string get converted to forward slashes
	    // See: https://github.com/joyent/node/blob/386fd24f49b0e9d1a8a076592a404168faeecc34/lib/url.js#L115-L124
	    // See: https://code.google.com/p/chromium/issues/detail?id=25916
	    // https://github.com/medialize/URI.js/pull/233
	    string = string.replace(/\\/g, '/');

	    // extract host:port
	    var pos = string.indexOf('/');
	    var bracketPos;
	    var t;

	    if (pos === -1) {
	      pos = string.length;
	    }

	    if (string.charAt(0) === '[') {
	      // IPv6 host - http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6
	      // I claim most client software breaks on IPv6 anyways. To simplify things, URI only accepts
	      // IPv6+port in the format [2001:db8::1]:80 (for the time being)
	      bracketPos = string.indexOf(']');
	      parts.hostname = string.substring(1, bracketPos) || null;
	      parts.port = string.substring(bracketPos + 2, pos) || null;
	      if (parts.port === '/') {
	        parts.port = null;
	      }
	    } else {
	      var firstColon = string.indexOf(':');
	      var firstSlash = string.indexOf('/');
	      var nextColon = string.indexOf(':', firstColon + 1);
	      if (nextColon !== -1 && (firstSlash === -1 || nextColon < firstSlash)) {
	        // IPv6 host contains multiple colons - but no port
	        // this notation is actually not allowed by RFC 3986, but we're a liberal parser
	        parts.hostname = string.substring(0, pos) || null;
	        parts.port = null;
	      } else {
	        t = string.substring(0, pos).split(':');
	        parts.hostname = t[0] || null;
	        parts.port = t[1] || null;
	      }
	    }

	    if (parts.hostname && string.substring(pos).charAt(0) !== '/') {
	      pos++;
	      string = '/' + string;
	    }

	    return string.substring(pos) || '/';
	  };
	  URI.parseAuthority = function(string, parts) {
	    string = URI.parseUserinfo(string, parts);
	    return URI.parseHost(string, parts);
	  };
	  URI.parseUserinfo = function(string, parts) {
	    // extract username:password
	    var firstSlash = string.indexOf('/');
	    var pos = string.lastIndexOf('@', firstSlash > -1 ? firstSlash : string.length - 1);
	    var t;

	    // authority@ must come before /path
	    if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
	      t = string.substring(0, pos).split(':');
	      parts.username = t[0] ? URI.decode(t[0]) : null;
	      t.shift();
	      parts.password = t[0] ? URI.decode(t.join(':')) : null;
	      string = string.substring(pos + 1);
	    } else {
	      parts.username = null;
	      parts.password = null;
	    }

	    return string;
	  };
	  URI.parseQuery = function(string, escapeQuerySpace) {
	    if (!string) {
	      return {};
	    }

	    // throw out the funky business - "?"[name"="value"&"]+
	    string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');

	    if (!string) {
	      return {};
	    }

	    var items = {};
	    var splits = string.split('&');
	    var length = splits.length;
	    var v, name, value;

	    for (var i = 0; i < length; i++) {
	      v = splits[i].split('=');
	      name = URI.decodeQuery(v.shift(), escapeQuerySpace);
	      // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
	      value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;

	      if (hasOwn.call(items, name)) {
	        if (typeof items[name] === 'string' || items[name] === null) {
	          items[name] = [items[name]];
	        }

	        items[name].push(value);
	      } else {
	        items[name] = value;
	      }
	    }

	    return items;
	  };

	  URI.build = function(parts) {
	    var t = '';

	    if (parts.protocol) {
	      t += parts.protocol + ':';
	    }

	    if (!parts.urn && (t || parts.hostname)) {
	      t += '//';
	    }

	    t += (URI.buildAuthority(parts) || '');

	    if (typeof parts.path === 'string') {
	      if (parts.path.charAt(0) !== '/' && typeof parts.hostname === 'string') {
	        t += '/';
	      }

	      t += parts.path;
	    }

	    if (typeof parts.query === 'string' && parts.query) {
	      t += '?' + parts.query;
	    }

	    if (typeof parts.fragment === 'string' && parts.fragment) {
	      t += '#' + parts.fragment;
	    }
	    return t;
	  };
	  URI.buildHost = function(parts) {
	    var t = '';

	    if (!parts.hostname) {
	      return '';
	    } else if (URI.ip6_expression.test(parts.hostname)) {
	      t += '[' + parts.hostname + ']';
	    } else {
	      t += parts.hostname;
	    }

	    if (parts.port) {
	      t += ':' + parts.port;
	    }

	    return t;
	  };
	  URI.buildAuthority = function(parts) {
	    return URI.buildUserinfo(parts) + URI.buildHost(parts);
	  };
	  URI.buildUserinfo = function(parts) {
	    var t = '';

	    if (parts.username) {
	      t += URI.encode(parts.username);

	      if (parts.password) {
	        t += ':' + URI.encode(parts.password);
	      }

	      t += '@';
	    }

	    return t;
	  };
	  URI.buildQuery = function(data, duplicateQueryParameters, escapeQuerySpace) {
	    // according to http://tools.ietf.org/html/rfc3986 or http://labs.apache.org/webarch/uri/rfc/rfc3986.html
	    // being »-._~!$&'()*+,;=:@/?« %HEX and alnum are allowed
	    // the RFC explicitly states ?/foo being a valid use case, no mention of parameter syntax!
	    // URI.js treats the query string as being application/x-www-form-urlencoded
	    // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type

	    var t = '';
	    var unique, key, i, length;
	    for (key in data) {
	      if (hasOwn.call(data, key) && key) {
	        if (isArray(data[key])) {
	          unique = {};
	          for (i = 0, length = data[key].length; i < length; i++) {
	            if (data[key][i] !== undefined && unique[data[key][i] + ''] === undefined) {
	              t += '&' + URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);
	              if (duplicateQueryParameters !== true) {
	                unique[data[key][i] + ''] = true;
	              }
	            }
	          }
	        } else if (data[key] !== undefined) {
	          t += '&' + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
	        }
	      }
	    }

	    return t.substring(1);
	  };
	  URI.buildQueryParameter = function(name, value, escapeQuerySpace) {
	    // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
	    // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
	    return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
	  };

	  URI.addQuery = function(data, name, value) {
	    if (typeof name === 'object') {
	      for (var key in name) {
	        if (hasOwn.call(name, key)) {
	          URI.addQuery(data, key, name[key]);
	        }
	      }
	    } else if (typeof name === 'string') {
	      if (data[name] === undefined) {
	        data[name] = value;
	        return;
	      } else if (typeof data[name] === 'string') {
	        data[name] = [data[name]];
	      }

	      if (!isArray(value)) {
	        value = [value];
	      }

	      data[name] = (data[name] || []).concat(value);
	    } else {
	      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
	    }
	  };
	  URI.removeQuery = function(data, name, value) {
	    var i, length, key;

	    if (isArray(name)) {
	      for (i = 0, length = name.length; i < length; i++) {
	        data[name[i]] = undefined;
	      }
	    } else if (getType(name) === 'RegExp') {
	      for (key in data) {
	        if (name.test(key)) {
	          data[key] = undefined;
	        }
	      }
	    } else if (typeof name === 'object') {
	      for (key in name) {
	        if (hasOwn.call(name, key)) {
	          URI.removeQuery(data, key, name[key]);
	        }
	      }
	    } else if (typeof name === 'string') {
	      if (value !== undefined) {
	        if (getType(value) === 'RegExp') {
	          if (!isArray(data[name]) && value.test(data[name])) {
	            data[name] = undefined;
	          } else {
	            data[name] = filterArrayValues(data[name], value);
	          }
	        } else if (data[name] === value) {
	          data[name] = undefined;
	        } else if (isArray(data[name])) {
	          data[name] = filterArrayValues(data[name], value);
	        }
	      } else {
	        data[name] = undefined;
	      }
	    } else {
	      throw new TypeError('URI.removeQuery() accepts an object, string, RegExp as the first parameter');
	    }
	  };
	  URI.hasQuery = function(data, name, value, withinArray) {
	    if (typeof name === 'object') {
	      for (var key in name) {
	        if (hasOwn.call(name, key)) {
	          if (!URI.hasQuery(data, key, name[key])) {
	            return false;
	          }
	        }
	      }

	      return true;
	    } else if (typeof name !== 'string') {
	      throw new TypeError('URI.hasQuery() accepts an object, string as the name parameter');
	    }

	    switch (getType(value)) {
	      case 'Undefined':
	        // true if exists (but may be empty)
	        return name in data; // data[name] !== undefined;

	      case 'Boolean':
	        // true if exists and non-empty
	        var _booly = Boolean(isArray(data[name]) ? data[name].length : data[name]);
	        return value === _booly;

	      case 'Function':
	        // allow complex comparison
	        return !!value(data[name], name, data);

	      case 'Array':
	        if (!isArray(data[name])) {
	          return false;
	        }

	        var op = withinArray ? arrayContains : arraysEqual;
	        return op(data[name], value);

	      case 'RegExp':
	        if (!isArray(data[name])) {
	          return Boolean(data[name] && data[name].match(value));
	        }

	        if (!withinArray) {
	          return false;
	        }

	        return arrayContains(data[name], value);

	      case 'Number':
	        value = String(value);
	        /* falls through */
	      case 'String':
	        if (!isArray(data[name])) {
	          return data[name] === value;
	        }

	        if (!withinArray) {
	          return false;
	        }

	        return arrayContains(data[name], value);

	      default:
	        throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');
	    }
	  };


	  URI.commonPath = function(one, two) {
	    var length = Math.min(one.length, two.length);
	    var pos;

	    // find first non-matching character
	    for (pos = 0; pos < length; pos++) {
	      if (one.charAt(pos) !== two.charAt(pos)) {
	        pos--;
	        break;
	      }
	    }

	    if (pos < 1) {
	      return one.charAt(0) === two.charAt(0) && one.charAt(0) === '/' ? '/' : '';
	    }

	    // revert to last /
	    if (one.charAt(pos) !== '/' || two.charAt(pos) !== '/') {
	      pos = one.substring(0, pos).lastIndexOf('/');
	    }

	    return one.substring(0, pos + 1);
	  };

	  URI.withinString = function(string, callback, options) {
	    options || (options = {});
	    var _start = options.start || URI.findUri.start;
	    var _end = options.end || URI.findUri.end;
	    var _trim = options.trim || URI.findUri.trim;
	    var _attributeOpen = /[a-z0-9-]=["']?$/i;

	    _start.lastIndex = 0;
	    while (true) {
	      var match = _start.exec(string);
	      if (!match) {
	        break;
	      }

	      var start = match.index;
	      if (options.ignoreHtml) {
	        // attribut(e=["']?$)
	        var attributeOpen = string.slice(Math.max(start - 3, 0), start);
	        if (attributeOpen && _attributeOpen.test(attributeOpen)) {
	          continue;
	        }
	      }

	      var end = start + string.slice(start).search(_end);
	      var slice = string.slice(start, end).replace(_trim, '');
	      if (options.ignore && options.ignore.test(slice)) {
	        continue;
	      }

	      end = start + slice.length;
	      var result = callback(slice, start, end, string);
	      string = string.slice(0, start) + result + string.slice(end);
	      _start.lastIndex = start + result.length;
	    }

	    _start.lastIndex = 0;
	    return string;
	  };

	  URI.ensureValidHostname = function(v) {
	    // Theoretically URIs allow percent-encoding in Hostnames (according to RFC 3986)
	    // they are not part of DNS and therefore ignored by URI.js

	    if (v.match(URI.invalid_hostname_characters)) {
	      // test punycode
	      if (!punycode) {
	        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-] and Punycode.js is not available');
	      }

	      if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
	        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
	      }
	    }
	  };

	  // noConflict
	  URI.noConflict = function(removeAll) {
	    if (removeAll) {
	      var unconflicted = {
	        URI: this.noConflict()
	      };

	      if (root.URITemplate && typeof root.URITemplate.noConflict === 'function') {
	        unconflicted.URITemplate = root.URITemplate.noConflict();
	      }

	      if (root.IPv6 && typeof root.IPv6.noConflict === 'function') {
	        unconflicted.IPv6 = root.IPv6.noConflict();
	      }

	      if (root.SecondLevelDomains && typeof root.SecondLevelDomains.noConflict === 'function') {
	        unconflicted.SecondLevelDomains = root.SecondLevelDomains.noConflict();
	      }

	      return unconflicted;
	    } else if (root.URI === this) {
	      root.URI = _URI;
	    }

	    return this;
	  };

	  p.build = function(deferBuild) {
	    if (deferBuild === true) {
	      this._deferred_build = true;
	    } else if (deferBuild === undefined || this._deferred_build) {
	      this._string = URI.build(this._parts);
	      this._deferred_build = false;
	    }

	    return this;
	  };

	  p.clone = function() {
	    return new URI(this);
	  };

	  p.valueOf = p.toString = function() {
	    return this.build(false)._string;
	  };


	  function generateSimpleAccessor(_part){
	    return function(v, build) {
	      if (v === undefined) {
	        return this._parts[_part] || '';
	      } else {
	        this._parts[_part] = v || null;
	        this.build(!build);
	        return this;
	      }
	    };
	  }

	  function generatePrefixAccessor(_part, _key){
	    return function(v, build) {
	      if (v === undefined) {
	        return this._parts[_part] || '';
	      } else {
	        if (v !== null) {
	          v = v + '';
	          if (v.charAt(0) === _key) {
	            v = v.substring(1);
	          }
	        }

	        this._parts[_part] = v;
	        this.build(!build);
	        return this;
	      }
	    };
	  }

	  p.protocol = generateSimpleAccessor('protocol');
	  p.username = generateSimpleAccessor('username');
	  p.password = generateSimpleAccessor('password');
	  p.hostname = generateSimpleAccessor('hostname');
	  p.port = generateSimpleAccessor('port');
	  p.query = generatePrefixAccessor('query', '?');
	  p.fragment = generatePrefixAccessor('fragment', '#');

	  p.search = function(v, build) {
	    var t = this.query(v, build);
	    return typeof t === 'string' && t.length ? ('?' + t) : t;
	  };
	  p.hash = function(v, build) {
	    var t = this.fragment(v, build);
	    return typeof t === 'string' && t.length ? ('#' + t) : t;
	  };

	  p.pathname = function(v, build) {
	    if (v === undefined || v === true) {
	      var res = this._parts.path || (this._parts.hostname ? '/' : '');
	      return v ? (this._parts.urn ? URI.decodeUrnPath : URI.decodePath)(res) : res;
	    } else {
	      if (this._parts.urn) {
	        this._parts.path = v ? URI.recodeUrnPath(v) : '';
	      } else {
	        this._parts.path = v ? URI.recodePath(v) : '/';
	      }
	      this.build(!build);
	      return this;
	    }
	  };
	  p.path = p.pathname;
	  p.href = function(href, build) {
	    var key;

	    if (href === undefined) {
	      return this.toString();
	    }

	    this._string = '';
	    this._parts = URI._parts();

	    var _URI = href instanceof URI;
	    var _object = typeof href === 'object' && (href.hostname || href.path || href.pathname);
	    if (href.nodeName) {
	      var attribute = URI.getDomAttribute(href);
	      href = href[attribute] || '';
	      _object = false;
	    }

	    // window.location is reported to be an object, but it's not the sort
	    // of object we're looking for:
	    // * location.protocol ends with a colon
	    // * location.query != object.search
	    // * location.hash != object.fragment
	    // simply serializing the unknown object should do the trick
	    // (for location, not for everything...)
	    if (!_URI && _object && href.pathname !== undefined) {
	      href = href.toString();
	    }

	    if (typeof href === 'string' || href instanceof String) {
	      this._parts = URI.parse(String(href), this._parts);
	    } else if (_URI || _object) {
	      var src = _URI ? href._parts : href;
	      for (key in src) {
	        if (hasOwn.call(this._parts, key)) {
	          this._parts[key] = src[key];
	        }
	      }
	    } else {
	      throw new TypeError('invalid input');
	    }

	    this.build(!build);
	    return this;
	  };

	  // identification accessors
	  p.is = function(what) {
	    var ip = false;
	    var ip4 = false;
	    var ip6 = false;
	    var name = false;
	    var sld = false;
	    var idn = false;
	    var punycode = false;
	    var relative = !this._parts.urn;

	    if (this._parts.hostname) {
	      relative = false;
	      ip4 = URI.ip4_expression.test(this._parts.hostname);
	      ip6 = URI.ip6_expression.test(this._parts.hostname);
	      ip = ip4 || ip6;
	      name = !ip;
	      sld = name && SLD && SLD.has(this._parts.hostname);
	      idn = name && URI.idn_expression.test(this._parts.hostname);
	      punycode = name && URI.punycode_expression.test(this._parts.hostname);
	    }

	    switch (what.toLowerCase()) {
	      case 'relative':
	        return relative;

	      case 'absolute':
	        return !relative;

	      // hostname identification
	      case 'domain':
	      case 'name':
	        return name;

	      case 'sld':
	        return sld;

	      case 'ip':
	        return ip;

	      case 'ip4':
	      case 'ipv4':
	      case 'inet4':
	        return ip4;

	      case 'ip6':
	      case 'ipv6':
	      case 'inet6':
	        return ip6;

	      case 'idn':
	        return idn;

	      case 'url':
	        return !this._parts.urn;

	      case 'urn':
	        return !!this._parts.urn;

	      case 'punycode':
	        return punycode;
	    }

	    return null;
	  };

	  // component specific input validation
	  var _protocol = p.protocol;
	  var _port = p.port;
	  var _hostname = p.hostname;

	  p.protocol = function(v, build) {
	    if (v !== undefined) {
	      if (v) {
	        // accept trailing ://
	        v = v.replace(/:(\/\/)?$/, '');

	        if (!v.match(URI.protocol_expression)) {
	          throw new TypeError('Protocol "' + v + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');
	        }
	      }
	    }
	    return _protocol.call(this, v, build);
	  };
	  p.scheme = p.protocol;
	  p.port = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (v !== undefined) {
	      if (v === 0) {
	        v = null;
	      }

	      if (v) {
	        v += '';
	        if (v.charAt(0) === ':') {
	          v = v.substring(1);
	        }

	        if (v.match(/[^0-9]/)) {
	          throw new TypeError('Port "' + v + '" contains characters other than [0-9]');
	        }
	      }
	    }
	    return _port.call(this, v, build);
	  };
	  p.hostname = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (v !== undefined) {
	      var x = {};
	      var res = URI.parseHost(v, x);
	      if (res !== '/') {
	        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
	      }

	      v = x.hostname;
	    }
	    return _hostname.call(this, v, build);
	  };

	  // compound accessors
	  p.host = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (v === undefined) {
	      return this._parts.hostname ? URI.buildHost(this._parts) : '';
	    } else {
	      var res = URI.parseHost(v, this._parts);
	      if (res !== '/') {
	        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
	      }

	      this.build(!build);
	      return this;
	    }
	  };
	  p.authority = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (v === undefined) {
	      return this._parts.hostname ? URI.buildAuthority(this._parts) : '';
	    } else {
	      var res = URI.parseAuthority(v, this._parts);
	      if (res !== '/') {
	        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
	      }

	      this.build(!build);
	      return this;
	    }
	  };
	  p.userinfo = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (v === undefined) {
	      if (!this._parts.username) {
	        return '';
	      }

	      var t = URI.buildUserinfo(this._parts);
	      return t.substring(0, t.length -1);
	    } else {
	      if (v[v.length-1] !== '@') {
	        v += '@';
	      }

	      URI.parseUserinfo(v, this._parts);
	      this.build(!build);
	      return this;
	    }
	  };
	  p.resource = function(v, build) {
	    var parts;

	    if (v === undefined) {
	      return this.path() + this.search() + this.hash();
	    }

	    parts = URI.parse(v);
	    this._parts.path = parts.path;
	    this._parts.query = parts.query;
	    this._parts.fragment = parts.fragment;
	    this.build(!build);
	    return this;
	  };

	  // fraction accessors
	  p.subdomain = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    // convenience, return "www" from "www.example.org"
	    if (v === undefined) {
	      if (!this._parts.hostname || this.is('IP')) {
	        return '';
	      }

	      // grab domain and add another segment
	      var end = this._parts.hostname.length - this.domain().length - 1;
	      return this._parts.hostname.substring(0, end) || '';
	    } else {
	      var e = this._parts.hostname.length - this.domain().length;
	      var sub = this._parts.hostname.substring(0, e);
	      var replace = new RegExp('^' + escapeRegEx(sub));

	      if (v && v.charAt(v.length - 1) !== '.') {
	        v += '.';
	      }

	      if (v) {
	        URI.ensureValidHostname(v);
	      }

	      this._parts.hostname = this._parts.hostname.replace(replace, v);
	      this.build(!build);
	      return this;
	    }
	  };
	  p.domain = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (typeof v === 'boolean') {
	      build = v;
	      v = undefined;
	    }

	    // convenience, return "example.org" from "www.example.org"
	    if (v === undefined) {
	      if (!this._parts.hostname || this.is('IP')) {
	        return '';
	      }

	      // if hostname consists of 1 or 2 segments, it must be the domain
	      var t = this._parts.hostname.match(/\./g);
	      if (t && t.length < 2) {
	        return this._parts.hostname;
	      }

	      // grab tld and add another segment
	      var end = this._parts.hostname.length - this.tld(build).length - 1;
	      end = this._parts.hostname.lastIndexOf('.', end -1) + 1;
	      return this._parts.hostname.substring(end) || '';
	    } else {
	      if (!v) {
	        throw new TypeError('cannot set domain empty');
	      }

	      URI.ensureValidHostname(v);

	      if (!this._parts.hostname || this.is('IP')) {
	        this._parts.hostname = v;
	      } else {
	        var replace = new RegExp(escapeRegEx(this.domain()) + '$');
	        this._parts.hostname = this._parts.hostname.replace(replace, v);
	      }

	      this.build(!build);
	      return this;
	    }
	  };
	  p.tld = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (typeof v === 'boolean') {
	      build = v;
	      v = undefined;
	    }

	    // return "org" from "www.example.org"
	    if (v === undefined) {
	      if (!this._parts.hostname || this.is('IP')) {
	        return '';
	      }

	      var pos = this._parts.hostname.lastIndexOf('.');
	      var tld = this._parts.hostname.substring(pos + 1);

	      if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
	        return SLD.get(this._parts.hostname) || tld;
	      }

	      return tld;
	    } else {
	      var replace;

	      if (!v) {
	        throw new TypeError('cannot set TLD empty');
	      } else if (v.match(/[^a-zA-Z0-9-]/)) {
	        if (SLD && SLD.is(v)) {
	          replace = new RegExp(escapeRegEx(this.tld()) + '$');
	          this._parts.hostname = this._parts.hostname.replace(replace, v);
	        } else {
	          throw new TypeError('TLD "' + v + '" contains characters other than [A-Z0-9]');
	        }
	      } else if (!this._parts.hostname || this.is('IP')) {
	        throw new ReferenceError('cannot set TLD on non-domain host');
	      } else {
	        replace = new RegExp(escapeRegEx(this.tld()) + '$');
	        this._parts.hostname = this._parts.hostname.replace(replace, v);
	      }

	      this.build(!build);
	      return this;
	    }
	  };
	  p.directory = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (v === undefined || v === true) {
	      if (!this._parts.path && !this._parts.hostname) {
	        return '';
	      }

	      if (this._parts.path === '/') {
	        return '/';
	      }

	      var end = this._parts.path.length - this.filename().length - 1;
	      var res = this._parts.path.substring(0, end) || (this._parts.hostname ? '/' : '');

	      return v ? URI.decodePath(res) : res;

	    } else {
	      var e = this._parts.path.length - this.filename().length;
	      var directory = this._parts.path.substring(0, e);
	      var replace = new RegExp('^' + escapeRegEx(directory));

	      // fully qualifier directories begin with a slash
	      if (!this.is('relative')) {
	        if (!v) {
	          v = '/';
	        }

	        if (v.charAt(0) !== '/') {
	          v = '/' + v;
	        }
	      }

	      // directories always end with a slash
	      if (v && v.charAt(v.length - 1) !== '/') {
	        v += '/';
	      }

	      v = URI.recodePath(v);
	      this._parts.path = this._parts.path.replace(replace, v);
	      this.build(!build);
	      return this;
	    }
	  };
	  p.filename = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (v === undefined || v === true) {
	      if (!this._parts.path || this._parts.path === '/') {
	        return '';
	      }

	      var pos = this._parts.path.lastIndexOf('/');
	      var res = this._parts.path.substring(pos+1);

	      return v ? URI.decodePathSegment(res) : res;
	    } else {
	      var mutatedDirectory = false;

	      if (v.charAt(0) === '/') {
	        v = v.substring(1);
	      }

	      if (v.match(/\.?\//)) {
	        mutatedDirectory = true;
	      }

	      var replace = new RegExp(escapeRegEx(this.filename()) + '$');
	      v = URI.recodePath(v);
	      this._parts.path = this._parts.path.replace(replace, v);

	      if (mutatedDirectory) {
	        this.normalizePath(build);
	      } else {
	        this.build(!build);
	      }

	      return this;
	    }
	  };
	  p.suffix = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (v === undefined || v === true) {
	      if (!this._parts.path || this._parts.path === '/') {
	        return '';
	      }

	      var filename = this.filename();
	      var pos = filename.lastIndexOf('.');
	      var s, res;

	      if (pos === -1) {
	        return '';
	      }

	      // suffix may only contain alnum characters (yup, I made this up.)
	      s = filename.substring(pos+1);
	      res = (/^[a-z0-9%]+$/i).test(s) ? s : '';
	      return v ? URI.decodePathSegment(res) : res;
	    } else {
	      if (v.charAt(0) === '.') {
	        v = v.substring(1);
	      }

	      var suffix = this.suffix();
	      var replace;

	      if (!suffix) {
	        if (!v) {
	          return this;
	        }

	        this._parts.path += '.' + URI.recodePath(v);
	      } else if (!v) {
	        replace = new RegExp(escapeRegEx('.' + suffix) + '$');
	      } else {
	        replace = new RegExp(escapeRegEx(suffix) + '$');
	      }

	      if (replace) {
	        v = URI.recodePath(v);
	        this._parts.path = this._parts.path.replace(replace, v);
	      }

	      this.build(!build);
	      return this;
	    }
	  };
	  p.segment = function(segment, v, build) {
	    var separator = this._parts.urn ? ':' : '/';
	    var path = this.path();
	    var absolute = path.substring(0, 1) === '/';
	    var segments = path.split(separator);

	    if (segment !== undefined && typeof segment !== 'number') {
	      build = v;
	      v = segment;
	      segment = undefined;
	    }

	    if (segment !== undefined && typeof segment !== 'number') {
	      throw new Error('Bad segment "' + segment + '", must be 0-based integer');
	    }

	    if (absolute) {
	      segments.shift();
	    }

	    if (segment < 0) {
	      // allow negative indexes to address from the end
	      segment = Math.max(segments.length + segment, 0);
	    }

	    if (v === undefined) {
	      /*jshint laxbreak: true */
	      return segment === undefined
	        ? segments
	        : segments[segment];
	      /*jshint laxbreak: false */
	    } else if (segment === null || segments[segment] === undefined) {
	      if (isArray(v)) {
	        segments = [];
	        // collapse empty elements within array
	        for (var i=0, l=v.length; i < l; i++) {
	          if (!v[i].length && (!segments.length || !segments[segments.length -1].length)) {
	            continue;
	          }

	          if (segments.length && !segments[segments.length -1].length) {
	            segments.pop();
	          }

	          segments.push(v[i]);
	        }
	      } else if (v || typeof v === 'string') {
	        if (segments[segments.length -1] === '') {
	          // empty trailing elements have to be overwritten
	          // to prevent results such as /foo//bar
	          segments[segments.length -1] = v;
	        } else {
	          segments.push(v);
	        }
	      }
	    } else {
	      if (v) {
	        segments[segment] = v;
	      } else {
	        segments.splice(segment, 1);
	      }
	    }

	    if (absolute) {
	      segments.unshift('');
	    }

	    return this.path(segments.join(separator), build);
	  };
	  p.segmentCoded = function(segment, v, build) {
	    var segments, i, l;

	    if (typeof segment !== 'number') {
	      build = v;
	      v = segment;
	      segment = undefined;
	    }

	    if (v === undefined) {
	      segments = this.segment(segment, v, build);
	      if (!isArray(segments)) {
	        segments = segments !== undefined ? URI.decode(segments) : undefined;
	      } else {
	        for (i = 0, l = segments.length; i < l; i++) {
	          segments[i] = URI.decode(segments[i]);
	        }
	      }

	      return segments;
	    }

	    if (!isArray(v)) {
	      v = (typeof v === 'string' || v instanceof String) ? URI.encode(v) : v;
	    } else {
	      for (i = 0, l = v.length; i < l; i++) {
	        v[i] = URI.encode(v[i]);
	      }
	    }

	    return this.segment(segment, v, build);
	  };

	  // mutating query string
	  var q = p.query;
	  p.query = function(v, build) {
	    if (v === true) {
	      return URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
	    } else if (typeof v === 'function') {
	      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
	      var result = v.call(this, data);
	      this._parts.query = URI.buildQuery(result || data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
	      this.build(!build);
	      return this;
	    } else if (v !== undefined && typeof v !== 'string') {
	      this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
	      this.build(!build);
	      return this;
	    } else {
	      return q.call(this, v, build);
	    }
	  };
	  p.setQuery = function(name, value, build) {
	    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);

	    if (typeof name === 'string' || name instanceof String) {
	      data[name] = value !== undefined ? value : null;
	    } else if (typeof name === 'object') {
	      for (var key in name) {
	        if (hasOwn.call(name, key)) {
	          data[key] = name[key];
	        }
	      }
	    } else {
	      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
	    }

	    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
	    if (typeof name !== 'string') {
	      build = value;
	    }

	    this.build(!build);
	    return this;
	  };
	  p.addQuery = function(name, value, build) {
	    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
	    URI.addQuery(data, name, value === undefined ? null : value);
	    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
	    if (typeof name !== 'string') {
	      build = value;
	    }

	    this.build(!build);
	    return this;
	  };
	  p.removeQuery = function(name, value, build) {
	    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
	    URI.removeQuery(data, name, value);
	    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
	    if (typeof name !== 'string') {
	      build = value;
	    }

	    this.build(!build);
	    return this;
	  };
	  p.hasQuery = function(name, value, withinArray) {
	    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
	    return URI.hasQuery(data, name, value, withinArray);
	  };
	  p.setSearch = p.setQuery;
	  p.addSearch = p.addQuery;
	  p.removeSearch = p.removeQuery;
	  p.hasSearch = p.hasQuery;

	  // sanitizing URLs
	  p.normalize = function() {
	    if (this._parts.urn) {
	      return this
	        .normalizeProtocol(false)
	        .normalizePath(false)
	        .normalizeQuery(false)
	        .normalizeFragment(false)
	        .build();
	    }

	    return this
	      .normalizeProtocol(false)
	      .normalizeHostname(false)
	      .normalizePort(false)
	      .normalizePath(false)
	      .normalizeQuery(false)
	      .normalizeFragment(false)
	      .build();
	  };
	  p.normalizeProtocol = function(build) {
	    if (typeof this._parts.protocol === 'string') {
	      this._parts.protocol = this._parts.protocol.toLowerCase();
	      this.build(!build);
	    }

	    return this;
	  };
	  p.normalizeHostname = function(build) {
	    if (this._parts.hostname) {
	      if (this.is('IDN') && punycode) {
	        this._parts.hostname = punycode.toASCII(this._parts.hostname);
	      } else if (this.is('IPv6') && IPv6) {
	        this._parts.hostname = IPv6.best(this._parts.hostname);
	      }

	      this._parts.hostname = this._parts.hostname.toLowerCase();
	      this.build(!build);
	    }

	    return this;
	  };
	  p.normalizePort = function(build) {
	    // remove port of it's the protocol's default
	    if (typeof this._parts.protocol === 'string' && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
	      this._parts.port = null;
	      this.build(!build);
	    }

	    return this;
	  };
	  p.normalizePath = function(build) {
	    var _path = this._parts.path;
	    if (!_path) {
	      return this;
	    }

	    if (this._parts.urn) {
	      this._parts.path = URI.recodeUrnPath(this._parts.path);
	      this.build(!build);
	      return this;
	    }

	    if (this._parts.path === '/') {
	      return this;
	    }

	    var _was_relative;
	    var _leadingParents = '';
	    var _parent, _pos;

	    // handle relative paths
	    if (_path.charAt(0) !== '/') {
	      _was_relative = true;
	      _path = '/' + _path;
	    }

	    // handle relative files (as opposed to directories)
	    if (_path.slice(-3) === '/..' || _path.slice(-2) === '/.') {
	      _path += '/';
	    }

	    // resolve simples
	    _path = _path
	      .replace(/(\/(\.\/)+)|(\/\.$)/g, '/')
	      .replace(/\/{2,}/g, '/');

	    // remember leading parents
	    if (_was_relative) {
	      _leadingParents = _path.substring(1).match(/^(\.\.\/)+/) || '';
	      if (_leadingParents) {
	        _leadingParents = _leadingParents[0];
	      }
	    }

	    // resolve parents
	    while (true) {
	      _parent = _path.indexOf('/..');
	      if (_parent === -1) {
	        // no more ../ to resolve
	        break;
	      } else if (_parent === 0) {
	        // top level cannot be relative, skip it
	        _path = _path.substring(3);
	        continue;
	      }

	      _pos = _path.substring(0, _parent).lastIndexOf('/');
	      if (_pos === -1) {
	        _pos = _parent;
	      }
	      _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
	    }

	    // revert to relative
	    if (_was_relative && this.is('relative')) {
	      _path = _leadingParents + _path.substring(1);
	    }

	    _path = URI.recodePath(_path);
	    this._parts.path = _path;
	    this.build(!build);
	    return this;
	  };
	  p.normalizePathname = p.normalizePath;
	  p.normalizeQuery = function(build) {
	    if (typeof this._parts.query === 'string') {
	      if (!this._parts.query.length) {
	        this._parts.query = null;
	      } else {
	        this.query(URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace));
	      }

	      this.build(!build);
	    }

	    return this;
	  };
	  p.normalizeFragment = function(build) {
	    if (!this._parts.fragment) {
	      this._parts.fragment = null;
	      this.build(!build);
	    }

	    return this;
	  };
	  p.normalizeSearch = p.normalizeQuery;
	  p.normalizeHash = p.normalizeFragment;

	  p.iso8859 = function() {
	    // expect unicode input, iso8859 output
	    var e = URI.encode;
	    var d = URI.decode;

	    URI.encode = escape;
	    URI.decode = decodeURIComponent;
	    try {
	      this.normalize();
	    } finally {
	      URI.encode = e;
	      URI.decode = d;
	    }
	    return this;
	  };

	  p.unicode = function() {
	    // expect iso8859 input, unicode output
	    var e = URI.encode;
	    var d = URI.decode;

	    URI.encode = strictEncodeURIComponent;
	    URI.decode = unescape;
	    try {
	      this.normalize();
	    } finally {
	      URI.encode = e;
	      URI.decode = d;
	    }
	    return this;
	  };

	  p.readable = function() {
	    var uri = this.clone();
	    // removing username, password, because they shouldn't be displayed according to RFC 3986
	    uri.username('').password('').normalize();
	    var t = '';
	    if (uri._parts.protocol) {
	      t += uri._parts.protocol + '://';
	    }

	    if (uri._parts.hostname) {
	      if (uri.is('punycode') && punycode) {
	        t += punycode.toUnicode(uri._parts.hostname);
	        if (uri._parts.port) {
	          t += ':' + uri._parts.port;
	        }
	      } else {
	        t += uri.host();
	      }
	    }

	    if (uri._parts.hostname && uri._parts.path && uri._parts.path.charAt(0) !== '/') {
	      t += '/';
	    }

	    t += uri.path(true);
	    if (uri._parts.query) {
	      var q = '';
	      for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) {
	        var kv = (qp[i] || '').split('=');
	        q += '&' + URI.decodeQuery(kv[0], this._parts.escapeQuerySpace)
	          .replace(/&/g, '%26');

	        if (kv[1] !== undefined) {
	          q += '=' + URI.decodeQuery(kv[1], this._parts.escapeQuerySpace)
	            .replace(/&/g, '%26');
	        }
	      }
	      t += '?' + q.substring(1);
	    }

	    t += URI.decodeQuery(uri.hash(), true);
	    return t;
	  };

	  // resolving relative and absolute URLs
	  p.absoluteTo = function(base) {
	    var resolved = this.clone();
	    var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
	    var basedir, i, p;

	    if (this._parts.urn) {
	      throw new Error('URNs do not have any generally defined hierarchical components');
	    }

	    if (!(base instanceof URI)) {
	      base = new URI(base);
	    }

	    if (!resolved._parts.protocol) {
	      resolved._parts.protocol = base._parts.protocol;
	    }

	    if (this._parts.hostname) {
	      return resolved;
	    }

	    for (i = 0; (p = properties[i]); i++) {
	      resolved._parts[p] = base._parts[p];
	    }

	    if (!resolved._parts.path) {
	      resolved._parts.path = base._parts.path;
	      if (!resolved._parts.query) {
	        resolved._parts.query = base._parts.query;
	      }
	    } else if (resolved._parts.path.substring(-2) === '..') {
	      resolved._parts.path += '/';
	    }

	    if (resolved.path().charAt(0) !== '/') {
	      basedir = base.directory();
	      basedir = basedir ? basedir : base.path().indexOf('/') === 0 ? '/' : '';
	      resolved._parts.path = (basedir ? (basedir + '/') : '') + resolved._parts.path;
	      resolved.normalizePath();
	    }

	    resolved.build();
	    return resolved;
	  };
	  p.relativeTo = function(base) {
	    var relative = this.clone().normalize();
	    var relativeParts, baseParts, common, relativePath, basePath;

	    if (relative._parts.urn) {
	      throw new Error('URNs do not have any generally defined hierarchical components');
	    }

	    base = new URI(base).normalize();
	    relativeParts = relative._parts;
	    baseParts = base._parts;
	    relativePath = relative.path();
	    basePath = base.path();

	    if (relativePath.charAt(0) !== '/') {
	      throw new Error('URI is already relative');
	    }

	    if (basePath.charAt(0) !== '/') {
	      throw new Error('Cannot calculate a URI relative to another relative URI');
	    }

	    if (relativeParts.protocol === baseParts.protocol) {
	      relativeParts.protocol = null;
	    }

	    if (relativeParts.username !== baseParts.username || relativeParts.password !== baseParts.password) {
	      return relative.build();
	    }

	    if (relativeParts.protocol !== null || relativeParts.username !== null || relativeParts.password !== null) {
	      return relative.build();
	    }

	    if (relativeParts.hostname === baseParts.hostname && relativeParts.port === baseParts.port) {
	      relativeParts.hostname = null;
	      relativeParts.port = null;
	    } else {
	      return relative.build();
	    }

	    if (relativePath === basePath) {
	      relativeParts.path = '';
	      return relative.build();
	    }

	    // determine common sub path
	    common = URI.commonPath(relativePath, basePath);

	    // If the paths have nothing in common, return a relative URL with the absolute path.
	    if (!common) {
	      return relative.build();
	    }

	    var parents = baseParts.path
	      .substring(common.length)
	      .replace(/[^\/]*$/, '')
	      .replace(/.*?\//g, '../');

	    relativeParts.path = (parents + relativeParts.path.substring(common.length)) || './';

	    return relative.build();
	  };

	  // comparing URIs
	  p.equals = function(uri) {
	    var one = this.clone();
	    var two = new URI(uri);
	    var one_map = {};
	    var two_map = {};
	    var checked = {};
	    var one_query, two_query, key;

	    one.normalize();
	    two.normalize();

	    // exact match
	    if (one.toString() === two.toString()) {
	      return true;
	    }

	    // extract query string
	    one_query = one.query();
	    two_query = two.query();
	    one.query('');
	    two.query('');

	    // definitely not equal if not even non-query parts match
	    if (one.toString() !== two.toString()) {
	      return false;
	    }

	    // query parameters have the same length, even if they're permuted
	    if (one_query.length !== two_query.length) {
	      return false;
	    }

	    one_map = URI.parseQuery(one_query, this._parts.escapeQuerySpace);
	    two_map = URI.parseQuery(two_query, this._parts.escapeQuerySpace);

	    for (key in one_map) {
	      if (hasOwn.call(one_map, key)) {
	        if (!isArray(one_map[key])) {
	          if (one_map[key] !== two_map[key]) {
	            return false;
	          }
	        } else if (!arraysEqual(one_map[key], two_map[key])) {
	          return false;
	        }

	        checked[key] = true;
	      }
	    }

	    for (key in two_map) {
	      if (hasOwn.call(two_map, key)) {
	        if (!checked[key]) {
	          // two contains a parameter not present in one
	          return false;
	        }
	      }
	    }

	    return true;
	  };

	  // state
	  p.duplicateQueryParameters = function(v) {
	    this._parts.duplicateQueryParameters = !!v;
	    return this;
	  };

	  p.escapeQuerySpace = function(v) {
	    this._parts.escapeQuerySpace = !!v;
	    return this;
	  };

	  return URI;
	}));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! http://mths.be/punycode v1.2.3 by @mathias */
	;(function(root) {

		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports;
		var freeModule = typeof module == 'object' && module &&
			module.exports == freeExports && module;
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}

		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,

		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'

		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^ -~]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g, // RFC 3490 separators

		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},

		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,

		/** Temporary variable */
		key;

		/*--------------------------------------------------------------------------*/

		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}

		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			while (length--) {
				array[length] = fn(array[length]);
			}
			return array;
		}

		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings.
		 * @private
		 * @param {String} domain The domain name.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			return map(string.split(regexSeparators), fn).join('.');
		}

		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <http://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}

		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}

		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}

		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}

		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    length,
			    /** Cached calculation results */
			    baseMinusT;

			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.

			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}

			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}

			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.

			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

					if (index >= inputLength) {
						error('invalid-input');
					}

					digit = basicToDigit(input.charCodeAt(index++));

					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}

					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

					if (digit < t) {
						break;
					}

					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}

					w *= baseMinusT;

				}

				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);

				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}

				n += floor(i / out);
				i %= out;

				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);

			}

			return ucs2encode(output);
		}

		/**
		 * Converts a string of Unicode symbols to a Punycode string of ASCII-only
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;

			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);

			// Cache the length
			inputLength = input.length;

			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;

			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}

			handledCPCount = basicLength = output.length;

			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.

			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}

			// Main encoding loop:
			while (handledCPCount < inputLength) {

				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}

				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}

				delta += (m - n) * handledCPCountPlusOne;
				n = m;

				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];

					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}

					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}

						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}

				++delta;
				++n;

			}
			return output.join('');
		}

		/**
		 * Converts a Punycode string representing a domain name to Unicode. Only the
		 * Punycoded parts of the domain name will be converted, i.e. it doesn't
		 * matter if you call it on a string that has already been converted to
		 * Unicode.
		 * @memberOf punycode
		 * @param {String} domain The Punycode domain name to convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(domain) {
			return mapDomain(domain, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}

		/**
		 * Converts a Unicode string representing a domain name to Punycode. Only the
		 * non-ASCII parts of the domain name will be converted, i.e. it doesn't
		 * matter if you call it with a domain that's already in ASCII.
		 * @memberOf punycode
		 * @param {String} domain The domain name to convert, as a Unicode string.
		 * @returns {String} The Punycode representation of the given domain name.
		 */
		function toASCII(domain) {
			return mapDomain(domain, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}

		/*--------------------------------------------------------------------------*/

		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.2.3',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <http://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};

		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}	else if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}

	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)(module), (function() { return this; }())))

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * URI.js - Mutating URLs
	 * IPv6 Support
	 *
	 * Version: 1.16.1
	 *
	 * Author: Rodney Rehm
	 * Web: http://medialize.github.io/URI.js/
	 *
	 * Licensed under
	 *   MIT License http://www.opensource.org/licenses/mit-license
	 *   GPL v3 http://opensource.org/licenses/GPL-3.0
	 *
	 */

	(function (root, factory) {
	  'use strict';
	  // https://github.com/umdjs/umd/blob/master/returnExports.js
	  if (true) {
	    // Node
	    module.exports = factory();
	  } else if (typeof define === 'function' && define.amd) {
	    // AMD. Register as an anonymous module.
	    define(factory);
	  } else {
	    // Browser globals (root is window)
	    root.IPv6 = factory(root);
	  }
	}(this, function (root) {
	  'use strict';

	  /*
	  var _in = "fe80:0000:0000:0000:0204:61ff:fe9d:f156";
	  var _out = IPv6.best(_in);
	  var _expected = "fe80::204:61ff:fe9d:f156";

	  console.log(_in, _out, _expected, _out === _expected);
	  */

	  // save current IPv6 variable, if any
	  var _IPv6 = root && root.IPv6;

	  function bestPresentation(address) {
	    // based on:
	    // Javascript to test an IPv6 address for proper format, and to
	    // present the "best text representation" according to IETF Draft RFC at
	    // http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04
	    // 8 Feb 2010 Rich Brown, Dartware, LLC
	    // Please feel free to use this code as long as you provide a link to
	    // http://www.intermapper.com
	    // http://intermapper.com/support/tools/IPV6-Validator.aspx
	    // http://download.dartware.com/thirdparty/ipv6validator.js

	    var _address = address.toLowerCase();
	    var segments = _address.split(':');
	    var length = segments.length;
	    var total = 8;

	    // trim colons (:: or ::a:b:c… or …a:b:c::)
	    if (segments[0] === '' && segments[1] === '' && segments[2] === '') {
	      // must have been ::
	      // remove first two items
	      segments.shift();
	      segments.shift();
	    } else if (segments[0] === '' && segments[1] === '') {
	      // must have been ::xxxx
	      // remove the first item
	      segments.shift();
	    } else if (segments[length - 1] === '' && segments[length - 2] === '') {
	      // must have been xxxx::
	      segments.pop();
	    }

	    length = segments.length;

	    // adjust total segments for IPv4 trailer
	    if (segments[length - 1].indexOf('.') !== -1) {
	      // found a "." which means IPv4
	      total = 7;
	    }

	    // fill empty segments them with "0000"
	    var pos;
	    for (pos = 0; pos < length; pos++) {
	      if (segments[pos] === '') {
	        break;
	      }
	    }

	    if (pos < total) {
	      segments.splice(pos, 1, '0000');
	      while (segments.length < total) {
	        segments.splice(pos, 0, '0000');
	      }

	      length = segments.length;
	    }

	    // strip leading zeros
	    var _segments;
	    for (var i = 0; i < total; i++) {
	      _segments = segments[i].split('');
	      for (var j = 0; j < 3 ; j++) {
	        if (_segments[0] === '0' && _segments.length > 1) {
	          _segments.splice(0,1);
	        } else {
	          break;
	        }
	      }

	      segments[i] = _segments.join('');
	    }

	    // find longest sequence of zeroes and coalesce them into one segment
	    var best = -1;
	    var _best = 0;
	    var _current = 0;
	    var current = -1;
	    var inzeroes = false;
	    // i; already declared

	    for (i = 0; i < total; i++) {
	      if (inzeroes) {
	        if (segments[i] === '0') {
	          _current += 1;
	        } else {
	          inzeroes = false;
	          if (_current > _best) {
	            best = current;
	            _best = _current;
	          }
	        }
	      } else {
	        if (segments[i] === '0') {
	          inzeroes = true;
	          current = i;
	          _current = 1;
	        }
	      }
	    }

	    if (_current > _best) {
	      best = current;
	      _best = _current;
	    }

	    if (_best > 1) {
	      segments.splice(best, _best, '');
	    }

	    length = segments.length;

	    // assemble remaining segments
	    var result = '';
	    if (segments[0] === '')  {
	      result = ':';
	    }

	    for (i = 0; i < length; i++) {
	      result += segments[i];
	      if (i === length - 1) {
	        break;
	      }

	      result += ':';
	    }

	    if (segments[length - 1] === '') {
	      result += ':';
	    }

	    return result;
	  }

	  function noConflict() {
	    /*jshint validthis: true */
	    if (root.IPv6 === this) {
	      root.IPv6 = _IPv6;
	    }
	  
	    return this;
	  }

	  return {
	    best: bestPresentation,
	    noConflict: noConflict
	  };
	}));


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * URI.js - Mutating URLs
	 * Second Level Domain (SLD) Support
	 *
	 * Version: 1.16.1
	 *
	 * Author: Rodney Rehm
	 * Web: http://medialize.github.io/URI.js/
	 *
	 * Licensed under
	 *   MIT License http://www.opensource.org/licenses/mit-license
	 *   GPL v3 http://opensource.org/licenses/GPL-3.0
	 *
	 */

	(function (root, factory) {
	  'use strict';
	  // https://github.com/umdjs/umd/blob/master/returnExports.js
	  if (true) {
	    // Node
	    module.exports = factory();
	  } else if (typeof define === 'function' && define.amd) {
	    // AMD. Register as an anonymous module.
	    define(factory);
	  } else {
	    // Browser globals (root is window)
	    root.SecondLevelDomains = factory(root);
	  }
	}(this, function (root) {
	  'use strict';

	  // save current SecondLevelDomains variable, if any
	  var _SecondLevelDomains = root && root.SecondLevelDomains;

	  var SLD = {
	    // list of known Second Level Domains
	    // converted list of SLDs from https://github.com/gavingmiller/second-level-domains
	    // ----
	    // publicsuffix.org is more current and actually used by a couple of browsers internally.
	    // downside is it also contains domains like "dyndns.org" - which is fine for the security
	    // issues browser have to deal with (SOP for cookies, etc) - but is way overboard for URI.js
	    // ----
	    list: {
	      'ac':' com gov mil net org ',
	      'ae':' ac co gov mil name net org pro sch ',
	      'af':' com edu gov net org ',
	      'al':' com edu gov mil net org ',
	      'ao':' co ed gv it og pb ',
	      'ar':' com edu gob gov int mil net org tur ',
	      'at':' ac co gv or ',
	      'au':' asn com csiro edu gov id net org ',
	      'ba':' co com edu gov mil net org rs unbi unmo unsa untz unze ',
	      'bb':' biz co com edu gov info net org store tv ',
	      'bh':' biz cc com edu gov info net org ',
	      'bn':' com edu gov net org ',
	      'bo':' com edu gob gov int mil net org tv ',
	      'br':' adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ',
	      'bs':' com edu gov net org ',
	      'bz':' du et om ov rg ',
	      'ca':' ab bc mb nb nf nl ns nt nu on pe qc sk yk ',
	      'ck':' biz co edu gen gov info net org ',
	      'cn':' ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ',
	      'co':' com edu gov mil net nom org ',
	      'cr':' ac c co ed fi go or sa ',
	      'cy':' ac biz com ekloges gov ltd name net org parliament press pro tm ',
	      'do':' art com edu gob gov mil net org sld web ',
	      'dz':' art asso com edu gov net org pol ',
	      'ec':' com edu fin gov info med mil net org pro ',
	      'eg':' com edu eun gov mil name net org sci ',
	      'er':' com edu gov ind mil net org rochest w ',
	      'es':' com edu gob nom org ',
	      'et':' biz com edu gov info name net org ',
	      'fj':' ac biz com info mil name net org pro ',
	      'fk':' ac co gov net nom org ',
	      'fr':' asso com f gouv nom prd presse tm ',
	      'gg':' co net org ',
	      'gh':' com edu gov mil org ',
	      'gn':' ac com gov net org ',
	      'gr':' com edu gov mil net org ',
	      'gt':' com edu gob ind mil net org ',
	      'gu':' com edu gov net org ',
	      'hk':' com edu gov idv net org ',
	      'hu':' 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ',
	      'id':' ac co go mil net or sch web ',
	      'il':' ac co gov idf k12 muni net org ',
	      'in':' ac co edu ernet firm gen gov i ind mil net nic org res ',
	      'iq':' com edu gov i mil net org ',
	      'ir':' ac co dnssec gov i id net org sch ',
	      'it':' edu gov ',
	      'je':' co net org ',
	      'jo':' com edu gov mil name net org sch ',
	      'jp':' ac ad co ed go gr lg ne or ',
	      'ke':' ac co go info me mobi ne or sc ',
	      'kh':' com edu gov mil net org per ',
	      'ki':' biz com de edu gov info mob net org tel ',
	      'km':' asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ',
	      'kn':' edu gov net org ',
	      'kr':' ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ',
	      'kw':' com edu gov net org ',
	      'ky':' com edu gov net org ',
	      'kz':' com edu gov mil net org ',
	      'lb':' com edu gov net org ',
	      'lk':' assn com edu gov grp hotel int ltd net ngo org sch soc web ',
	      'lr':' com edu gov net org ',
	      'lv':' asn com conf edu gov id mil net org ',
	      'ly':' com edu gov id med net org plc sch ',
	      'ma':' ac co gov m net org press ',
	      'mc':' asso tm ',
	      'me':' ac co edu gov its net org priv ',
	      'mg':' com edu gov mil nom org prd tm ',
	      'mk':' com edu gov inf name net org pro ',
	      'ml':' com edu gov net org presse ',
	      'mn':' edu gov org ',
	      'mo':' com edu gov net org ',
	      'mt':' com edu gov net org ',
	      'mv':' aero biz com coop edu gov info int mil museum name net org pro ',
	      'mw':' ac co com coop edu gov int museum net org ',
	      'mx':' com edu gob net org ',
	      'my':' com edu gov mil name net org sch ',
	      'nf':' arts com firm info net other per rec store web ',
	      'ng':' biz com edu gov mil mobi name net org sch ',
	      'ni':' ac co com edu gob mil net nom org ',
	      'np':' com edu gov mil net org ',
	      'nr':' biz com edu gov info net org ',
	      'om':' ac biz co com edu gov med mil museum net org pro sch ',
	      'pe':' com edu gob mil net nom org sld ',
	      'ph':' com edu gov i mil net ngo org ',
	      'pk':' biz com edu fam gob gok gon gop gos gov net org web ',
	      'pl':' art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ',
	      'pr':' ac biz com edu est gov info isla name net org pro prof ',
	      'ps':' com edu gov net org plo sec ',
	      'pw':' belau co ed go ne or ',
	      'ro':' arts com firm info nom nt org rec store tm www ',
	      'rs':' ac co edu gov in org ',
	      'sb':' com edu gov net org ',
	      'sc':' com edu gov net org ',
	      'sh':' co com edu gov net nom org ',
	      'sl':' com edu gov net org ',
	      'st':' co com consulado edu embaixada gov mil net org principe saotome store ',
	      'sv':' com edu gob org red ',
	      'sz':' ac co org ',
	      'tr':' av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ',
	      'tt':' aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ',
	      'tw':' club com ebiz edu game gov idv mil net org ',
	      'mu':' ac co com gov net or org ',
	      'mz':' ac co edu gov org ',
	      'na':' co com ',
	      'nz':' ac co cri geek gen govt health iwi maori mil net org parliament school ',
	      'pa':' abo ac com edu gob ing med net nom org sld ',
	      'pt':' com edu gov int net nome org publ ',
	      'py':' com edu gov mil net org ',
	      'qa':' com edu gov mil net org ',
	      're':' asso com nom ',
	      'ru':' ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ',
	      'rw':' ac co com edu gouv gov int mil net ',
	      'sa':' com edu gov med net org pub sch ',
	      'sd':' com edu gov info med net org tv ',
	      'se':' a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ',
	      'sg':' com edu gov idn net org per ',
	      'sn':' art com edu gouv org perso univ ',
	      'sy':' com edu gov mil net news org ',
	      'th':' ac co go in mi net or ',
	      'tj':' ac biz co com edu go gov info int mil name net nic org test web ',
	      'tn':' agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ',
	      'tz':' ac co go ne or ',
	      'ua':' biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ',
	      'ug':' ac co go ne or org sc ',
	      'uk':' ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ',
	      'us':' dni fed isa kids nsn ',
	      'uy':' com edu gub mil net org ',
	      've':' co com edu gob info mil net org web ',
	      'vi':' co com k12 net org ',
	      'vn':' ac biz com edu gov health info int name net org pro ',
	      'ye':' co com gov ltd me net org plc ',
	      'yu':' ac co edu gov org ',
	      'za':' ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ',
	      'zm':' ac co com edu gov net org sch '
	    },
	    // gorhill 2013-10-25: Using indexOf() instead Regexp(). Significant boost
	    // in both performance and memory footprint. No initialization required.
	    // http://jsperf.com/uri-js-sld-regex-vs-binary-search/4
	    // Following methods use lastIndexOf() rather than array.split() in order
	    // to avoid any memory allocations.
	    has: function(domain) {
	      var tldOffset = domain.lastIndexOf('.');
	      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
	        return false;
	      }
	      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
	      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
	        return false;
	      }
	      var sldList = SLD.list[domain.slice(tldOffset+1)];
	      if (!sldList) {
	        return false;
	      }
	      return sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') >= 0;
	    },
	    is: function(domain) {
	      var tldOffset = domain.lastIndexOf('.');
	      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
	        return false;
	      }
	      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
	      if (sldOffset >= 0) {
	        return false;
	      }
	      var sldList = SLD.list[domain.slice(tldOffset+1)];
	      if (!sldList) {
	        return false;
	      }
	      return sldList.indexOf(' ' + domain.slice(0, tldOffset) + ' ') >= 0;
	    },
	    get: function(domain) {
	      var tldOffset = domain.lastIndexOf('.');
	      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
	        return null;
	      }
	      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
	      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
	        return null;
	      }
	      var sldList = SLD.list[domain.slice(tldOffset+1)];
	      if (!sldList) {
	        return null;
	      }
	      if (sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') < 0) {
	        return null;
	      }
	      return domain.slice(sldOffset+1);
	    },
	    noConflict: function(){
	      if (root.SecondLevelDomains === this) {
	        root.SecondLevelDomains = _SecondLevelDomains;
	      }
	      return this;
	    }
	  };

	  return SLD;
	}));


/***/ },
/* 19 */
/***/ function(module, exports) {

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
		var sessionTokenName = "X-Edge-Session";

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
		var sessionTokenName = "X-Edge-Session";

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


/***/ }
/******/ ])
});
;