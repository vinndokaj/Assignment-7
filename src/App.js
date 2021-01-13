import './App.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GifCard from './Components/GifCard';
import SearchField from './Components/SearchField';


export default class App extends Component {
  constructor(){
    super();
    this.state = {gifList : []};
    this.modifyList = this.modifyState.bind(this)
  }
  
  modifyState(values){
    this.setState({gifList : values});
  }

  componentDidMount(){
    fetch('http://api.giphy.com/v1/gifs/trending?api_key=T4rKEp7Pn0ZqkYbzV7wgI06QkQwq76y9')
      .then(response => {
        if (response.status !== 200) {
          throw new Error("Problem fetching trending gifs");
        }
        return response.json();
      })
      .then(gifs => {
        console.log(gifs);
        let newArr = [];
        const arr = gifs.data;
        for(let i = 0; i < arr.length; i++){
          newArr.push(<GifCard info={arr[i]} />);
        }
        this.setState({gifList : newArr});
      })
      .catch(error => {
        console.log("error", error)
      });
    }

  render() {
    return (
      <>
        <div id='headDiv'>
          <h1 id='head'>Search for Gifs using GIPHY!</h1>
        </div>
        <div id='searchDiv'>
          {/* {<SearchField moodifyList={this.modifyState} />} */}
        </div>
        <div id='gifDiv'>
          {/* <p>{ReactDOM.render(this.state.gifList)}</p> */}
          {this.state.gifList.map((gif, index) => (
            <div key={index}>{gif}</div>
          ))}
        </div>
        
      </>
    )
  }
}

