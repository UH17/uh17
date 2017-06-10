const LOGGER = require(__dirname+"/utils/logger.js")
const CONFIG = require(__dirname+"/../config/general.config.js")

var log = new LOGGER(CONFIG.logs)

module.exports = log