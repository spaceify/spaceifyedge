#!/bin/bash
# Database creation and maintenance
# Spaceify Oy 7.7.2015

# ----------
# ----------
# ----------
# ----------
# ---------- Database file ---------- #

mkdir /var/lib/spaceify/data/db/ > /dev/null 2>&1 || true								# create directory for the database
cd /var/lib/spaceify/data/db

dbs="/var/lib/spaceify/data/db/spaceify.db"
dbc="/var/lib/spaceify/data/db/create.sql"

if [ ! -e $dbs ]; then																	# create a new database

	touch $dbs
	sqlite3 $dbs < $dbc

fi

chmod 0764 $dbs > /dev/null 2>&1 || true												# spm must be able to write to the database

# ----------
# ----------
# ----------
# ----------
# ---------- Latest version 10 colums ---------- #

applicationsS="unique_name, docker_image_id, type, version, install_datetime, position, develop"
applicationsC="unique_name TEXT NOT NULL PRIMARY KEY, docker_image_id TEXT, type TEXT, version TEXT, install_datetime TEXT, position INTEGER DEFAULT 0, develop INTEGER DEFAULT 0"

provided_servicesS="unique_name, service_name, service_type"
provided_servicesC="unique_name TEXT, service_name TEXT, service_type TEXT"

userS="edge_id, edge_name, edge_password, edge_salt, edge_enable_remote, edge_require_password, admin_password, admin_salt, admin_login_count, admin_last_login"
userC="edge_id TEXT NOT NULL PRIMARY KEY, edge_name TEXT DEFAULT '', edge_password TEXT DEFAULT '', edge_salt TEXT DEFAULT '', edge_enable_remote INTEGER DEFAULT 0, edge_require_password INTEGER DEFAULT 1, admin_password TEXT DEFAULT '', admin_salt TEXT DEFAULT '', admin_login_count INTEGER DEFAULT 0, admin_last_login INTEGER DEFAULT 0"

informationS="db_version, release_name, release_version, distribution"
informationC="db_version INTEGER, release_name TEXT, release_version TEXT, distribution TEXT"

settingsS="locale, log_in_session_ttl"
settingsC="locale TEXT DEFAULT \"en_US\", log_in_session_ttl INTEGER DEFAULT 3600000"

# ----------
# ----------
# ----------
# ----------
# ---------- Get values ---------- #

versions=$(< /var/lib/spaceify/versions)
edge=$(echo $versions | awk -F : '{print $2}')

release_version=$(echo $edge | awk -F , '{print $1}')
release_name=$(echo $edge | awk -F , '{print $2}')
db_version=$(echo $versions | awk -F : '{print $6}')

admin_salt=$(< /var/lib/spaceify/data/db/admin_salt) > /dev/null 2>&1 || true
admin_password=$(< /var/lib/spaceify/data/db/admin_password) > /dev/null 2>&1 || true

rm /var/lib/spaceify/data/db/admin_salt > /dev/null 2>&1 || true
rm /var/lib/spaceify/data/db/admin_password > /dev/null 2>&1 || true

# ----------
# ----------
# ----------
# ----------
# ---------- Handle changes between database versions ---------- #

# APPLICATIONS TABLE
	# - Add position column
$(sqlite3 $dbs "SELECT position FROM applications;" 1>/dev/null 2>/dev/null)
if (( $? != 0 )); then

	sqlite3 $dbs "ALTER TABLE applications ADD COLUMN position INTEGER DEFAULT 0;"

fi

	# - Add develop column
$(sqlite3 $dbs "SELECT develop FROM applications;" 1>/dev/null 2>/dev/null)
if (( $? != 0 )); then

	sqlite3 $dbs "ALTER TABLE applications ADD COLUMN develop INTEGER DEFAULT 0;"

fi

# USER TABLE
	# - Add edge_name, edge_salt, edge_enable_remote and edge_require_password columns
	# - Rename admin_password_hash column to admin_password
$(sqlite3 $dbs "SELECT edge_name FROM user;" 1>/dev/null 2>/dev/null)
if (( $? != 0 )); then

	sqlite3 $dbs "ALTER TABLE user ADD COLUMN edge_name TEXT;"
	sqlite3 $dbs "ALTER TABLE user ADD COLUMN edge_salt TEXT;"
	sqlite3 $dbs "ALTER TABLE user ADD COLUMN edge_enable_remote INTEGER DEFAULT 0;"
	sqlite3 $dbs "ALTER TABLE user ADD COLUMN edge_require_password INTEGER DEFAULT 1;"
	sqlite3 $dbs "ALTER TABLE user ADD COLUMN admin_password TEXT;"

	sql="BEGIN TRANSACTION;"
	sql="${sql}CREATE TEMPORARY TABLE user_temp(${userC});"
	sql="${sql}INSERT INTO user_temp SELECT ${userS} FROM user;"
	sql="${sql}UPDATE user_temp SET admin_password=(SELECT admin_password_hash FROM user);"
	sql="${sql}DROP TABLE user;"
	sql="${sql}CREATE TABLE user(${userC});"
	sql="${sql}INSERT INTO user SELECT ${userS} FROM user_temp;"
	sql="${sql}DROP TABLE user_temp;"
	sql="${sql}COMMIT;"

	sqlite3 $dbs "$sql"

