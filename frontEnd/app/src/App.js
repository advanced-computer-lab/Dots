import React, { Component } from 'react';
import './App.css';
import FlightsList from './Components/flightsList.js';
import {Navbar} from 'react-bootstrap'
import {Nav} from 'react-bootstrap'
import {NavDropdown} from 'react-bootstrap'
import{Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


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
