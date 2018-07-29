require("dotenv").config();
var keys = require("./key.js");
var fs = require("fs");
//require packages
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request'); 
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var input = process.argv[2];

console.log(input);


if(input == 'my-tweets')
{
    var params = {screen_name: 'Lalias4'};
    // This will show your last 20 tweets and when they were created at in your terminal/bash window.
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
          console.log(tweets[0].text, tweets[0].created_at);
        }})
}
else if(input == 'spotify-this-song')
{
//     `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window
     
//      * Artist(s)
     
//      * The song's name
     
//      * A preview link of the song from Spotify
     
//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.
    var song = process.argv[3];
    if(song == undefined)
    {
        song = "The Sign";
    }
    console.log(song);

    spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(JSON.parse(data)); });
}
else if(input == 'movie-this')
{
    // Then run a request to the OMDB API with the movie specified
    var movie = process.argv[3];
    if(movie == undefined)
    {
        movie = "Mr. Nobody";
    }
    request("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy", function(error, response, body) {

    //   // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {

    //     // Parse the body of the site and recover just the imdbRating
    //     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("The movie's title is: " + JSON.parse(body).Title);
        console.log("The movie's released year is: " + JSON.parse(body).Year);
        console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
        console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings);
        console.log("The movie was produced in: " + JSON.parse(body).Country);
        console.log("The movie's language is: " + JSON.parse(body).Language);
        console.log("The plot of the movie is: " + JSON.parse(body).Plot);
        console.log("The actors in the movie are: " + JSON.parse(body).Actors);
      }})
    // });
}
else if(input == 'do-what-it-says')
{

}

