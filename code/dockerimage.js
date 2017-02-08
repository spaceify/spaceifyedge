"use strict";

/**
 * DockerImage, 15.4.2014 Spaceify Oy
 * 
 * @class DockerImage
 */

var Docker = require("dockerode");
var Logger = require("./logger");
var fibrous = require("./fibrous");
var language = require("./language");
var SpaceifyUtility = require("./spaceifyutility");

function DockerImage()
{
var self = this;

var utility = new SpaceifyUtility();
var logger = new Logger("DockerImage", "selogs");

var docker = new Docker({socketPath: "/var/run/docker.sock"});

self.stopContainers = fibrous( function(imageID, imageName)
	{
	var container;
	var containers;
	//var shortImageID = imageID.substr(0, 12);									// Id is always the short 12 character version

	try {
		containers = docker.sync.listContainers({"all": 1});

		containers.forEach(function(containerInfo)
			{
			if(containerInfo.ImageID == imageID || containerInfo.Image == imageName)
				{
				logger.log(utility.replace(language.STOP_CONTAINER, {"~container": containerInfo.Image}));

				container = docker.getContainer(containerInfo.Id);
				container.sync.stop({"t": "0"});
				container.sync.wait();
				container.sync.remove({"force": true});
				}
			});
		}
	catch(err)
		{
		language.E_GENERAL_ERROR.preFmt("DockerImage::stopContainers", {"~err": err.toString()});
		}
	});

self.removeContainers = fibrous( function(imageID, imageName, streams)
	{
	var container;
	var containers;
	//var shortImageID = imageID.substr(0, 12);										// Id is always the short 12 character version;

	try {
		self.sync.stopContainers(imageID, imageName);

		containers = docker.sync.listContainers({"all": 1, "size": 1});
		containers.forEach(function(containerInfo)
			{
			if(containerInfo.Image == imageID || containerInfo.Image == imageName)
				{
				utility.replace(language.REMOVE_CONTAINER, {"~container": containerInfo.Image});

				container = docker.getContainer(containerInfo.Id);
				container.sync.remove({"f": true});
				}
			});

		if(streams)
			streams.in.end();
		}
	catch(err)
		{
		language.E_GENERAL_ERROR.preFmt("DockerImage::removeContainers", {"~err": err.toString()});
		}
	});

self.removeImage = fibrous( function(imageID, imageName)
	{
	var image;

	try {
		if(!self.sync.inspect(imageName))											// Image must exist
			return false;

		self.sync.removeContainers(imageID, imageName, null);

		image = docker.getImage(imageID);
		image.sync.remove();
		}
	catch(err)
		{
		language.E_GENERAL_ERROR.preFmt("DockerImage::removeImage", {"~err": err.toString()});
		}
	});

self.inspect = fibrous( function(image)
	{
	var image;
	var info = null;

	try {
		image = docker.getImage(image);
		info = image.sync.inspect();
		}
	catch(err)
		{}

	return (info ? info : null);
	});

}

module.exports = DockerImage;
