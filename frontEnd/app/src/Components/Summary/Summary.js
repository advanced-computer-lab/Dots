import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LightSpeed from 'react-reveal/LightSpeed';
//import SeatSelector from '../SeatSelector/SeatSelector.js';
import Fade from 'react-reveal/Fade';
import { useLocation } from "react-router-dom"
import './Summary.css';
import axios from 'axios'
import LoginComponent from '../login/components/loginComponent'

function Content(props) {
  const [route, setRoute] = useState("")
  const [openLoginDialog, setOpenLoginDialog] = useState(false)
  useEffect(() => {
    axios.get('http://localhost:8000/checkAuth')
      .then(() => {
        setRoute("/seatselector")
        console.log("hi")
      })
      .catch((err) => {
        console.log(err)
      })
  })
  var departureflightprice = 0;
  var arrivalflightprice = 0;
  for (let i = 0; i < props.reservation.passengers.length; i++) {
    if (props.reservation.depflightClass === "Economy") departureflightprice += props.departure.economyClassPrice;
    else if (props.reservation.depflightClass === "Business") departureflightprice += props.departure.businessClassPrice;
    else if (props.reservation.depflightClass === "First") departureflightprice += props.departure.firstClassPrice;

    if (props.reservation.returnflightClass === "Economy") arrivalflightprice += props.arrival.economyClassPrice;
    else if (props.reservation.returnflightClass === "Business") arrivalflightprice += props.arrival.businessClassPrice;
    else if (props.reservation.returnflightClass === "First") arrivalflightprice += props.arrival.firstClassPrice;
  }
  const onLoginDialogClose = () => {
    setOpenLoginDialog(false)
  }

  const handleGoToSeatSelection = () => {
    axios.get('http://localhost:8000/checkAuth')
      .then(() => {
        setRoute("/seatselector")
      })
      .catch(() => {
        setOpenLoginDialog(true)
      })
    //try setting a timeout here to see if the linking happens after one click only
  }
  return (
    <div>
      <Card elevation={7}>
        <CardContent>
          <div id="cardInterior">
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <FlightTakeoffIcon />
                <Typography sx={{ textAlign: 'center', display: 'flex', justtifyContent: 'space-between', fontSize: 'large' }} className="summary" id="destination" gutterBottom>
                  {props.reservation.depflightClass} Class
                </Typography>
                <Typography className="summary" id="destination" gutterBottom>
                  {props.departure.departureLocation.city.charAt(0).toUpperCase() + props.departure.departureLocation.city.substring(1).toLowerCase()} to
                  {" " + props.departure.arrivalLocation.city.charAt(0).toUpperCase() + props.departure.arrivalLocation.city.substring(1).toLowerCase()}
                </Typography>
                <Typography className="summary" id="dateTime" component="div">
                  {new Date(props.departure.departureTime).toLocaleString()}
                </Typography>
                <Typography className="summary" id sx={{ mr: 1, textAlign: 'right', fontWeight: 'bolder', transform: 'translateY(21px)' }} color="text.secondary">
                  {departureflightprice}$
                </Typography>
                <Typography sx={{ transform: 'translateY(-10px)' }} className="summary">{props.reservation.passengers.length} passengers</Typography>

              </Grid>
              <Grid item xs={6}>
                <FlightTakeoffIcon sx={{ transform: 'scaleX(-1)' }} />
                <Typography sx={{ textAlign: 'center', display: 'flex', justtifyContent: 'space-between', fontSize: 'large' }} className="summary" id="destination" gutterBottom>
                  {props.reservation.returnflightClass} Class
                </Typography>
                <Typography className="summary" id="destination" gutterBottom>
                  {props.departure.arrivalLocation.city.charAt(0).toUpperCase() + props.departure.arrivalLocation.city.substring(1).toLowerCase()} to
                  {" " + props.departure.departureLocation.city.charAt(0).toUpperCase() + props.departure.departureLocation.city.substring(1).toLowerCase()}
                </Typography>
                <Typography className="summary" id="dateTime" component="div">
                  {new Date(props.arrival.departureTime).toLocaleString()}
                </Typography>
                <Typography sx={{ transform: 'translateY(20px)' }} className="summary">{props.reservation.passengers.length} passengers</Typography>
                <Typography className="summary" id sx={{ mr: 1, textAlign: 'right', fontWeight: 'bolder' }} color="text.secondary">
                  {arrivalflightprice}$
                </Typography>
                <Typography className="summary" id="totalPrice" >
                  Total Price: <br />
                  <Typography sx={{ transform: 'translateX(20px)' }}>{departureflightprice + arrivalflightprice}$</Typography>
                </Typography>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>
      <Link to={route} onClick={handleGoToSeatSelection} type="submit" className="btn btn-primary" id="toSeats" elevation={7} state={{ result: props.reservation }}>Continue to Seat Reservation</Link>
      <Dialog open={openLoginDialog} onClose={onLoginDialogClose}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <LoginComponent close={onLoginDialogClose} />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}


function Summary(props) {
  let location = useLocation();
  const { result } = location.state
  console.log(result);
  return (
    <div style={{ minHeight: 750 }}>
      <p id="top"> <Fade right>Flight Summary </Fade></p>
      <div id="Card1"><LightSpeed left><Content departure={result.depchosenflight}
        reservation={result} arrival={result.returnchosenflight} /></LightSpeed></div>
      <Link to="/flights" type="submit" state={{ result: result }} >
        <Button id="goBackButtonSummary" sx={{ ml: 15 }} variant="contained" color="error">
          Back to picking flights
        </Button>
      </Link>
    </div>);
}
export default Summary;