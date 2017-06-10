var express 				= require("express")
var app 				= express()
var server 				= require("http").Server(app)
var socket 				= require(__dirname+"/http/Socket.js").listen(server)

var config 				= require(__dirname+"/../config/general.config.js")
var log 				= require(__dirname+"/log.js")
var ifttt				= require(__dirname+"/ifttt")

app.use('/',	 express.static(__dirname+'/../web'))


server.listen(config.webserver.listenport, () => {
  log.info('WebServer listening on port '+config.webserver.listenport+'!')
})
