import React, { Component } from 'react';
import './App.css';
import 'tachyons';
import FlightsList from './components/flightsList.js';


class App extends Component {

  render() {
    return (
      <div >
        <FlightsList />
      </div>
    );
  }
}


export default App;
