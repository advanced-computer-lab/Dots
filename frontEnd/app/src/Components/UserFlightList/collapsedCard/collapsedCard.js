import { Card, CardContent, CardActions } from '@material-ui/core';
import React, { Component } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from "@material-ui/core/Typography";
import Stack from '@mui/material/Stack';
import BackpackIcon from '@mui/icons-material/Backpack';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './collapsedCard.css';
import LuggageIcon from '@mui/icons-material/Luggage';


class FlightClassCard extends Component {
    state = {
        desktop: window.matchMedia("(min-width: 900px)").matches,
    };
    componentDidMount() {
        const handler = e => this.setState({ desktop: e.matches });
        window.matchMedia("(min-width: 900px)").addEventListener('change', handler);
    }

    changeEconomy = () => {
        //console.log(this.props.faded);
        //this.props.update(!(this.props.faded));
        this.props.update(true, false, 'Economy');

    }

    changeFirst = () => {
        //console.log(this.props.faded);
        //this.props.update(!(this.props.faded));
        this.props.update(true, false, 'First');

    }
    changeBusiness = () => {
        //console.log(this.props.faded);
        //this.props.update(!(this.props.faded));
        this.props.update(true, false, 'Business');

    }
    render() {

        return (
            <Paper elevation={3} square id='collapseContainer'>
                <Grid container spacing={2} direction = {this.state.desktop?"row":"column"} >

                    <Grid item xs={4}>
                        <Card elevation={2} className='classCard'>
                            <CardContent id='economyTitle'>
                                <Typography id='economy'>
                                    Economy Class
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Stack direction="row">
                                    <BackpackIcon fontSize="large" />
                                    <Typography id='economytext'>
                                        free carry-on bag
                                    </Typography>
                                </Stack>
                            </CardContent>
                            <CardContent id="perPassengerEconomy">
                                <Typography id='perPassengerText'>
                                    per passenger on this flight
                                </Typography>
                            </CardContent>
                            <CardActions className='zeropaddingMargin' >
                                <Button variant="outlined" id="classButton" onClick={this.changeEconomy} >${this.props.flight.economyClassPrice}</Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={4}>
                        <Card elevation={2} className='classCard'>
                            <CardContent id='firstTitle'>
                                <Typography id='economy'>
                                    Business Class
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Stack direction="row">
                                    <BackpackIcon fontSize="large" />
                                    <Typography id='economytext'>
                                        free carry-on bag
                                    </Typography>
                                </Stack>
                                <Stack direction="row">
                                    <hr
                                        style={{
                                            color: "black",
                                            backgroundColor: "black",
                                            height: 1,
                                            marginTop: 12
                                        }}
                                    />
                                    <AddCircleOutlineIcon />
                                    <hr
                                        style={{
                                            color: "black",
                                            backgroundColor: "black",
                                            height: 1,
                                            marginTop: 12
                                        }}
                                    />
                                </Stack>
                                <Stack direction="row">
                                    <LuggageIcon fontSize="large" />
                                    <Typography id='economytext'>
                                        20kg check-in bag
                                    </Typography>
                                </Stack>
                            </CardContent>
                            <CardContent id="perPassengerFirst">
                                <Typography id='perPassengerText'>
                                    per passenger on this flight
                                </Typography>
                            </CardContent>
                            <CardActions className='zeropaddingMargin' >
                                <Button variant="outlined" id="classButton" onClick={this.changeBusiness} >${this.props.flight.businessClassPrice}</Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={4}>
                        <Card elevation={2} className='classCard'>
                            <CardContent id='businessTitle'>
                                <Typography id='economy'>
                                    First Class
                                </Typography>
                            </CardContent>
                            <CardContent id='bclass'>
                                <Stack>
                                    <Stack direction="row">
                                        <BackpackIcon fontSize="large" />
                                        <Typography id='economytext'>
                                            free carry-on bag
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row">
                                        <hr
                                            style={{
                                                color: "black",
                                                backgroundColor: "black",
                                                height: 1,
                                                marginTop: 12
                                            }}
                                        />
                                        <AddCircleOutlineIcon />
                                        <hr
                                            style={{
                                                color: "black",
                                                backgroundColor: "black",
                                                height: 1,
                                                marginTop: 12
                                            }}
                                        />
                                    </Stack>
                                    <Stack direction="row">
                                        <LuggageIcon fontSize="large" />
                                        <Typography id='economytext'>
                                            20kg check-in bag
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row">
                                        <hr
                                            style={{
                                                color: "black",
                                                backgroundColor: "black",
                                                height: 1,
                                                marginTop: 12
                                            }}
                                        />
                                        <AddCircleOutlineIcon />
                                        <hr
                                            style={{
                                                color: "black",
                                                backgroundColor: "black",
                                                height: 1,
                                                marginTop: 12
                                            }}
                                        />
                                    </Stack>
                                    <Stack direction="row" >
                                        <LuggageIcon fontSize="large" />
                                        <Typography id='economytext'>
                                            32kg check-in bag
                                        </Typography>
                                    </Stack>

                                </Stack>
                            </CardContent>
                            <CardContent id="perPassengerBusiness">
                                <Typography id='perPassengerText'>
                                    per passenger on this flight
                                </Typography>
                            </CardContent>
                            <CardActions className='zeropaddingMargin' >
                                <Button variant="outlined" id="classButton" onClick={this.changeFirst} >${this.props.flight.firstClassPrice}</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}


export default FlightClassCard;