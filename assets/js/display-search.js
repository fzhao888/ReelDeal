var resultTextEl = document.getElementById("result-text");
var resultContentEl = document.getElementById("result-content");
var searchFormEl = document.querySelector(".search-form");

function getParams() {
    var actorName = document.location.search.split("=")[1];
    displayActorName(actorName);
    //console.log(actorName);

}

//Displays actor name in 'showing results for'
function displayActorName(actorName) {
    //checks for empty actor name
    if (!actorName) {
        resultTextEl.textContent = "";
        console.error("Please input an actor name.");
        resultContentEl.innerHTML = '<h3>Please input an actor name.</h3>';
        return;
    }//end of checking for empty actor name

    //parses query parameter to get the actor name
    var names = actorName.split("/");
    var fullName = names[0].split("%20");

    for (var i = 0; i < fullName.length; i++) {
        resultTextEl.textContent += fullName[i] + " ";
    }

    findActorID(actorName);

}

//searches Movies Mini Database API for IMDB id given the actor name
function findActorID(actorName) {
    var queryURL = "https://moviesminidatabase.p.rapidapi.com/actor/imdb_id_byName/" + actorName;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2e0e185cc6msh24c320d28584a97p1e3333jsnc9b7533e3e8a',
            'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
        }
    };

    //fetches actorID
    try {
        fetch(queryURL, options);
    } catch (error) {
        console.error(error);
    }

    fetch(queryURL, options)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (result) {
            var actorID = result.results[0].imdb_id;
            findMovieID(actorID);

        });
}


//search Movies Mini Database API to find movies IMBD id with the actor using the IMDB id
//only gets first ten if actor is in more than ten movies  
function findMovieID(actorID) {
    var queryURL = "https://moviesminidatabase.p.rapidapi.com/actor/id/" + actorID + "/movies_knownFor/";
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2e0e185cc6msh24c320d28584a97p1e3333jsnc9b7533e3e8a',
            'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
        }
    };

    //fetches movies list
    try {
        fetch(queryURL, options);
    } catch (error) {
        console.error(error);
    }

    fetch(queryURL, options)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (result) {
            var movies = [];
            //console.log(result);

            if (!result.results.length) {
                console.log("No results found");
                resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
                return;
            }

            for (var i = 0; i < result.results.length; i++) {
                movies.push(result.results[i][0].imdb_id);
            }
            findMovies(movies);
        });
}

//fetches movies from movies IMDB ID
function findMovies(movies) {
    //console.log(movies);
    var apiKey = "d63d2ead&s";
  
    for (var i = 0; i < movies.length && i < 10 ; i++) {
        var queryURL = "https://omdbapi.com/?apikey=" + apiKey + "&i=" + movies[i] + "&plot=full";
        var moviesList = [];
        //fetches movies object data 
        try {
            fetch(queryURL);
        } catch (error) {
            console.error(error);
        }

        fetch(queryURL)
            .then(function (response) {
                if (!response.ok) {
                    return response.json();
                }
                return response.json();
            })
            .then(function (result) {
                /**
                moviesList.push(result);
                //sorts movies by IMDB rating
                moviesList = moviesList.sort(function(a,b){
                    bRating = b.Ratings[0].Value.split("/")[0];
                    aRating = a.Ratings[0].Value.split("/")[0];

                    return bRating - aRating;
                });
                return moviesList;
            })
            .then(function(data){
                printResult(data);
            });
            */
                printResult(result)
            });
    }
}
function printResult(movie) {
    //console.log(movie);
    var resultCard = document.createElement("div");
    //add bulma css
    resultCard.classList.add("card");
    var resultBody = document.createElement("div");
    resultBody.classList.add("card-body");
    resultCard.append(resultBody);
  
    var movieNameEl = document.createElement("h3");
    movieNameEl.textContent = movie.Title;

    
    var releaseYearEl = document.createElement('p');
    releaseYearEl.innerHTML = '<strong> Release Year: </strong> ' + movie.Year + '</br>';

    var ratedEl = document.createElement('p');
    ratedEl.innerHTML = '<strong> Rated: </strong> ' + movie.Rated + '</br>';

    var runtimeEl = document.createElement('p');
    runtimeEl.innerHTML = '<strong> Runtime: </strong> ' + movie.Runtime + '</br>';

    var genreEl = document.createElement('p');
    genreEl.innerHTML = '<strong> Genre: </strong> ' + movie.Genre + '</br>';

    var plotEl = document.createElement('p');
    plotEl.innerHTML = '<strong> Plot: </strong> ' + movie.Plot + '</br>';

    var imageEl = document.createElement('img');
    imageEl.src = movie.Poster;


    resultBody.append(movieNameEl,imageEl,releaseYearEl,ratedEl,runtimeEl,genreEl,plotEl);
    resultContentEl.append(resultCard
}


function handleSearchFormSubmit(event) {
    event.preventDefault();

    var actorName = document.getElementById("actor-name").value;
    console.log(actorName);

    var queryString = './search-results.html?q=' + actorName;
    location.assign(queryString);
    console.log("Done!");
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);


getParams();