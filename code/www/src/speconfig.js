"use strict";

var SpeConfig =
{
SERVER_ADDRESS: {host: "localhost", port: 1979},
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
	// Overrides everything (including the individual class configurations)
	
	loggerConfigOverride:
		{
		all: true
		},

	// Class configurations (overrides defaultLoggerConfig)

		// x
	
	// Default logger config
	
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
		}
	},	

// a test value for the unit tests

testValue: "TestValueFromSpeConfig"
};

Object.freeze(SpeConfig);

if (typeof exports !== "undefined")
	module.exports = SpeConfig;
