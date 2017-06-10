
var request = require('request')
var patternConf = require(__dirname+"/patternConf")
var knocker = require(__dirname+"/gpio/knocker")

knocker.on((pattern) => {
    var pattern = pattern.join("")
    var patterns = patternConf.get()
    if (pattern in patterns) {
        patterns[pattern].forEach((pat) => { 
            console.log("Triggering pattern "+pat.name)

            request.post(
                pat.url,
                { json: { "value1": pattern }}
            );

            request.post(
                'https://maker.ifttt.com/trigger/tweetPattern/with/key/sVSgnphFlCHm1G95Mr1CR',
                { json: {
                "value1": pattern,
                "value2": pat.name
                }}
            ).on('error', console.error)
        })
    }
})