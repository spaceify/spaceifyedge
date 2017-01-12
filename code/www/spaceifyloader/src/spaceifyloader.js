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

var sessionTokenName = "x-edge-session";

self.loadData = function(element, callback)
	{
	var sp_type, sp_host, type, url, xhr = new XMLHttpRequest();

	if (element.getAttribute("sp_src"))
		{ sp_type = "sp_src"; type = "src"; }
	else if (element.getAttribute("spe_src"))
		{ sp_type = "spe_src"; type = "src"; }
	else if (element.getAttribute("sp_href"))
		{ sp_type = "sp_href"; type = "href"; }
	else if (element.getAttribute("spe_href"))
		{ sp_type = "spe_href"; type = "href"; }
	else if (element.getAttribute("sp_bgnd"))
		{ sp_type = "sp_bgnd"; type = ""; }

	url = element.getAttribute(sp_type);

	sp_host = (sp_type == "spe_src" || sp_type == "spe_href" ? speHost : spHost);

	if (url.indexOf("//") == -1 && sp_host)							// Relative URLs fail to load without host
		url = new URL(url, sp_host).toString()

	if (!url)
		{
		if (typeof callback === "function")
			callback();

		return;
		}

	//xhr.onreadystatechange = function()
	xhr.addEventListener("loadend", function(e)
		{
		if (xhr.readyState == 4)
			{
			var blob = xhr.response;
			element.onload = function(e)
				{
				if(sp_type != "sp_bgnd")
					window.URL.revokeObjectURL(element[type]);			// Clean up after yourself

				if (typeof callback === "function")
					callback();
				};

			if(sp_type == "sp_bgnd")
				{
				var reader = new window.FileReader();
				reader.readAsDataURL(blob);
				reader.onloadend = function()
					{
					element.style.backgroundImage = "url(" + reader.result + ")";
					}
				}
			else
				element[type] = window.URL.createObjectURL(blob);

			element.removeAttribute(sp_type);
			}
		});

	xhr.open("GET", url, true);
	xhr.responseType = "blob";
	xhr.send();
	};

self.postData = function(url, post, responseType, callback)
	{
	var hvalue;
	var xhr = new XMLHttpRequest();

	//xhr.onreadystatechange = function()
	xhr.addEventListener("loadend", function(e)
		{
		if (xhr.readyState == 4)
			{
			LoaderUtil.setSession("sessionCookies", xhr.getResponseHeader("Set-Cookie"));

			if ((hvalue = xhr.getResponseHeader(sessionTokenName)))
				LoaderUtil.setSession(sessionTokenName, hvalue);

			if (xhr.status != 200)
				{
				if (typeof callback === "function")
					callback(xhr.status, null);
				}
			else if (xhr.response instanceof Blob)
				{
				var reader = new FileReader();
				reader.onload = function(err)
					{
					if (typeof callback === "function")
						callback(null, reader.result);
					}
				reader.readAsText(xhr.response.data, "UTF-8");
				}
			else
				{
				if (typeof callback === "function")
					callback(null, JSON.stringify(xhr.response));
				}
			}
		});

	var boundary = "---------------------------" + Date.now().toString(16);

	var body = "";
	for (var i = 0; i < post.length; i++)
		{
		body += "\r\n--" + boundary + "\r\n";

		body += post[i].content;
		body += "\r\n\r\n" + post[i].data + "\r\n";
		}
	body += "\r\n--" + boundary + "--";

	xhr.withCredentials = true;
	xhr.open("POST", url, true);
	xhr.responseType = (responseType ? responseType : "text");
	xhr.setRequestHeader("Cookie", LoaderUtil.getSession("sessionCookies"));
	xhr.setRequestHeader(sessionTokenName, LoaderUtil.getSession(sessionTokenName));
	xhr.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + boundary);
	xhr.send(body);
	};

self.loadPage = function(url, spHost_, speHost_)
	{
	var xhr = new XMLHttpRequest();

	//xhr.onreadystatechange = function()
	xhr.addEventListener("loadend", function(e)
		{
		//console.log("SpaceifyLoader::loadPage() content arrived, readyState==" + xhr.readyState);

		if (xhr.readyState == 4)
			{
			LoaderUtil.setSession("sessionCookies", xhr.getResponseHeader("Set-Cookie"));

			if ((hvalue = xhr.getResponseHeader(sessionTokenName)))
				LoaderUtil.setSession(sessionTokenName, hvalue);

			var newDoc = document.open("text/html", "replace");
			newDoc.write(xhr.responseText);
			newDoc.close();

			newDoc.loadPageSpHost = spHost_;
			newDoc.loadPageSpeHost = speHost_;
			}
		});

	xhr.withCredentials = true;
	xhr.open("GET", url, true);
	xhr.setRequestHeader("Cookie", LoaderUtil.getSession("sessionCookies"));
	xhr.setRequestHeader(sessionTokenName, LoaderUtil.getSession(sessionTokenName));
	xhr.send(null);
	};

