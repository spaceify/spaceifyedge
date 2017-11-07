"use strict";

/**
 * Spaceify Network, 29.7.2015 Spaceify Oy
 *
 * @class SpaceifyNetwork
 */

function SpaceifyNetwork()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
var SpaceifyError = null;
var SpaceifyConfig = null;
var SpaceifyUtility = null;
//var SpaceifyLogger = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	SpaceifyError = require(lib + "spaceifyerror");
	SpaceifyConfig = require(lib + "spaceifyconfig");
	SpaceifyUtility = require(lib + "spaceifyutility");
	//SpaceifyLogger = require(lib + "spaceifylogger");
	}
else
	{
	lib = (window.WEBPACK_MAIN_LIBRARY ? window.WEBPACK_MAIN_LIBRARY : window);

	SpaceifyError = lib.SpaceifyError;
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyUtility = lib.SpaceifyUtility;
	//var SpaceifyLogger = lib.SpaceifyLogger;
	}

var errorc = new SpaceifyError();
var utility = new SpaceifyUtility();
var config = SpaceifyConfig.getConfig();
//var logger = new SpaceifyLogger("SpaceifyNetwork");

var dregx = new RegExp(config.EDGE_DOMAIN.replace(".", "\\.") + "$", "i");

// Get the URL to the Spaceify Edge
self.getEdgeURL = function(opts)
	{
	var options = {};
	options.protocol = (typeof opts.protocol !== "undefined" ? opts.protocol : null);
	options.withEndSlash = (typeof opts.withEndSlash !== "undefined" ? opts.withEndSlash : false);

	var protocol = self.getProtocol(true, options.protocol);

	// Origin: local/remote edge webpage or webpage running spacelet (URL not ending with EDGE_DOMAIN); defaults to spacelet
	var hostname = config.EDGE_HOSTNAME;
	if(typeof window !== "undefined" && window.location.hostname.match(dregx) !== null)
		{
		hostname = window.location.hostname;
		}

	return protocol + hostname + (options.withEndSlash ? "/" : "");
	}

// Get URL to applications resource
self.externalResourceURL = function(unique_name, options)
	{
	return self.getEdgeURL(options) + unique_name + "/";
	}

// Get secure or insecure port based on web pages protocol or requested security
self.getPort = function(port, securePort, isSecure)
	{
	return (!self.isSecure() && !isSecure ? port : securePort);
	}

// Returns true if current web page is encrypted
self.isSecure = function()
	{
	var protocol = self.getProtocol(false, null);

	return (protocol == "http:" ? false : true);
	}

// Return current protocol
self.getProtocol = function(withScheme, cProtocol)
	{
	var url, proto, protocol;

	if(cProtocol === "")														// No protocol
		{
		protocol = "";
		}
	else if(typeof window === "undefined")										// Node.js!!!
		{
		protocol = (cProtocol === null ? "" : cProtocol);
		}
	else																		// Web page
		{
		protocol = (cProtocol !== null ? cProtocol : location.protocol);

		if(protocol == "blob:")
			{
			if(window.parent)
				{
				url = "" + window.parent.location;
				url = url.replace(/^blob:/, "");

				if((proto = url.match(/^http.?:/)) !== null)
					protocol = proto[0];
				else
					protocol = "http:";
				}
			else
				protocol = "http:";
			}
		}

	if(protocol != "" && !protocol.match(/:$/))
		protocol += ":";

	return protocol + (protocol != "" && withScheme ? "//" : "")
	}

// Parse URL query
self.parseQuery = function(url)
	{
	var parameters = {}, part, pair, pairs;

	url = decodeURIComponent(url);

	url = url.replace(/#.*$/, "");

	part = url.split("?");

	if(part.length == 1 && url.charAt(0) != "?")
		return parameters;

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

self.remakeQueryString = function(query, exclude, include, path, encode)
	{ // Tip: exclude and include can be used in combination to replace values = first exclude old then include new.
	var i, hash, str, search = "";

	for(i = 0; i < exclude.length; i++)
		{
		if(exclude[i] in query)
			delete query[exclude[i]];
		}

	for(i in include)
		query[i] = include[i];

	for(i in query)
		{
		if(encode)
			{
			str = decodeURIComponent(query[i])
			str = encodeURIComponent(str);
			}
		else
			str = query[i];

		search += (search != "" ? "&" : "") + i + "=" + str;
		}

	if(path)
		{
		path = decodeURIComponent(path);

		if((hash = path.match(/(?:#.*)/, "")))									// hash part of the path
			hash = hash[0];

		path = path.replace(/\?.*$/, "");										// path without search and hash
		}
	else
		{
		hash = "";
		path = "";
		}

	path = path + (search ? "?" + search : "") + (hash ? hash : "");

	return path;
	}

self.parseURL = function(url)
	{
	/*var parser = document.createElement("a");
	parser.href = url;
	return parser;*/

	// parseUri 1.2.2
	// (c) Steven Levithan <stevenlevithan.com>
	// MIT License
	var	o =
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
		{
		spaceifyLoader.postData(url, post, responseType, callback);
		}
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

		var xhr = createXMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.responseType = (responseType ? responseType : "text");
		xhr.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + boundary);
		xhr.onreadystatechange = function() { onReadyState(xhr, utility.randomString(16, true), Date.now(), callback); };
		xhr.send(body);
		}
	}

self.doOperation = function(jsonData, callback)
	{
	var data;
	var result;
	var content;
	var error = null;
	var operationUrl;

	try {
		content = "Content-Disposition: form-data; name=operation;\r\nContent-Type: application/json; charset=utf-8";

		operationUrl = self.getEdgeURL({ withEndSlash: true }) + config.OPERATION_FILE;
		//true, null, true

		self.POST_FORM(operationUrl, [{content: content, data: JSON.stringify(jsonData)}], "json", function(err, response, id, ms)
			{
			try {
				if(typeof response !== "string")
					response = JSON.stringify(response);

				response = response.replace(/&quot;/g, '"');
				response = response.replace(/\\|^"|"$/g, '');

				result = JSON.parse(response);
				}
			catch(err)
				{
				result = {err: errorc.makeErrorObject("doOperation1", "Invalid JSON received.", "SpaceifyNetwork::doOperation")};
				}

			if(!result)
				{
				data = null;
				error = errorc.makeErrorObject("doOperation2", "Response is null.", "SpaceifyNetwork::doOperation");
				}
			else if(result.err)
				{
				data = result.data;
				error = result.err;
				}
			else if(result.error)
				{
				data = result.data;
				error = result.error;
				}
			else
				{
				data = result.data;
				error = null;
				}

			callback(error, data, id, ms);
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

	// COOKIES -- -- -- -- -- -- -- -- -- -- //
self.setCookie = function(cname, cvalue, expiration_sec)
	{
	var expires = "";

	if(expiration_sec)
		{
		var dn = Date.now() + (expiration_sec * 1000);
		var dc = new Date(dn);
		expires = "expires=" + dc.toGMTString();
		}

	document.cookie = cname + "=" + cvalue + (expires != "" ? "; " + expires : "");
	}

self.getCookie = function(cname)
	{
	var name = cname + "=";
	var ca = document.cookie.split(";");
	for(var i = 0; i < ca.length; i++)
		{
		var c = ca[i];
		while(c.charAt(0) == " ")
			c = c.substring(1);

		if(c.indexOf(name) != -1)
			return c.substring(name.length, c.length);
		}

	return "";
	}

self.deleteCookie = function(cname)
	{
	document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}

}

if(typeof exports !== "undefined")
	module.exports = SpaceifyNetwork;