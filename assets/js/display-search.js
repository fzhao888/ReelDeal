function getParams() {
    var actorName = document.location.search.split("=")[1];
    console.log(actorName);
    findIMDBid(actorName);
}

function findIMDBid(actorName) {
    var findActorIdQueryURL = "https://moviesminidatabase.p.rapidapi.com/actor/imdb_id_byName/" + actorName + "/";
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2e0e185cc6msh24c320d28584a97p1e3333jsnc9b7533e3e8a',
            'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
        }
    };

    try {
        fetch(findActorIdQueryURL, options);
    } catch (error) {
        console.error(error);
    }

    fetch(findActorIdQueryURL, options)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (actorId) {
            return actorId.results[0].imdb_id; 
        });
}


getParams();