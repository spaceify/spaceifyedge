"use strict"

/**
 * Implements the XMLHttpRequest interface by wrapping the real XMLHttpRequest of the platform.
 *
 * See: https://xhr.spec.whatwg.org/
 */

var handler = {
	get: function(target, property, receiver)
		{
		console.log("\nGET PROXY: ", property, target.responseURL);
		return target[property];
		},
/*
	set: function(target, property, value, receiver)
		{
		console.log("\SET PROXY:", property + "=" + value);

		target[property] = value;

		return true;
		},
*/
	apply: function(target, thisArg, argumentsList)
		{
		console.log("\APPLY PROXY:");
		}
	};

function FakeXMLHttpRequest()
{
var self = this;

var logger = console;

var url = "";
var overridedMimeType = "";
var method = "GET";
var isAsync = true;
var user = null;
var password = null;
var isOpen = false;

var DOMSTRING = "";
var ARRAYBUFFER = "arraybuffer";
var BLOB = "blob";
var DOCUMENT = "document";
var JSON = "json";
var TEXT = "text";
var MOZ_BLOB = "moz-blob";
var MOZ_CHUNKED_TEXT = "moz-chunked-text";
var MOZ_CHUNKED_ARRAYBUFFER = "moz-chunked-arraybuffer";
var MS_STREAM = "ms-stream";

var xhr = new FakeXMLHttpRequest.OriginalXMLHttpRequest();

self.readyState = FakeXMLHttpRequest.UNSENT;
self.response = "";
self.responseText = null;
self.responseType = DOMSTRING;
self.responseURL = "";
self.responseXML = null;
self.status = 0;
self.statusText = "";
self.timeout = 0;
self.withCredentials = false;
self.upload = null;
self.addEventListener = xhr.addEventListener;
self.removeEventListener = xhr.removeEventListener;
self.dispatchEvent = xhr.dispatchEvent;

var getXhrAttributes = function()
	{
	self.status = xhr.status;
	self.statusText = xhr.statusText;
	self.response = xhr.response;
	self.readyState = xhr.readyState;
	self.responseURL = xhr.responseURL;
	self.responseType = xhr.responseType;

	if(self.responseType == DOMSTRING || self.responseType == TEXT)
		self.responseText = xhr.responseText;

	if(self.responseType == DOCUMENT && isAsync)
		self.responseXML = xhr.responseXML;

	self.upload = xhr.upload;
	self.timeout = xhr.timeout;
	self.withCredentials = xhr.withCredentials;
	};

// EVENT HANDLERS
self.ontimeout = null;
self.onTimeOut = function(e)
	{
	getXhrAttributes();

	logger.log("FakeXMLHttpRequest::onTimeOut()");

	if (self.ontimeout)
		self.ontimeout(e);
	};
xhr.ontimeout = self.onTimeOut;

self.onprogress = null;
self.onProgress = function(e)
	{
	getXhrAttributes();

	logger.log("FakeXMLHttpRequest::onProgress()");

	if (self.onprogress)
		self.onprogress(e);
	};
xhr.onprogress = self.onProgress;

self.onabort = null;
self.onAbort = function(e)
	{
	getXhrAttributes();

	logger.log("FakeXMLHttpRequest::onAbort()");

	if (self.onabort)
		self.onabort(e);
	};
xhr.onabort = self.onAbort;

self.onerror = null;
self.onError = function(e)
	{
	getXhrAttributes();

	logger.log("FakeXMLHttpRequest::onError()");

	if (self.onerror)
		self.onerror(e);
	};
xhr.onerror = self.onError;

self.onloadstart = null;
self.onLoadStart = function(e)
	{
	getXhrAttributes();

	logger.log("FakeXMLHttpRequest::onLoadStart()");

	if (self.onloadstart)
		self.onloadstart(e);
	};
xhr.onloadstart = self.onLoadStart;

self.onload = null;
self.onLoad = function(e)
	{
	getXhrAttributes();

	logger.log("FakeXMLHttpRequest::onLoad()");

	if (self.onload)
		self.onload(e);
	};
xhr.onload = self.onLoad;

self.onloadend = null;
self.onLoadEnd = function(e)
	{
	getXhrAttributes();

	logger.log("FakeXMLHttpRequest::onLoadEnd()");

	if (self.onloadend)
		self.onloadend(e);
	};
xhr.onloadend = self.onLoadEnd;

self.onreadystatechange = null;
self.onReadyStateChange = function(e)
	{
	getXhrAttributes();

	logger.log("FakeXMLHttpRequest::onReadyStateChange()", self.readyState, (self.onreadystatechange ? "YES" : "NO"), url);

	if (self.onreadystatechange)
		self.onreadystatechange(e);
	};
xhr.onreadystatechange = self.onReadyStateChange;

// public API
self.abort = function()
	{
	logger.log("FakeXMLHttpRequest::abort()", url);

	self.readyState = FakeXMLHttpRequest.UNSENT;

	xhr.abort();
	};

self.getAllResponseHeaders = function()
	{
	logger.log("FakeXMLHttpRequest::getAllResponseHeaders()", url);

	return xhr.getAllResponseHeaders();
	};

self.getResponseHeader = function(name)
	{
	logger.log("FakeXMLHttpRequest::getResponseHeader()", url);

	return xhr.getResponseHeader(name);
	};

self.open = function(method_, url_, async_, user_, password_)
	{
	logger.log("FakeXMLHttpRequest::open()", url);

	if(isOpen)
		self.abort();
	else
		{
		isOpen = true;

		url = url_;
		method = method_;
		isAsync = (async_ !== "undefined" ? async_ : true);
		user = (user_ !== "undefined" ? user_ : null);
		password = (password_ !== "undefined" ? password_ : null);

		xhr.open(method, url, isAsync, user, password);
		}
	};

self.overrideMimeType = function(mime_)
	{
	logger.log("FakeXMLHttpRequest::overrideMimeType()", url);

	overridedMimeType = mime_;

	xhr.overrideMimeType(mime_);
	};

self.send = function(body)
	{
	logger.log("FakeXMLHttpRequest::send()", url);

	if(isAsync)														// Setting type is allowed only for asynchronous calls
		xhr.responseType = self.responseType;
//xhr.timeout = self.timeout;
//xhr.withCredentials = self.withCredentials;
	return xhr.send(body);
	};

self.setRequestHeader = function(header, value)
	{
	logger.log("FakeXMLHttpRequest::setRequestHeader()", url);

	return xhr.setRequestHeader(header, value);
	};

	return new Proxy(self, handler);
}
//window.XMLHttpRequest = SpXMLHttpRequest;
FakeXMLHttpRequest.UNSENT = 0;
FakeXMLHttpRequest.OPENED = 1;
FakeXMLHttpRequest.HEADERS_RECEIVED = 2;
FakeXMLHttpRequest.LOADING = 3;
FakeXMLHttpRequest.DONE = 4;

//console.dir(window.XMLHttpRequest);

var origXhr = null;

if (typeof window == "undefined")
	{
	origXhr = require("xhr2");
	}
else
	{
	origXhr = window.XMLHttpRequest;
	}

FakeXMLHttpRequest.OriginalXMLHttpRequest = origXhr;

if (typeof exports !== "undefined")
	{
	module.exports = FakeXMLHttpRequest;
	}
