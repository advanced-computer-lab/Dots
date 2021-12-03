import React, { Component } from 'react';
import './App.css';
import FlightsList from './Components/flightsList.js';
import UserLanding from './Components/UserLanding/UserLanding.js';
import Summary from './Components/Summary/Summary';

import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UserFlights from './Components/Summary/userFlights';



class App extends Component {

  render() {
    return (
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<UserLanding />} />
          <Route path="/admin" element={<FlightsList />} />
          <Route path="/summary" element={<Summary/>} />
          <Route path="/userflights" element={<UserFlights/>} />

        </Routes>

      </BrowserRouter>

    );
  }
}


export default App;
