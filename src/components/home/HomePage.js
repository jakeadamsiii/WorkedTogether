import React from 'react';
import {Link} from 'react-router';
import Input from '../Input'
import GoButton from '../GoButton'

class HomePage extends React.Component{

    render(){
        return(
            <div className="jumbotron">
                <h2>Has<Input />worked with<Input />?</h2>
                <GoButton />
                <ul className="movie-list"></ul>
            </div>
        );
    }
}

export default HomePage;