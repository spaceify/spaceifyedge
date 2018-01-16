"use strict";

/**
 * SpaceifyNet, 29.7.2015 Spaceify Oy
 *
 * For Spaceify's internal use. Use only on web pages.
 *
 * @class SpaceifyNet
 */

function SpaceifyNet()
{
var self = this;

var ordinal = 0;
var showLoadingInstances = 0;
var applications = { spacelet: {}, sandboxed: {}, sandboxed_debian: {}, native_debian: {}, spacelet_count: 0, sandboxed_count: 0, sandboxed_debian_count: 0, native_debian_count: 0 };

var lib = (window.WEBPACK_MAIN_LIBRARY ? window.WEBPACK_MAIN_LIBRARY : window);

var spdom = new lib.SpaceifyDOM();
var core = new lib.SpaceifyCore();
var utility = new lib.SpaceifyUtility();
var network = new lib.SpaceifyNetwork();
var sam = new lib.SpaceifyApplicationManager();
var config = lib.SpaceifyConfig.getConfig();
//var logger = new lib.SpaceifyLogger("SpaceifyNet");

var WWW_PORT = 80;
var WWW_PORT_SECURE = 443;

var TILE = "tile";
var APPTILE = "apptile";

	// USER INTERFACE -- -- -- -- -- -- -- -- -- -- //
self.showLoading = function(show)
	{
	if (show)
		{
		if (showLoadingInstances == 0)
			spdom.show("loading", true);

		showLoadingInstances++;
		}
	else
		{
		showLoadingInstances = Math.max(0, --showLoadingInstances);

		if (showLoadingInstances == 0)
			spdom.show("loading", false);
		}
	}

var alertTimerIds = { error: null, success: null };
self.showError = function(id, msgstr) { alerts(id, msgstr, "error"); }
self.showSuccess = function(msgstr) { alerts(id, msgstr, "success"); }
var alerts = function(id, msgstr, type)
	{
	var txt, element = document.getElementById(id);

	if (element)
		{
		if (alertTimerIds[type])
			clearTimeout(alertTimerIds[type]);

		spdom.empty(id);

		txt = document.createTextNode(msgstr);
		element.appendChild(txt);

		element.style.visibility = "visible";

		alertTimerIds[type] = window.setTimeout(function() { element.style.visibility = "hidden"; alertTimerIds[type] = null; }, 5000);
		}
	}

var msgFormat = function(msg)
	{
	var rmsg = "", i;

	if (self.isArray(msg))
		{
		for (i = 0; i < msg.length; i++)
			rmsg += (rmsg != "" ? "<br>" : "") + msg[i];
		}
	else
		rmsg = msg;

	return rmsg;
	}

self.onEnterPress = function(e)
	{
	var key = (typeof e == null ? window.event.keyCode : e.keyCode);
	return (key == 13 || key == 10 ? true : false);
	}

self.isArray = function(obj)
	{
	return Object.prototype.toString.call(obj) === "[object Array]";
	}

	// SPLASH -- -- -- -- -- -- -- -- -- -- //
self.setSplashAccepted = function()
	{
	try {
		core.setSplashAccepted(function(err, data)
			{
			if (data && data == true)
				window.location.reload(true);
			});
		}
	catch(err)
		{
		//logger.error(err, true, true, 0, logger.ERROR);
		}
	}

self.loadCertificate = function()
	{
	var src = network.getEdgeURL({ withEndSlash: true }) + "spaceify.crt";

	document.getElementById("certIframe").setAttribute("sp_src", src);

	spaceifyLoader.loadData(document.getElementById("certIframe"), {}, null);

	return true;
	}

self.adminLogOut = function()
	{
	var sam = new SpaceifyApplicationManager();

	this.error = this.fail = this.warning = this.notify = this.message = function()
		{}

	this.ok = function()
		{
		self.loadLaunchPage();
		}

	sam.logOut(self, this.ok);
	}

	// PAGE BROWSER -- -- -- -- -- -- -- -- -- -- //
self.loadAppstorePage = function(mode)
	{
	var sp_page;
	var url = network.getEdgeURL({ /*protocol: "https", */withEndSlash: true });
	var port = (!network.isSecure() ? WWW_PORT : WWW_PORT_SECURE);

	spaceifyLoader.loadPage(config.INDEX_FILE/*sp_page*/, port/*sp_port*/, url + config.APPSTORE/*sp_host*/, url/*spe_host*/);
	}

self.loadLaunchPage = function()
	{
	var url = network.getEdgeURL({ /*protocol: "https", */withEndSlash: true });
	var port = (!network.isSecure() ? WWW_PORT : WWW_PORT_SECURE);

	spaceifyLoader.loadPage(config.INDEX_FILE/*sp_page*/, port/*sp_port*/, url/*sp_host*/, url/*spe_host*/);
	}

self.loadSecurePage = function()
	{
	var src = network.getEdgeURL({ protocol: "https", withEndSlash: true });
	window.location.replace(src);
	}

	// APPLICATIONS -- -- -- -- -- -- -- -- -- -- //
self.showInstalledApplications = function(callback)
	{
	spdom.empty("spacelet, sandboxed, sandboxed_debian, native_debian");

	var methods = [], j;

	core.getApplicationData(function(err, apps)
		{
		if (!apps)
			return (typeof callback == "function" ? callback() : false);

		for (j = 0; j < apps.spacelet.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.spacelet[j], null], type: "async"});

		for (j = 0; j < apps.sandboxed.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.sandboxed[j], null], type: "async"});

		for (j = 0; j < apps.sandboxed_debian.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.sandboxed_debian[j], null], type: "async"});

		for (j = 0; j < apps.native_debian.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.native_debian[j], null], type: "async"});

		new SpaceifySynchronous().waterFall(methods, function()
			{
			if (typeof callback == "function")
				callback();
			});
		});

	}

