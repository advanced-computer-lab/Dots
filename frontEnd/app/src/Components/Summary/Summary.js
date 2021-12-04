import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LightSpeed from 'react-reveal/LightSpeed';
import Stack from '@mui/material/Stack';
import { useHistory } from "react-router-dom";
import Fade from 'react-reveal/Fade';
import { useLocation } from "react-router-dom"
import './Summary.css';
function Content(props) {
  return (
    <div>
      <Card elevation={7}>
        <CardContent>
          <div id="cardInterior">
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <FlightTakeoffIcon />
                <Typography sx={{ textAlign: 'center', display: 'flex', justtifyContent: 'space-between', fontSize: 'large' }} className="summary" id="destination" gutterBottom>
                  Business Class
                </Typography>
                <Typography className="summary" id="destination" gutterBottom>
                  London to Rome
                </Typography>
                <Typography className="summary" id="dateTime" component="div">
                  Tue, 30 Nov • 15:45 - 19:45
                </Typography>
                <Typography className="summary" id sx={{ mr: 1, textAlign: 'right', fontWeight: 'bolder' }} color="text.secondary">
                  300$
                </Typography>
                <Typography className="summary" sx={{ marginBottom: 2 }}>
                  Seat B2
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FlightTakeoffIcon sx={{ transform: 'scaleX(-1)' }} />
                <Typography sx={{ textAlign: 'center', display: 'flex', justtifyContent: 'space-between', fontSize: 'large' }} className="summary" id="destination" gutterBottom>
                  Business Class
                </Typography>
                <Typography className="summary" id="destination" gutterBottom>
                  London to Rome
                </Typography>
                <Typography className="summary" id="dateTime" component="div">
                  Tue, 30 Nov • 15:45 - 19:45
                </Typography>
                <Typography className="summary" id sx={{ mr: 1, textAlign: 'right', fontWeight: 'bolder' }} color="text.secondary">
                  300$
                </Typography>
                <Typography className="summary" sx={{ marginBottom: 2 }}>
                  Seat B2
                </Typography>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>
      <Link to="/userflights" className="btn btn-primary" id="toSeats" elevation={7}>Continue to Seat Reservation</Link>
    </div>
  );
}

function Summary(props) {
  let location = useLocation();
  const { result } = location.state
  return (
    <div>
      <img id="background" src='/download.jpg'></img>
      <p id="top"> <Fade right>Flight Summary </Fade></p>
      <div id="Card1"><LightSpeed left><Content /></LightSpeed></div>
    </div>);
}
export default Summary;