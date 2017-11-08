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
			elem.style.display = (!status ? "none" : "block");
		}
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
	var parent = document.getElementById(parentId);
	var element = document.getElementById(id);

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

}

if (typeof exports !== "undefined")
	module.exports = SpaceifyDOM;
