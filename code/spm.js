"use strict";

/**
 * Spaceify Package Manager, 30.4.2014 Spaceify Oy
 *
 * @file spm-js
 *
 * #/usr/bin/spm
 */

var fs = require("fs");
var read = require("read");
var http = require("http");
var crypto = require("crypto");
var qs = require("querystring");
var Logger = require("./logger");
var fibrous = require("./fibrous");
var Database = require("./database");
var language = require("./language");
var Messaging = require("./messaging");
var SpaceifyError = require("./spaceifyerror");
var SecurityModel = require("./securitymodel");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyUtility = require("./spaceifyutility");
var SpaceifyNetwork = require("./spaceifynetwork");
var EdgeSpaceifyNet = require("./edgespaceifynet");
var ApplicationManager = require("./applicationmanager");
var WebSocketRpcConnection = require("./websocketrpcconnection.js");

function SPM()
{
var self = this;

var database = new Database();
var messaging = new Messaging();
var errorc = new SpaceifyError();
var config = new SpaceifyConfig();
var utility = new SpaceifyUtility();
var network = new SpaceifyNetwork();
var securityModel = new SecurityModel();
var edgeSpaceifyNet = new EdgeSpaceifyNet();

var exitCode = 0;
var appManConnection = null;
var appManMessageConnection = null;

var applicationManager = new ApplicationManager();

// Update commands and options also to command completion script data/spmc!!!
var HELP = "help";
var INSTALL = "install";
var LIST = "list";
var PUBLISH = "publish";
var PURGE = "purge";
var REGISTER = "register";
var REMOVE = "remove";
var RESTART = "restart";
var SOURCE = "source";
var START = "start";
var STATES = "states";
var STATUS = "status";
var STOP = "stop";
var VERSION = "version";

var AUTH   = "authenticate";
var AUTH_  = "-a";
var DEVE   = "develop";
var DEVE_  = "-d";
var FORC   = "force";
var FORC_  = "-f";
var NATI   = "native_debian";
var NATI_  = "-n";
var SAND   = "sandboxed";
var SAND_  = "-S";
var SANDD  = "sandboxed_debian";
var SANDD_ = "-SD";
var SPAC   = "spacelet";
var SPAC_  = "-s";
var VERB   = "verbose";
var VERB_  = "-v";

var EMPTY = "empty";

var commands = HELP + "|" + INSTALL + "|" + LIST + "|" + PUBLISH + "|" + PURGE + "|" + REGISTER + "|" + REMOVE + "|" + RESTART + "|" + STATES + "|" + STATUS + "|" + SOURCE + "|" + START + "|" + STOP + "|" + VERSION;
var operRegex = new RegExp("^(" + commands + ")$");
var options = AUTH + "|" + DEVE + "|" + SPAC + "|" + SAND + "|" + SANDD + "|" + NATI + "|" + VERB + "|" + FORC;
var optsRegex = new RegExp("^(" + options + ")$");

// (a)ngle, (p)ipe, (s)pace, (l)eft, (m)iddle, (t)ee
var       p = "│";
var      ps = "│ ";
var      ss = "  ";
var     all = "└──";
var    sall = " └──";
var     mlt = "├─┬";
var    smlt = " ├─┬";
var     alt = "└─┬";
var    salt = " └─┬";
var     mll = "├──";
var    smll = " ├──";
var pspsall = "│ │ └──";
var pspsmlt = "│ │ ├─┬";
var sspsmll = "  │ ├──";
var pspsmll = "│ │ ├──";
var   ssmll = "  ├──";
var   psmll = "│ ├──";
var   ssmlt = "  ├─┬";
var   psmlt = "│ ├─┬";
var sspsmlt = "  │ ├─┬";
var sspsalt = "  │ └─┬";
var      al = "└─";
var      ml = "├─";
var     tee = "┬";
var    left = "─";

var key = config.SPACEIFY_TLS_PATH + config.SERVER_KEY;
var crt = config.SPACEIFY_TLS_PATH + config.SERVER_CRT;
var caCrt = config.SPACEIFY_WWW_PATH + config.SPACEIFY_CRT;

var messageId;
var sessionId = null;

var manualDisconnection = false;

self.start = fibrous( function()
	{
	var arg;
	var auth;
	var cwd = "";
	var last = "";
	var type = [];
	var command = "";
	var force = false;
	var username = "";
	var password = "";
	var openMessaging;
	var verbose = false;
	var develop = false;
	var githubUsername = "";
	var githubPassword = "";
	var authenticate = false;
	var applicationPackage = "";
	var l, length = process.argv.length;
	var versions = fs.sync.readFile(config.SPACEIFY_PATH + config.VERSIONS, {encoding: "utf8"});

	versions = versions.split(":");

	try {
		// CHECK INPUT (node path/spm.js command ...)
		if(length < 4)
			process.argv.push(EMPTY);

		if(process.argv[3].search(operRegex) == -1 && process.argv[3] != EMPTY)
			throw language.E_SPM_UNKNOWN_COMMAND.preFmt("spm::start", {"~command": process.argv[3]});

		for(var i = 4; i < length; i++)															// options are always after the command
			{
			arg = process.argv[i];

			if(arg == AUTH || arg == AUTH_)
				authenticate = true;
			else if(arg == DEVE || arg == DEVE_)
				develop = true;
			else if(arg == FORC || arg == FORC_)
				force = true;
			else if(arg == NATI ||  arg == NATI_ || arg == SAND || arg == SAND_ || arg == SANDD || arg == SANDD_ || arg == SPAC || arg == SPAC_ )
				{
				if(type.indexOf(arg) == -1)
					type.push(arg);
				}
			else if(arg == VERB || arg == VERB_)
				verbose = true;
			}

		cwd = process.argv[2];
		command = process.argv[3];
		last = process.argv[length - 1];
		applicationPackage = (command != HELP && command != LIST && command != STATES && command != STATUS && command != VERSION ? last : "");	// application package is the last argument
																				// Check argument count for commands
		if( (/*command == INSTALL || */command == PUBLISH || command == PUBLISH) && (length < (5 + (authenticate ? 1 : 0))) )
			throw language.E_SPM_ARGUMENTS_TWO.preFmt("ApplicationManager::start", {"~command": command});

		if(command == INSTALL && length == 4)													// CWD/application
			applicationPackage = "";

		if( (command == PURGE || command == REMOVE || command == RESTART || command == START || command == STOP) && length < 5 )
			throw language.E_SPM_ARGUMENTS_ONE.preFmt("ApplicationManager::start", {"~command": command});

		// PRINT TITLE
		logger.force("Spaceify Package Manager v" + versions[3] + " - " + (command != EMPTY ? command : HELP) + "\n");

		// OPTIONS
		if((authenticate && (command == INSTALL || command == SOURCE)) || command == PUBLISH)	// Authenticate to Spaceify registry
			{
			auth = (command == PUBLISH ? config.REGISTRY_HOSTNAME : applicationPackage);

			logger.force(utility.replace(language.AUTHENTICATION, {"~auth": auth}));
			username = read.sync({ prompt: language.USERNAME });
			password = read.sync({ prompt: language.PASSWORD, silent: true, replace: "" });
			}

		if(command == PUBLISH && applicationPackage.match("github.com"))						// Authenticate also to GitHub repository
			{
			logger.force(utility.replace(language.AUTHENTICATION, {"~auth": config.GITHUB_HOSTNAME}));
			githubUsername = read.sync({ prompt: language.USERNAME });
			githubPassword = read.sync({ prompt: language.PASSWORD, silent: true, replace: "" });
			}

		// CONNECTIONS
		if(command != PUBLISH && command != HELP && command != VERSION)
			{
			openMessaging = (command != STATUS ? true : false);

			connect.sync(openMessaging);														// Try to open required connections
			}

		// DO THE REQUESTED COMMAND
		if(command == HELP || command == EMPTY)
			help.sync(command == HELP ? true : false, (length > 4 ? last : ""));
		else if(command == INSTALL)
			install.sync(applicationPackage, username, password, cwd, force, develop);
		else if(command == LIST)
			{
			manualDisconnection = true;
			list.sync(type, verbose);
			}
		else if(command == PUBLISH)
			publish.sync(applicationPackage, username, password, githubUsername, githubPassword, cwd);
		else if(command == PURGE)
			purge.sync(applicationPackage);
		else if(command == REGISTER)
			register.sync(type, verbose);
		else if(command == REMOVE)
			remove.sync(applicationPackage);
		else if(command == RESTART)
			restart.sync(applicationPackage);
		else if(command == SOURCE)
			source.sync(applicationPackage, username, password, cwd);
		else if(command == START)
			start.sync(applicationPackage);
		else if(command == STATES)
			{
			manualDisconnection = true;
			getServiceRuntimeStates.sync();
			}
		else if(command == STATUS)
			systemStatus.sync();
		else if(command == STOP)
			stop.sync(applicationPackage);
		else if(command == VERSION)
			version.sync();
		}
	catch(err)
		{
		logger.error(err, false, false, logger.FORCE);
		}
	finally
		{
		disconnect();
		}
	});

var connect = fibrous( function(openMessaging)
	{
	try {
		// Create temporary log in session
		sessionId = securityModel.sync.createTemporaryAdminSession("127.0.0.1");											// Remember to destory the id

		// ApplicationManager
		appManConnection = new WebSocketRpcConnection();
		appManConnection.sync.connect({hostname: config.CONNECTION_HOSTNAME, port: config.APPMAN_PORT_SECURE, isSecure: true, caCrt: caCrt, debug: false});

		// Messaging (Setup by ApplicationManager)
		if(openMessaging)
			{
			appManMessageConnection = new WebSocketRpcConnection();

			appManMessageConnection.exposeRpcMethodSync("fail", self, fail);
			appManMessageConnection.exposeRpcMethodSync("error", self, error);
			appManMessageConnection.exposeRpcMethodSync("notify", self, notify);
			appManMessageConnection.exposeRpcMethodSync("stdout", self, stdout);
			appManMessageConnection.exposeRpcMethodSync("warning", self, warning);
			appManMessageConnection.exposeRpcMethodSync("message", self, message);
			appManMessageConnection.exposeRpcMethodSync("question", self, question);
			appManMessageConnection.exposeRpcMethodSync("questionTimedOut", self, questionTimedOut);
			appManMessageConnection.exposeRpcMethodSync("end", self, end);

			appManMessageConnection.sync.connect({hostname: config.CONNECTION_HOSTNAME, port: config.APPMAN_MESSAGE_PORT_SECURE, isSecure: true, caCrt: caCrt, debug: false});

			messageId = appManConnection.sync.callRpc("requestMessageId", [sessionId], self);								// Request a messageId
			appManMessageConnection.callRpc("confirm", [messageId]);
			}
		}
	catch(err)
		{
		throw language.E_SPM_CONNECTION_FAILED.pre("ApplicationManager::connectApplicationManager");
		}
	});

var disconnect = function()
	{
	if(appManConnection)
		appManConnection.close();

	if(appManMessageConnection)
		appManMessageConnection.close();

	securityModel.sync.destroyTemporaryAdminSession();

	appManConnection = null;
	appManMessageConnection = null;

	logger.force();

	process.exit(exitCode);
	}

	// appManMessageConnection RPC methods -- -- -- -- -- -- -- -- -- -- //
	// Exposed RPC methods -- -- -- -- -- -- -- -- -- -- //
var fail = fibrous( function(err, connObj)
	{
	logger.force(err.message);

	if(!manualDisconnection)
		disconnect();
	});

var error = fibrous( function(err, connObj)
	{
	logger.force(err.message);
	});

var warning = fibrous( function(message_, code, connObj)
	{
	logger.force(code, message_);
	});

var notify = fibrous( function(message_, code, connObj)
	{
	logger.force(message_);
	});

var message = fibrous( function(message_, connObj)
	{
	logger.force(message_);
	});

var stdout = fibrous( function(message_, connObj)
	{
	logger.stdout(message_);
	});

var question = fibrous( function(message_, choices, origin, answerCallBackId, connObj)
	{
	question_(message_, choices, origin, answerCallBackId);
	});

var questionTimedOut = fibrous( function(message_, origin, answerCallBackId, connObj)
	{
	if(callerOrigin.questionTimedOut)
		callerOrigin.questionTimedOut(message_, origin, answerCallBackId);

	if(origin == applicationManager.INSTALL_APPLICATION)
		logger.force(message_);
	});

var end = fibrous( function(message_, connObj)
	{
	if(!manualDisconnection)
		disconnect();
	});

var question_ = function(message_, choices, origin, answerCallBackId)
	{
	var prompt = "";															// The question and valid answers
	var answers = [];

	for(var i = 0; i < choices.length; i++)
		{
		prompt += (prompt != "" ? " / " : "") + choices[i].screen;
		answers.push(choices[i].long, choices[i].short);
		}

	if(origin == applicationManager.INSTALL_APPLICATION)
		installApplicationQuestion(message_, answers, prompt, answerCallBackId);
	}

var installApplicationQuestion = function(message_, answers, prompt, answerCallBackId)
	{
	read({ prompt: message_ + " (" + prompt + ")" }, function(error, result, isDefault)
		{
		if(answers.indexOf(result) == -1)										// Answer must be one of the choices
			installApplicationQuestion(message_, answers, prompt);
		else
			appManMessageConnection.callRpc(messaging.MESSAGE_ANSWER, [messageId, result, answerCallBackId]);
		});
	}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// COMMANDS // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
var help = fibrous( function(bVerbose, command)
	{
	var spmCommand;
	var spmCommands;
	var spmHelpFile = fs.sync.readFile(config.DOCS_PATH + config.SPM_HELP, {encoding: "utf8"}), spmParts, help = "";

	if(command == "")
		{
		spmParts = spmHelpFile.split(/@verbose/);

		help = spmParts[0];

		if(bVerbose)
			{
			spmCommands = spmParts[1].split(/%%.*/);

			for(var i = 0; i < spmCommands.length; i++)
				help += spmCommands[i].replace(/%.+?%/, "");
			}
		}
	else
		{
		spmCommand = spmHelpFile.match(new RegExp("%" + command + "%(.|\n|\r)+?%%"));
		if(spmCommand)
			help = spmCommand[0].replace(new RegExp("%" + command + "%"), "");
		help = help.replace(/%/g, "");
		}

	help = help.substring(3);
	logger.force(help);

	disconnect();
	});

var version = fibrous( function()
	{
	var versionFile = fs.sync.readFile(config.VERSION_FILE, {encoding: "utf8"});
	var spmParts = versionFile.split(":");
	var edge = spmParts[1].split(",");

	logger.force(spmParts[0] + ":", "v" + edge[0], edge[1]);
	logger.force(spmParts[2] + ":", "v" + spmParts[3]);
	logger.force(spmParts[4] + ":", "v" + spmParts[5]);
	});

var install = fibrous( function(applicationPackage, username, password, cwd, force, develop)
	{
	var result = appManConnection.sync.callRpc("installApplication", [applicationPackage, username, password, cwd, force, develop, sessionId], self);
	exitCode = (result == applicationManager.SUCCESS ? 0 : 1);
	});

var purge = fibrous( function(unique_name)
	{
	appManConnection.sync.callRpc("purgeApplication", [unique_name, sessionId], self);
	});

var remove = fibrous( function(unique_name)
	{
	appManConnection.sync.callRpc("removeApplication", [unique_name, sessionId], self);
	});

var start = fibrous( function(unique_name)
	{
	appManConnection.sync.callRpc("startApplication", [unique_name, sessionId], self);
	});

var stop = fibrous( function(unique_name)
	{
	appManConnection.sync.callRpc("stopApplication", [unique_name, sessionId], self);
	});

var restart = fibrous( function(unique_name)
	{
	appManConnection.sync.callRpc("restartApplication", [unique_name, sessionId], self);
	});

var source = fibrous( function(applicationPackage, username, password, cwd)
	{
	appManConnection.sync.callRpc("sourceCode", [applicationPackage, username, password, cwd], self);
	});

var list = fibrous( function(type, bVerbose)
	{
	var keys;
	var bLast;
	var injfil;
	var i, j, t;
	var manifest;
	var path = "";
	var continues;

	var x = {
			spacelet: [language.INSTALLED_HEADERS[config.SPACELET]],
			sandboxed: [language.INSTALLED_HEADERS[config.SANDBOXED]],
			sandboxed_debian: [language.INSTALLED_HEADERS[config.SANDBOXED_DEBIAN]],
			native_debian: [language.INSTALLED_HEADERS[config.NATIVE_DEBIAN]]
			};

	var dbApps = appManConnection.sync.callRpc("getApplications", [type], self);

	if(dbApps.length == 0)
		logger.force(language.NO_APPLICATIONS);
	else
		{
		for(i = 0; i < dbApps.length; i++)
			{
			t = dbApps[i].type;
				
			bLast = (i == dbApps.length - 1 || (i < dbApps.length - 1 && dbApps[i].type != dbApps[i + 1].type));

			x[t].push(p);

			x[t].push((bLast ? al : ml) + (bVerbose ? tee : left) + dbApps[i].unique_name + ", v" + dbApps[i].version);

			if(bVerbose)
				{
				if(t == config.SPACELET)
					path = config.SPACELETS_PATH;
				else if(t == config.SANDBOXED)
					path = config.SANDBOXED_PATH;
				else if(t == config.SANDBOXED_DEBIAN)
					path = config.SANDBOXED_DEBIAN_PATH;
				else if(t == config.NATIVE_DEBIAN)
					path = config.NATIVE_DEBIAN_PATH;

				manifest = utility.sync.loadJSON(path + dbApps[i].unique_directory + config.VOLUME_APPLICATION_PATH + config.MANIFEST, true);

				continues = (bLast ? ssmll : psmll);

				x[t].push(continues + language.M_NAME + manifest.name);

				x[t].push(continues + language.M_CATEGORY + utility.ucfirst(manifest.category));

				if(manifest.type == config.SPACELET)
					{
					x[t].push(continues + language.M_SHARED + (manifest.shared ? language.M_YES : language.M_NO));

					x[t].push((bLast ? ssmlt : psmlt) + language.M_INJECT);

					x[t].push((bLast ? sspsmll : pspsmll) + language.M_INJECT_ENABLED + (dbApps[i].inject_enabled ? language.M_YES : language.M_NO));

					x[t].push((bLast ? sspsmlt : pspsmlt) + language.M_ORIGINS);
					for(j = 0; j < manifest.inject_hostnames.length; j++)
						x[t].push((bLast ? ss : ps) + (j < manifest.origins.length - 1 ? pspsmll : pspsall) + manifest.origins[j]);

					x[t].push((bLast ? sspsmll : pspsmll) + language.M_INJECT_IDENTIFIER + manifest.inject_identifier);

					x[t].push((bLast ? sspsmlt : pspsmlt) + language.M_INJECT_HOSTNAMES);
					for(j = 0; j < manifest.inject_hostnames.length; j++)
						x[t].push((bLast ? ss : ps) + (j < manifest.inject_hostnames.length - 1 ? pspsmll : pspsall) + manifest.inject_hostnames[j]);

					x[t].push((bLast ? sspsalt : pspsalt) + language.M_INJECT_FILES);
					for(j = 0; j < manifest.inject_files.length; j++)
						{
						injfil = (manifest.inject_files[j].directory ? manifest.inject_files[j].directory + "/" : "") + manifest.inject_files[j].file + ", " + manifest.inject_files[j].type;
						x[t].push((bLast ? ss :  ps) + (j < manifest.inject_files.length - 1 ? psssmll : psssall) + injfil);
						}
					}

				if(manifest.start_command)
					x[t].push(continues + language.M_START_COMMAND + manifest.start_command);

				if(manifest.stop_command)
					x[t].push(continues + language.M_STOP_COMMAND + manifest.stop_command);

				if(manifest.docker_image)
					x[t].push(continues + language.M_DOCKER_IMAGE + (manifest.docker_image ? language.M_YES : language.M_NO));

				if(manifest.install_commands)
					{
					x[t].push((bLast ? ss : ps) + mlt + language.M_INSTALL_COMMANDS);
					for(j = 0; j < manifest.install_commands.length; j++)
						x[t].push((bLast ? ss : ps) + ps + (j < manifest.install_commands.length - 1 ? mll : all) + manifest.install_commands[j].file);
					}

				if(manifest.implements)
					x[t].push(continues + language.M_IMPLEMENTS + manifest.implements);

				if(manifest.short_description)
					x[t].push(continues + language.M_SHORT_DESCRIPTION + manifest.short_description);

				if(manifest.key_words)
					{
					x[t].push((bLast ? ss : ps) + mlt + language.M_KEY_WORDS);
					for(j = 0; j < manifest.key_words.length; j++)
						x[t].push((bLast ? ss : ps) + ps + (j < manifest.key_words.length - 1 ? mll : all) + manifest.key_words[j].file);
					}

				if(manifest.license)
					x[t].push(continues + language.M_LICENSE + manifest.license);

				if(manifest.repository)
					x[t].push(continues + language.M_REPOSITORY + manifest.repository);

				if(manifest.web_url)
					x[t].push(continues + language.M_WEB_URL + manifest.web_url);

				if(manifest.bugs)
					x[t].push(continues + language.M_BUGS + manifest.bugs);

				if(manifest.developer)
					x[t].push(continues + language.M_DEVELOPER + manifest.developer.name + (manifest.developer.email ? " <" + manifest.developer.email + ">" : "") + (manifest.developer.url ? ", " + manifest.developer.url : ""));

				if(manifest.contributors)
					{
					x[t].push((bLast ? ss : ps) + (bRS ? mlt : alt) + language.M_CONTRIBUTORS);
					for(j = 0; j < manifest.contributors.length; j++)
						x[t].push((bLast ? ss : ps) + (bRS ? ps : ss) + (j < manifest.contributors.length - 1 ? mll : all) + manifest.contributors[j].name + (manifest.contributors[j].email ? " <" + manifest.contributors[j].email + ">" : "") + (manifest.contributors[j].url ? ", " + manifest.contributors[j].url : ""));
					}

				if(manifest.creation_date)
					x[t].push(continues + language.M_CREATION_DATE + manifest.creation_date);

				if(manifest.publish_date)
					x[t].push(continues + language.M_PUBLISH_DATE + manifest.publish_date);

				if(manifest.install_datetime)
					x[t].push(continues + language.M_INSTALLATION_DATE + dbApps[i].install_datetime);

				if(manifest.images)
					{
					x[t].push((bLast ? ss : ps) + mlt + language.M_IMAGES);
					for(j = 0; j < manifest.images.length; j++)
						x[t].push((bLast ? ss : ps) + ps + (j < manifest.images.length - 1 ? mll : all) + (manifest.images[j].directory ? manifest.images[j].directory + "/" : "") + manifest.images[j].file + (manifest.images[j].title ? ", " + manifest.images[j].title : ""));
					}

				if(manifest.provides_services)
					{
					x[t].push((bLast ? ss : ps) + mlt + language.M_PROVIDES_SERVICES);
					for(j = 0; j < manifest.provides_services.length; j++)
						x[t].push((bLast ? ss : ps) + ps + (j < manifest.provides_services.length - 1 ? mll : all) + manifest.provides_services[j].service_name + ", " + manifest.provides_services[j].service_type);
					}

				if(manifest.requires_services)
					{
					x[t].push((bLast ? ss : ps) + mlt + language.M_REQUIRES_SERVICES);
					for(j = 0; j < manifest.requires_services.length; j++)
						x[t].push((bLast ? ss : ps) + ps + (j < manifest.requires_services.length - 1 ? mll : all) + manifest.requires_services[j].service_name);
					}

				// Is running
				x[t].push(continues + language.M_IS_RUNNING + (dbApps[i].isRunning ? language.M_YES : language.M_NO));

				// Is develop mode
				x[t].push((bLast ? ss : ps) + all + language.M_IS_DEVELOP + (dbApps[i].isDevelop? language.M_YES : language.M_NO));
				}
			}
		}

	keys = Object.keys(x);
	for(var k = 0; k < keys.length; k++)
		{
		if(x[keys[k]].length == 1)
			continue;

		for(i = 0; i < x[keys[k]].length; i++)
			{
			logger.force(x[keys[k]][i]);
			}

		if(k + 1 < keys.length && x[keys[k]].length > 1)
			logger.force("");
		}

	disconnect();
	});

var getServiceRuntimeStates = fibrous( function()
	{
	var keys;
	var type;
	var accepts;
	var services;
	var applications;
	var containerPort;
	var lastService;
	var isLastService;
	var lastApplication;
	var isLastApplication;
	var unique_names = [];
	var applicationCount = 0;
	var states = appManConnection.sync.callRpc("getServiceRuntimeStates", [sessionId], self);

	keys = Object.keys(states);
	for(var k = 0; k < keys.length; k++)
		{
		type = keys[k];
		unique_names = Object.keys(states[type]);

		if(unique_names.length > 0)
			logger.force(language.RUNNING_HEADERS[config.APP_TYPE_NUMBER[type]]);

		applications = states[type];
		applicationCount += unique_names.length;
		for(var n = 0; n < unique_names.length; n++)
			{
			isLastApplication = (n + 1 == unique_names.length ? true : false);
			lastApplication = (!isLastApplication ? p : " ");

			logger.force(p);
			logger.force((isLastApplication ? alt : mlt), unique_names[n]);

			services = applications[unique_names[n]].services;
			for(var s = 0; s < services.length; s++)
				{
				isLastService = (s + 1 == services.length ? true : false);
				lastService = (!isLastService ? p : " ");

				logger.force(lastApplication, (!isLastService ? mlt : alt), services[s].service_name);

				logger.force(lastApplication, lastService, mll, language.M_TYPE, services[s].service_type);

				containerPort = (!applications[unique_names[n]].isDevelop ? "> " + services[s].containerPort : "");
				accepts = (network.sync.isPortInUse(services[s].port) ? language.M_PORT_LISTEN : language.M_PORT_REFUSED);
				logger.force(lastApplication, lastService, mll, language.M_PORT, services[s].port, containerPort + accepts);

				containerPort = (!applications[unique_names[n]].isDevelop ? "> " + services[s].secureContainerPort : "");
				accepts = (network.sync.isPortInUse(services[s].securePort) ? language.M_PORT_LISTEN : language.M_PORT_REFUSED);
				logger.force(lastApplication, lastService, mll, language.M_SECURE_PORT, services[s].securePort, containerPort + accepts);

				logger.force(lastApplication, lastService, mll, language.M_IP, services[s].ip);

				logger.force(lastApplication, lastService, all, language.M_IS_REGISTERED, (services[s].isRegistered ? language.M_YES : language.M_NO));
				}
			}

		if(k + 1 < keys.length && unique_names.length > 0)
			logger.force("");
		}

	if(applicationCount == 0)
		logger.force(language.NO_RUNNING_APPLICATIONS);

	disconnect();
	});

var publish = fibrous( function(applicationPackage, username, password, githubUsername, githubPassword, cwd)
	{
	applicationManager.sync.publishPackage(applicationPackage, username, password, githubUsername, githubPassword, cwd);

	disconnect();
	});

var register = fibrous( function()
	{
	var settings;
	var result = false;

	try {
		edgeSpaceifyNet.sync.createEdgeId(true);

		/* ToDo: Enable this?
		var settings = database.sync.getEdgeSettings();

		var result = utility.sync.postRegister(settings.edge_id, settings.edge_name, settings.edge_password);
		*/

		if(result)
			throw(result);
		else
			logger.force(errorc.replace(language.I_SPM_REGISTER_SUCCESSFUL, {"~registration": config.SPACEIFY_REGISTRATION_FILE}));
		}
	catch(err)
		{
		var message = (err.message ? err.message : err).replace(/\.$/, "")
		logger.force(errorc.replace(language.E_SPM_REGISTER_FAILED, {"~message": message}));
		}
	finally
		{
		database.close();
		disconnect();
		}
	});

var systemStatus = fibrous( function()
	{
	var lines = "";
	var result = appManConnection.sync.callRpc("systemStatus", [], self);

	for(var i in result)
		lines += i + "=" + result[i] + "\n";

	console.log(lines);											// Clients expect to get the results through their stdin!!!
	});

}

var logger = new Logger();

fibrous.run( function()
	{
	//logger.setOptions({labels: logger.ERROR, levels: logger.ERROR});

	var spm = new SPM();
	spm.sync.start();
	}, function(err, data) { } );
