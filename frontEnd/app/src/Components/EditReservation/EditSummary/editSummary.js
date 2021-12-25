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
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LightSpeed from 'react-reveal/LightSpeed';
import Stack from '@mui/material/Stack';
import { useHistory } from "react-router-dom";
//import SeatSelector from '../SeatSelector/SeatSelector.js';
import Fade from 'react-reveal/Fade';
import { useLocation } from "react-router-dom"
import './editSummary.css';
function Content(props) {
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
    let oldDepPrice = 0;
    let oldReturnPrice = 0;
    for (let i = 0; i < props.reservation.passengers.length; i++) {
        if (props.reservation.reservation.outBoundClass === "Economy") oldDepPrice += props.reservation.reservation.outBoundflight.economyClassPrice;
        else if (props.reservation.reservation.outBoundClass === "Business") oldDepPrice += props.reservation.reservation.outBoundflight.businessClassPrice;
        else if (props.reservation.reservation.outBoundClass === "First") oldDepPrice += props.reservation.reservation.outBoundflight.firstClassPrice;

        if (props.reservation.reservation.inBoundClass === "Economy") oldReturnPrice += props.reservation.reservation.inBoundflight.economyClassPrice;
        else if (props.reservation.reservation.inBoundClass === "Business") oldReturnPrice += props.reservation.reservation.inBoundflight.businessClassPrice;
        else if (props.reservation.reservation.inBoundClass === "First") oldReturnPrice += props.reservation.reservation.inBoundflight.firstClassPrice;
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

                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={8}>
                                <Stack direction="row" alignItems="center" spacing={6} id="totalPrice" >
                                    <Typography className="summary" >
                                        New Ticket Price: <br />
                                        <Typography sx={{ transform: 'translateX(40px)' }}>{departureflightprice + arrivalflightprice}$</Typography>
                                    </Typography>
                                    <Typography className="summary">
                                        Old Ticket Price: <br />
                                        <Typography sx={{ transform: 'translateX(40px)' }}>{oldDepPrice + oldReturnPrice}$</Typography>
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </div>
                </CardContent>
            </Card>
            <Link to="/singleseatselector" type="submit" className="btn btn-primary" id="toSeats" elevation={7} state={{ result: props.result,priceDifference:((departureflightprice+arrivalflightprice)-(oldDepPrice+oldReturnPrice)),newPrice:(departureflightprice+arrivalflightprice) }}>Continue to Seat Reservation</Link>
        </div>
    );
}


function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle className="summary" sx={{ fontWeight: 'bold' }}>Please login to proceed further.</DialogTitle>


        </Dialog>
    );
}

function Summary(props) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };
    let location = useLocation();
    const { result } = location.state
    if (result.departureSearch) {
        result.returnchosenflight = result.reservation.inBoundflight;
        result.returnflightClass = result.reservation.inBoundClass;
    } else if (result.returnSearch) {
        result.depchosenflight = result.reservation.outBoundflight;
        result.depflightClass = result.reservation.outBoundClass;
    }
    console.log(result);
    return (
        <div>
            <img id="backgroundImage" src='/download.jpg'></img>
            <p id="top"> <Fade right>Flight Summary </Fade></p>
            <div id="Card1"><LightSpeed left><Content
                result={result} reservation={{
                    reservation: result.reservation,
                    depfaded: result.depfaded,
                    depvalue: result.depsearchdate,
                    depOriginalFlights: result.depOriginalFlights,
                    depAllflights: result.depAllFlights,
                    depchosenflight: result.depchosenflight,
                    depflightClass: result.depflightClass,
                    returnfaded: result.returnfaded,
                    returnvalue: result.returnsearchdate,
                    returnOriginalFlights: result.returnOriginalFlights,
                    returnAllflights: result.returnAllflights,
                    returnchosenflight: result.returnchosenflight,
                    returnflightClass: result.returnflightClass,
                    numberOfpassengers: result.numberOfpassengers,
                    noOutFlights: result.noOutFlights,
                    noInFlights: result.noInFlights,
                    passengers: result.reservation.passengers
                }} departure={result.depchosenflight}
                arrival={result.returnchosenflight} /></LightSpeed></div>
            <Link to="/editReservation" type="submit" state={{
                result: {
                    depfaded: result.depfaded,
                    depsearchdate: result.depsearchdate,
                    depOriginalFlights: result.depOriginalFlights,
                    depAllFlights: result.depAllFlights,
                    depchosenflight: result.depchosenflight,
                    depflightClass: result.depflightClass,
                    returnfaded: result.returnfaded,
                    returnsearchdate: result.returnsearchdate,
                    returnOriginalFlights: result.returnOriginalFlights,
                    returnAllflights: result.returnAllflights,
                    returnchosenflight: result.returnchosenflight,
                    returnflightClass: result.returnflightClass,
                    numberOfpassengers: result.numberOfpassengers,
                    noOutFlights: result.noOutFlights,
                    noInFlights: result.noInFlights
                },
                depClass: result.depClass,
                arrClass: result.arrClass,
                depDate: result.depDate,
                arrDate: result.arrDate,
                from: result.from,
                to: result.to,
                adults: result.adults,
                departureSearch: result.departureSearch,
                returnSearch: result.returnSearch,
                oldDepartureFlight: result.oldDepartureFlight,
                oldReturnFlight: result.oldReturnFlight,
                invalidDepdate: result.invalidDepdate,
                invalidReturndate: result.invalidReturndate,
                reservation: result.reservation
            }} >
                <Button id="goBackButtonSummary" sx={{ mb: '5px' }} variant="contained" color="error">
                    Back to picking flights
                </Button>
            </Link>
            <SimpleDialog
                open={open}
                onClose={handleClose}
            />
        </div>);
}
export default Summary;