"use strict";

var SpeConfig =
{
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
	}
};

Object.freeze(SpeConfig);

if (typeof exports !== "undefined")
	module.exports = SpeConfig;
