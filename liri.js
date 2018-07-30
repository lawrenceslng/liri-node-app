//require packages
require("dotenv").config();
var keys = require("./key.js");
var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request'); 
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var input = process.argv[2];

//----------------------------------CHECK ARGV[2]------------------------------------------
if(input == 'my-tweets')
{
    displayTweet();
}
else if(input == 'spotify-this-song')
{
    var song = process.argv[3];
    displaySpotify(song);
//     `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window
     
//      * Artist(s)
     
//      * The song's name
     
//      * A preview link of the song from Spotify
     
//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.

}
else if(input == 'movie-this')
{
    var movie = process.argv[3];
    displayMovie(movie);
    // });
}
else if(input == 'do-what-it-says')
{
    fs.readFile("random.txt","utf8",function(err, data){
        if (err) 
        {
            return console.log(err);
        }
        // console.log(data);
        var dataArr = data.split(",");
        // console.log(dataArr);
        var command = dataArr[0];
        if(command == "my-tweets")
        {
            displayTweet();
        }
        else if(command == "spotify-this-song")
        {
            var content = dataArr[1];
            displaySpotify(content);
        }
        else if(command == "movie-this")
        {
            var content = dataArr[1];
            displayMovie(content);
        }
        else
        {
            console.log("Invalid Command in random.txt");
        }
    })
}
//----------------------------------------------------------------------------------------------------------
//------------------------------------------------------FUNCTIONS---------------------------------------------
function displayTweet()
{
    var params = {screen_name: 'Lalias4'};
    // This will show your last 20 tweets and when they were created at in your terminal/bash window.
    client.get('statuses/user_timeline', params, function(error, tweets, response) 
    {
        if (!error) 
        {
            if(tweets.length < 20)
            {
                for(var i = 0; i < tweets.length; i++)
                {
                    console.log(tweets[i].text, tweets[i].created_at);
                }
            }
            else
            {
                for(var i = 0; i < 20; i++)
                {
                    console.log(tweets[i].text, tweets[i].created_at);
                }
            } 
        }
    })
}
function displaySpotify(arg)
{
    if(arg == undefined)
    {
       arg = "The Sign";
    }
    console.log(arg);

    spotify.search({ type: 'track', query: arg, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data.tracks.items);
    //   console.log(data.tracks.items);
    //   console.log(data.tracks.items);
    //   console.log(data.tracks.items); 
    });
}
function displayMovie(arg)
{
    if(arg == undefined)
    {
        arg = "Mr. Nobody";
    }
    request("http://www.omdbapi.com/?t="+arg+"&y=&plot=short&apikey=trilogy", function(error, response, body) 
    {
        if (!error && response.statusCode === 200) 
        {
            console.log("The movie's title is: " + JSON.parse(body).Title);
            console.log("The movie's released year is: " + JSON.parse(body).Year);
            console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
            console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
            console.log("The movie was produced in: " + JSON.parse(body).Country);
            console.log("The movie's language is: " + JSON.parse(body).Language);
            console.log("The plot of the movie is: " + JSON.parse(body).Plot);
            console.log("The actors in the movie are: " + JSON.parse(body).Actors);
        }
    })
}

