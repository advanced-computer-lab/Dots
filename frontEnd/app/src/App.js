import React, { Component } from 'react';
import './App.css';
import 'tachyons';
import FlightsList from './Components/flightsList.js';
import SearchModule from './Components/SearchModule/SearchModule';


class App extends Component {

  render() {
    return (
      <div >
        <SearchModule />

      </div>
    );
  }
}


export default App;
