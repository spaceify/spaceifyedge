"use strict";

/**
 * Database, 17.1.2014 Spaceify Oy
 *
 * The connection to the database is opened automatically and opening the connection is not necessary.
 * However, callers must close the database .
 *
 * @class Database
 */

var fs = require("fs");
var sqlite3 = require("sqlite3");
var fibrous = require("./fibrous");
var language = require("./language");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyUnique = require("./spaceifyunique");
//var SpaceifyLogger = require("./spaceifylogger");
var SpaceifyUtility = require("./spaceifyutility");

function Database()
{
var self = this;

var utility = new SpaceifyUtility();
var config = SpaceifyConfig.getConfig();
//var logger = new SpaceifyLogger("Database");

var db = null;

var transactions = 0;	// Global transaction. Sequentially called methods in classes must not start/commit/rollback their own transactions.

var unique = new SpaceifyUnique();

var openDB = function()
	{
	try {
		if(!db)
			db = new sqlite3.Database(config.SPACEIFY_DATABASE_FILE, sqlite3.OPEN_READWRITE);
		}
	catch(err)
		{
		throw err;	//language.E_DATABASE_OPEN.pre("Database::open", err);
		}
	}

self.close = function()
	{
	if(db)
		db.close();
	db = null;
	}

var isOpen = function()
	{
	return (db ? true : false);
	}

self.begin = fibrous( function(str)
	{
	try {
		if(!isOpen())
			openDB();

		if(transactions == 0)
			db.sync.run("BEGIN TRANSACTION");
		transactions++;
		}
	catch(err)
		{
		throw err;	//language.E_DATABASE_BEGIN.pre("Database::begin", err);
		}
	});

self.commit = fibrous( function(str)
	{
	try {
		transactions--;
		if(transactions == 0)
			db.sync.run("COMMIT");
		}
	catch(err)
		{
		throw err;	//language.E_DATABASE_COMMIT.pre("Database::commit", err);
		}
	});

self.rollback = fibrous( function(str)
	{
	try {
		transactions--;
		if(transactions == 0)
			db.sync.run("ROLLBACK");
		}
	catch(err)
		{
		throw err;	//language.E_DATABASE_ROLLBACK.pre("Database::rollback", err);
		}
	});

	// APPLICATIONS -- -- -- -- -- -- -- - - -- -- //
self.getApplication = fibrous( function(unique_name)
	{
	try {
		if(!isOpen())
			openDB();

		return db.sync.get("SELECT * FROM applications WHERE unique_name=?", [unique_name]);
		}
	catch(err)
		{
		throw err;	//language.E_DATABASE_GET_APPLICATION.pre("Database::getApplication", err);
		}
	});

self.getApplications = fibrous( function(type)
	{
	var order;
	var where;

	try {
		if(!isOpen())
			openDB();

		order = " ORDER BY type, position ASC";

		where = "";
		for(var i = 0; i < type.length; i++)
			where += (where == "" ? " WHERE " : " OR ") + "type=?";

		return db.sync.all("SELECT * FROM applications" + where + order, type);
		}
	catch(err)
		{
		throw err;	//language.E_DATABASE_GET_APPLICATIONS.pre("Database::getApplications", err);
		}
	});

self.insertApplication = fibrous( function(manifest, docker_image_id, develop)
	{
	var max;
	var params;

	try {
		if(!isOpen())
			openDB();

		max = db.sync.get("SELECT MAX(position) AS pos FROM applications WHERE type=?", [manifest.getType()]);

		params = [manifest.getUniqueName(), docker_image_id, manifest.getType(), manifest.getVersion(), utility.getLocalDateTime(), max.pos + 1, develop];

		db.sync.run("INSERT INTO applications (unique_name, docker_image_id, type, version, install_datetime, position, develop) VALUES (?, ?, ?, ?, ?, ?, ?)", params);
		}
	catch(err)
		{
		throw err;	//language.E_DATABASE_INSERT_APPLICATION.pre("Database::insertApplication", err);
		}
	});

self.updateApplication = fibrous( function(manifest, docker_image_id)
	{
	var params;

	try {
		if(!isOpen())
			openDB();

		self.sync.begin();

		params = [docker_image_id, manifest.getVersion(), utility.getLocalDateTime(), manifest.getUniqueName()];

		db.sync.run("UPDATE applications SET docker_image_id=?, version=?, install_datetime=? WHERE unique_name=?", params);

		self.sync.commit();
		}
	catch(err)
		{
		self.sync.rollback();

		throw err;	//language.E_DATABASE_UPDATE_APPLICATION.pre("Database::updateApplication", err);
		}
	});

self.removeApplication = fibrous( function(unique_name)
	{
	var results;

	try {
		if(!isOpen())
			openDB();

		results = db.sync.get("SELECT type, position FROM applications WHERE unique_name=?", [unique_name]);

		db.sync.run("DELETE FROM applications WHERE unique_name=?", unique_name);
		db.sync.run("UPDATE applications SET position=position-1 WHERE position>? AND type=?", [results.position, results.type]);
		}
	catch(err)
		{
		throw err;	//language.E_DATABASE_REMOVE_APPLICATION.pre("Database::removeApplication", err);
		}
	});

	// SPACEIFY CORE AND EDGE SETTINGS, INFROMATION -- -- -- -- -- -- -- - - -- -- //
self.getCoreSettings = fibrous( function()
	{
	try {
		if(!isOpen())
			openDB();

		return db.sync.get("SELECT * FROM settings");
		}
	catch(err)
		{
		throw err;	//language.E_DATABASE_GET_CORE_SETTINGS.pre("Database::getCoreSettings", err);
		}
	});

self.saveCoreSettings = fibrous( function(settings)
	{
	var value;
	var values = [];
	var columns = "";

	try {
		if(!isOpen())
			openDB();

		for(value in settings)
			{
			columns += (columns != "" ? ", " : "") + value + "=?";
			values.push(settings[value]);
			}

		db.sync.run("UPDATE settings SET " + columns, values);
		}
	catch(err)
		{
		throw err;	//language.E_DATABASE_SAVE_CORE_SETTINGS.pre("Database::saveCoreSettings", err);
		}
	});

self.getEdgeSettings = fibrous( function()
	{
	try {
		if(!isOpen())
			openDB();

		return db.sync.get("SELECT * FROM user");
		}
	catch(err)
		{
		throw err;	//language.E_DATABASE_GET_EDGE_SETTINGS.pre("Database::getEdgeSettings", err);
		}
	});

self.saveEdgeSettings = fibrous( function(settings)
	{
	var value;
	var values = [];
	var columns = "";

	try {
		if(!isOpen())
			openDB();

		for(value in settings)
			{
			columns += (columns != "" ? ", " : "") + value + "=?";
			values.push(settings[value]);
			}

		db.sync.run("UPDATE user SET " + columns, values);
		}
	catch(err)
		{
		throw err;	//language.E_DATABASE_SAVE_EDGE_SETTINGS.pre("Database::saveEdgeSettings", err);
		}
	});

self.getInformation = fibrous( function()
	{
	try {
		if(!isOpen())
			openDB();

		return db.sync.get("SELECT * FROM information");
		}
	catch(err)
		{
		throw err;	//language.E_DATABASE_GET_INFORMATION.pre("Database::getInformation", err);
		}
	});

self.adminLoggedIn = fibrous( function(params)
	{
	try {
		if(!isOpen())
			openDB();

		db.sync.run("UPDATE user SET admin_login_count = admin_login_count + 1, admin_last_login=?", params);
		}
	catch(err)
		{
		throw err;	//language.E_DATABASE_ADMIN_LOGGED_IN.pre("Database::adminLoggedIn", err);
		}
	});


self.test = fibrous( function()
	{
	try {
		if(!isOpen())
			openDB();

		}
	catch(err)
		{
		throw err;	//language.E_DATABASE_TEST.pre("Database::removeApplication", err);
		}
	});

}

module.exports = Database;
