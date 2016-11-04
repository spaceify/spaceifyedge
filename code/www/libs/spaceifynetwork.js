"use strict";

/**
 * Spaceify Network, 29.7.2015 Spaceify Oy
 *
 * @class SpaceifyNetwork
 */

function SpaceifyNetwork()
{
// NODE.JS / REAL SPACEIFY - - - - - - - - - - - - - - - - - - - -
var isNodeJs = (typeof exports !== "undefined" ? true : false);
var isRealSpaceify = (isNodeJs && typeof process.env.IS_REAL_SPACEIFY !== "undefined" ? true : false);
var apiPath = (isNodeJs && isRealSpaceify ? "/api/" : "/var/lib/spaceify/code/");

var classes =
	{
	SpaceifyError: (isNodeJs ? require(apiPath + "spaceifyerror") : SpaceifyError),
	SpaceifyConfig: (isNodeJs ? require(apiPath + "spaceifyconfig") : SpaceifyConfig),
	SpaceifyUtility: (isNodeJs ? require(apiPath + "spaceifyutility") : SpaceifyUtility)
	};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var self = this;

var errorc = new classes.SpaceifyError();
var config = new classes.SpaceifyConfig();
var utility = new classes.SpaceifyUtility();

// Get the URL to the Spaceify Core
self.getEdgeURL = function(forceSecure, port, withSlash)
	{
	return (forceSecure ? "https:" : location.protocol) + "//" + config.EDGE_HOSTNAME + (port ? ":" + port : "") + (withSlash ? "/" : "");
	}

// Get secure or insecure port based on web pages protocol or requested security
self.getPort = function(port, securePort, isSecure)
	{
	return (!self.isSecure() && !isSecure ? port : securePort);
	}

// Return true if current web page is encrypted
self.isSecure = function()
	{
	return (location.protocol == "http:" ? false : true);
	}

// Return current protocol
self.getProtocol = function(withScheme)
	{
	return (location.protocol == "http:" ? "http" : "https") + (withScheme ? "://" : "");
	}

// Parse URL query
self.parseQuery = function(url)
	{
	var query = {}, parts, pairs;
	var regx = new RegExp("=", "i");

	if((parts = url.split("?")).length != 2)
		return query;

	pairs = parts[1].split("&");

	for(var i = 0; i < pairs.length; i++)
		{
		if(regx.exec(pairs[i]))													// Name and value
			query[RegExp.leftContext] = RegExp.rightContext;
		else																	// Only name
			query[pairs[i]] = null;
		}

	return query;
	}

self.remakeQueryString = function(query, exclude, include, path)
	{ // exclude=remove from query, include=add to query, [path=appended before ?]. Exclude and include can be used in combination to replace values.
	var search = "", i;

	for(i in query)
		{
		if(!exclude.indexOf(i))
			search += (search != "" ? "&" : "") + i + (query[i] ? "=" + query[i] : "");		// Name-value or name
		}

	for(i in include)
		search += (search != "" ? "&" : "") + i + "=" + include[i];

	return (Object.keys(query).length > 0 ? (path ? path : "") + "?" + search : "");
	}

self.parseURL = function(url)
	{
	/*var parser = document.createElement("a");
	parser.href = url;
	return parser;*/

	// parseUri 1.2.2
	// (c) Steven Levithan <stevenlevithan.com>
	// MIT License
	var	o	=
		{
		strictMode: false,
		key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
		q:	{
			name:   "queryKey",
			parser: /(?:^|&)([^&=]*)=?([^&]*)/g
			},
		parser: {
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
			}
		},
		m	= o.parser[o.strictMode ? "strict" : "loose"].exec(url),
		uri	= {},
		i	= 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
	}

self.implementsWebServer = function(manifest)
	{
	return (manifest.implements && manifest.implements.indexOf(config.WEB_SERVER) != -1 ? true : false);
	}

self.isPortInUse = function(port, callback)
	{ // Adapted from https://gist.github.com/timoxley/1689041
	if(!port)
		return callback(null, true);

	var net = require("net");
	var server = net.createServer();

	server.once("error", function(err)
		{
		callback(err.code != "EADDRINUSE" ? err : null, true);
		});

	server.once("listening", function()
		{
		server.once("close", function()
			{
			callback(null, false)
			});

		server.close();
		});

	server.listen(port);
	}

	// XMLHttpRequest -- -- -- -- -- -- -- -- -- -- //
self.GET = function(url, callback, responseType)
	{
	var ms = Date.now();
	var id = utility.randomString(16, true);
	var xhr = createXMLHttpRequest();
	xhr.onreadystatechange = function() { onReadyState(xhr, id, ms, callback); };

	xhr.open("GET", url, true);
	xhr.responseType = (responseType ? responseType : "");
	xhr.send();
	}

self.POST_FORM = function(url, post, responseType, callback)
	{
	if(typeof spaceifyLoader !== "undefined")
		spaceifyLoader.postData(url, post, responseType, callback);
	else
		{
		var boundary = "---------------------------" + Date.now().toString(16);

		var body = "";
		for(var i = 0; i < post.length; i++)
			{
			body += "\r\n--" + boundary + "\r\n";

			body += post[i].content;
			body += "\r\n\r\n" + post[i].data + "\r\n";
			}
		body += "\r\n--" + boundary + "--";

		var ms = Date.now();
		var id = utility.randomString(16, true);
		var xhr = createXMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.responseType = (responseType ? responseType : "text");
		xhr.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + boundary);
		xhr.onreadystatechange = function() { onReadyState(xhr, id, ms, callback); };
		xhr.send(body);
		}
	}

self.POST_JSON = function(url, jsonData, callback)
	{
	var result;
	var content;
	var error = null;

	try {
		content = "Content-Disposition: form-data; name=operation;\r\nContent-Type: application/json; charset=utf-8";

		self.POST_FORM(config.OPERATION_URL, [{content: content, data: JSON.stringify(jsonData)}], "json", function(err, response, id, ms)
			{
			try {
				if(typeof response !== "string")
					response = JSON.stringify(response);

				result = JSON.parse(response.replace(/&quot;/g,'"'));
				}
			catch(err)
				{
				result = {err: errorc.makeErrorObject("sne1", "Invalid JSON received.", "SpaceifyNetwork::POST_JSON")};
				}

			if(result.err)
				error = result.err;
			else if(result.error)
				error = result.error;

			callback(error, result.data, id, ms);
			});
		}
	catch(err)
		{
		callback(err, null);
		}
	}

var createXMLHttpRequest = function()
	{
	return (window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));		// IE7+, Firefox, Chrome, Opera, Safari : IE5, IE6
	}

var onReadyState = function(xhr, id, ms, callback)
	{
	if(xhr.readyState == 4)
		callback( (xhr.status != 200 ? xhr.status : null), (xhr.status == 200 ? xhr.response : null), id, Date.now() - ms );
	}

}

if(typeof exports !== "undefined")
	module.exports = SpaceifyNetwork;