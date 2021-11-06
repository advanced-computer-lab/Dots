import React, { Component } from 'react';
import './App.css';
import 'tachyons';
import FlightsList from './Components/flightsList.js';
import CreateFlight from './Components/createFlight';


class App extends Component {

  render() {
    return (
      <div >
        {/* <FlightsList/> */}
        <CreateFlight/>

      </div>
    );
  }
}


export default App;
