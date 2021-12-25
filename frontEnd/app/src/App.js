import React, { Component, useContext, Fragment, useEffect, useState } from 'react';
import './App.css';
import FlightsList from './Components/flightsList.js';
import UserLanding from './Components/UserLanding/UserLanding.js';
import SeatSelector from './Components/SeatSelector/SeatSelector.js'
import SingleSeatSelector from './Components/SingleSeatSelector/SingleSeatSelector'
import UserFlightList from './Components/UserFlightList/userFlightList.js';
import FakePayment from './Components/FakePayment/FakePayment.js';
import EditReservation from './Components/EditReservation/editReservation.js';
import EditSummary from './Components/EditReservation/EditSummary/editSummary.js';
import Test from './Components/SeatMapTransitionControl/SeatMapTransitionControl.js'

import UserSearch from './Components/UserSearch/UserSearch';
// import UserFlightList from './Components/UserFlightList/userFlightList';
import Summary from './Components/Summary/Summary';
import Loading from './Components/Loading/Loading';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import EditPage from './Components/EditUser/EditPage';
import UserFlights from './Components/Summary/userFlights';
import UserNavBar from './Components/NavBars/UserNavBar';
import LoginPage from './Components/login/loginPage';
import { AuthProvider, AuthContext } from './context/authContext';
import axios from 'axios';
import { Navigate } from 'react-router-dom'
import Signup from './Components/UserRegistration/signup';
import ChangePasswordPage from './Components/ChangePassword/ChangePasswordPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#076F72'
    }
  }
});


const AuthenticatedRoute = ({ children }) => {
  const [load, setLoad] = useState('wait')
  const authContext = useContext(AuthContext)
  useEffect(() => {
    axios.get("http://localhost:8000/checkAuth")
      .then(({ data: authData }) => {
        authContext.setAuthState(authData)
        setLoad('yes')
      })
      .catch(() => {
        authContext.setAuthState({})
        setLoad('no')
      })
  }, [])
  if (load === 'wait')
    return <div></div>
  else if (load === 'no')
    return <Navigate to="/login" />
  else if (load === 'yes')
    return children

}

const AdminRoute = ({ children }) => {
  const [load, setLoad] = useState('wait')
  const authContext = useContext(AuthContext)

  useEffect(() => {
    axios.get("http://localhost:8000/checkAdmin")
      .then(({ data: authData }) => {
        authContext.setAuthState(authData)
        setLoad('yes')
      })
      .catch(() => {
        setLoad('no')
      })
  }, [])
  if (load === 'wait')
    return <div></div>
  else if (load === 'no')
    return <Navigate to="/" />
  else if (load === 'yes')
    return children
}

const AppRoutes = () => {
  const authContext = useContext(AuthContext)
  window.addEventListener('storage', () => {
    authContext.setAuthState({
      accessToken: localStorage.getItem('accessToken'),
      role: localStorage.getItem('role'),
      name: localStorage.getItem('name')
    })
    console.log("hi")
  })

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
        <Route path="/profile/edit-info" element={<AuthenticatedRoute><EditPage /></AuthenticatedRoute>} />
        <Route path="/seatselector" element={<AuthenticatedRoute><SeatSelector /></AuthenticatedRoute>} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/userflights" element={<AuthenticatedRoute><UserFlights /></AuthenticatedRoute>} />
        <Route path="/payment" element={<AuthenticatedRoute><FakePayment /></AuthenticatedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/changepassword" element={<AuthenticatedRoute><ChangePasswordPage /></AuthenticatedRoute>} />
        <Route path="/singleseatselector" element={<SingleSeatSelector />} />
        <Route path="/editsummary" element={<EditSummary />} />
        <Route path="/editReservation" element={<EditReservation />} />
      </Routes>
    </Fragment>
  );
};

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>


          <AuthProvider>
            <div style={{ backgroundImage: `url(${'/download.jpg'})`, minHeight: 825 }}>
              <UserNavBar />
              <AppRoutes />
            </div>
          </AuthProvider>


        </BrowserRouter>
      </MuiThemeProvider>

    );
  }
}


export default App;
