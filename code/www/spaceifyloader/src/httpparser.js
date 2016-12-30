"use strict"

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
	}