"use strict"

/**
 * Implements the XMLHttpRequest interface.
 * References the GLOBAL variable piperClient to implement its functionality
 */


function SpXMLHttpRequest()
{
var self = this;

// Includes 
var URL = null;
var HttpParser = null;
var LoaderUtil = null;
var piperClient = null;

if (typeof exports !== "undefined")
	{
	HttpParser = require("./httpparser");
	URL = require("urlutils");
	LoaderUtil = require("./loaderutil");
	piperClient = LoaderUtil.piperClient;
	}
else
	{
	HttpParser = window.HttpParser;
	URL = window.URL;
	LoaderUtil = new window.LoaderUtil();
	piperClient = LoaderUtil.piperClient;
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
var elapsedTime = 0;
self.open = function(method_, url_, async_)
	{
	method = method_;
	url = url_;
	async = async_;
	};

self.onBinary = function(data)
	{
console.log("33333333333333333333333333333333333333", ((Date.now() - elapsedTime) / 1000));
	var arr = new Uint8Array(data);
	//logger.log("SpXMLHttpRequest::onBinary()" +" data: "+ab2str(arr));

	if (!contentLength)		//This is the header chunk
		{
		httpParser.parse(arr);

		//logger.log("SpXMLHttpRequest::onBinary() HTTP server replied with statusCode "+httpParser.getStatusCode());

		if (httpParser.getStatusCode() == 301 || httpParser.getStatusCode() == 302)
			{
			url = httpParser.getHeaderValue("Location");
			//logger.log("SpXMLHttpRequest::onBinary() redirecting to : " + url);
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

	//logger.log(bodyBytesReceived + " / " + contentLength + " bytes of " + url + " received" );

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
elapsedTime = Date.now();
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

	//logger.log("SpXMLHttpRequest::send() making request: " + request);

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

if (typeof exports !== "undefined")
	{
	module.exports = SpXMLHttpRequest;
	}