var io
var patternConf = require(__dirname+"/../patternConf")
var knocker = require(__dirname+"/../gpio/knocker")

module.exports.listen = (server) => {
	io = require('socket.io').listen(server)


	knocker.on((pattern) => {
			io.sockets.emit("livepattern", pattern)
	})

	io.on("connection", (sock) => {

		sock.emit("patterns", patternConf.get())

		sock.on("savepattern", (data) => {
			io.sockets.emit("patterns", patternConf.save(data.id, data.pattern))
			
		})

		sock.on("delpattern", (id) => {
			io.sockets.emit("patterns", patternConf.del(id))
		})


	})
}
