import React, { Component } from 'react';
import './App.css';
import FlightsList from './Components/flightsList.js';
import UserLanding from './Components/UserLanding/UserLanding.js';
import ReservationsPage from './Components/reservations/ReservationsPage'
import SeatSelector from './Components/SeatSelector/SeatSelector.js'
import UserFlightList from './Components/UserFlightList/userFlightList.js';
import FakePayment from './Components/FakePayment/FakePayment.js';
import Test from './Components/SeatMapTransitionControl/SeatMapTransitionControl.js'
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
import EditPage from './Components/EditUser/EditPage';
import UserFlights from './Components/Summary/userFlights';
import GuestNavBar from './Components/GuestNavBar/GuestNavBar';
import LoginPage from './Components/login/loginPage';
import { AuthProvider, AuthContext } from './context/authContext';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#076F72'
    }
  }
});

axios.interceptors.request.use(
  config => {
    config.headers.authorization = `Bearer ${AuthContext.authState.token}`
  }
)

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <GuestNavBar />
        <BrowserRouter>

          <Routes>
            <AuthProvider>
              <Route path="/" element={<UserLanding />} />
              <Route path="/flights" element={<UserFlightList />} />
              <Route path="/admin" element={<FlightsList />} />
              <Route path="/:userId/edit-info" element={<EditPage />} />
              <Route path="/seatselector" element={<SeatSelector />} />
              <Route path="/loading" element={<Loading />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/userflights" element={<UserFlights />} />
              <Route path="/payment" element={<FakePayment />} />
              <Route path="/login" element={<LoginPage />} />
            </AuthProvider>
          </Routes>

        </BrowserRouter>
      </MuiThemeProvider>

    );
  }
}


export default App;
