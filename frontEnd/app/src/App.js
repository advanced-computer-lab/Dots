import React, { Component } from 'react';
import './App.css';
import FlightsList from './Components/flightsList.js';
import UserLanding from './Components/UserLanding/UserLanding.js';
import UserSearch from './Components/UserSearch/UserSearch';
import userFlightList from './Components/UserFlightList/userFlightList';


import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import Loading from './Components/Loading/Loading';

import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

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
          <Route path="/" element={ <UserLanding />} />
          <Route path="/flights" element={<userFlightList/>} />
          <Route path="/admin" element={  <FlightsList />} />
          <Route path="/loading" element={<Loading />} />

        </Routes>

      </BrowserRouter>
      </MuiThemeProvider>

    );
  }
}


export default App;
