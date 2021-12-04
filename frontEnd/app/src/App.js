import React, { Component } from 'react';
import './App.css';
import FlightsList from './Components/flightsList.js';
import UserLanding from './Components/UserLanding/UserLanding.js';
import UserFlightList from './Components/UserFlightList/userFlightList.js';

import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


class App extends Component {
  state = {
    userlandinstate:null
  }
  updateUserLandingState=(val)=>{
  }
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLanding />} />
          <Route path="/flights" element={<UserFlightList />} />
          <Route path="/admin" element={<FlightsList />} />

        </Routes>

      </BrowserRouter>

    );
  }
}


export default App;
