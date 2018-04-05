CREATE TABLE applications(unique_name TEXT NOT NULL PRIMARY KEY, docker_image_id TEXT, type TEXT, version TEXT, install_datetime TEXT, position INTEGER DEFAULT 0, develop INTEGER DEFAULT 0);
CREATE TABLE user(edge_id TEXT NOT NULL PRIMARY KEY, edge_name TEXT DEFAULT '', edge_password TEXT DEFAULT '', edge_salt TEXT DEFAULT '', edge_enable_remote INTEGER DEFAULT 0, edge_require_password INTEGER DEFAULT 1, admin_password TEXT DEFAULT '', admin_salt TEXT DEFAULT '', admin_login_count INTEGER DEFAULT 0, admin_last_login INTEGER DEFAULT 0);
INSERT INTO user VALUES('', '', '', '', 0, 1, '', '', 0, 0);
CREATE TABLE information(db_version INTEGER, release_name TEXT, release_version TEXT, distribution TEXT);
INSERT INTO information VALUES(10, 'Alpha Centauri', '0.9.0', 'ubuntu');
CREATE TABLE settings(locale TEXT DEFAULT 'en_US', log_in_session_ttl INTEGER DEFAULT 3600000);
INSERT INTO settings VALUES('en_US', 3600000);
