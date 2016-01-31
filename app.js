var express = require('express');
var app = express();
var crawler = require('./crawler.js');

app.use(express.static(__dirname));

app.get('/', function(req, res) {
	res.sendFile('index.html');
});

app.get('/crawl', function(req, res) {
	console.log('hit crawl endpoint');
	var url = process.argv[2];
	crawler.crawl(url, function(result) {
		console.log('send result', result);
		res.send(result);
	});

});

app.listen(3000, function() {
	console.log('Listening on port 3000');
});
