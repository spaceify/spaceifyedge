"use strict";

/**
 * Spaceify iptables writer, 12.11.2014 Spaceify Oy
 *
 * @class Iptables
 */

var fs = require("fs");
var fibrous = require("./fibrous");
var language = require("./language");
var SpaceifyConfig = require("./spaceifyconfig");
//var SpaceifyLogger = require("./spaceifylogger");
var SpaceifyUnique = require("./spaceifyunique");
var SpaceifyUtility = require("./spaceifyutility");

function Iptables()
{
var self = this;

var unique = new SpaceifyUnique();
var utility = new SpaceifyUtility();
var config = SpaceifyConfig.getConfig();
//var logger = new SpaceifyLogger("Iptables");

var rules = {};
var access = {};

var chainOrdinal = 1;
var CHAIN = "Spaceify-App-";
var DEFAULT_REJECT_OPEN_LOCAL = "-t filter -A ~chain -p tcp ! -s 172.17.0.0/16 --destination-port ~dstPort -j REJECT";
//var DEFAULT_REJECT_STANDARD_ALIEN = "-t filter -A ~chain -p tcp -d ~dstIP --destination-port ~dstPort -j REJECT";
var DEFAULT_REJECT_STANDARD_ALIEN = "-t filter -A ~chain -p tcp --destination-port ~dstPort -j REJECT";
//var ADD_ACCEPT_STANDARD_ALIEN = "-t filter -I ~chain 1 -p tcp -s ~srcIP -d ~dstIP --destination-port ~dstPort -j ACCEPT";
//var REM_ACCEPT_STANDARD_ALIEN = "-t filter -D ~chain -p tcp -s ~srcIP -d ~dstIP --destination-port ~dstPort -j ACCEPT";
var ADD_ACCEPT_STANDARD_ALIEN = "-t filter -I ~chain 1 -p tcp -s ~srcIP --destination-port ~dstPort -j ACCEPT";
var REM_ACCEPT_STANDARD_ALIEN = "-t filter -D ~chain -p tcp -s ~srcIP --destination-port ~dstPort -j ACCEPT";

	// I/O -- -- -- -- -- -- -- -- -- -- //
var execute = function(rule, callback)
	{
	try {
		utility.execute.sync("iptables", rule.split(" "), {}, null);

		callback(null, true);
		}
	catch(err)
		{
		callback(null, false);
		}
	}

	// INITIALIZE IPTABLES = REMOVES RULES -- -- -- -- -- -- -- -- -- -- //
self.initialize = fibrous( function()
	{
	try {
		readRulesFromFile.sync();

		for (var unique_name in rules)
			{
			removeChain.sync(rules[unique_name].chain);
			}

		rules = {};

		writeRulesToFile.sync();
		}
	catch(err)
		{
		}
	});

	// RULES -- -- -- -- -- -- -- -- -- -- //
self.setRules = fibrous( function(unique_name, provided, required, ip, managerType)
	{
/*
iptables -A FORWARD -i docker0 -o ${eth} -j ACCEPT
iptables -A FORWARD -i ${eth} -o docker0 -j ACCEPT
iptables -A FORWARD -i ${eth} -o docker0 --state RELATED,ESTABLISHED -j ACCEPT
*/
	try {
		var chain = CHAIN + getChainOrdinal();

		self.removeRules.sync(unique_name);												// Make sure there are no existing rules

		rules[unique_name] = { chain: chain, provided: {}, required: {} };				// Add the chain in any case

		execute.sync("-t filter -N " + chain);
		execute.sync("-t filter -A INPUT -p tcp -j " + chain);	// raw ... PREROUTING?

		for (var i in provided)
			{
				// ---> REJECT packet 'if to destination ip and port of application' = block all
			if (provided[i].service_type == config.STANDARD || provided[i].service_type == config.ALIEN)
				{
				executeRule.sync(DEFAULT_REJECT_STANDARD_ALIEN, chain, null, null/*ip*/, provided[i].port, provided[i].securePort);
				}
				// ---> REJECT packet 'if not from internal source ip to applications port' = block from clients
			else if (provided[i].service_type == config.OPEN_LOCAL)
				{
				executeRule.sync(DEFAULT_REJECT_OPEN_LOCAL, chain, null, null, provided[i].port, provided[i].securePort);
				}

	        rules[unique_name]["provided"][provided[i].service_name] =	{
																		port: provided[i].port,
																		securePort: provided[i].securePort,
																		ip: ip,
																		service_type: provided[i].service_type
																		};
			}

		execute.sync("-t filter -D " + chain + " -j RETURN");							// Keep this last
		execute.sync("-t filter -A " + chain + " -j RETURN");

		for (var j = 0; j < required.length; j++)
			rules[unique_name]["required"][required[j].service_name] = { ip: ip };

		grantAccess.sync(unique_name, ip);

		writeRulesToFile.sync();
		}
	catch(err)
		{
		self.removeRules.sync(unique_name);

		throw language.E_IPTABLES_SET_FAILED.preFmt("Iptables::setRules", { "~unique_name": unique_name, "~type": language.APP_DISPLAY_NAMES[managerType] });
		}
	});

self.removeRules = fibrous( function(unique_name)
	{ // REMOVE RULES ASSOCIATED TO THIS APPLICATION
	try {
		if (typeof rules[unique_name] == "undefined")
			return;

		removeChain.sync(rules[unique_name].chain);

		delete rules[unique_name];

		writeRulesToFile.sync();
		}
	catch(err)
		{
		}
	});

var removeChain = fibrous( function(chain)
	{
	execute.sync("-t filter -D " + chain + " -j RETURN");
	execute.sync("-t filter -D INPUT -p tcp -j " + chain);
	execute.sync("-t filter -F " + chain);
	execute.sync("-t filter -X " + chain);
	});

	// ACCESS -- -- -- -- -- -- -- -- -- -- //
var grantAccess = fibrous( function(unique_name, srcIP)
	{
	var service;
	var provided;
	var required;
	var service_name;
	var _unique_name_;

	try {
		// 1 / 2
		// Grant access to provided services of other applications required by this application (unique_name)
		for (service_name in rules[unique_name].required)
			{
			removeAccess.sync(service_name, unique_name);									// Remove applications old rules first

			for (_unique_name_ in rules)
				{
				if (_unique_name_ == unique_name || typeof rules[_unique_name_]["provided"][service_name] == "undefined")	// Is self || no provided services
					continue;

				service = rules[_unique_name_]["provided"][service_name];

				if (service.service_type != config.STANDARD && service.service_type != config.ALIEN)
					continue;

				executeRule.sync(ADD_ACCEPT_STANDARD_ALIEN, rules[_unique_name_].chain, srcIP, service.ip, service.port, service.securePort);

				if (typeof access[service_name] == "undefined")								// Add to access list
					access[service_name] = [];

				access[service_name].push(	{
											"srcIP": srcIP,
											"dstIP": service.ip,
											"dstPort": service.port,
											"dstSecurePort": service.securePort,
											"unique_name": unique_name,
											"chain": rules[_unique_name_].chain
											});
				}
			}

		// 2 / 2
		// Grant access to this applications (unique_name) provided services other applications require
		provided = rules[unique_name].provided;
		for (_unique_name_ in rules)
			{
			if (_unique_name_ == unique_name)
				continue;

			required = rules[unique_name].required;

			for (service_name in required)
				{
				if (typeof provided[service_name] != "undefined" && (provided[service_name].service_type == config.STANDARD || provided[service_name].service_type == config.ALIEN))
					{
					removeAccess.sync(service_name, _unique_name_);

					executeRule.sync(ADD_ACCEPT_STANDARD_ALIEN, provided[service_name].chain, required[service_name].ip, provided[service_name].ip, provided[service_name].port, provided[service_name].securePort);

					if (typeof access[service_name] == "undefined")
						access[service_name] = [];

					access[service_name].push(	{
												"srcIP": required[service_name].ip,
												"dstIP": provided[service_name].ip,
												"dstPort": provided[service_name].port,
												"dstSecurePort": provided[service_name].securePort,
												"unique_name": _unique_name_,
												"chain": rules[unique_name].chain
												});
					}
				}
			}
		}
	catch(err)
		{
		}
	});

var removeAccess = fibrous( function(service_name, unique_name)
	{ // Remove rules set for the application (unique_name) requiring the service (service_name)
	var i = 0;

	if (typeof access[service_name] == "undefined")
		return;

	while (i < access[service_name].length)
		{
		if (access[service_name][i].unique_name == unique_name)
			{
			executeRule.sync(REM_ACCEPT_STANDARD_ALIEN, access[service_name][i].chain, access[service_name][i].srcIP, access[service_name][i].dstIP, access[service_name][i].dstPort, access[service_name][i].dstSecurePort);

			access[service_name].splice(i, 1);

			//break;? There can not be more but lets go through the array to be sure!
			}
		else
			{
			i++;
			}
		}

	if (access[service_name].length == 0)
		delete access[service_name];
	});

var executeRule = fibrous( function(rule, chain, srcIP, dstIP, dstPort, dstSecurePort)
	{
	execute.sync(utility.replace(rule, { "~chain": chain, "~srcIP": srcIP, "~dstIP": dstIP, "~dstPort": dstPort }));

	execute.sync(utility.replace(rule, { "~chain": chain, "~srcIP": srcIP, "~dstIP": dstIP, "~dstPort": dstSecurePort }));
	});

	// FILE -- -- -- -- -- -- -- -- -- -- //
var writeRulesToFile = fibrous( function()
	{
	var success;

	try {
		fs.sync.writeFile(config.IPTABLES_PATH, JSON.stringify(rules, null, 1), { encoding: "utf8" });

		success = true;
		}
	catch(err)
		{
		success = false;
		}

	return success;
	});

var readRulesFromFile = fibrous( function()
	{
	var _rules = null;

	try {
		_rules = fs.sync.readFile(config.IPTABLES_PATH, { encoding: "utf8" });

		rules = JSON.parse(_rules);
		}
	catch(err)
		{
		rules = {};
		}
	});

	// MISC -- -- -- -- -- -- -- -- -- -- //
var getChainOrdinal = function()
	{
	return chainOrdinal++;
	}

}

module.exports = Iptables;

/*
rules:
{
  "<unique_name>":
    {
    "chain": "???",
    "provided":
      {
      "<service_name>":
        {
          "port": "???",
          "securePort": "???",
          "ip": "???",
          "service_type": "[open_local, standard, alien]"
        },
      "<service_name>":
        ...
      },
    "required":
      {
      "<service_name>":
        {
	    "ip": "???"
	    },
      ...
      }
    },
  "<unique_name>":
    ...
}

access:
{
  "<service_name>":
    [
  	  {
      "srcIP": "???",
      "dstIP": "???",
      "dstPort": "???",
      "dstSecurePort": "???",
      "service_type": "[standard, alien]",
      "unique_name": "zyx",
      chain: "???"
  	  },
  	  ...
    ],
  "<service_name>":
    ...
}
*/
