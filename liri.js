var fs = require('fs'); //to read files
var keys = require('./keys'); //to read keys.js
var Twitter = require('twitter'); //to read twitter api
var Spotify = require('node-spotify-api'); //to read spotify api
var request = require('request'); //to read omdb api

var action = process.argv[2];
var input = process.argv.slice(3).join(' ');

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

var getSong = function(error, data) {
	if (error){
		console.log(error);
		throw err;
	}

	console.log('Song: ' + data.tracks.items[0].name);
	console.log('Artist: ' + data.tracks.items[0].artists[0].name);
	console.log('Album: ' + data.tracks.items[0].album.name);
	console.log('Preview link: ' + data.tracks.items[0].preview_url);
};

var getMovie = function(error, data) {
	if (error){
		console.log(error);
		throw err;
	}

	movie = JSON.parse(data.body);
	
	console.log('Title: ' + movie.Title);
	console.log('Release Year: ' + movie.Year);
	console.log('IMDB Rating: ' + movie.imdbRating);
	
	//Rotten Tomatoes rating not always listed. Skip if unavailable.
	if(movie.Ratings[2] !== undefined){
		console.log('Rotten Tomatoes Rating: ' + movie.Ratings[2].Value);
	}

	console.log('Country: ' + movie.Country);
	console.log('Language: ' + movie.Language);
	console.log('Plot: ' + movie.Plot);
	console.log('Actors: ' + movie.Actors);
}

//?
var doRandom = function(error, data) {
	if (error){
		console.log(error);
		throw err;
	}

	var readArray = data.split(',');
	action = readArray[0].trim();
	input = readArray[1].trim();

	commands[action]();
}

var commands = {
	"my-tweets": function() {
		var twitter = new Twitter({
			consumer_key: keys[0].consumer_key,
  			consumer_secret: keys[0].consumer_secret,
  			access_token_key: keys[0].access_token_key,
  			access_token_secret: keys[0].access_token_secret
  		});

		twitter.get('statuses/home_timeline', {count: 20}, getTweets);
	},

	'spotify-this-song': function() {
		var spotify = new Spotify({
			id: keys[1].id,
			secret: keys[1].secret
		});

		// if no input, search for The Sign.
		if(!input){
			input = 'The Sign, Ace of Base';
		}

		spotify.search({type: 'track', query: input, limit: 1}, getSong)
	},
	'movie-this': function() {
		//if no input, search for Mr. Nobody
		if(!input){
			input = 'Mr. Nobody';
		}

		request('http://www.omdbapi.com/?t= ' + input + '&apikey=40e9cece', getMovie);
	},
	'do-what-it-says': function() {
		fs.readFile('random.txt', 'utf8', doRandom)
	}
};

if(!action) {
	console.log('Enter a command.');
} else {
	commands[action]();
}