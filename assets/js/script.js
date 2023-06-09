var searchFormEl = document.querySelector(".search-form");

function handleSearchFormSubmit(event){
    event.preventDefault();
    
    var actorName = document.getElementById("actor-name").value; 
    console.log(actorName);
    if(!actorName){
        console.error("Please input an actor name.");
      
        return;
    }

    var queryString = './search-results.html?q=' + actorName;
   // location.assign(queryString);
    console.log("Done!");
}

searchFormEl.addEventListener('submit',handleSearchFormSubmit);


