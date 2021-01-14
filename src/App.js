import './App.css';
import React, { Component } from 'react';
import GifCard from './Components/GifCard';
import SearchField from './Components/SearchField';


export default class App extends Component {
  constructor(){
    super();
    this.state = {gifList : []};
    this.modifyList = this.modifyState.bind(this);
    this.random = this.random.bind(this);
  }
  
  modifyState(values){
    console.log(`in modifyState ${values}`)
    this.setState({gifList : values});
  }

  random(){
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=T4rKEp7Pn0ZqkYbzV7wgI06QkQwq76y9`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error("Problem fetching trending gifs");
      }
      return response.json();
    })
    .then(gif => {
      const myGif = <GifCard info={gif.data} />
      this.setState({gifList : [myGif]});
    })
    .catch(error => {
      console.log("error", error)
    })
  }

  componentDidMount(){
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=T4rKEp7Pn0ZqkYbzV7wgI06QkQwq76y9`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error("Problem fetching trending gifs");
      }
      return response.json();
    })
    .then(gifs => {
      let newArr = [];
      const arr = gifs.data;
      for(let i = 0; i < arr.length; i++){
        newArr.push(<GifCard info={arr[i]} />);
      }
      console.log(newArr);
      this.setState({gifList : newArr});
    })
    .catch(error => {
      console.log("error", error)
    })
  }

  render() {
    return (
      <>
        <div id='headDiv'>
          <h1 id='head'>Search for Gifs using GIPHY!</h1>
        </div>
        <div id='searchDiv'>
          <SearchField modifyList={this.modifyState.bind(this)} />
          <button id='random' onClick={this.random}>Random</button>
        </div>
        <div id='gifDiv'>
          {this.state.gifList.map((gif, index) => (
            <div className='gif' key={index}>{gif}</div>
          ))}
        </div>
      </>
    )
  }
}

