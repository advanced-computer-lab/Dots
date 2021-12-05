import React, { Component } from 'react';
import Typography from "@material-ui/core/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
    ThemeProvider,
    createTheme,
    withStyles,
} from "@material-ui/core/styles";

import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import './Flight.css';
class Flight extends Component {

    constructor(props) {
        super(props);
        this.state = {
            class: 'Economy',
        }

    }



    handleChange = (event) => {
        this.setState({ class: event.target.value });
    };
    click = () => {
        if (this.props.selectFlight) {
            this.props.selectFlight(this.props.flight);
        }
    }

    render() {
        const { faded, flight } = this.props;
        const formatDate = (date) => {
            let time = (new Date(date)).toLocaleTimeString('en-US');
            let timearr = time.split(':');
            let x = timearr[2];
            let y = '';
            if (timearr[0].length === 1) {
                y = `0${timearr[0]}`;
            }
            else {
                y = `${timearr[0]}`;
            }
            return `${y}:${timearr[1]} ${x.charAt(3)}${x.charAt(4)}`
        }
        const timediff = function (dateFuture, dateNow) {
            let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

            // calculate days
            const days = Math.floor(diffInMilliSeconds / 86400);
            diffInMilliSeconds -= days * 86400;


            // calculate hours
            const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
            diffInMilliSeconds -= hours * 3600;
            // console.log('calculated hours', hours);

            // calculate minutes
            const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
            diffInMilliSeconds -= minutes * 60;
            // console.log('minutes', minutes);

            let difference = '';
            if (days > 0) {
                difference += (days === 1) ? `${days}D ` : `${days}D `;
            }

            difference += (hours === 0 || hours === 1) ? `${hours}H ` : `${hours}H `;

            difference += (minutes === 0 || hours === 1) ? `${minutes}M` : `${minutes}M`;

            return difference;
        }
        const DirectionAwareFlightTakeoffIcon = withStyles((theme) => ({
            root: {
                transform: theme.direction === "rtl" ? "scaleX(-1)" : undefined,
            },
        }))(FlightTakeoffIcon);

        const ltrTheme = createTheme({ direction: "ltr" });
        const rtlTheme = createTheme({ direction: "rtl" });
        const isRtl = true;
        return (

            <Card sx={{ maxWidth: 1200 }} id='flightCard' elevation = {8}>
                <CardActionArea
                    onClick={this.click}
                >
                    <CardContent>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <div className={` ${!(faded) ? 'hide' : ''}`}>
                                <CheckCircleOutlineIcon fontSize='large' />
                            </div>
                            <CardContent>

                                <Stack direction="row" spacing={2} alignItems="center">

                                    <Stack>
                                        <Typography variant="h6" gutterBottom component="div">
                                            {formatDate(flight.departureTime)}
                                        </Typography>
                                        <Typography variant="overline" gutterBottom component="div">
                                            {flight.departureLocation.country}
                                        </Typography>

                                    </Stack>

                                    <Stack direction="row" alignItems="center" spacing={3}>

                                        <hr
                                            style={{
                                                color: "black",
                                                backgroundColor: "black",
                                                height: 1
                                            }}
                                        />
                                        <Stack alignItems="center" spacing={0.5}>
                                            {!this.props.return ? <FlightTakeoffIcon /> : <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
                                                <DirectionAwareFlightTakeoffIcon />
                                            </ThemeProvider>}
                                            <Typography variant="overline" gutterBottom component="div" >
                                                Duration {timediff(new Date(flight.arrivalTime), new Date(flight.departureTime))}
                                            </Typography>
                                        </Stack>
                                        <hr
                                            style={{
                                                color: "black",
                                                backgroundColor: "black",
                                                height: 1
                                            }}
                                        />
                                    </Stack>

                                    <Stack>
                                        <Typography variant="h6" gutterBottom component="div">
                                            {formatDate(flight.arrivalTime)}
                                        </Typography>
                                        <Typography variant="overline" gutterBottom component="div">
                                            {flight.arrivalLocation.country}
                                        </Typography>

                                    </Stack>
                                    <Stack id='flightno'>
                                        <Typography variant="h6" gutterBottom component="div">
                                            Flight No.
                                        </Typography>
                                        <Typography variant="overline" gutterBottom component="div" id='fno'>
                                            {flight.flightNumber}
                                        </Typography>

                                    </Stack>
                                </Stack>
                            </CardContent>


                            <hr
                                style={{
                                    color: "black",
                                    backgroundColor: "black",
                                    transform: "rotate(90deg)",
                                    width: 100,
                                    height: 1.5
                                }}
                            />
                            <Stack>

                                <Stack direction="row" sx={{ minWidth: 100 }} spacing={14} alignItems="center" justifyContent="space-between" id='pricetext'>

                                    <Stack >
                                        <Typography variant="overline" gutterBottom component="div">
                                            PRICES START FROM
                                        </Typography>
                                        <Typography variant="h5" color="#09827C" id='priceValue'>
                                            ${this.props.flight.economyClassPrice}
                                        </Typography>
                                    </Stack>

                                </Stack>

                            </Stack>

                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>


        );
    }
}


export default Flight;






