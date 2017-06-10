var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var saveFile = '/data/patterns.json';
var request = require('request');

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var data = new Map(JSON.parse(fs.readFileSync(__dirname + saveFile, 'utf8')));

app.get("/", function(req, res) {
    res.render('index', { patterns: Array.from(data.values()) });
});

app.post("/", function(req, res) {
    var newPattern = {};
    newPattern.pattern = req.body.pattern || '';
    newPattern.name = req.body.name || '';
    newPattern.url = req.body.url || '';
    oldPattern = req.body.oldPattern;

    action = req.body.action;

    if (action === 'Delete') {
	data.delete(oldPattern);
    }
    else if (action === 'Save') {
	if (oldPattern !== newPattern.pattern) {
	    data.delete(oldPattern);
	}
	
	if (newPattern.pattern !== '' && newPattern.name !== '' && newPattern.url !== '') {
	    data.set(newPattern.pattern, newPattern);
	}
    }
    
    res.render('index', { patterns: Array.from(data.values()) });
    fs.writeFile(__dirname + saveFile, JSON.stringify([...data]));
});

app.get("/input", function(req, res) {
    var name = req.query.name || '';
    var pattern = req.query.pattern || '';
    var url = req.query.url || '';
    
    res.render('input', { name: name, pattern: pattern, url: url });
});

var port = 8080;
app.listen(port, function() {
    console.log("Listening on " + port);
});

var patternListener = express();
var patternPort = 1337;

patternListener.use(bodyParser.json());
patternListener.use(bodyParser.urlencoded({ extended: true }));

patternListener.get("/", function(req, res) {
    var pattern = req.query.pattern;
    if (data.has(pattern)) {
	var url = data.get(pattern).url;
	request.post(
	    url,
	    { json: { "value1": pattern }}
	);

	// tweet pattern
	var twitterEvent = 'https://maker.ifttt.com/trigger/tweetPattern/with/key/sVSgnphFlCHm1G95Mr1CR';
	request.post(
	    twitterEvent,
	    { json: {
		"value1": pattern,
		"value2": data.get(pattern).name
	    }}
	);
    }
    res.send(req.body);
});

patternListener.listen(patternPort, function() {
    console.log('Listening for patterns on port ' + patternPort);
});



