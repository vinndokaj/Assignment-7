import React from 'react';
import GifCard from './GifCard';
class Search extends React.Component { 

    constructor(props) { 
        super(props); 
        this.state = {query : ''}
        this.handleChange = this.handleChange.bind(this);
    };

    modifyList = (values) => {
        this.props.modifyList(values);
    }

    getSearchResults = () => { 
        const searchUrl = `http://api.giphy.com/v1/gifs/search?q=${this.state.query}&api_key=T4rKEp7Pn0ZqkYbzV7wgI06QkQwq76y9`
        fetch(searchUrl)
        .then(response => {
            if (response.status !== 200) {
            throw new Error("Problem fetching searched gifs");
            }
            return response.json();
        })
        .then(gifs => {
            let newArr = [];
            const arr = gifs.data;
            for(let i = 0; i < arr.length; i++){
                newArr.push(<GifCard info={arr[i]} />);
            }
            this.modifyList(newArr);
        })
        .catch(error => {
            console.log("error", error)
        });
    }

    handleChange(event) {
        this.setState({query : event.target.value}, () => {
            console.log(`handling change ${this.state.query}`);
            this.getSearchResults();
        });
      }

    render(){ 
        return ( 
            <label>
            Gif Search:
            <input type="text" value={this.state.query} onChange={this.handleChange} />
            </label>
        )
    }
}
export default Search