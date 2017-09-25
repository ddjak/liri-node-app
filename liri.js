var fs = require('fs'); //to read files
var keys = require('./keys'); //to read keys.js
var Twitter = require('twitter'); //to read twitter api
var Spotify = require('node-spotify-api'); //to read spotify api
var request = require('request'); //to read omdb api

var action = process.argv[2];

var getTweets = function(error, tweets) {
	if (error){
		console.log(error);
		throw err;
	} 
			
	for (var i = 0; i < tweets.length; i++) {
		console.log((i + 1) + ")");
		console.log('"' + tweets[i].text + '"');
		console.log('Posted on: ' + tweets[i].created_at);
		console.log('-----------------------------------------------');
	}
};

var commands = {
	"my-tweets": function() {
		var twitter = new Twitter({
			consumer_key: keys[0].consumer_key,
  			consumer_secret: keys[0].consumer_secret,
  			access_token_key: keys[0].access_token_key,
  			access_token_secret: keys[0].access_token_secret
  		});

		twitter.get('statuses/home_timeline', {count: 20}, getTweets);
	}
};

//still want to add spotify and omdb

if(!action) {
	console.log('Enter a command.');
} else {
	commands[action]();
}