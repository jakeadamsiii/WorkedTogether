import React from 'react';
import {Link} from 'react-router';
import ReactDOM from "react-dom";
import GoButton from '../GoButton'

class HomePage extends React.Component{

    constructor(props) {
        super(props);  
        this.handleFirstKeyUp = this.handleFirstKeyUp.bind(this);
        this.handleSecondKeyUp = this.handleSecondKeyUp.bind(this);
        this.chooseFirstActor = this.chooseFirstActor.bind(this);
        this.chooseSecondActor = this.chooseSecondActor.bind(this);
        this.findCommonMovies = this.findCommonMovies.bind(this);

        this.state = {
            firstActorField: '',
            suggestedFirstActors: [],
            chosenFirstActor: {
                name: '',
                id: null
            },
            secondActorField: '',
            suggestedSecondActors: [],
            chosenSecondActor: {
                name: '',
                id: null
            },
            commonMovies: {
                errorMessage: '',
                movies: []
            },
        }
    }

    findCommonMovies(e) {
        e.preventDefault(); // prevent form submission
        const {chosenFirstActor, chosenSecondActor} = this.state;
        if(chosenFirstActor.id === null || chosenSecondActor.id === null) {
            const errorMessage = "Some Error Message";
            this.setState({commonMovies: {errorMessage, movies: []}})
            return false;
        }
        // handle other error scenarios here
       
        let movieAPI = `https://api.themoviedb.org/3/discover/movie?api_key=ab73547ffa799d1e107378f587c26cae&include_adult=false&with_cast=${chosenFirstActor.id},${chosenSecondActor.id}`;
            
        fetch(movieAPI)
        .then(res => res.json()) 
        .then(result => {
            if(result.results.length === 0){
                this.setState({commonMovies: {errorMessage: "they haven't worked together", movies: result.results}});
            }else{
                this.setState({commonMovies: {errorMessage: '', movies: result.results}});
            }
        });
    }

    chooseFirstActor(actor) {
        this.setState({chosenFirstActor: actor, firstActorField: actor.name, suggestedFirstActors: []});
    }

    chooseSecondActor(actor) {
        this.setState({chosenSecondActor: actor, secondActorField: actor.name, suggestedSecondActors: []});
    }

    handleFirstKeyUp(e) {
        const typed_value = e.target.value;
        this.setState({firstActorField: typed_value});

        if(!!typed_value){
            let movieAPI = `https://api.themoviedb.org/3/search/person?api_key=ab73547ffa799d1e107378f587c26cae&query=${typed_value}`;
            fetch(movieAPI)
            .then(res => res.json()) 
            .then(result => {
                const suggestions = result.results;
                if(result.results.length >=5){
                    suggestions.length = 5;
                }
                this.setState({suggestedFirstActors: suggestions});
            });
        }   
    }

    handleSecondKeyUp(e) {
        const typed_value = e.target.value;
        this.setState({secondActorField: typed_value});

        if(!!typed_value){
            let movieAPI = `https://api.themoviedb.org/3/search/person?api_key=ab73547ffa799d1e107378f587c26cae&query=${typed_value}`;
            fetch(movieAPI)
            .then(res => res.json()) 
            .then(result => {
                const suggestions = result.results;
                if(result.results.length >=5){
                    suggestions.length = 5;
                }
                this.setState({suggestedSecondActors: suggestions});
            });
        }   
    }

    render(){
        const {firstActorField, secondActorField} = this.state;
        return(
            <div className="jumbotron">
                <form onSubmit={this.findCommonMovies}>
                    <h2>
                        Has
                        <div className="actor-div">
                            <input type="text" value={firstActorField} className="actor-input" onChange={this.handleFirstKeyUp} />
                            <SuggestedActors suggestions={this.state.suggestedFirstActors} onChoose={this.chooseFirstActor} />
                        </div>
                        worked with
                        <div className="actor-div">
                            <input type="text" value={secondActorField} className="actor-input" onChange={this.handleSecondKeyUp} />
                            <SuggestedActors suggestions={this.state.suggestedSecondActors} onChoose={this.chooseSecondActor} />
                        </div>
                        ?
                    </h2>
                    <button type="submit">Go</button>
                </form>
                <MovieList movies={this.state.commonMovies} />
            </div>
        );
    }
}

export default HomePage;

const SuggestedActors = (props) => {
    const { suggestions, onChoose } = props;
    if(suggestions.length > 0) {
        return (
            <ul className="dropdown">
            {suggestions.map(suggestion => {
                return (
                    <li key={suggestion.id} onClick={()=> onChoose({name: suggestion.name, id: suggestion.id})}>{suggestion.name}</li>
                )
            })}
            </ul>
        )
    }
    return false;
}

const MovieList = (props) => {
    const {errorMessage, movies} = props.movies;
    if(errorMessage !== '') {
        return (
            <div>{errorMessage}</div>
        )
    }
    if(movies.length > 0) {
        return (
            <ul className="movie-list">
            {movies.map(movie => {
                return (
                    <li key={movie.id}>{movie.title}</li>
                )
            })}
            </ul>
        )
    }
    return false;
}