import React, { Component, useContext,Fragment } from 'react';
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
import { Navigate } from 'react-router-dom'
import Signup from './Components/UserRegistration/signup';

const theme = createTheme({
  palette: {
    primary: {
      main: '#076F72'
    }
  }
});


const AuthenticatedRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext)
  return (
    authContext.isAuthenticatedBackend() ? (
      children
    ) : (
      <Navigate to="/" />
    )
  )
}

const AdminRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext)
  return (
    authContext.isAuthenticatedBackend() && authContext.isAdminBackend() ? (
      children
    ) : (
      <Navigate to="/" />
    )
  )
}

const AppRoutes = () => {
  const authContext = useContext(AuthContext)
  axios.interceptors.request.use(
    config => {
      config.headers['Authorization'] = `Bearer ${authContext.authState.accessToken}`
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<UserLanding />} />
        <Route path="/flights" element={<UserFlightList />} />
        <Route path="/admin" element={<AdminRoute><FlightsList /></AdminRoute>} />
        <Route path="/:userId/edit-info" element={<AuthenticatedRoute><EditPage /></AuthenticatedRoute>} />
        <Route path="/seatselector" element={<AuthenticatedRoute><SeatSelector /></AuthenticatedRoute>} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/userflights" element={<AuthenticatedRoute><UserFlights /></AuthenticatedRoute>} />
        <Route path="/payment" element={<AuthenticatedRoute><FakePayment /></AuthenticatedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Signup/>}/>
      </Routes>
    </Fragment>
  );
};

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <GuestNavBar />
        <BrowserRouter>


          <AuthProvider>
            <AppRoutes />
          </AuthProvider>


        </BrowserRouter>
      </MuiThemeProvider>

    );
  }
}


export default App;
