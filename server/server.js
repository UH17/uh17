var express = require('express');
var app = express();
var fs = require('fs');

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
var patterns = JSON.parse(fs.readFileSync(__dirname + '/data/patterns.json', 'utf8'));

app.get("/", function(req, res) {
    res.render('index', { patterns: patterns.patterns});
});

app.get("/input", function(req, res) {
    res.render('input');
});

var port = 8080;
app.listen(port, function() {
    console.log("Listening on " + port);
});
