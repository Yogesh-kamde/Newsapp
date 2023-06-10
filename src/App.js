
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
// import NewsItem from './components/NewsItem';

export default class App extends Component {
  // apikey = "fe330dea57d843d384884a9b0276b54e"
  apikey = process.env.REACT_APP_NEWS_API
  render() {
    return (
      <div>
       <NavBar/>
       <News apikey={this.apikey}/>
      </div>
    )
  }
}
