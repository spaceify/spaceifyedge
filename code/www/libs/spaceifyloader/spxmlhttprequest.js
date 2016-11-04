"use strict"

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

/*
Implements the XMLHttpRequest interface.
References the GLOBAL variable piperClient to implement its functionality
*/

function Utf8ArrayToStr(array)
{
	var out, i, len, c;
	var char2, char3;

	out = "";
	len = array.length;
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
			console.log("SpXMLHttpRequest::onBinary() redirecting to : "+url);
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

	console.log(bodyBytesReceived +" / "+contentLength+" bytes of "+url+ " received" );

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

	var request = method + " "+url+" HTTP/1.1\r\nHost: "+host;

	var cookies = getSessionCookies();

	if (cookies)
		request = request+"\r\nCookie: "+cookies;

	for(var i = 0; i < requestHeaders.length; i++)
		request += "\r\n" + requestHeaders[i].header + ": " + requestHeaders[i].value;
	requestHeaders = [];

	if(body)
		{
		request += "\r\nContent-Length: " + body.length + "\r\n";
		request += body;
		}

	request = request +"\r\n\r\n";

	var data = toab(request);

	console.log("SpXMLHttpRequest::send() making request: "+request);

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
