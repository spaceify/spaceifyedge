"use strict";

/**
 * Spaceify Language, 29.7.2015 Spaceify Oy
 *
 * Keep this class dependency free!!!
 *
 * Language class for web pages.
 *
 * @class SpaceifyLanguage
 */

function SpaceifyLanguage()
{
var self = this;

self.processDocument = function(id, selector, doc)
	{
	var nodeList, node, data, result, indexes, index, pos, attribute, newElement;

	nodeList = document.getElementById(id);															// Find the container
	if (!nodeList)
		return;

	nodeList = nodeList.querySelectorAll("[" + selector + "]");										// Selector is usually "data-language"

	for (var i = 0; i < nodeList.length; ++i)														// Iterate the container
		{
		node = nodeList[i];

		indexes = node.getAttribute(selector).split(":");

		result = "";
		attribute = "";
		for (var t = 0; t < indexes.length; t++)													// Selector can contain one or more language indexes
			{
			index = indexes[t];

			if ((pos = index.indexOf(">")) != -1)
				{
				attribute = index.substr(0, pos);
				index = index.replace(attribute + ">", "");
				}

			if (index.indexOf(".") == -1)															// Plain string
				{
				result += index;
				}
			else																					// Index in the locales
				{
				index = index.split(".");

				result += window.spelocales[locale][index[0]][index[1]];							// locale:section:index
				}
			}

		if (attribute == "")
			{
			while (node.firstChild)
   				node.removeChild(node.firstChild);

			newElement = document.createTextNode(result);
			node.appendChild(newElement);
			}
		else
			{
			node[attribute] = result;
			}
		}

	if (doc)																						// Set strings to document level tags, e.g. <head> -> <title>
		{
		for (indexes in doc)
			{
			index = doc[indexes];
			document[indexes] = window.spelocales[locale][index.section][index.index];
			}
		}
	}

self.getString = function(section, index)
	{
	return window.spelocales[locale][section][index];
	}

self.setLocale = function(locale_)
	{
	locale = locale;
	}

var getCookie = function(cname)
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

var locale = getCookie("locale") || "en_US";
}

if(typeof exports !== "undefined")
	module.exports = SpaceifyLanguage;
