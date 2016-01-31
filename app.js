var express = require('express');
var app = express();
var crawler = require('./crawler.js');

app.get('/', function(req, res) {
	res.send('Hello');
});

app.get('/crawl', function(req, res) {
	var url = process.argv[2];
	crawler.crawl(url, function(result) {
		console.log(result);
		res.send(result);
	});

});

app.listen(3000, function() {
	console.log('Listening on port 3000');
});
