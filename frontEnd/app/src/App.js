import React, { Component } from 'react';
import './App.css';
import 'tachyons';
import FlightsList from './components/flightsList.js';
import SearchModule from './components/SearchModule/SearchModule';


class App extends Component {

  render() {
    return (
      <div >
        <SearchModule></SearchModule>
        <FlightsList />
      </div>
    );
  }
}


export default App;
