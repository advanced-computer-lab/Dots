import React, { Component } from 'react';
import './App.css';
import FlightsList from './Components/flightsList.js';
import UserLanding from './Components/UserLanding/UserLanding.js';
import ReservationsPage from './Components/reservations/ReservationsPage'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


class App extends Component {

  render() {
    return (
      <BrowserRouter>

        <Routes>
          <Route exact path="/" element={<UserLanding />} />
          <Route path="/admin" element={<FlightsList />} />
          <Route path="/reservations" element={<ReservationsPage/>} />

        </Routes>

      </BrowserRouter>

    );
  }
}


export default App;
