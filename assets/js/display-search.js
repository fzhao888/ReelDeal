var resultTextEl = document.getElementById("result-text");
var searchTextEl = document.getElementById("search-text");
var resultContentEl = document.getElementById("result-content");
var resultPageEl = document.getElementById("results-page");
var searchFormEl = document.getElementById('search-form');
var errorEl = document.getElementById("error-message");
var closeBtn = document.getElementById("delete");
var okBtn = document.getElementById("ok");
var eMessage = document.getElementById("e-message");



function getParams() {
    var actorName = document.location.search.split("=")[1];
    displayActorName(actorName);
}

//Displays actor name in 'showing results for'
function displayActorName(actorName) {
    //checks for empty actor name
    if (!actorName) {
        searchTextEl.textContent = "";
        eMessage.textContent = "Empty Actor Name";
        errorEl.classList.add('is-active');     
        return;
    }//end of checking for empty actor name

    //parses query parameter to get the actor name
    var names = actorName.split("/");
    var fullName = names[0].split("%20");

    for (var i = 0; i < fullName.length; i++) {
        searchTextEl.textContent += fullName[i] + " ";
    }
    findActorID(actorName);
}

//searches Movies Mini Database API for IMDB id given the actor name
function findActorID(actorName) {
    resultTextEl.textContent = "Loading";
    var queryURL = "https://moviesminidatabase.p.rapidapi.com/actor/imdb_id_byName/" + actorName;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2e0e185cc6msh24c320d28584a97p1e3333jsnc9b7533e3e8a',
            'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
        }
    };

    //fetches actorID
    fetch(queryURL, options)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (result) {
            if (result.results.length === 0) {
                var names = actorName.split("/");
                var fullName = names[0].split("%20");
                resultTextEl.textContent = "";
                
                for (var i = 0; i < fullName.length; i++) {
                    resultTextEl.textContent += fullName[i] + " ";
                }
                eMessage.textContent = 'No results found, search again!';
                errorEl.classList.add("is-active");
            }

            //console.log(result.results);
            var actorID = result.results[0].imdb_id;
                
            resultTextEl.textContent = result.results[0].name;
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
    fetch(queryURL, options)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (result) {
            var movies = [];
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
    var moviesList = [];
     
    for (var i = 0; i < movies.length && i<10; i++) {
        var queryURL = "https://omdbapi.com/?apikey=" + apiKey + "&i=" + movies[i] + "&plot=full";

        //fetches movies object data 
        fetch(queryURL)
            .then(function (response) {
                if (!response.ok) {
                    throw response.json();
                }
                return response.json();
            })
            .then(function (result) {
                printResult(result);
            });
    }
}

//stores previously recommended movies in local storage
function storeMovie(movie) {
    var movies = JSON.parse(localStorage.getItem("movies")); 
    
    if (!movies) {
        movies = [];
    } else {
        //checks for dupes:
        var storedMoviesIDs = [];

        for (var i = 0; i < movies.length; i++) {
            storedMoviesIDs.push(movies[i].imdbID);
        }

        if (storedMoviesIDs.includes(movie.imdbID)) {
            return;
        }
    }

    movies.push(movie);
    localStorage.setItem("movies", JSON.stringify(movies));
}

//display movie data
function printResult(movie) {
    var resultCard = document.createElement("div");
    //add bulma css
    resultCard.classList.add("card");
    
    var resultHeader = document.createElement("header");
    resultHeader.classList.add("card-header");
    resultCard.append(resultHeader);

    var movieNameEl = document.createElement("p");
    movieNameEl.classList.add("card-header-title");
    movieNameEl.textContent = movie.Title; 
    movieNameEl.style.justifyContent = "center";
    resultHeader.append(movieNameEl);

 
    
    var resultBody = document.createElement("div");
    resultBody.classList.add("card-content", "is-size-5-mobile", "is-size-5-touch", "is-size-5-tablet", "is-size-3-desktop", "is-size-3-widescreen", "is-size-3-fullhd");
    resultBody.style.fontSize = "large";
    resultCard.append(resultBody);


    var mediaDiv = document.createElement("div");
    mediaDiv.classList.add("media");
    resultBody.append(mediaDiv);

    var leftImageDiv = document.createElement("div");
    leftImageDiv.classList.add("media-left");
    leftImageDiv.style.width = "20%";
    mediaDiv.append(leftImageDiv);


    var imageFigure = document.createElement("figure");
    imageFigure.classList.add("image"); 
    leftImageDiv.append(imageFigure);

    var imageEl = document.createElement('img'); 
    imageEl.src = movie.Poster;
    imageFigure.append(imageEl);
    
    
    var mediaContent = document.createElement("div");
    mediaContent.classList.add("media-content");
    mediaDiv.append(mediaContent);

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


    var ratingsEl = document.createElement('p');
    ratingsEl.innerHTML = '<strong> IMDB Rating: </strong> ' + movie.Ratings[0].Value + '</br>';

    mediaContent.style.textAlign = "left";
    mediaContent.append(ratingsEl, releaseYearEl, ratedEl, runtimeEl, genreEl, plotEl);  
   
    var saveBtn = document.createElement('button');
    saveBtn.classList.add("button","is-medium", "is-dark","is-responsive"); //style with bulma
    saveBtn.textContent = "Save";
    
    saveBtn.addEventListener('click', function () {
        storeMovie(movie);
    });

    var cardFooter = document.createElement("footer");
    cardFooter.classList.add("card-footer");
    resultCard.append(cardFooter);
    
    cardFooter.style.justifyContent = "center";
    cardFooter.style.paddingTop = "8px";
    cardFooter.style.paddingBottom = "20px";
    cardFooter.append(saveBtn);

    //change background color of result card
    resultBody.style.backgroundColor = "skyblue";
    resultHeader.style.backgroundColor = "lightgreen";
    cardFooter.style.backgroundColor = "lightgreen";
    resultCard.style.outlineStyle = "dashed";
    resultCard.style.outlineColor = "navy";

    resultContentEl.append(resultCard);
}


function handleSearchFormSubmit(event) {
    event.preventDefault();

    var actorName = document.getElementById("actor-name").value;

    var queryString = './search-results.html?q=' + actorName;
    location.assign(queryString);
    console.log("Done!");
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

closeBtn.addEventListener("click", function(){
    errorEl.classList.remove('is-active');
});

okBtn.addEventListener("click", function(){
    errorEl.classList.remove('is-active');
});

getParams();