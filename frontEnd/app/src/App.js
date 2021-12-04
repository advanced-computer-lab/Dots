import React, { Component } from 'react';
import './App.css';
import FlightsList from './Components/flightsList.js';
import UserLanding from './Components/UserLanding/UserLanding.js';
import SeatSelector from './Components/SeatSelector/SeatSelector.js'
import UserFlightList from './Components/UserFlightList/userFlightList.js';
import Test from './Components/SeatMapTransitionControl/App.js'

import UserSearch from './Components/UserSearch/UserSearch';
// import UserFlightList from './Components/UserFlightList/userFlightList';

import UserFlightListFunction from './Components/UserFlightList/userFlightList';

import Summary from './Components/Summary/Summary';

import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import Loading from './Components/Loading/Loading';

import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UserFlights from './Components/Summary/userFlights';


const theme = createTheme({
  palette: {
    primary: {
      main: '#076F72'
    }
  }
});



class App extends Component {
  
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<UserLanding />} />
          <Route path="/flights" element={<UserFlightList/>} />
          <Route path="/admin" element={<FlightsList />} />
          <Route path="/seatselector" element={<SeatSelector />} />
          <Route path="/test" element={<Test />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/summary" element={<Summary/>} />
          <Route path="/userflights" element={<UserFlights/>} />

        </Routes>

      </BrowserRouter>
      </MuiThemeProvider>

    );
  }
}


export default App;
