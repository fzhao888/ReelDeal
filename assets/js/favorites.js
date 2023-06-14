var storedMovies = JSON.parse(localStorage.getItem("movies"));
var favoritesContentEl = document.getElementById("favorites-page");

//displays favorites
if (!storedMovies) {
    storedMovies = null;
} else {
    for (var i = 0; i < storedMovies.length; i++) {
        var movie = storedMovies[i];
        console.log(movie);

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
        resultBody.classList.add("card-content");
        resultBody.style.fontSize = "large";
        resultCard.append(resultBody);


        var mediaDiv = document.createElement("div");
        mediaDiv.classList.add("media");
        resultBody.append(mediaDiv);

        var leftImageDiv = document.createElement("div");
        leftImageDiv.classList.add("media-left");
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

        favoritesContentEl.append(resultCard);

    }
}

