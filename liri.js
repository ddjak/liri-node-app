var fs = require("fs")
var keys = require("./keys");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");

var myTweets = process.argv[2];
var consumerKey = keys.consumer_key;
var consumerSecret = keys.consumer_secret;
var accessTokenKey = keys.access_token_key;
var accessTokenSecret =	keys.access_token_secret;
console.log("-----------------------");

//Logs 20 most recent tweets
var getTweets = function(error, tweets) {
	if (error){
		console.log(error);
		throw err;
	} 
			
	for (var i = 0; i < tweets.length; i++) {
		console.log('Tweet #' + (i + 1) + ':');
		console.log('"' + tweets[i].text + '"');
		console.log('Created: ' + tweets[i].created_at);
		console.log('-----------------------------------------------');
	}
};