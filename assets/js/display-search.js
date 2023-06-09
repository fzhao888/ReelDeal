function getParams() {
    var actorName = document.location.search.split("=")[1];
    console.log(actorName);
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
    var queryURL = "https://moviesminidatabase.p.rapidapi.com/actor/id/" + actorID +"/movies_knownFor/";
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

    fetch(queryURL,options)
        .then(function (response){
            if(!response.ok){
                throw response.json();
            }
            return response.json();
        })
        .then(function(result){
            var movies = [];
            console.log(result);
            for(var i = 0; i<result.results.length && i<10;i++ ){ 
                movies.push(result.results[i][0].imdb_id); 
            } 
            findMovies(movies);
        });
}

function findMovies(movies){ 
    console.log(movies);
    var apiKey = "d63d2ead&s";
    for(var i = 0; i<movies.length;i++){
        var queryURL = "https://omdbapi.com/?apikey=" + apiKey + "&i=" + movies[i];
        
        console.log(queryURL);
    }
}

getParams();