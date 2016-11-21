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
	var sessionTokenName = getSessionTokenName(url);

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
	var sessionTokenName = getSessionTokenName(url);

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

var getSessionTokenName = function(url)
	{
	var sessionTokenName = "X-Edge-Session";

	if(url.indexOf("//") != -1)									// CORS preflight - OPTIONS Access-Control-Request-Headers <-> Access-Control-Allow-Headers
		{														// Notice: recirections like 302 do not work with this preflight
		var spltUrl = url.split("://");

		if(spltUrl[0] == "https")
			sessionTokenName = "X-Edge-Session-Secure";
		}

	return sessionTokenName;
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
