var searchFormEl = document.querySelector(".search-form");


function handleSearchFormSubmit(event){
    event.preventDefault();
    
    var actorNameEl = document.getElementById("actor-name");
    var actorName = actorNameEl.value;
    
    if(!actorName){
        console.error("Please input an actor name.");
        return;
    }

    var queryString = './search-results.html?q=' + actorName;
    location.assign(queryString);
}

searchFormEl.addEventListener('submit',handleSearchFormSubmit);


