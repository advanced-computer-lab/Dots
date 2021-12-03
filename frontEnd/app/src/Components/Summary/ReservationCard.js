import React, { Component, useState } from 'react';
import { Card, CardContent, CardHeader, Avatar, Divider, Grid, Typography, CardActions, Button, Stack, Accordion, AccordionDetails, AccordionSummary,List } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import Fade from 'react-reveal/Fade';
import './Summary2.css';



class ReservationCard extends Component {
    state = {
        openCancelDialog: false,
    }
    
    render() {
    var inboundClassPrice = 0;
    var outboundClassPrice = 0;
    if (this.props.reservation.inBoundClass == "Economy") inboundClassPrice = this.props.inBound.economyClassPrice
    else if (this.props.reservation.inBoundClass == "Business") inboundClassPrice = this.props.inBound.businessClassPrice
    else if (this.props.reservation.inBoundClass == "First") inboundClassPrice = this.props.inBound.firstClassPrice

    if (this.props.reservation.outBoundClass == "Economy") outboundClassPrice = this.props.outBound.economyClassPrice
    else if (this.props.reservation.outBoundClass == "Business") outboundClassPrice = this.props.outBound.businessClassPrice
    else if (this.props.reservation.outBoundClass == "First") outboundClassPrice = this.props.outBound.firstClassPrice
        var cardStyle = {
            borderRadius: '1vw'
        }
        return (
            <Fade right duartion = {2000}><List id= "list"
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
      <div id= "card">
            <Accordion>
            <div id = "AccSummary">
            <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography id= "backAndForth">{this.props.outBound.departureLocation.country.charAt(0) +
                                            this.props.outBound.departureLocation.country.substring(1).toLowerCase()}</Typography>
          <CompareArrowsIcon id= "icon"></CompareArrowsIcon>
          <Typography id= "backAndForth"> {this.props.outBound.arrivalLocation.country.charAt(0) +
                                            this.props.outBound.arrivalLocation.country.substring(1).toLowerCase()}</Typography>
        </AccordionSummary>
        </div>
        <AccordionDetails>
            <Card  style={cardStyle} elevation={7} >
                <CardHeader title={"Reservation Number: " + this.props.reservation._id}  sx={{ backgroundColor: '#008080', color: 'white' }} />

                <CardContent id="cardContent">
                    <Grid container rowSpacing={3} alignItems="center">
                        <Grid item xs={2}>
                            <Avatar alt="Takeoff Logo" src="/Plane.jpg" sx={{ width: 150, height: 150 }} />
                        </Grid>
                        <Grid item xs={10} >
                            <Grid container columns={11} alignItems="center" >
                                <Grid item xs={2} >
                                    <Typography className ="t" align="center" variant="h3">
                                        {this.props.outBound.departureLocation.country.charAt(0) +
                                            this.props.outBound.departureLocation.country.substring(1).toLowerCase()}
                                    </Typography>
                                    <Typography className ="t" align="center">
                                    {new Date(this.props.outBound.departureTime).toDateString() + " " + new Date(this.props.outBound.departureTime).toTimeString()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Divider>
                                        <ArrowForwardIcon fontSize="large" />
                                    </Divider>
                                    Flight {this.props.outBound.flightNumber}
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography className ="t" align="center" variant="h3">
                                    {this.props.outBound.arrivalLocation.country.charAt(0) +
                                            this.props.outBound.arrivalLocation.country.substring(1).toLowerCase()}
                                    </Typography>
                                    <Typography className ="t" align="center">
                                    {new Date(this.props.outBound.arrivalTime).toDateString() + " " + new Date(this.props.outBound.arrivalTime).toTimeString()}
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Avatar alt="Takeoff Logo" src="/Plane.jpg" sx={{ width: 150, height: 150 }} />
                        </Grid>
                        <Grid item xs={10} >
                            <Grid container columns={11} alignItems="center" >
                                <Grid item xs={4} >
                                    <Typography className ="t" align="center" variant="h3">
                                    {this.props.inBound.departureLocation.country.charAt(0) +
                                        this.props.inBound.departureLocation.country.substring(1).toLowerCase()}
                                    </Typography>
                                    <Typography className ="t" align="center">
                                    {new Date(this.props.inBound.departureTime).toDateString() + " " + new Date(this.props.inBound.departureTime).toTimeString()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Divider>
                                        <ArrowForwardIcon fontSize="large" />
                                    </Divider>
                                    Flight {this.props.inBound.flightNumber}
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography className ="t" align="center" variant="h3">
                                    {this.props.inBound.arrivalLocation.country.charAt(0) +
                                        this.props.inBound.arrivalLocation.country.substring(1).toLowerCase()}
                                    </Typography>
                                    <Typography className ="t" align="center">
                                    {new Date(this.props.inBound.arrivalTime).toDateString() + " " + new Date(this.props.inBound.arrivalTime).toTimeString()}
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={6}>
                                <Stack spacing = {2}>
                                    <Typography className ="t"  sx={{ fontWeight: 'bold' }}>
                                        Flight No. {this.props.outBound.flightNumber} (Outbound)<br/><br/>
                                        Departure Details
                                    </Typography>
                                    <Typography className ="t" id = "text">
                                        Country: {this.props.outBound.departureLocation.country}<br />
                                        City: {this.props.outBound.departureLocation.city}<br />
                                        Airport: {this.props.outBound.departureLocation.airport}<br />
                                        Terminal: {this.props.outBound.departureLocation.terminal}<br />
                                    </Typography>
                                    <Typography className ="t" sx={{ fontWeight: 'bold' }}>
                                        Arrival Details
                                    </Typography>
                                    <Typography className ="t" >
                                        Country: {this.props.outBound.arrivalLocation.country}<br />
                                        City: {this.props.outBound.arrivalLocation.city}<br />
                                        Airport: {this.props.outBound.arrivalLocation.airport}<br />
                                        Terminal: {this.props.outBound.arrivalLocation.terminal}<br />
                                    </Typography>
                                    </Stack>
                                    </Grid>
                                <Grid item xs={6}>
                                <Stack spacing = {2}>
                                    <Typography className ="t" sx={{ fontWeight: 'bold' }}>
                                        Flight No. {this.props.inBound.flightNumber} (Inbound)<br/><br/>
                                        Departure Details
                                    </Typography>
                                    <Typography className ="t" >
                                    Country: {this.props.inBound.departureLocation.country}<br />
                                        City: {this.props.inBound.departureLocation.city}<br />
                                        Airport: {this.props.inBound.departureLocation.airport}<br />
                                        Terminal: {this.props.inBound.departureLocation.terminal}<br />
                                    </Typography>
                                    <Typography className ="t" sx={{ fontWeight: 'bold' }}>
                                        Arrival Details
                                    </Typography>
                                    <Typography className ="t">
                                    Country: {this.props.inBound.arrivalLocation.country}<br />
                                        City: {this.props.inBound.arrivalLocation.city}<br />
                                        Airport: {this.props.inBound.arrivalLocation.airport}<br />
                                        Terminal: {this.props.inBound.arrivalLocation.terminal}<br />
                                    </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{width:'60%'}} />
                        </Grid>
                        <Grid item>
                            <Typography variant="h4">
                                Total price: {outboundClassPrice + inboundClassPrice}$
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center">
                                <CardActions>
                                
                                    <Button onClick={() => { this.setState({ openCancelDialog: true }) }}
                                        variant="contained" size="large" color="error" sx={{ mr: 'auto' }}>Cancel My Reservation</Button>
                                    
                                </CardActions>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            </AccordionDetails>
            </Accordion>
            </div>
            </List>
           </Fade>
        );
    }
}

export default ReservationCard;