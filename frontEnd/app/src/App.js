import React, { Component } from 'react';
import './App.css';
import FlightsList from './Components/flightsList.js';
import UserLanding from './Components/UserLanding/UserLanding.js';
import ReservationsPage from './Components/reservations/ReservationsPage'
import UserFlightList from './Components/UserFlightList/userFlightList.js';

import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import EditPage from './Components/EditUser/EditPage';


class App extends Component {

  render() {
    return (
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<UserLanding />} />
          <Route path="/flights" element={<UserFlightList/>} />
          <Route path="/admin" element={<FlightsList />} />
          <Route path="/reservations" element={<ReservationsPage/>} />
          <Route path="/:userId/edit-info" element={<EditPage/>} />
        </Routes>

      </BrowserRouter>

    );
  }
}


export default App;
