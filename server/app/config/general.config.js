/* APPLICATION CONFIGURATION */
module.exports.environment = "DEV"										//NameSpace for Application Environment


/* LOGS CONFIGURATION */
module.exports.logs = {
	folder: __dirname+"/../logs/"+module.exports.environment			//false or folder path
}


/* WEBSERVER CONFIGURATION */
module.exports.webserver = {
		listenport: 5000												//WebServer Port to use
}
