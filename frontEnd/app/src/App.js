import React, {
  Component,
  useContext,
  Fragment,
  useEffect,
  useState,
} from "react";
import "./App.css";
import FlightsList from "./Components/flightsList.js";
import UserLanding from "./Components/UserLanding/UserLanding.js";
import SeatSelector from "./Components/SeatSelector/SeatSelector.js";
import SingleSeatSelector from "./Components/SingleSeatSelector/SingleSeatSelector";
import UserFlightList from "./Components/UserFlightList/userFlightList.js";
import FakePayment from "./Components/FakePayment/FakePayment.js";
import EditReservation from "./Components/EditReservation/editReservation.js";
import EditSummary from "./Components/EditReservation/EditSummary/editSummary.js";
import Test from "./Components/SeatMapTransitionControl/SeatMapTransitionControl.js";
import NavBarSelector from "./Components/NavBars/NavBarSelector";
import UserSearch from "./Components/UserSearch/UserSearch";
// import UserFlightList from './Components/UserFlightList/userFlightList';
import Summary from "./Components/Summary/Summary";
import Loading from "./Components/Loading/Loading";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EditPage from "./Components/EditUser/EditPage";
import UserFlights from "./Components/Summary/userFlights";
import UserNavBar from "./Components/NavBars/UserNavBar";
import LoginPage from "./Components/login/loginPage";
import { AuthProvider, AuthContext } from "./context/authContext";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Signup from "./Components/UserRegistration/signup";
import ChangePasswordPage from "./Components/ChangePassword/ChangePasswordPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Destinations from "./Components/Destination/Destinations";
import DestinationList from "./Components/DestinationList/DestinationList";
import DestinationPage from "./Components/DestinationPage/DestinationPage"

const theme = createTheme({
  palette: {
    primary: {
      main: "#076F72",
    },
  },
});

const AuthenticatedRoute = ({ children }) => {
  const [load, setLoad] = useState("wait");
  const authContext = useContext(AuthContext);
  useEffect(() => {
    axios
      .get("http://localhost:8000/checkAuth")
      .then(({ data: authData }) => {
        authContext.setAuthState(authData);
        setLoad("yes");
      })
      .catch(() => {
        authContext.setAuthState({});
        setLoad("no");
      });
  }, []);
  if (load === "wait") return <div></div>;
  else if (load === "no") return <Navigate to="/login" />;
  else if (load === "yes") return children;
};

const AdminRoute = ({ children }) => {
  const [load, setLoad] = useState("wait");
  const authContext = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:8000/checkAdmin")
      .then(({ data: authData }) => {
        authContext.setAuthState(authData);
        setLoad("yes");
      })
      .catch(() => {
        setLoad("no");
      });
  }, []);
  if (load === "wait") return <div></div>;
  else if (load === "no") return <Navigate to="/" />;
  else if (load === "yes") return children;
};

const AppRoutes = () => {
  const authContext = useContext(AuthContext);
  // window.addEventListener('storage', () => {
  //   authContext.setAuthState({
  //     accessToken: localStorage.getItem('accessToken'),
  //     role: localStorage.getItem('role'),
  //     name: localStorage.getItem('name')
  //   })
  //   console.log("hi")
  // })

  axios.interceptors.request.use(
    (config) => {
      config.headers[
        "Authorization"
      ] = `Bearer ${authContext.authState.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<UserLanding />} />
        <Route path="/flights" element={<UserFlightList />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <FlightsList />
            </AdminRoute>
          }
        />
        <Route
          path="/profile/edit-info"
          element={
            <AuthenticatedRoute>
              <EditPage />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/seatselector"
          element={
            <AuthenticatedRoute>
              <SeatSelector />
            </AuthenticatedRoute>
          }
        />
        <Route path="/loading" element={<Loading />} />
        <Route path="/summary" element={<Summary />} />
        <Route
          path="/userflights"
          element={
            <AuthenticatedRoute>
              <UserFlights />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <AuthenticatedRoute>
              <FakePayment />
            </AuthenticatedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Signup />} />
        <Route
          path="/changepassword"
          element={
            <AuthenticatedRoute>
              <ChangePasswordPage />
            </AuthenticatedRoute>
          }
        />
        <Route path="/singleseatselector" element={<SingleSeatSelector />} />
        <Route path="/editsummary" element={<EditSummary />} />
        <Route path="/editReservation" element={<EditReservation />} />
        <Route path = "/testDest" element = {<DestinationPage city = "Portofino" country = "Italy"/>} />
        <Route path="/italy/rome" element={<DestinationPage city = "Rome" country = "Italy"/>} />
        <Route path="/italy/portofino" element={<DestinationPage city = "Portofino" country = "Italy"/>} />
        <Route path="/greece/athens" element={<DestinationPage city = "Athens" country = "Greece"/>} />
        <Route path = "/croatia/split" element = {<DestinationPage city = "Split" country = "Croatia"/>} />
        <Route path = "/montonegro/kotor" element = {<DestinationPage city = "Kotor" country = "Montenegro"/>} />
        <Route path = "/spain/seville" element = {<DestinationPage city = "Seville" country = "Spain"/>} />
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
            <div>
              <NavBarSelector />
              <AppRoutes />
            </div>
          </AuthProvider>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
