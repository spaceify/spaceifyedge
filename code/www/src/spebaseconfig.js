"use strict";

/**
 * Config, 8.2.2017 Spaceify Oy
 *
 * This configuration is used with the 'spaceify connect'.
 *
 * Supported console output types:
 *   log, dir, info, error and warn
 *
 * The configuration logic is based on 'enable output' and operates with boolean values:
 *   false = output is disabled
 *    true = output is enabled
 *
 * The individual console output types can be overridden with the 'all' configuration.
 * The override takes three values:
 *   false = all the output types are disabled
 *    true = all the output types are enabled
 *    null = the override is not applied to the output types
 *
 * If the configuration for a class is not found, the default (defaultConfig) configuration
 * is used as a fallback. The default configuration operates identically to the individual
 * class configurations.
 *
 * There is a global (globalConfigOverride) override configuration. The global oveverride is applied
 * to all of the corresponding output types of all the individual class configurations.
 * The override takes three values:
 *   false = the output type of all the individual classes are disabled
 *    true = the output type of all the individual classes are enabled
 *    null = the override is not applied to the output type of the class
 *
 * NOTICE: the globalConfigOverride and defaultConfig configurations are mandatory variables in the config.js file!
 *
 * Order of precedence of the configurations
 *   Global configuration takes precedencence of class configurations
 * Order of precedence of the console output types
 *   'all' in a configuration (global or class) takes precedence the output types
 *
 * e.g.
 *      MyClass is unaltered
 *      globalConfigOverride = { log: null, dir: null, info: null, error: null, warn: null, all: null };
 *      MyClass = { log: true, dir: true, info: true, error: true, warn: true, all: null };
 *   => MyClass = { log: true, dir: true, info: true, error: true, warn: true, all: null };
 *
 *      MyClass 'all' overrides its output types
 *      globalConfigOverride = { log: null,  dir: null,  info: null,  error: null,  warn: null, all: null };
 *      MyClass = { log: true,  dir: true,  info: true,  error: true,  warn: true,  all: false };
 *   => MyClass = { log: false, dir: false, info: false, error: false, warn: false, all: false };
 *
 *      Global error is set to false and overrides MyClass error with false
 *      globalConfigOverride = { log: null, dir: null, info: null, error: false, warn: null, all: null };
 *      MyClass = { log: true, dir: true, info: true, error: true,  warn: true, all: null };
 *   => MyClass = { log: true, dir: true, info: true, error: false, warn: true, all: null };
 *
 *      Global 'all' is set to false and all the output types of MyClass are overridden with false
 *      globalConfigOverride = { log: null,  dir: null,  info: null,  error: null,  warn: null, all: false };
 *      MyClass = { log: true,  dir: true,  info: true,  error: true,  warn: true, all: null };
 *   => MyClass = { log: false, dir: false, info: false, error: false, warn: false, all: null };
 *
 * @class Config
 */

var SpeBaseConfig =
{
WEBRTC_CONFIG: {"iceServers":[{url:"stun:kandela.tv"},{url :"turn:kandela.tv", username:"webrtcuser", credential:"jeejeejee"}]},

connection:
	{
	MAINURL: "http://spaceify.net/games/"
	},

connectionGuard:
	{
	GUARDING_INTERVAL: 2000,
	MAXIMUM_UNANSWERED_CALLBACKS: 20
	},

reconnector:
	{
	INITIAL_DELAY: 500,
	DELAY_INCREMENT: 1000,
	MAXIMUM_DELAY: 32000
	},

spaceifyPiper:
	{
	DEFAULT_GROUP: "testgroup",
	HTTP_ADDRESS:  {host: "localhost", port: 80},
	SERVER_ADDRESS: {host: "spaceify.net", port: 1979},
	},

logger:
	{
	// Global configuration overrides (overrides the individual class configurations)

	loggerConfigOverride:
		{
		all: true,
		myoverride: 123,
		mydefault2: 3
		},

	// MANDATORY CONFIGURATION - Default configuration (always used as base config)

	defaultLoggerConfig:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true,
		all: null,
		mydefault1: 1,
		mydefault2: 2
		},

	// Class configurations (overrides defaultConfig)
	ApplicationManager:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	AppManService:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	BinaryRpcCommunicator:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Core:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Database:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	DHCPDLog:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	DockerContainer:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	DockerHelper:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	DockerImage:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	RegisterEdge:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	HttpService:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Iptables:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Main:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Manager:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Manifest:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Messaging:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	PubSub:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	RpcCommunicator:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SecurityModel:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Service:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyApplication:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyApplicationManager:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyConfig:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyCore:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyError:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyMessages:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyNet:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyNetwork:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyService:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyUtility:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Spacelet:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SPM:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	ValidateApplication:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebOperation:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebRtcClient:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebRtcConnection:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebServer:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebSocketConnection:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebSocketRpcConnection:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebSocketRpcServer:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebSocketServer:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Connection:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		}
	},

testValue: "TestValueFromBaseConfig"
};

//Object.freeze(SpeBaseConfig);

if (typeof exports !== "undefined")
	module.exports = SpeBaseConfig;
