var request = require('request');
var cheerio = require('cheerio');

var crawl = function(url, callback) {
	var data = { games: [] };
	var games = [];

	request(url, function(error, response, html) {
		if(!error) {
			var $ = cheerio.load(html);
			var gameRows = $('.pncPlayerRow');

			gameRows.each(function() {
				var game = {
					player: $(this).find('.playertablePlayerName a').text(),
					time: $(this).find('.gameStatusDiv a').text() || null
				};
				$(this).text();
				games.push(game);
			});

			console.log('gametimes', games);
			data.games = games;

			if(callback)
			{
				callback(data);
			}
		} else {
			console.log('Error requesting URL, ', error);
		}
	});

}

exports.crawl = crawl;
