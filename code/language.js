"use strict";

/**
 * Spaceify language file, 2013 Spaceify Oy
 *
 *  Locale: en_US
 */

var SpaceifyError = require("./spaceifyerror");

var language =
	{
	/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
	** ERRORS * ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
	** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */
	// General
	"E_GENERAL_ERROR": new SpaceifyError({"code": "", "message": "~err"}),
	"E_WRONG_NUMBER_OF_ARGUMENTS": new SpaceifyError({"code": 1, "message": "Wrong number of arguments: ~number expected."}),
	"E_ADMIN_NOT_LOGGED_IN": new SpaceifyError({"code": 2, "message": "Administrator must be logged in to perform this operation."}),
	"E_APPLICATION_IS_NOT_INSTALLED": new SpaceifyError({"code": 3, "message": "Application or spacelet ~name is not installed or installation is broken."}),

	// SpaceifyUtility
	"E_LOAD_REMOTE_FILE_FAILED_TO_INITIATE_HTTP_GET": new SpaceifyError({"code": 1000, "message": "Failed to initiate HTTP(S) GET."}),
	"E_LOAD_REMOTE_FILE_FAILED_TO_LOAD_REMOTE_FILE": new SpaceifyError({"code": 1001, "message": "Failed to load remote file: ~file, status code: ~code."}),
	"E_POST_FORM_FAILED_TO_INITIATE_HTTP_POST": new SpaceifyError({"code": 1002, "message": "Failed to initiate HTTP(S) POST."}),
	"E_POST_FORM_FAILED_TO_POST_FORM": new SpaceifyError({"code": 1003, "message": "Failed to POST a form: ~url, status code: ~code."}),
	"E_LOAD_REMOTE_FILE_TO_LOCAL_FILE_FAILED": new SpaceifyError({"code": 1018, "message": "Failed to load remote file."}),
	"E_DELETE_DIRECTORY_FAILED": new SpaceifyError({"code": 1019, "message": "Failed to delete directory."}),
	"E_COPY_DIRECTORY_FAILED": new SpaceifyError({"code": 1020, "message": "Failed copy directory."}),
	"E_MOVE_DIRECTORY_FAILED": new SpaceifyError({"code": 1021, "message": "Failed to move dfirectory."}),
	"E_DELETE_FILE_FAILED": new SpaceifyError({"code": 1022, "message": "Failed to delete file."}),
	"E_COPY_FILE_FAILED": new SpaceifyError({"code": 1023, "message": "Failed to copy file."}),
	"E_MOVE_FILE_FAILED": new SpaceifyError({"code": 1024, "message": "Failed to move file."}),
	"E_ZIP_DIRECTORY_FAILED": new SpaceifyError({"code": 1025, "message": "Failed to compress files."}),
	"E_LOAD_JSON_FAILED": new SpaceifyError({"code": 1026, "message": "Failed to load JSON file."}),
	"E_SAVE_JSON_FAILED": new SpaceifyError({"code": 1027, "message": "Failed to save JSON file."}),
	"E_PARSE_JSON_FAILED": new SpaceifyError({"code": 3003, "message": "Failed to parse JSON."}),

	// Core
	"E_GET_SERVICE_UNKNOWN_SERVICE": new SpaceifyError({"code": 2000, "message": "Get service failed. Service ~name not found."}),
	"E_GET_SERVICE_DENIED": new SpaceifyError({"code": 2001, "message": "Get service failed. Access denied from callers remote address."}),

	"E_GET_MANIFEST_FAILED": new SpaceifyError({"code": 2002, "message": "Get manifest failed. Application ~name not found."}),
	"E_GET_EXTENDED_MANIFEST_FAILED": new SpaceifyError({"code": 2003, "message": "Get manifest failed. Unable to get extended fields."}),

	"E_REGISTER_SERVICE_ACCESS_DENIED": new SpaceifyError({"code": 2004, "message": "Register service failed. Access denied from remote address ~address."}),
	"E_REGISTER_SERVICE_SERVICE_NAME_UNDEFINED": new SpaceifyError({"code": 2005, "message": "Failed to register service. Service name ~name is undefined (not introduced in manifest)."}),
	"E_REGISTER_SERVICE_PORTS_ARGUMENT": new SpaceifyError({"code": 2008, "message": "Register service failed. Ports argument is malformed. Expected JSON {unique_name: unique_name, port: <port>, securePort: <port>}."}),
	"E_REGISTER_SERVICE_UNKNOWN_UNIQUE_NAME": new SpaceifyError({"code": 2009, "message": "Register service failed. Application or spacelet with the unique name ~unique_name not found."}),
	"E_UNREGISTER_SERVICE_ACCESS_DENIED": new SpaceifyError({"code": 2006, "message": "Unregistering service failed. Access denied from remote address ~address."}),
	"E_UNREGISTER_SERVICE_SERVICE_NAME_UNDEFINED": new SpaceifyError({"code": 2007, "message": "Failed to unregister service. Service name ~name is undefined (not introduced in manifest)."}),
	"E_UNREGISTER_SERVICE_UNKNOWN_UNIQUE_NAME": new SpaceifyError({"code": 2010, "message": "Unregister service failed. Application or spacelet with the unique name ~unique_name not found."}),

	"E_INVALID_SESSION": new SpaceifyError({"code": 2018, "message": "Invalid session identifier or session IP and caller IP do not match."}),

	"E_UNKNOWN_MAC": new SpaceifyError({"code": 2020, "message": "Callers MAC address is unknown."}),

	"E_START_SPACELET_FAILED": new SpaceifyError({"code": 2023, "message": "Failed to start the spacelet."}),

	"E_START_SPACELET_APPLICATIONS_CAN_NOT_START_SPACELETS": new SpaceifyError({"code": 2026, "message": "Applications can not start spacelets."}),
	"E_START_SPACELET_NOT_INSTALLED": new SpaceifyError({"code": 2027, "message": "Spacelet ~unique_name is not installed."}),
	"E_START_SPACELET_IS_NOT_SPACELET": new SpaceifyError({"code": 2042, "message": "~unique_name is spacelet."}),

	"E_GET_APPLICATION_URL_FAILED": new SpaceifyError({"code": 2028, "message": "Failed to get application URLs."}),

	"E_START_SPACELET_FORBIDDEN_ORIGIN": new SpaceifyError({"code": 2029, "message": "Same Origin Policy rules prevent starting the spacelet."}),

	"E_GET_CORE_SETTINGS_FAILED": new SpaceifyError({"code": 2030, "message": "Failed to get core settings."}),
	"E_SAVE_CORE_SETTINGS_FAILED": new SpaceifyError({"code": 2031, "message": "Failed to save core settings."}),

	"E_GET_EDGE_SETTINGS_FAILED": new SpaceifyError({"code": 2032, "message": "Failed to get edge settings."}),
	"E_SAVE_EDGE_SETTINGS_FAILED": new SpaceifyError({"code": 2033, "message": "Failed to save edge settings."}),

	"E_REGISTER_EDGE_FAILED": new SpaceifyError({"code": 2034, "message": "Edge registration failed: ~result ~httpStatus."}),

	"E_GET_SERVICE_RUNTIME_STATES_FAILED": new SpaceifyError({"code": 2035, "message": "Failed to get service runtime states."}),

	"E_SET_APPLICATION_RUNNING_UNKNOWN_UNIQUE_NAME": new SpaceifyError({"code": 2036, "message": "Set application running failed. Native Debian, sandboxed Debian or develop mode application with the unique name ~unique_name not found."}),
	"E_SET_APPLICATION_RUNNING_ACCESS_DENIED": new SpaceifyError({"code": 2037, "message": "Set application running failed. Access denied from callers remote address."}),
	"E_SET_APPLICATION_RUNNING_WRONG_TYPE": new SpaceifyError({"code": 2038, "message": "Set application running failed. Only native Debian, sandboxed Debian and develop mode applications can be set their running state."}),

	"E_PACKAGE_DEVELOP_MODE": new SpaceifyError({"code": 2039, "message": "~type is installed in develop mode and can not be started or stopped with spm. Start it manually."}),

	"E_PACKAGE_ALREADY_STOPPED": new SpaceifyError({"code": 2040, "message": "~type is already stopped."}),

	"E_PACKAGE_ALREADY_RUNNING": new SpaceifyError({"code": 2041, "message": "~type is already running."}),

	// DockerContainer
	"E_START_CONTAINER_CREATE_CONTAINER_FAILED": new SpaceifyError({"code": 4000, "message": "Creating the docker container failed."}),
	"E_START_CONTAINER_INIT_CONTAINER_FAILED": new SpaceifyError({"code": 4001, "message": "Initializing the docker container failed."}),
	"E_START_CONTAINER_START_CONTAINER_FAILED": new SpaceifyError({"code": 4002, "message": "Starting the docker container failed."}),
	"E_START_CONTAINER_INSPECT_FAILED": new SpaceifyError({"code": 4003, "message": "Inspecting the docker container failed."}),
	"E_STOP_CONTAINER_FAILED": new SpaceifyError({"code": 4004, "message": "Stopping a docker container failed: ~err."}),

	// DockerHelper
	"E_INIT_ATTACH_CONTAINER_OUTPUT_FAILED": new SpaceifyError({"code": 6000, "message": "output stream - ~err"}),
	"E_INIT_ATTACH_CONTAINER_INPUT_FAILED": new SpaceifyError({"code": 6001, "message": "input stream - ~err"}),

	// ApplicationManager
	"E_INSTALL_APPLICATION_FAILED": new SpaceifyError({"code": 7000, "message": "Failed to install application."}),
	"E_FAILED_TO_RESOLVE_PACKAGE": new SpaceifyError({"code": 7001, "message": "~package does not resolve to any known package."}),
	"E_LOCKED": new SpaceifyError({"code": 7007, "message": "Another process has locked the application manager."}),
	"E_GET_APPLICATIONS_FAILED_TO_GET_APPLICATIONS": new SpaceifyError({"code": 7009, "message": "Failed to list applications."}),
	"E_CREATE_CLIENT_CERTIFICATE_FAILED_TO_CREATE": new SpaceifyError({"code": 7010, "message": "Failed to create certificate for the application."}),
	"E_GIT_FAILED_TO_GET_GITHUB_DATA": new SpaceifyError({"code": 7011, "message": "Failed to get data from GitHub."}),
	"E_AUTHENTICATION_FAILED": new SpaceifyError({"code": 7013, "message": "Authentication failed."}),
	"E_ONLY_SANDBOXED_OR_SPACELET": new SpaceifyError({"code": 7014, "message": "Only sandboxed applications and spacelets can be installed in develop mode."}),

	// Manager
	"E_START_INIT_FAILED": new SpaceifyError({"code": 8000, "message": "~type failed to initialize itself. ~err"}),
	"E_INSTALL_READ_MANIFEST_FAILED": new SpaceifyError({"code": 8003, "message": "Unable to read/parse manifest of ~type ~unique_name."}),
	"E_RUN_FAILED_TO_RUN": new SpaceifyError({"code": 8004, "message": "Failed to run ~type ~unique_name."}),

	// WebServer
	"E_MOVED_PERMANENTLY": new SpaceifyError({"code": 301, "message": '<!DOCTYPE html><html><head><title>Redirection</title></head><body><h1>301 Moved Permanently</h1>The requested document is located in <a href="~location">here</a>.<h3>~serverName at ~hostname Port ~port</h3></body></html>'}),
	"E_MOVED_FOUND": new SpaceifyError({"code": 302, "message": '<!DOCTYPE html><html><head><title>Redirection</title></head><body><h1>302 Found</h1>The requested document is located in <a href="~location">here</a>.<h3>~serverName at ~hostname port ~port</h3></body></html>'}),

	"E_LISTEN_FATAL_ERROR": new SpaceifyError({"code": 10000, "message": "Fatal error in WebServer ~hostname:~port - ~err"}),

	"E_INVALID_POST_DATA": new SpaceifyError({"code": 10001, "message": "The submitted data is invalid."}),
	"E_NO_SESSION_MANAGER": new SpaceifyError({"code": 10002, "message": "No session manager."}),

	// SPM
	"E_SPM_UNKNOWN_COMMAND": new SpaceifyError({"code": 12001, "message": "Unknown command ~command."}),
	"E_SPM_CONNECTION_FAILED": new SpaceifyError({"code": 12002, "message": "Failed to connect to the Application manager."}),

	"E_SPM_ARGUMENTS_ONE": new SpaceifyError({"code": 12004, "message": "The ~command command must have one arguments: package."}),
	"E_SPM_ARGUMENTS_TWO": new SpaceifyError({"code": 12005, "message": "The ~command command must have one or two arguments: [authenticate] package."}),

	"E_SPM_REGISTER_FAILED": "Registering this edge node failed: ~message.",
	"I_SPM_REGISTER_SUCCESSFUL": "The registration for this edge node is now created. The registration file is located here: ~registration.",

	// DataBase
	"E_DATABASE_OPEN": new SpaceifyError({"code": 12000, "message": "Failed to open database connection."}),
	"E_DATABASE_BEGIN": new SpaceifyError({"code": 12001, "message": "Failed to begin transaction."}),
	"E_DATABASE_COMMIT": new SpaceifyError({"code": 12002, "message": "Failed to commit transaction."}),
	"E_DATABASE_ROLLBACK": new SpaceifyError({"code": 12003, "message": "Failed to rollback transaction."}),
	"E_DATABASE_GET_APPLICATION": new SpaceifyError({"code": 12004, "message": "Failed to get application."}),
	"E_DATABASE_GET_APPLICATIONS": new SpaceifyError({"code": 12005, "message": "Failed to get applications."}),
	"E_DATABASE_INSERT_APPLICATION": new SpaceifyError({"code": 12006, "message": "Failed to insert application."}),
	"E_DATABASE_UPDATE_APPLICATION": new SpaceifyError({"code": 12007, "message": "Failed to update application."}),
	"E_DATABASE_REMOVE_APPLICATION": new SpaceifyError({"code": 12008, "message": "Failed to remove application."}),
	"E_DATABASE_GET_CORE_SETTINGS": new SpaceifyError({"code": 12009, "message": "Failed to get core settings."}),
	"E_DATABASE_SAVE_CORE_SETTINGS": new SpaceifyError({"code": 12010, "message": "Failed to update core settings."}),
	"E_DATABASE_GET_EDGE_SETTINGS": new SpaceifyError({"code": 12011, "message": "Failed to get edge settings."}),
	"E_DATABASE_SAVE_EDGE_SETTINGS": new SpaceifyError({"code": 12012, "message": "Failed to update edge settings."}),
	"E_DATABASE_GET_INFORMATION": new SpaceifyError({"code": 12013, "message": "Failed to get information."}),
	"E_DATABASE_ADMIN_LOGGED_IN": new SpaceifyError({"code": 12014, "message": "Failed to set admin log in."}),
	"E_DATABASE_TEST": new SpaceifyError({"code": 12020, "message": "Failed to execute database test."}),

	// ValidatePackage
	"E_VALIDATE_PACKAGE_NO_APPLICATION_DIRECTORY": new SpaceifyError({"code": 13000, "message": "Package does not have application directory."}),
	"E_VALIDATE_PACKAGE_NO_MANIFEST_FILE": new SpaceifyError({"code": 13001, "message": "Package does not have manifest file."}),

	"E_VALIDATE_DIRECTORIES_IMAGE_FILE": new SpaceifyError({"code": 13003, "message": "Image file ~file is defined in the manifest but is not found in the applications image directory ~directory."}),
	"E_VALIDATE_DIRECTORIES_IMAGE_TYPES": new SpaceifyError({"code": 13004, "message": "Supported image formats are jpg, gif and png."}),
	"E_VALIDATE_DIRECTORIES_DOCKER_IMAGE": new SpaceifyError({"code": 13005, "message": "Custom Docker image creation is defined but file Dockerfile is not found from applications directory."}),

	"E_VALIDATE_MANIFEST_MANIFEST_TYPE": new SpaceifyError({"code": 13006, "message": "Manifest must have type field and accepted values are spacelet, sandboxed, sandboxed_debian or native_debian."}),

	"E_VALIDATE_DIRECTORIES_DEB_NOT_IN_DIRECTORY": new SpaceifyError({"code": 13008, "message": "Debian package ~deb was not found from packages directory."}),
	"E_VALIDATE_DIRECTORIES_PUBLIC_KEY_NOT_IN_DIRECTORY": new SpaceifyError({"code": 13009, "message": "Public key ~key was not found from packages directory."}),
	"E_VALIDATE_DIRECTORIES_SERVICE_FILE_MISSING": new SpaceifyError({"code": 13010, "message": "The service file ~service of this package was not found from the application directory."}),

	// REST
	"E_REST_UNKNOWN_OPERATION": new SpaceifyError({"code": 15001, "message": "Unknown operation requested."}),
	"E_REST_OPERATION_DENIED": new SpaceifyError({"code": 15002, "message": "Operation over non-secure connection denied."}),
	"E_REST_UNDEFINED_PARAMETERS": new SpaceifyError({"code": 15003, "message": "Required parameter(s) undefined."}),

	// SecurityManager
	"E_CHECK_SERVICE_PERMISSIONS_UNREGISTERED": new SpaceifyError({"code": 16000, "message": "Service permission check failed. Service ~name is not registered."}),
	"E_CHECK_SERVICE_PERMISSIONS_FORBIDDEN": new SpaceifyError({"code": 16001, "message": "Service permission check failed. Service ~name is forbidden to caller."}),
	"E_CHECK_SERVICE_PERMISSIONS_REQUIRES_SERVICES_NOT_DEFINED": new SpaceifyError({"code": 16003, "message": "Service permission check failed. Application or spacelet ~unique_name does not have required services."}),
	"E_ADMIN_LOG_IN_FAILED": new SpaceifyError({"code": 16005, "message": "Admin log in failed."}),
	"E_IS_LOCAL_SESSION_NON_EDGE_CALLER": new SpaceifyError({"code": 16006, "message": "Calls outside of the Spaceify edge node are forbidden."}),
	"E_REMOTE_LOG_IN_FAILED": new SpaceifyError({"code": 16007, "message": "Remote log in failed."}),

	// Iptables
	"E_IPTABLES_SET_FAILED": new SpaceifyError({"code": 17000, "message": "Failed to set iptables rules to ~type ~unique_name."}),

	/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
	** TEXTS ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
	** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */
	// COMMON

	// CONNECTIONS / ACCESS
	"NO_CONNECTION_TO_SERVER": "No connection to server.",
	"ACCESS_DENIED": "Access denied.",
	"PROTOCOLS_DENIED": "Access denied. Unsupported protocol(s).",
	"REMOTE_DENIED": "Access denied for remote clients.",
	"APPMAN_LOCKED": "Another process has locked the application manager.",

	// WebServer
	"WEBSERVER_CONNECTING": "WebServer::connect() ~protocol://~hostname:~port",
	"WEBSERVER_CLOSING": "WebServer::close() ~protocol://~hostname:~port",

	// WebSocketConnection, WebSocketRpcConnection, WebSocketRpcServer, WebSocketServer
	"WEBSOCKET_OPENING": "~class::open() ~protocol://~hostname:~port/~subprotocol",
	"WEBSOCKET_CONNECTING": "~class::connect() to ~protocol://~hostname:~port/~subprotocol",
	"WEBSOCKET_CLOSING": "~class::close() server ~protocol://~hostname:~port/~subprotocol",
	"WEBSOCKET_CLOSING_WEB": "~class::close() web server ~protocol://~hostname:~port",
	"WEBSOCKET_CLOSE_CONNECTION": "~class::closeConnection() ~origin ~protocol://~hostname:~port/~subprotocol, id=~id",
	"WEBSOCKET_CONNECTION_REQUEST": "~class::connectionRequest() from ~origin ~protocol://~address:~port",
	"WEBSOCKET_SEND_MESSAGE": "~class::sendMessage() ~protocol://~hostname:~port/~subprotocol, id=~id, message=~message",
	"WEBSOCKET_SEND_BINARY": "~class::sendBinary() ~protocol://~hostname:~port/~subprotocol, id=~id, length=~length",
	"WEBSOCKET_NOTIFY_ALL": "~class::notifyAll() ~protocol://~hostname:~port/~subprotocol",
	"WEBSOCKET_ON_MESSAGE": "~class::onMessage() ~protocol://~hostname:~port/~subprotocol, id=~id, message=~message",

	// DockerHelper
	"EXECUTE_COMMAND": "Trying to execute command:\n~command\n",
	"EXECUTE_COMMAND_RECEIVED": "Received the end code '~code' from stdout.",

	// DockerImage
	"STOP_CONTAINER": "Stopping temporary container: ~container.",
	"REMOVE_CONTAINER": "Removing temporary container: ~container.",

	// ApplicationManager
	"RESOLVING_ORIGIN": "Resolving package origin.",
	"CHECKING_FROM": " : ~where - ~state",
	"PACKAGE_FOUND": "Package ~package found from ~where",
	"TRYING_TO_PUBLISH": "Trying to publish ~where",
	"APPLICATION_DIRECTORY": "application directory",
	"LOCAL_DIRECTORY": "local directory",
	"WORKING_DIRECTORY": "current working directory",
	"LOCAL_ARCHIVE": "local Zip archive",
	"WORKING_DIRECTORY_ARCHIVE": "Zip archive in the current working directory",
	"GIT_REPOSITORY": "the GitHub repository",
	"REMOTE_ARCHIVE": "remote Zip archive",
	"SPACEIFY_REGISTRY": "the Spaceify registry",
	"DOWNLOADING_GITUHB": "(~pos/~count) Downloading ~what (~bytes bytes)",

	"PACKAGE_POSTING": "Please wait, posting the package to the Spaceify registry.",
	"PACKAGE_POST_ERROR": "Failed to publish the package.",
	"PACKAGE_POST_OK": "Success. The package is now published.",
	"PACKAGE_REMOVED": "~type removed.",
	"PACKAGE_PURGED": "Package purged.",
	"PACKAGE_VALIDATING": "Validating package.",
	"PACKAGE_STOPPING": "Stopping ~type ~name.",
	"PACKAGE_STOPPING_EXISTING": "Stopping already installed ~type ~name.",
	"PACKAGE_STOPPED": "~type stopped.",
	"PACKAGE_REMOVING": "Removing ~type ~name.",
	"PACKAGE_PURGING": "Purging ~type ~name.",
	"PACKAGE_STARTING": "Starting ~type ~name.",
	"PACKAGE_DEVELOP": "The ~name ~type is installed in develop mode and is not started. Start it manually.",
	"PACKAGE_STARTED": "~type started.",
	"PACKAGE_START_FAILED": "Failed to start the ~type.",
	"PACKAGE_RESTARTED": "~type restarted.",
	"PACKAGE_ALREADY_STOPPED": "~type ~name is already stopped.",
	"PACKAGE_ALREADY_RUNNING": "~type ~name is already running.",
	"PACKAGE_REMOVE_FROM_DATABASE": " - Database entries.",
	"PACKAGE_REMOVING_DOCKER": " - Docker image and container.",
	"PACKAGE_DELETE_FILES": " - Files.",
	"PACKAGE_DELETE_REPOSITORY": " - Repository entries.",
	"PACKAGE_PURGE_DEBIAN_PACKAGES": " - Purging Debian packages.",
	"PACKAGE_ASK_REQUIRED": "The ~type ~name requires the following service(s):",
	"PACKAGE_ASK_INSTALL_QUESTION": "Do you want to install the ~type?",
	"PACKAGE_ASK_INSTALL_Y_N": [{"screen": "Yes", "long": "yes", "short": "y"}, {"screen": "No", "long": "no", "short": "n"}],

	"INSTALL_APPLICATION": "Installing ~type ~name.",
	"INSTALL_APPLICATION_FILES": " - Copying files to volume.",
	"INSTALL_GENERATE_CERTIFICATE": " - Generating Spaceify CA signed certificate.",
	"INSTALL_CREATE_DOCKER_IMAGE": " - Creating custom Docker image ~image.",
	"INSTALL_CREATE_DOCKER": " - Creating Docker image from the default ~image image.",
	"INSTALL_UPDATE_DATABASE": " - Writing database entries.",
	"INSTALL_APPLICATION_OK": "~type ~name@~version is now installed~mode.",
	"INSTALL_APPLICATION_DEVELOP": " in develop mode",
	"INSTALL_APPLICATION_ABORTED": "Installation aborted.",
	"INSTALL_APPLICATION_TIMED_OUT": "Installation timed out.",
	"INSTALL_VERSION_LATEST": "latest",

	"INSTALL_SUGGESTED": "Required service '~required_service_name' is not registered to this edge node. Attempting to install the suggested package '~suggested_unique_name, version: ~suggested_version'.",
	"INSTALL_SUGGESTED_DIFFERENT_PACKAGES": "Required service '~required_service_name' is already registered by ~existing_type '~existing_unique_name, version: ~existing_version'. The suggested application '~suggested_unique_name, version: ~suggested_version' will not be installed. If the already installed ~existing_type is not suitable, remove it and install the suggested application manually.",
	"INSTALL_SUGGESTED_SAME_PACKAGES": "Application '~suggested_unique_name, version ~suggested_version' is required for service '~required_service_name'. Version ~existing_version is already installed and application is not reinstalled or updated.",

	"INSTALL_APT_REPOSITORIES": " - Adding Debian package repositories.",
	"INSTALL_APT_REPOSITORIES_SOURCE": "Source: ~source",
	"INSTALL_APT_REPOSITORIES_KEY": "GnuPG key: ~key",
	"APT_REPOSITORIES_UPDATE": " - Updating Debian package lists.",
	"INSTALL_APT_PACKAGES": " - Installing Debian packages from remote repositories.",
	"INSTALL_DEB_PACKAGES": " - Installing local Debian packages.",

	"GET_SOURCES_OK": "OK. Packages content is in directory ~directory.",

	"EDGE_ALREADY_REGISTERED": "The registration file was found containing edge id ~edge_id. Previous registration is valid.",

	"CORE_SETTINGS_SAVED": "Core settings saved",
	"EDGE_SETTINGS_SAVED": "Edge settings saved",

	// SPM
	"AUTHENTICATION": "Enter user authentication for ~auth.",
	"USERNAME": "Username: ",
	"PASSWORD": "Password: ",

	"NO_APPLICATIONS": "No installed applications or spacelets.",
	"NO_RUNNING_APPLICATIONS": "No running applications or spacelets.",
	"INSTALLED_HEADERS": { "spacelet": "Installed spacelets.", "sandboxed": "Installed sandboxed applications.", "sandboxed_debian": "Installed sandboxed Debian applications.", "native_debian": "Installed native Debian applications." },
	"RUNNING_HEADERS": { "spacelet": "Running spacelets.", "sandboxed": "Running sandboxed applications.", "sandboxed_debian": "Running sandboxed Debian applications.", "native_debian": "Running native Debian applications." },

	"M_NAME": " Name: ",
	"M_START_COMMAND": " Start command: ",
	"M_STOP_COMMAND": " Stop command: ",
	"M_DOCKER_IMAGE": " Docker image: ",
	"M_INSTALL_COMMANDS": " Install commands: ",
	"M_IMPLEMENTS": " Implements: ",
	"M_SHORT_DESCRIPTION": " Short Description: ",
	"M_KEY_WORDS": " Key words: ",
	"M_LICENSE": " License: ",
	"M_IMAGES": " Images ",
	"M_REPOSITORY": " Repository: ",
	"M_WEB_URL": " Web URL: ",
	"M_BUGS": " Bugs: ",
	"M_CATEGORY": " Category: ",
	"M_SHARED": " Shared: ",
	"M_YES": "Yes",
	"M_NO": "No",
	"M_ORIGINS": " Origins ",
	"M_DEVELOPER": " Developer: ",
	"M_CONTRIBUTORS": " Contributors",
	"M_CREATION_DATE": " Creation date: ",
	"M_PUBLISH_DATE": " Publish date: ",
	"M_INSTALLATION_DATE": " Installation date: ",
	"M_PROVIDES_SERVICES": " Provides services",
	"M_REQUIRES_SERVICES": " Requires services",
	"M_IS_RUNNING": " Is running: ",
	"M_IS_REGISTERED": " Is registered: ",
	"M_IS_DEVELOP": " Is in develop mode: ",
	"M_TYPE": " Type: ",
	"M_PORT": " Port: ",
	"M_SECURE_PORT": " Secure port: ",
	"M_IP": " IP: ",
	"M_PORT_LISTEN": " [LISTEN]",
	"M_PORT_REFUSED": " [REFUSED]",
	"M_BROKEN_INSTALLATION": " - BROKEN INSTALLATION!",

	"M_FOUND": "FOUND",
	"M_NOT_FOUND": "NOT FOUND",

	"APP_DISPLAY_NAMES": {"spacelet": "spacelet", "sandboxed": "sandboxed application", "sandboxed_debian": "sandboxed Debian application", "native_debian": "native Debian application"},
	"APP_UPPER_CASE_DISPLAY_NAMES": {"spacelet": "Spacelet", "sandboxed": "Sandboxed application", "sandboxed_debian": "Sandboxed Debian application", "native_debian": "Native Debian application"}
	};

if(typeof exports !== "undefined")
	module.exports = language;
