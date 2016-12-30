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

if (typeof exports !== "undefined")
	{
	module.exports = new LoaderUtil();

	global.SERVER_ADDRESS = module.exports.SERVER_ADDRESS;
	global.WEBRTC_CONFIG = module.exports.WEBRTC_CONFIG;
	}
else
	LoaderUtil = new LoaderUtil();