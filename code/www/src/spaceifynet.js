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
var applications = { spacelet: {}, sandboxed: {}, sandboxed_debian: {}, native_debian: {}, spaceletCount: 0, sandboxedCount: 0, sandboxedDebianCount: 0, nativeDebianCount: 0 };

var lib = (window.WEBPACK_LIBRARYNAME ? window.WEBPACK_LIBRARYNAME : window);

var core = new lib.SpaceifyCore();
var utility = new lib.SpaceifyUtility();
var network = new lib.SpaceifyNetwork();
var sam = new lib.SpaceifyApplicationManager();
var config = lib.SpaceifyConfig.getConfig();
//var logger = new lib.SpaceifyLogger("SpaceifyNet");

var WWW_PORT = 80;
var WWW_PORT_SECURE = 443;

	// USER INTERFACE -- -- -- -- -- -- -- -- -- -- //
self.showLoading = function(show)
	{
	if(show)
		{
		if(showLoadingInstances == 0)
			$("#loading").show();
		showLoadingInstances++;
		}
	else
		{
		showLoadingInstances = Math.max(0, --showLoadingInstances);
		if(showLoadingInstances == 0)
			$("#loading").hide();
		}
	}

self.showError = function(msgstr) { alerts(msgstr, "error"); }
self.showSuccess = function(msgstr) { alerts(msgstr, "success"); }
var alerts = function(msgstr, type)
	{
	var obj;

	if((obj = $("#alerting")).length > 0)
		obj.remove();

	obj = $('<span class="edgeAlert ' + type + '" id="alerting">' + msgstr + '</span>');
	$(document.body).append(obj);

	obj.css("left", ($(window).width() - obj.width()) / 2);
	obj.css("visibility", "visible");

	window.setTimeout(function() { obj.remove(); }, 5000);
	}

var msgFormat = function(msg)
	{
	var rmsg = "", i;

	if(self.isArray(msg))
		{
		for(i = 0; i < msg.length; i++)
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

var scope = function(id)
	{
	return angular.element(document.getElementById(id)).scope();
	}

	// SPLASH -- -- -- -- -- -- -- -- -- -- //
self.setSplashAccepted = function()
	{
	try {
		core.setSplashAccepted(function(err, data)
			{
			if(data && data == true)
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

self.adminLogOut = function(loadLaunchPage)
	{
	var sam = new SpaceifyApplicationManager();

	this.error = this.fail = this.warning = this.notify = this.message = function()
		{}

	this.ok = function()
		{
		if(loadLaunchPage)
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
	$("#spacelet").empty();
	$("#sandboxed").empty();
	$("#sandboxedDebian").empty();
	$("#nativeDebian").empty();

	var methods = [], j;

	core.getApplicationData(function(err, apps)
		{
		if(!apps)
			return (typeof callback == "function" ? callback() : false);

		for(j = 0; j < apps.spacelet.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.spacelet[j], null], type: "async"});

		for(j = 0; j < apps.sandboxed.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.sandboxed[j], null], type: "async"});

		for(j = 0; j < apps.sandboxed_debian.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.sandboxed_debian[j], null], type: "async"});

		for(j = 0; j < apps.native_debian.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.native_debian[j], null], type: "async"});

		new SpaceifySynchronous().waterFall(methods, function()
			{
			if(typeof callback == "function")
				callback();
			});
		});

	}

self.renderTile = function(manifest, callback)
	{
	var element, query;
	var sp_port, host, sp_host, spe_host, sp_path, icon, id;

	if(manifest.hasTile)																			// Application supplies its own tile
		{
		core.getApplicationURL(manifest.unique_name, function(err, appURL)
			{
			sp_port = (!network.isSecure() ? appURL.port : appURL.securePort);

			spe_host = network.getEdgeURL({ withEndSlash: true });

			if(appURL.implementsWebServer && sp_port)
				{
				host = spe_host;
				sp_host = spe_host;
				}
			else
				{
				host = network.externalResourceURL(manifest.unique_name, { withEndSlash: true });
				sp_host = host;
				}

			sp_path = config.TILEFILE;

			id = "apptile_" + manifest.unique_name.replace("/", "_");
			scope("edgeBody").addTile({type: "apptile", container: manifest.type, manifest: manifest, id: id, callback:
				function()
					{
					query = {};
					query.sp_port = sp_port;
					query.sp_host = encodeURIComponent(sp_host);
					query.sp_path = encodeURIComponent(sp_path);
					query.spe_host = encodeURIComponent(spe_host);

					element = document.getElementById(id);
					element.src = host + "remote.html" + network.remakeQueryString(query, [], {}, "", true);

					callback();
					}
				});
			});
		}
	else																							// Spaceify renders default tile
		{
		if((icon = utility.getApplicationIcon(manifest, false)))
			{
			sp_host = network.externalResourceURL(manifest.unique_name, { protocol: "", withEndSlash: true });
			sp_path = icon;
			}
		else
			{
			sp_host = network.getEdgeURL({ withEndSlash: true });
			sp_path = "images/icon.png";
			}

		id = "iconimage_" + manifest.unique_name.replace("/", "_");
		scope("edgeBody").addTile({type: "tile", container: manifest.type, manifest: manifest, id: id, sp_src: sp_host + sp_path, callback: function()
			{
			spaceifyLoader.loadData(document.getElementById(id), {}, callback);
			} });
		}

	addApplication(manifest);
	}

self.removeTile = function(manifest)
	{
	var i, length = 0, id = manifest.unique_name.replace(/\//, "_");

	$("#" + id).remove();

	removeApplication(manifest);
	}

var addApplication = function(manifest)
	{
	if(manifest.type == config.SPACELET)
		{ applications.spacelet[manifest.unique_name] = manifest; applications.spaceletCount++; }
	else if(manifest.type == config.SANDBOXED)
		{ applications.sandboxed[manifest.unique_name] = manifest; applications.sandboxedCount++; }
	else if(manifest.type == config.SANDBOXED_DEBIAN)
		{ applications.sandboxed_debian[manifest.unique_name] = manifest; applications.sandboxedDebianCount++; }
	else if(manifest.type == config.NATIVE_DEBIAN)
		{ applications.native_debian[manifest.unique_name] = manifest; applications.nativeDebianCount++; }
	}

var removeApplication = function(manifest)
	{
	if(manifest.type == config.SPACELET)
		{ delete applications.spacelet[manifest.unique_name]; applications.spaceletCount--; }
	else if(manifest.type == config.SANDBOXED)
		{ delete applications.sandboxed[manifest.unique_name]; applications.sandboxedCount--; }
	else if(manifest.type == config.SANDBOXED_DEBIAN)
		{ delete applications.sandboxed_debian[manifest.unique_name]; applications.sandboxedDebianCount--; }
	else if(manifest.type == config.NATIVE_DEBIAN)
		{ delete applications.native_debian[manifest.unique_name]; applications.nativeDebianCount--; }
	}

self.getApplications = function()
	{
	return applications;
	}

}

if(typeof exports !== "undefined")
	module.exports = SpaceifyNet;
