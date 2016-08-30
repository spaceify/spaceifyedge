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

chmod 0764 spaceify.db > /dev/null 2>&1 || true											# spm must be able to write to the database

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

current_version=$(sqlite3 $dbs "SELECT db_version FROM information;" || false)
if [[ $? != 0 ]]; then																	# Settings contains version if information table doesn't exist yet
	current_version=$(sqlite3 $dbs "SELECT db_version FROM settings;" || false)
fi

admin_salt=$(< /var/lib/spaceify/data/db/admin_salt) > /dev/null 2>&1 || true
admin_password=$(< /var/lib/spaceify/data/db/admin_password) > /dev/null 2>&1 || true

rm /var/lib/spaceify/data/db/admin_salt > /dev/null 2>&1 || true
rm /var/lib/spaceify/data/db/admin_password > /dev/null 2>&1 || true

# ----------
# ----------
# ----------
# ----------
# ---------- Changes between database versions ---------- #

if [[ $current_version < 6 ]]; then

	sqlite3 $dbs "ALTER TABLE applications ADD COLUMN position INTEGER DEFAULT 0;"

fi

if (( $current_version <= 7 )); then

	IFS=";" read -a tables <<< $(< $dbc)

	# USER TABLE
		# Add edge_name, edge_salt, edge_enable_remote and edge_require_password columns
		# Rename admin_password_hash to admin_password
	values=$(sqlite3 $dbs "SELECT * FROM user;")										# Get existing values from the database

	values=$(node /var/lib/spaceify/code/installhelper.js "dbUserValuesForV6" "$values")

	createTable="${tables[ $((${#tables[@]}-6)) ]}"										# user - sixth line from the bottom

	columns=$(echo $createTable | awk -F "[()]" '{ print $2 }')							# Extract the new column names from the table
	columns=$(node /var/lib/spaceify/code/installhelper.js "dbGetColumns" "$columns")

	sqlite3 $dbs "DROP TABLE IF EXISTS user; $createTable;"								# Drop the old table and create the new table
	sqlite3 $dbs "INSERT INTO user $columns VALUES $values;"							# Fill the table with the existing values

	# SETTINGS TABLE
		# Rename language column to locale column, session_ttl column to log_in_session_ttl
		# Remove db_version, release_name and release_version columns
	values=$(sqlite3 $dbs "SELECT * FROM settings;")									# Get existing values from the database
	values=$(node /var/lib/spaceify/code/installhelper.js "dbSettingsValuesForV6" "$values")

	createTable="${tables[ $((${#tables[@]}-2)) ]}"										# settings - second line from the bottom

	columns=$(echo $createTable | awk -F "[()]" '{ print $2 }')							# Extract the new column names from the table
	columns=$(node /var/lib/spaceify/code/installhelper.js "dbGetColumns" "$columns")

	sqlite3 $dbs "DROP TABLE IF EXISTS settings; $createTable;"							# Drop the old table and create the new table
	sqlite3 $dbs "INSERT INTO settings $columns VALUES $values;"						# Fill the table with the existing values

	# INFORMATION TABLE
		# Create
	createTable="${tables[ $((${#tables[@]}-4)) ]}"										# information - Fourth line from the bottom

	insertValues="INSERT INTO information VALUES('$db_version', '$release_name', '$release_version')"	# Insert the latest values

	sqlite3 $dbs "DROP TABLE IF EXISTS information; $createTable; $insertValues"

fi

if [[ $current_version < 8 ]]; then

	sqlite3 $dbs "ALTER TABLE information ADD COLUMN distribution TEXT;"

fi

# ----------
# ----------
# ----------
# ----------
# ---------- Update values to the database ---------- #

sqlite3 $dbs "UPDATE user SET admin_password='$admin_password', admin_salt='$admin_salt';"

sqlite3 $dbs "UPDATE information SET release_name='$release_name', release_version='$release_version', db_version='$db_version';"
