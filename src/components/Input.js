import React from 'react';
import ReactDOM from "react-dom";

class Input extends React.Component{
    constructor(props) {
        super(props);    
    }

    getPersonDropdown() {
        //using ReactDOM to find the DOM node as opposed to the React componant. 
        const node = (ReactDOM.findDOMNode(this)).querySelector('input');
        const ul = (ReactDOM.findDOMNode(this)).querySelector('ul');
        const typed_value = node.value;
        //reset children in list
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        //reset data attribute
        node.dataset.id = "";

        if(!!typed_value){
            let movieAPI = `https://api.themoviedb.org/3/search/person?api_key=ab73547ffa799d1e107378f587c26cae&query=${typed_value}`;

            fetch(movieAPI)
            .then(res => res.json()) 
            .then(
                (result) => {
                    if(result.results.length >=5){
                        var listLength = 5;
                    }else{
                        var listLength = result.results.length;
                    }

                    for(var i=0; i< listLength; i++){ 
                        let listItem = document.createElement("LI");  
                        let textnode = document.createTextNode(result.results[i].name);  
                        listItem.appendChild(textnode);
                        listItem.dataset.id = result.results[i].id;
                        ul.appendChild(listItem);
                    }

                    this.setState({
                        isLoaded: true,
                        items: result.results.name
                    });
                },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
            .then(()=>{
                    const lis = ul.querySelectorAll('li');
                    [...lis].forEach(li => li.addEventListener('click', ()=>{
                        node.value = li.textContent;
                        node.dataset.id = li.dataset.id;
                        while (ul.firstChild) {
                            ul.removeChild(ul.firstChild);
                        }
                    }));
                }
                
            );
        }   
    }
      
    render(){
        return(
            <div className="actor-div">
                <input type="text" className="actor-input" onKeyUp={(e) => this.getPersonDropdown(e)} />
                <ul className="dropdown"></ul>
            </div>
        );
    }
}

export default Input;