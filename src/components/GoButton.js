import React from 'react';

class GoButton extends React.Component{
    getSharedMovieData() {
        var actorInputs = document.querySelectorAll(".actor-div input");
        var errorMessage = document.querySelector(".error-message");
        const movieList = document.querySelector('.movie-list');
        var idArray= [];

        while (movieList.firstChild) {
            movieList.removeChild(movieList.firstChild);
        }

        [].forEach.call(actorInputs, function(actorInput) {
            idArray.push(actorInput.dataset.id);
        });

        function isTruthy(val) {
            return !!val;
        }

        function find_duplicate_in_array(a) {
                var counts = [];
                for(var i = 0; i <= a.length; i++) {
                    if(counts[a[i]] === undefined) {
                        counts[a[i]] = 1;
                    } else {
                        return true;
                    }
                }
                return false;
        }

        function queryActorMovies(){
            const actorIds = idArray.join('%2C');
            let movieAPI = `https://api.themoviedb.org/3/discover/movie?api_key=ab73547ffa799d1e107378f587c26cae&include_adult=false&with_cast=${actorIds}`;
            
            fetch(movieAPI)
            .then(res => res.json()) 
            .then(
                (result) => {
                    if(result.results.length === 0){
                        let listItem = document.createElement("LI");  
                        let textnode = document.createTextNode("They Haven't worked together");
                        listItem.classList.add('error');  
                        listItem.appendChild(textnode);
                        movieList.appendChild(listItem);

                    }else{
                        for(var i=0; i< result.results.length; i++){ 
                            let listItem = document.createElement("LI");  
                            let textnode = document.createTextNode(result.results[i].title);  
                            listItem.appendChild(textnode);
                            movieList.appendChild(listItem);
                        }
                    }

                },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
                (error) => {

                }
            )
       
        }

        //detect if both names are correct & not duplicates if not show an error message
        if(idArray.every(isTruthy) && (!find_duplicate_in_array(idArray))){
            errorMessage.innerHTML = "";
            queryActorMovies();
        }else if(find_duplicate_in_array(idArray)){
            errorMessage.innerHTML = "Nice try!";
        }
        else{
           errorMessage.innerHTML = "Oops! Are both of those Names correct?"; 
        }
    }

    render(){
        return(
            <div className="button-container"> 
                <button className='search-button' onClick={(e) => this.getSharedMovieData(e)}>Find out</button>
                <p className="error-message"></p>
            </div>
        );
    }
}

export default GoButton;