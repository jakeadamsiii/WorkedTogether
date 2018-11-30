import React from 'react';

class SuggestedActors extends React.Component{

    render (){
        const { suggestions, onChoose } = this.props;
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

}

export default SuggestedActors;