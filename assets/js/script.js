var searchFormEl = document.querySelector(".search-form");
var errorEl = document.getElementById("error-message");
var closeBtn = document.getElementById("delete");
var okBtn = document.getElementById("ok");
var eMessage = document.getElementById("e-message");

function handleSearchFormSubmit(event){
    event.preventDefault();
    var actorName = document.getElementById("actor-name").value; 
    console.log(actorName);
    if(!actorName){
        eMessage.textContent = "Empty Actor Name";
        errorEl.classList.add('is-active');        
        return;
    }

    var queryString = './search-results.html?q=' + actorName;
    location.assign(queryString); 
}

searchFormEl.addEventListener('submit',handleSearchFormSubmit);

closeBtn.addEventListener("click", function(){
    errorEl.classList.remove('is-active');
});

okBtn.addEventListener("click", function(){
    errorEl.classList.remove('is-active');
});