self.renderTile = function(manifest, callback)
	{
	var element, query;
	var sp_port, host, sp_host, spe_host, sp_path, icon, apptile_id, icon_id, tile, element;

	if (manifest.hasTile)																			// Application supplies its own tile when its running
		{
		core.getApplicationURL(manifest.unique_name, function(err, appURL)
			{
			sp_port = (!network.isSecure() ? appURL.port : appURL.securePort);

			spe_host = network.getEdgeURL({ withEndSlash: true });

			if (appURL.implementsWebServer && sp_port)
				{
				host = spe_host;
				sp_host = spe_host;
				}
			else
				{
				host = spe_host;
				sp_host = network.externalResourceURL(manifest.unique_name, { withEndSlash: true });
				}

			sp_path = config.TILEFILE;

			apptile_id = makeAppTileId(manifest.unique_name);

			element = document.createElement("iframe");
			element.id = apptile_id;
			element.frameborder = "0";
			element.className = "edgeTile";
			spdom.append(manifest.type, element);

			query = {};
			query.sp_port = sp_port;
			query.sp_host = encodeURIComponent(sp_host);
			query.sp_path = encodeURIComponent(sp_path);
			query.spe_host = encodeURIComponent(spe_host);

			element = document.getElementById(apptile_id);
			element.src = host + "remote.html" + network.remakeQueryString(query, [], {}, "", true);

			callback();
			});
		}
	else																							// Spaceify renders default tile
		{
		if ((icon = utility.getApplicationIcon(manifest, false)))
			{
			sp_host = network.externalResourceURL(manifest.unique_name, { protocol: "", withEndSlash: true });
			sp_path = icon;
			}
		else
			{
			sp_host = network.getEdgeURL({ withEndSlash: true });
			sp_path = "images/default_icon-128p.png";
			}

		apptile_id = makeAppTileId(manifest.unique_name);
		icon_id = "icon_" + apptile_id;

		tile = window.spetiles[TILE];
		tile = tile.replace("::icon_id", icon_id);
		tile = tile.replace("::sp_src", sp_host + sp_path);
		tile = tile.replace("::manifest.name", manifest.name);
		tile = tile.replace("::manifest.developer.name", manifest.developer.name);

		element = document.createElement("div");
		element.id = apptile_id;
		element.className = "edgeTile";
		element.innerHTML = tile;
		spdom.append(manifest.type, element);
		spaceifyLoader.loadData(document.getElementById(icon_id), {}, callback);
		}

	addApplication(manifest);
	}

self.removeTile = function(type, manifest)
	{
	removeApplication(manifest);

	spdom.show(type + ", " + type + "_header", (applications[type + "_count"] > 0 ? true : false));

	spdom.remove(type, makeAppTileId(manifest.unique_name));
	}

var addApplication = function(manifest)
	{
	if (manifest.type == config.SPACELET)
		{ applications.spacelet[manifest.unique_name] = manifest; applications.spacelet_count++; }
	else if (manifest.type == config.SANDBOXED)
		{ applications.sandboxed[manifest.unique_name] = manifest; applications.sandboxed_count++; }
	else if (manifest.type == config.SANDBOXED_DEBIAN)
		{ applications.sandboxed_debian[manifest.unique_name] = manifest; applications.sandboxed_debian_count++; }
	else if (manifest.type == config.NATIVE_DEBIAN)
		{ applications.native_debian[manifest.unique_name] = manifest; applications.native_debian_count++; }
	}

var removeApplication = function(manifest)
	{
	if (manifest.type == config.SPACELET)
		{ delete applications.spacelet[manifest.unique_name]; applications.spacelet_count--; }
	else if (manifest.type == config.SANDBOXED)
		{ delete applications.sandboxed[manifest.unique_name]; applications.sandboxed_count--; }
	else if (manifest.type == config.SANDBOXED_DEBIAN)
		{ delete applications.sandboxed_debian[manifest.unique_name]; applications.sandboxed_debian_count--; }
	else if (manifest.type == config.NATIVE_DEBIAN)
		{ delete applications.native_debian[manifest.unique_name]; applications.native_debian_count--; }
	}

self.getApplications = function()
	{
	return applications;
	}

var makeAppTileId = function(unique_name)
	{
	 return APPTILE + "_" + unique_name.replace(/\//, "_");
	}

	// POPUPS -- -- -- -- -- -- -- -- -- -- //
self.showPopup = function(id, status)
	{
	var n, nodes, popup, isVisible;

	if (!(popup = document.getElementById(id)))
		return false;

	isVisible = spdom.isVisible(id);

	if (isVisible)																					// If already open, close all child elements
		{
		nodes = popup.childNodes;

		for (n = 0; n < nodes.length; n++)
			{
			if (typeof nodes[n].id != "undefined")
				spdom.show(nodes[n].id, false);
			}
		}

	spdom.show(id, status);

	return true;
	}

self.showMenu = function()
	{
	var btn_menu, popup_menu, position;

	btn_menu = document.getElementById("btn_menu");
	position = spdom.getPosition(btn_menu);

	var isOpen = self.showPopup("popups", true);

	if (isOpen)
		{
		popup_menu = document.getElementById("popup_menu");

		popup_menu.style.top = (position.y /*+ btn_menu.offsetHeight*/) + "px";
		popup_menu.style.left = (position.x + btn_menu.offsetWidth - 200) + "px";

		spdom.show("popup_menu", true);
		}
	}

}

if (typeof exports !== "undefined")
	module.exports = SpaceifyNet;
