var clr = require(__dirname+"/colors")
var fs = require("fs")

class Logger {
	constructor(cfg) {
		this.config = cfg
		if (!fs.existsSync(cfg.folder)) fs.mkdirSync(cfg.folder)
	}

	_log(color, type, msg) {
		if (msg instanceof Error) {
			this._write(color+type+clr.Reset + " " + this._getTime() + " Trace:")
			return this._write(msg)
		}
		return this._write(color+type+clr.Reset + " " + this._getTime() + " " + msg)
	}


	info(str) {
		this._log(clr.Blue, "INFO", str)
	}

	error(str) {
		this._log(clr.Red, "ERROR", str)
	}

	warning(str) {
		this._log(clr.Orange, "WARN ", str)
	}

	success(str) {
		this._log(clr.Green, "INFO "  , str)
	}

	_write(str) {
		console.log(str)
		fs.appendFile(this.config.folder+"/"+this._getTime().match(/^([0-9]{4}-[0-9]{2}-[0-9]{2})/)[0] + ".log", str, (err) => {
			if (err) console.log(err)
		})
	}

	_getTime() {
		return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
	}
}

module.exports = Logger
