var storedMovies = JSON.parse(localStorage.getItem("movies"));
var favoritesContentEl = document.getElementById("favorites-page");

if (!storedMovies) {
    storedMovies = null;
} else {
    for (var i = 0; i < storedMovies.length; i++) {
        var movie = storedMovies[i];
        console.log(movie);

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

        var ratingsEl = document.createElement('p');
        ratingsEl.innerHTML = '<strong> IMDB Rating: </strong> ' + movie.Ratings[0].Value + '</br>';

        resultBody.append(movieNameEl, imageEl, ratingsEl, releaseYearEl, ratedEl, runtimeEl, genreEl, plotEl);
        favoritesContentEl.append(resultCard);
    }
}

