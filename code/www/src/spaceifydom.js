"use strict";

/**
 * SpaceifyDOM, 8.11.2017 Spaceify Oy
 *
 * Some DOM helper functions.
 *
 * @class SpaceifyDOM
 */

function SpaceifyDOM()
{
var self = this;

self.show = function(elements, status)
	{
	var i, ids, elem;

	ids = elements.split(",");

	for (i = 0; i < ids.length; i++)
		{
		elem = document.getElementById(ids[i].trim());

		if (elem)
			{
			if (typeof elem.style.display !== "undefined" && elem.style.display != "")
				elem.style.display = (!status ? "none" : "block");

			if (typeof elem.style.visibility !== "undefined" && elem.style.visibility != "")
				elem.style.visibility = (!status ? "hidden" : "visible");
			}
		}
	}

self.isVisible = function(id)
	{
	var status = false;
	var elem = document.getElementById(id);

	if (!elem)
		return false;

	if (typeof elem.style.display !== "undefined")
		{ // initial value: inline, completely removed: none, inherit: ?
		status = (elem.style.display != "" && elem.style.display != "none" ? true : false);
		}
	else if (typeof elem.style.visibility !== "undefined")
		{ // initial value: visible, is invisible: hidden, inherit: ?, collapse: applies only to tables = hidden for other elements
		status = (elem.style.visibility != "" && elem.style.visibility != "hidden" ? true : false);
		}

	return status;
	}

self.empty = function(ids)
	{
	var i, ids = ids.split(","), element;

	for (i = 0; i < ids.length; i++)
		{
		element = document.getElementById(ids[i].trim());

		while (element.firstChild)
    		element.removeChild(element.firstChild);
		}
	}

self.remove = function(parentId, id)
	{
	var parent, element;

	if (!(parent = document.getElementById(parentId)))
		return;

	if (!(element = document.getElementById(id)))
		return;

	parent.removeChild(element);
	}

self.value = function(id, value)
	{
	var result = null, element = document.getElementById(id);

	if (element)
		{
		if (value)
			{
			element.value = value;
			}
		else
			{
			result = element.value;
			}
		}

	return result;
	}

self.focus = function(id)
	{
	var element = document.getElementById(id);

	if (element)
		element.focus();
	}

self.append = function(id, content)
	{
	var element = document.getElementById(id);

	if (element)
		{
		if (typeof content == "string")
			element.appendChild(document.createTextNode(content));
		else
			element.appendChild(content);
		}

	}

self.getPosition = function(el)
	{
	// Adapted from:
	//	Get an Element's Position Using JavaScript, by kirupa | 16 March 2016
	//	https://www.kirupa.com/html5/get_element_position_using_javascript.htm
	var xScroll, yScroll;
	var element, position = { x: 0, y: 0, set: false };

	if (typeof el == "string")
		element = document.getElementById(el);
	else
		element = el;

	while (element)
		{
		if (element.tagName == "BODY")
			{
			// deal with browser quirks with body/window/document and page scroll
			xScroll = element.scrollLeft || document.documentElement.scrollLeft;
			yScroll = element.scrollTop || document.documentElement.scrollTop;

			position.x += (element.offsetLeft - xScroll + element.clientLeft);
			position.y += (element.offsetTop - yScroll + element.clientTop);

			position.set = true;
			}
		else
			{
			// for all other non-BODY elements
			position.x += (element.offsetLeft - element.scrollLeft + element.clientLeft);
			position.y += (element.offsetTop - element.scrollTop + element.clientTop);

			position.set = true;
			}

		element = element.offsetParent;
		}

	return position;
	}

}

if (typeof exports !== "undefined")
	module.exports = SpaceifyDOM;