self.getAllElements = function()
	{
	var sp_src = Array.prototype.slice.call(document.querySelectorAll("[sp_src]"));

	var spe_src = Array.prototype.slice.call(document.querySelectorAll("[spe_src]"));

	var sp_href = Array.prototype.slice.call(document.querySelectorAll("[sp_href]"));

	var spe_href = Array.prototype.slice.call(document.querySelectorAll("[spe_href]"));

	var sp_bgnd = Array.prototype.slice.call(document.querySelectorAll("[sp_bgnd]"));

	elements = spe_href.concat(sp_href, spe_src, sp_src, sp_bgnd);						// Order: edge css, local css, edge resource, local resource, css background

	console.log("SpaceifyLoader::loadAll() :: Number of elements with sp_src:", sp_src.length, "spe_src:", spe_src.length, "sp_href:", sp_href.length, "spe_href:", spe_href.length, "sp_bgnd:", sp_bgnd.length);
	};

self.hasElements = function()
	{
	return (elements && elements.length > 0 ? true : false);
	}

self.recurseElements = function()
	{
	if (elementIndex < elements.length)
		{
		self.loadData(elements[elementIndex], function()
			{
			elementIndex++;
			self.recurseElements();
			});
		}
	else
		{
		var evt = document.createEvent("Event");
		evt.initEvent("spaceifyReady", true, true);
		window.dispatchEvent(evt);
		}
	}

self.parseQuery = function(url)
	{ // Adapted from http://james.padolsey.com/snippets/parsing-urls-with-the-dom/
	var parameters = {}, part, pair, pairs;

	url = decodeURIComponent(url);

	url = url.replace(/#.*$/, "");

	part = url.split("?");

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

self.setSpHosts = function(hosts)
	{
	spHost = hosts.sp_host;
	speHost = hosts.spe_host;
	}

self.connect = function(host, port, callback)
	{
	LoaderUtil.piperClient.connect(host, port, function()
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
var spaceifyLoader = new SpaceifyLoader();

function getNetworkInfo(callback)
	{
	/*
	window.isSpaceifyNetwork = false;

	//var xhr = (SpXMLHttpRequest.OriginalXMLHttpRequest ? new SpXMLHttpRequest.OriginalXMLHttpRequest() : new XMLHttpRequest());
	var xhr = new window.XMLHttpRequest();

	xhr.open("HEAD", window.location.protocol + "//10.0.0.1/templates/test.txt", true);
	xhr.timeout = 1000;
	xhr.onreadystatechange = function()
		{
		if (xhr.readyState == 4)
			{
			window.isSpaceifyNetwork = (xhr.status >= 200 && xhr.status < 304 ? true : false);
			callback();
			}
		};
	xhr.send();
	*/

	window.isSpaceifyNetwork = false;

	var protocol = window.location.href.replace("blob:", "");
	var pos = protocol.indexOf(":");

	if(pos != -1)
		protocol = protocol.substring(0, pos + 1);
	else
		protocol = window.location.protocol;

	var ws = new WebSocket((protocol == "http:" ? "ws" : "wss") + "://edge.spaceify.net:2947", "json-rpc");

	ws.onopen = function()
		{
		window.isSpaceifyNetwork = true;
		ws.close();
		callback();
		}

	ws.onerror = function(err)
		{
		ws.close();
		callback();
		}
	}

function prepareLoader(hosts)
	{
	spaceifyLoader.setSpHosts(hosts);

	if (window.isSpaceifyNetwork)
		window.XMLHttpRequest = SpXMLHttpRequest.OriginalXMLHttpRequest;
	else
		{
		window.isSpaceifyNetwork = false;

		window.XMLHttpRequest = SpXMLHttpRequest;

		spaceifyLoader.connect(LoaderUtil.SERVER_ADDRESS.host, LoaderUtil.SERVER_ADDRESS.port, function()
			{
			});
		}
	}

function loadPageOrElements(hosts)
	{
	spaceifyLoader.getAllElements();

	if (!spaceifyLoader.hasElements())
		spaceifyLoader.loadPage(hosts.sp_host + hosts.sp_path, hosts.sp_host, hosts.spe_host);
	else
		{
		elementIndex = 0;
		spaceifyLoader.recurseElements();
		}
	}

window.onload = function()
	{
	var sp_host, spe_host;

	var hosts = spaceifyLoader.parseQuery(window.location.href);
	if (!hosts.sp_host)
		{
		sp_host = spe_host = window.location.protocol + "//" + window.location.hostname + "/";

		if (typeof document.loadPageSpHost != "undefined")
			sp_host = document.loadPageSpHost;

		if (typeof document.loadPageSpeHost != "undefined")
			spe_host = document.loadPageSpeHost;

		hosts = { sp_host: sp_host, spe_host: spe_host, sp_path: "index.html" };
		}

	getNetworkInfo(function()
		{
		if (!window.isSpaceifyNetwork)
			{
			spaceifyLoader.setConnectionListener(function()
				{
				loadPageOrElements(hosts);
				});

			prepareLoader(hosts);
			}
		else
			{
			prepareLoader(hosts);
			loadPageOrElements(hosts);
			}
		});
	};