fi

# SETTINGS TABLE
	# - Rename language column to locale and session_ttl to log_in_session_ttl
	# - Remove db_version, release_name and release_version columns
$(sqlite3 $dbs "SELECT session_ttl FROM settings;" 1>/dev/null 2>/dev/null)
if (( $? == 0 )); then

	sqlite3 $dbs "ALTER TABLE settings ADD COLUMN locale TEXT DEFAULT 'en_US';"
	sqlite3 $dbs "ALTER TABLE settings ADD COLUMN log_in_session_ttl INTEGER DEFAULT 3600000;"

	sql="BEGIN TRANSACTION;"
	sql="${sql}CREATE TEMPORARY TABLE settings_temp(${settingsC});"
	sql="${sql}INSERT INTO settings_temp SELECT ${settingsS} FROM settings;"
	sql="${sql}UPDATE settings_temp SET locale=(SELECT language FROM settings), log_in_session_ttl=(SELECT session_ttl FROM settings);"
	sql="${sql}DROP TABLE settings;"
	sql="${sql}CREATE TABLE settings(${settingsC});"
	sql="${sql}INSERT INTO settings SELECT ${settingsS} FROM settings_temp;"
	sql="${sql}DROP TABLE settings_temp;"
	sql="${sql}COMMIT;"

	sqlite3 $dbs "$sql"

fi

# INFORMATION TABLE
	# - Create table
$(sqlite3 $dbs "SELECT db_version FROM information;" 1>/dev/null 2>/dev/null)
if (( $? != 0 )); then

	sqlite3 $dbs "DROP TABLE IF EXISTS information;"
	# IFS=";" read -a tables <<< $(< $dbc)												# information - FOURTH line from the bottom
	# sqlite3 $dbs "${tables[ $((${#tables[@]}-4)) ]};"
	sqlite3 $dbs "CREATE TABLE information($informationC);"
	sqlite3 $dbs "INSERT INTO information ($information) VALUES('$db_version', '$release_name', '$release_version', '');"

fi

	# - Add distribution column
$(sqlite3 $dbs "SELECT distribution FROM information;" 1>/dev/null 2>/dev/null)
if (( $? != 0 )); then

	sqlite3 $dbs "ALTER TABLE information ADD COLUMN distribution TEXT;"

fi

# INJECTION TABLES
	# - Drop deprecated tables
sqlite3 $dbs "DROP TABLE IF EXISTS inject_files;"
sqlite3 $dbs "DROP TABLE IF EXISTS inject_hostnames;"

# SERVICE TABLE
	# - Drop deprecated table
sqlite3 $dbs "DROP TABLE IF EXISTS provided_services;"

# APPLICATIONS TABLE
	# - Drop inject_identifier and inject_enabled columns
$(sqlite3 $dbs "SELECT COUNT(inject_identifier) FROM applications;" 1>/dev/null 2>/dev/null)
if (( $? == 0 )); then

	sql="BEGIN TRANSACTION;"
	sql="${sql}CREATE TEMPORARY TABLE applications_temp(${applicationsC});"
	sql="${sql}INSERT INTO applications_temp SELECT ${applicationsS} FROM applications;"
	sql="${sql}DROP TABLE applications;"
	sql="${sql}CREATE TABLE applications(${applicationsC});"
	sql="${sql}INSERT INTO applications SELECT ${applicationsS} FROM applications_temp;"
	sql="${sql}DROP TABLE applications_temp;"
	sql="${sql}COMMIT;"

	sqlite3 $dbs "$sql"

fi

# SETTINGS TABLE
	# - Drop splash_ttl column
$(sqlite3 $dbs "SELECT splash_ttl FROM settings;" 1>/dev/null 2>/dev/null)
if (( $? == 0 )); then

	sql="BEGIN TRANSACTION;"
	sql="${sql}CREATE TEMPORARY TABLE settings_temp(${settingsC});"
	sql="${sql}INSERT INTO settings_temp SELECT ${settingsS} FROM settings;"
	sql="${sql}DROP TABLE settings;"
	sql="${sql}CREATE TABLE settings(${settingsC});"
	sql="${sql}INSERT INTO settings SELECT ${settingsS} FROM settings_temp;"
	sql="${sql}DROP TABLE settings_temp;"
	sql="${sql}COMMIT;"

	sqlite3 $dbs "$sql"

fi

# ----------
# ----------
# ----------
# ----------
# ---------- Update values to the database ---------- #

sqlite3 $dbs "UPDATE user SET admin_password='$admin_password', admin_salt='$admin_salt';"

sqlite3 $dbs "UPDATE information SET db_version='$db_version', release_name='$release_name', release_version='$release_version';"
