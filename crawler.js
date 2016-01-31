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
				var onBench = $(this).find('.playerSlot').text().toLowerCase();
				var name = $(this).find('.playertablePlayerName a').text()
				var time = $(this).find('.gameStatusDiv a').text() || null;

				var game = {
					player: name,
					time: time,
					timestamp: getTimestampFromString(time);,
					onBench: (onBench === 'bench') ? true : false
				};
				if(game.player.length > 0) {
					//Make sure not empty spot, don't return in response;
					games.push(game);
				}
			});

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

function getTimestampFromString(str) {
	//Takes string formatted like '10:00 PM' and returns JS Date
	if(!str) {
		return null;
	} else {
		var newDate = new Date();
		var colon = str.indexOf(':');
		var hrs = str.slice(0, colon);
		var mins = str.slice(colon+1, colon+3);
		var ampm = str.slice(-2);
		if(ampm === 'PM') {
			hrs = parseInt(hrs) + 12;
		}
		newDate.setHours(hrs, mins, 0, 0);
		newDate = new Date(newDate);
		return newDate.getTime();
	}
}

exports.crawl = crawl;
