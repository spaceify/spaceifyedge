"use strict";

/**
 * DockerContainer, 2013 Spaceify Oy
 * 
 * @class DockerContainer
 */

//Includes

var events = require("events");
var Logger = require("./logger");
var Docker = require("dockerode");
var fibrous = require("./fibrous");
var language = require("./language");
var DockerHelper = require("./dockerhelper");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyUtility = require("./spaceifyutility");

function DockerContainer()
{
var self = this;

var utility = new SpaceifyUtility();
var dockerHelper = new DockerHelper();
var config = SpaceifyConfig.getConfig();
var logger = Logger.getLogger("DockerContainer");

var exposed;
var bindings;
var portOrder;
var container;
var containerId;
var containerIp;
var export_ports;
var inspectedData;
var containerPorts;
//var PortSpecs = [];
// Execute initializeContainer();

var login = "root";
var password ="docker123";
var docker = new Docker({socketPath: "/var/run/docker.sock"});

// Start a Docker container in daemon mode. The OS image must have sshd installed.
self.startContainer = fibrous( function(portCount, imageNameOrId, volumes, binds)
	{
	var opts;
	var port;
	var hostPort;

	try	{
		for(var p = 0; p < portCount; p++)
			{
			exposed[new String(config.FIRST_SERVICE_PORT + p) + "/tcp"] = {};
			exposed[new String(config.FIRST_SERVICE_PORT_SECURE + p) + "/tcp"] = {};

			portOrder.push(new String(config.FIRST_SERVICE_PORT + p) + "/tcp");		// Mapped ports are not returned in the order they are defined -> make order array to restore the order
			portOrder.push(new String(config.FIRST_SERVICE_PORT_SECURE + p) + "/tcp");

			bindings[new String(config.FIRST_SERVICE_PORT + p) + "/tcp"] = [{}];
			bindings[new String(config.FIRST_SERVICE_PORT_SECURE + p) + "/tcp"] = [{}];
			}
		exposed["80/tcp"] = {};														// Add two additional ports for the applications internal http and https servers
		exposed["443/tcp"] = {};
		portOrder.push("80/tcp");
		portOrder.push("443/tcp");
		bindings["80/tcp"] = [{}];
		bindings["443/tcp"] = [{}];

		opts = {
			"Hostname": "",
			"User": "",
			"AttachStdin": true,
			"AttachStdout": true,
			"AttachStderr": true,
			"Tty": false,
			"OpenStdin": true,
			"StdinOnce": false,
			"Env": null,
			//"WorkingDir": config.VOLUME_APPLICATION_PATH,
			//"Cmd": ["/usr/sbin/sshd", "-D"],
			"Cmd": ["/bin/bash"],
			"Image": imageNameOrId,
			"Volumes": (volumes ? volumes : {}),
			"HostConfig": {
				"VolumesFrom": null,
				"PublishAllPorts": true,
				"PortBindings": bindings,
				"Binds": (binds ? binds : []),
				//"Dns": ["8.8.8.8", "8.8.4.4"],
				"Dns": [config.EDGE_IP]
				},
			"ExposedPorts": exposed
			//"PortSpecs": PortSpecs
		};
		container = docker.sync.createContainer(opts);
		}
	catch(err) {
		throw language.E_START_CONTAINER_CREATE_CONTAINER_FAILED.pre("DockerContainer::startContainer", err); }

	try {
		dockerHelper.sync.init(container); }
	catch(err) {
		throw language.E_START_CONTAINER_INIT_CONTAINER_FAILED.pre("DockerContainer::startContainer", err); }

	try	{
		container.sync.start(); }
	catch(err) {
		throw language.E_START_CONTAINER_START_CONTAINER_FAILED.pre("DockerContainer::startContainer", err); }

	try	{
		inspectedData = container.sync.inspect();
		containerId = (inspectedData.ID ? inspectedData.ID : inspectedData.Id);
		containerIp = inspectedData.NetworkSettings.IPAddress;
		logger.log("+++", "\ncontainerId: " + containerId, "\ncontainerIp: " + containerIp);
		}
	catch(err) {
		throw language.E_START_CONTAINER_INSPECT_FAILED.pre("DockerContainer::startContainer", err); }

	for(var i = 0; i < portOrder.length; i++)												// Store the mapped ports in the order they were exposed
		{
		port = portOrder[i];
		hostPort = inspectedData.NetworkSettings.Ports[port][0].HostPort;

		containerPorts.push(hostPort);
		logger.log("HostPort " + port + " = " + hostPort);

		export_ports += "export PORT_" + port.replace(/[^0-9]/g, "") + "=" + hostPort + "\n";
		}
	});

self.stopContainer = fibrous( function(appobj, throws)
	{
	try	{
		if(container != null)
			{
			if(appobj.getType() != config.SANDBOXED_DEBIAN && appobj.getStopCommand() != "")
				dockerHelper.sync.executeCommand("cd " + config.VOLUME_APPLICATION_PATH + " && " + appobj.getStopCommand() + " && echo stopcontainer", ["stopcontainer"], false);

			container.sync.stop({"t": "0"});
			container.sync.wait();
			container.sync.remove({"force": true});
			}
		}
	catch(err)
		{
		if(throws)
			throw language.E_STOP_CONTAINER_FAILED.preFmt("DockerContainer::stopContainer", {"~err": err.toString()});
		}
	finally
		{
		initializeContainer();
		}
	});

self.installApplication = fibrous( function(appobj)
	{
	var installCommands = "";															// Execute user defined commands inside the Docker container
	var icommands = appobj.getInstallCommands();
	for(var i = 0; i < icommands.length; i++)
		installCommands += " && " + icommands[i];

	dockerHelper.sync.executeCommand("export NODE_PATH=" + config.API_NODE_MODULES_DIRECTORY + installCommands + " && echo icfinished", ["icfinished"], false);

	// Create a new image (difference) for each application by committing the currently running container
	return container.sync.commit({"repo": appobj.getUniqueName(), "container": self.getContainerId()});
	});

self.runApplication = fibrous( function(appobj)
	{
	dockerHelper.sync.executeCommand("/usr/sbin/sshd -D & echo spaceifyend", ["spaceifyend"], false);

	var type = appobj.getType();
	var startCommand = appobj.getStartCommand();

	var bash =	"cd " + config.VOLUME_APPLICATION_PATH + "\n";
		bash += "printf \"";
		bash += "#!/bin/bash" + "\n";
		bash += "export IS_REAL_SPACEIFY=YES" + "\n";
		bash += "export NODE_PATH=" + config.API_NODE_MODULES_DIRECTORY + "\n";
		bash += "export APPLICATION_INITIALIZED=" + config.APPLICATION_INITIALIZED + "\n";
		bash += "export APPLICATION_UNINITIALIZED=" + config.APPLICATION_UNINITIALIZED + "\n";
		bash += export_ports;
		if((type == config.SPACELET || type == config.SANDBOXED) && startCommand != "")
			{
			bash +=  startCommand + "\n";
			bash += "ec=\\\$?" + "\n";
			bash += "if (( \\\$ec != 0 )); then" + "\n";
			bash += "    printf ';;Starting the application failed with return code '" + "\\\$ec::" + "\n";
			bash += "    printf '" + config.APPLICATION_UNINITIALIZED + "'\n" + "\n";
			bash += "fi" + "\n";
			}
		else
			bash += "printf '" + config.APPLICATION_INITIALIZED + "'\n" + "\n";
		bash += "kill -9 \\\$\\\$" + "\n";
		bash += "\" > /tmp/run.sh && bash /tmp/run.sh 2>&1 | tee /volume/console.log \n";

	var response = dockerHelper.sync.executeCommand(bash, [config.APPLICATION_INITIALIZED, config.APPLICATION_UNINITIALIZED], true);

	return response;
	});

self.getIpAddress = function()
	{
	return containerIp;
	}

self.getPublicPorts = function()
	{
	return containerPorts;
	}

self.getContainerId = function()
	{
	return containerId;
	}

self.getStreams = function()
	{
	return dockerHelper.getStreams();
	}

var initializeContainer = function()
	{
	exposed = {};
	bindings = {};
	portOrder = [];
	container = null;
	containerId = null;
	containerIp = null;
	inspectedData = {};
	export_ports = "";
	containerPorts = [];
	}

initializeContainer();
}

module.exports = DockerContainer;
