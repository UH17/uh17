const GPIO = require("rpi-gpio")

var subs = []

var cleanInput = {}
var knocks = []
var knockTimeout
const SUBSCRIBE_CHANNELS = [35]
const WAIT_TIMEOUT = 2500
const MIN_LONG_KNOCK = 1000

GPIO.setup(35, GPIO.DIR_IN, GPIO.EDGE_BOTH, console.error) 

GPIO.on("change", (channel, value) => {
	if (cleanInput[channel] === undefined || cleanInput[channel] !== value) {
		cleanInput[channel] = value
		if (value && SUBSCRIBE_CHANNELS.indexOf(channel) >= 0) return handleKnock()
	}
})


function handleKnock() {
	clearTimeout(knockTimeout)
	knockTimeout = setTimeout(processResult, WAIT_TIMEOUT)
	knocks.push(Date.now())
}



function processResult() {
	if (knocks.length == 1) {
		knocks = []
		return console.log("Ignoring single knock!")
	}
	var result = []
	var max = 0
	var timings = []
	knocks.forEach((time, i) => {
 		if (i === 0) return false
 		var timing = (time - knocks[(i-1)])
 		if (timing > max) max = timing
 		timings.push(timing)
	})
	timings.forEach((duration) => {
		if (duration < 40) return
		result.push((sanitize(duration, 0, MIN_LONG_KNOCK, 0, 100) < 50) ? "." : "-")
	})
	knocks = []
	console.log("KNOCK WAS: "+result.join(""), ...timings)
	subs.forEach((cb) => {
		process.nextTick(() => {
			cb(result)
		})
	})
}

function sanitize(x, inMin, inMax, outMin, outMax) {
	return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
}


module.exports.on = function(cb) {
	subs.push(cb)
}
