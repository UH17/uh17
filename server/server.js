var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var saveFile = '/data/patterns.json';

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var data = new Map(JSON.parse(fs.readFileSync(__dirname + saveFile, 'utf8')));
console.log(data.values());

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
	
	if (newPattern.pattern !== '' && newPattern.name!== '' && newPattern.url !== '') {
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
