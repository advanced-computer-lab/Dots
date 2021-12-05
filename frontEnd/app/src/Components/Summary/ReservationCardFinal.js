import React, { Component, useState } from 'react';
import { Card, CardContent, CardHeader, Dialog, Divider, Grid, CardActions, Button, Typography, CircularProgress, ListItem, Alert, Stack, Accordion, AccordionDetails, AccordionSummary, List } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import Fade from 'react-reveal/Fade';
import './Summary2.css';
import axios from 'axios'



class ReservationCardFinal extends Component {
    state = {
        openCancelDialog: false,
        isLoading: false,
        error: false
    }
    onDeleteReservation = () => {
        this.setState({ isLoading: true, error: false })
        axios.delete(`http://localhost:8000/reservations/${this.props.reservation._id ? this.props.reservation._id : ''}`)
            .then(() => {
                this.setState({ openCancelDialog: false })
                setTimeout(() => {
                    this.setState({ isLoading: false })
                }, 200);
                window.location.reload(false)
            }).catch(() => {
                this.setState({ isLoading: false, error: true })
            })
    }
    openDialog = () => {
        this.setState({ openCancelDialog: true })
    }
    closeDialog = () => {
        this.setState({ openCancelDialog: false, error: false })
    }


    render() {
        var inboundClassPrice = 0;
        var outboundClassPrice = 0;
        for(let i = 0; i < this.props.reservation.passengers.length; i++){
        if (this.props.reservation.inBoundClass == "Economy") inboundClassPrice += this.props.inBound.economyClassPrice
        else if (this.props.reservation.inBoundClass == "Business") inboundClassPrice += this.props.inBound.businessClassPrice
        else if (this.props.reservation.inBoundClass == "First") inboundClassPrice += this.props.inBound.firstClassPrice
    
        if (this.props.reservation.outBoundClass == "Economy") outboundClassPrice += this.props.outBound.economyClassPrice
        else if (this.props.reservation.outBoundClass == "Business") outboundClassPrice += this.props.outBound.businessClassPrice
        else if (this.props.reservation.outBoundClass == "First") outboundClassPrice += this.props.outBound.firstClassPrice
        }
        var cardStyle = {
            borderRadius: '1vw'
        }
        return (
            <Fade right duartion={2000}><List id="list"
                sx={{
                    width: '100%',
                    maxWidth: 800,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 650,
                    '& ul': { padding: 0 },
                }}
                subheader={<li />}>
                <div id="card">
                    <Accordion>
                        <div id="AccSummary">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography id="backAndForth">{this.props.outBound.departureLocation.city.charAt(0) +
                                    this.props.outBound.departureLocation.city.substring(1).toLowerCase()}</Typography>
                                <CompareArrowsIcon id="icon"></CompareArrowsIcon>
                                <Typography id="backAndForth"> {this.props.outBound.arrivalLocation.city.charAt(0) +
                                    this.props.outBound.arrivalLocation.city.substring(1).toLowerCase()}</Typography>
                            </AccordionSummary>
                        </div>
                        <AccordionDetails>
                            <Card style={cardStyle} elevation={7} >
                                <CardHeader className="summary" title={"Confirmation Number: " + this.props.reservation.confirmationNumber} sx={{ backgroundColor: '#008080', color: 'white' }} />
                                <CardContent id="cardContent">
                                    <Grid container rowSpacing={3} alignItems="center">
                                        <Grid item xs={2}>
                                            <FlightTakeoffIcon sx={{ width: 150, height: 70 }} />
                                        </Grid>
                                        <Grid item xs={10} >
                                            <Grid container columns={11} alignItems="center" >
                                                <Grid item xs={4} >
                                                    <Typography className="t" align="center" variant="h3">
                                                        {this.props.outBound.departureLocation.city.charAt(0) +
                                                            this.props.outBound.departureLocation.city.substring(1).toLowerCase()}
                                                    </Typography>
                                                    <Typography className="t" align="center">
                                                        {new Date(this.props.outBound.departureTime).toLocaleString()}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Divider>
                                                        <ArrowForwardIcon fontSize="large" />
                                                    </Divider>
                                                    Flight {this.props.outBound.flightNumber}
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography className="t" align="center" variant="h3">
                                                        {this.props.outBound.arrivalLocation.city.charAt(0) +
                                                            this.props.outBound.arrivalLocation.city.substring(1).toLowerCase()}
                                                    </Typography>
                                                    <Typography className="t" align="center">
                                                        {new Date(this.props.outBound.arrivalTime).toLocaleString()}
                                                    </Typography>
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <FlightTakeoffIcon sx={{ width: 150, height: 70, transform: 'scaleX(-1)' }} />
                                        </Grid>
                                        <Grid item xs={10} >
                                            <Grid container columns={11} alignItems="center" >
                                                <Grid item xs={4} >
                                                    <Typography className="t" align="center" variant="h3">
                                                        {this.props.inBound.departureLocation.city.charAt(0) +
                                                            this.props.inBound.departureLocation.city.substring(1).toLowerCase()}
                                                    </Typography>
                                                    <Typography className="t" align="center">
                                                        {new Date(this.props.inBound.departureTime).toLocaleString()}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Divider>
                                                        <ArrowForwardIcon fontSize="large" />
                                                    </Divider>
                                                    Flight {this.props.inBound.flightNumber}
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography className="t" align="center" variant="h3">
                                                        {this.props.inBound.arrivalLocation.city.charAt(0) +
                                                            this.props.inBound.arrivalLocation.city.substring(1).toLowerCase()}
                                                    </Typography>
                                                    <Typography className="t" align="center">
                                                        {new Date(this.props.inBound.arrivalTime).toLocaleString()}
                                                    </Typography>
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Stack spacing={2}>
                                                        <Typography className="t" sx={{ fontWeight: 'bold' }}>
                                                            Flight No. {this.props.outBound.flightNumber} (Outbound)<br /><br />
                                                            Departure Details
                                                        </Typography>
                                                        <Typography className="t" id="text">
                                                            Country: {this.props.outBound.departureLocation.country}<br />
                                                            City: {this.props.outBound.departureLocation.city}<br />
                                                            Airport: {this.props.outBound.departureLocation.airport}<br />
                                                            Terminal: {this.props.outBound.departureLocation.terminal}<br />
                                                        </Typography>
                                                        <Typography className="t" sx={{ fontWeight: 'bold' }}>
                                                            Arrival Details
                                                        </Typography>
                                                        <Typography className="t" >
                                                            Country: {this.props.outBound.arrivalLocation.country}<br />
                                                            City: {this.props.outBound.arrivalLocation.city}<br />
                                                            Airport: {this.props.outBound.arrivalLocation.airport}<br />
                                                            Terminal: {this.props.outBound.arrivalLocation.terminal}<br />
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Stack spacing={2}>
                                                        <Typography className="t" sx={{ fontWeight: 'bold' }}>
                                                            Flight No. {this.props.inBound.flightNumber} (Inbound)<br /><br />
                                                            Departure Details
                                                        </Typography>
                                                        <Typography className="t" >
                                                            Country: {this.props.inBound.departureLocation.country}<br />
                                                            City: {this.props.inBound.departureLocation.city}<br />
                                                            Airport: {this.props.inBound.departureLocation.airport}<br />
                                                            Terminal: {this.props.inBound.departureLocation.terminal}<br />
                                                        </Typography>
                                                        <Typography className="t" sx={{ fontWeight: 'bold' }}>
                                                            Arrival Details
                                                        </Typography>
                                                        <Typography className="t">
                                                            Country: {this.props.inBound.arrivalLocation.country}<br />
                                                            City: {this.props.inBound.arrivalLocation.city}<br />
                                                            Airport: {this.props.inBound.arrivalLocation.airport}<br />
                                                            Terminal: {this.props.inBound.arrivalLocation.terminal}<br />
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Typography className="summary" sx={{ fontSize: 'large' }}>
                                            <br />

                                            {this.props.reservation.passengers.map((item, index) => (<div key={item}>
                                                <Typography className="summary" sx={{ fontSize: 'larger' }}><Typography className="summary" sx={{ fontWeight: 'bold', fontSize: 'large' }}>Passenger {index + 1}<br /></Typography>
                                                    First Name: {item.firstName + " "}
                                                    Last Name: {item.lastName + " "}<br />
                                                    Outbound Seat: {item.outBoundSeat + " "}
                                                    Inbound Seat: {item.inBoundSeat + " "}<br />
                                                    Passport Number: {item.passportNumber + " "}
                                                    <br /><br />
                                                </Typography>
                                            </div>))}
                                        </Typography>
                                        <Grid item xs={12}>
                                            <Divider sx={{ width: '60%' }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography className="summary" variant="h4">
                                                Total price: {outboundClassPrice + inboundClassPrice}$
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container justifyContent="center">
                                                <CardActions>
                                                    <Button onClick={this.openDialog}
                                                        variant="contained" size="large" color="error">Cancel My Reservation</Button>
                                                </CardActions>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <Dialog onClose={this.closeDialog} open={this.state.openCancelDialog}>
                                    {
                                        this.state.error &&
                                        <Alert variant="filled" severity="error" sx={{ borderRadius: 0 }}>
                                            Something went wrong. Please try again.
                                        </Alert>
                                    }
                                    <List>
                                        <ListItem>
                                            You are about to cancel your reservation. Please note that the rate for your
                                            flights may have been changed and if you wish to repurchase your flights, you will
                                            be charged the new rate. You will be fully refunded and sent an email to confirm the amount.
                                            Are you sure you want to delete this flight?
                                        </ListItem>
                                        <ListItem sx={{ justifyContent: "center" }}>
                                            <LoadingButton onClick={this.onDeleteReservation} loadingIndicator={<CircularProgress color="inherit" size={30} />}
                                                variant="contained" size="large" color="error" loading={this.state.isLoading}>Confirm Cancellation</LoadingButton>
                                        </ListItem>
                                    </List>
                                </Dialog>

                            </Card>

                        </AccordionDetails>
                    </Accordion>
                </div>
            </List>
            </Fade>
        );
    }
}

export default ReservationCardFinal;