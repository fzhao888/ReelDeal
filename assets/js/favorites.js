var storedMovies = JSON.parse(localStorage.getItem("movies"));
var favoritesContentEl = document.getElementById("favorites-page");

//displays favorites
if(!storedMovies){
    storedMovies = null;
}else if (storedMovies.length === 0) {
  favoritesContentEl.innerHTML = "You do not have any favorites yet.";
  favoritesContentEl.style.fontSize = "24px";
  favoritesContentEl.style.textAlign = "center";
} else {
    for (var i = 0; i < storedMovies.length; i++) {
        var movie = storedMovies[i]; 

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

        var removeBtn = document.createElement('button');
        var buttonID = removeBtn.setAttribute('id',i); 

        removeBtn.classList.add("button", "is-medium", "is-danger"); //style with bulma
        removeBtn.textContent = "Remove";


        removeBtn.addEventListener('click', function (event) {
            var movies = JSON.parse(localStorage.getItem("movies"));
            console.log(typeof(event.target.id));

            if (!movies) {
                movies = [];
            } else {
                //checks for dupes:
                console.log(movies);
                for (var i = 0; i < movies.length; i++) {
                    if (i === parseInt(event.target.id)) {
                        movies.splice(i,1);
                    } 
                }
            }

            localStorage.setItem("movies", JSON.stringify(movies));
            location.reload();
        });

        var cardFooter = document.createElement("footer");
        cardFooter.classList.add("card-footer");
        resultCard.append(cardFooter);

        cardFooter.style.justifyContent = "center";
        cardFooter.style.paddingTop = "8px";
        cardFooter.style.paddingBottom = "20px";
        cardFooter.append(removeBtn);

        favoritesContentEl.append(resultCard);
    }
}

