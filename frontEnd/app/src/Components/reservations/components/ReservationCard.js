import React, { Component } from 'react';
import { Card, CardContent, CardHeader, Avatar, Divider, Grid, Typography, CardActions, Button, Dialog, Stack, List, ListItem } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios'

class ReservationCard extends Component {
    state = {
        openCancelDialog: false,
    }
    openDialog = () => {
        this.setState({ openCancelDialog: true })
    }
    closeDialog = () => {
        this.setState({ openCancelDialog: false })
    }

    onDeleteReservation = () => {
        //add user and reservation id later to the path and afterwards remove reservation from front-end
        axios.delete(`http://localhost:8000/reservations/${'61a7f10e4f6448c1e7a8cd10'}`)
            .then(() => {
                this.setState({ openCancelDialog: false })
            })
    }

    render() {
        var cardStyle = {
            borderRadius: '1vw'
        }
        return (
            <Card style={cardStyle} elevation={7} >
                <CardHeader title="Reservation Number: Qw123e" sx={{ backgroundColor: '#008080', color: 'white' }} />

                <CardContent>
                    <Grid container rowSpacing={3} alignItems="center">
                        <Grid item xs={2}>
                            <Avatar alt="Takeoff Logo" src="/Plane.jpg" sx={{ width: 150, height: 150 }} />
                        </Grid>
                        <Grid item xs={10} >
                            <Grid container columns={11} alignItems="center" >
                                <Grid item xs={2} >
                                    <Typography align="center" variant="h3">
                                        Cairo
                                    </Typography>
                                    <Typography align="center">
                                        12th Dec 2021 15:00 GMT
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Divider>
                                        <ArrowForwardIcon fontSize="large" />
                                    </Divider>
                                    Flight Qw123e
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography align="center" variant="h3">
                                        Cairo
                                    </Typography>
                                    <Typography align="center">
                                        12th Dec 2021 15:00 GMT
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
                                    <Typography align="center" variant="h3">
                                        Cairo
                                    </Typography>
                                    <Typography align="center">
                                        12th Dec 2021 15:00 GMT
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Divider>
                                        <ArrowForwardIcon fontSize="large" />
                                    </Divider>
                                    Flight Qw123e
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography align="center" variant="h3">
                                        Cairo
                                    </Typography>
                                    <Typography align="center">
                                        12th Dec 2021 15:00 GMT
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography sx={{ fontWeight: 'bold' }}>
                                        Flight No. Qw123e (Outbound)
                                    </Typography>
                                    <Typography>
                                        Country:<br />
                                        City:<br />
                                        Airport:<br />
                                        Terminal:<br />
                                        From:<br />
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography sx={{ fontWeight: 'bold' }}>
                                        Flight No. Qw123e (Inbound)
                                    </Typography>
                                    <Typography>
                                        Country:<br />
                                        City:<br />
                                        Airport:<br />
                                        Terminal:<br />
                                        From:<br />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ width: '60%' }} />
                        </Grid>
                        <Grid item>
                            <Typography variant="h4">
                                Total Price = $123
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center">
                                <CardActions>
                                    <Button onClick={this.openDialog}
                                        variant="contained" size="large" color="error" sx={{ mr: 'auto' }}>Cancel My Reservation</Button>
                                </CardActions>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>

                <Dialog onClose={this.closeDialog} open={this.state.openCancelDialog}>
                    <List justifyContent="center">
                        <ListItem>
                            You are about to cancel your reservation. Please note that the rate for your
                            flights may have been changed and if you wish to repurchase your flights, you will
                            be charged the new rate. You will be fully refunded and sent an email to confirm the amount.
                            Are you sure you want to delete this flight?
                        </ListItem>
                        <ListItem sx={{ justifyContent: "center" }}>
                            <Button onClick={this.onDeleteReservation}
                                variant="contained" size="large" color="error" sx={{ mr: 'auto' }}>Confirm Cancellation</Button>
                        </ListItem>
                    </List>
                </Dialog>
            </Card>
        );
    }
}

export default ReservationCard;