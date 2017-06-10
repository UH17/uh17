const fs = require("fs")
const saveFile = __dirname+'/../data/patterns.json'

var data = JSON.parse(fs.readFileSync(saveFile, 'utf8'))
var patterns = data.list
var currId = data.id

module.exports.get = () => {
	return patterns
}

module.exports.save = (id, conf) => {
	if (id == 0) {
		if (!(conf.pattern in patterns)) patterns[conf.pattern] = []
		conf.id = currId
		patterns[conf.pattern].push(conf)
		currId++
	} else {
		var found = false
		for (var k in patterns) {
			patterns[k].forEach((pat, i) => {
				if (found) return
				if (pat.id === id) {
					if (!(conf.pattern in patterns)) patterns[conf.pattern] = []
					patterns[conf.pattern].push(conf)
					patterns[k].splice(i, 1)
					found = true
				}
			})
		}
	}
	return save().list
}

module.exports.del = (id) => {
	var found = false
	for (var k in patterns) {
		patterns[k].forEach((pat, i) => {
			if (found) return
			if (pat.id === id) {
				patterns[k].splice(i, 1)
				found = true
			}
		})
	}
	return save().list
}


function save() {
	fs.writeFileSync(saveFile, JSON.stringify({id: currId, list: patterns}))
	return {id: currId, list: patterns}
}