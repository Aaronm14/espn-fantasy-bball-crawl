var request = require('request');
var cheerio = require('cheerio');

var crawl = function(url, callback) {
	var gameTimes = [];

	request(url, function(error, response, html) {
		if(!error) {
			var $ = cheerio.load(html);
			var games = $('.pncPlayerRow');

			games.each(function(i, gameRow) {
				var game = {
					player: $(this).find('.playertablePlayerName a').text(),
					time: $(this).find('.gameStatusDiv a').text() || null
				};
				$(this).text();
				gameTimes.push(game);
			});

			console.log('gametimes', gameTimes);

			if(callback)
			{
				callback(gameTimes);
			}
		} else {
			console.log('Error requesting URL, ', error);
		}
	});

}

exports.crawl = crawl;
