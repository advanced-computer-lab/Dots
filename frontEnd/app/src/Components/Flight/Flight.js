import React, { Component } from 'react';
import Typography from "@material-ui/core/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import './Flight.css';
class Flight extends Component {

    constructor() {
        super();
        this.state = {
            class: 'Economy'
        }

    }

    selectFlight = (flight) => {
        console.log(flight);
    }

    handleChange = (event) => {
        this.setState({ class: event.target.value });
    };

    render() {
        return (

            <Card sx={{ maxWidth: 1200 }}>
                <CardContent>
                <Stack direction="row" spacing={3} alignItems="center">

                    <CardActionArea
                        onClick={this.selectFlight}
                    >
                        <CardContent>

                        <Stack direction="row" spacing={3} alignItems="center">

                                <Stack>
                                    <Typography variant="h6" gutterBottom component="div">
                                        08:15 PM
                                    </Typography>
                                    <Typography variant="overline" gutterBottom component="div">
                                        London
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
                                        <FlightTakeoffIcon />
                                        <Typography variant="overline" gutterBottom component="div" >
                                            Duration 2h 10m
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
                                        01:15 AM
                                    </Typography>
                                    <Typography variant="overline" gutterBottom component="div">
                                        Rome
                                    </Typography>

                                </Stack>
                                </Stack>
                        </CardContent>
                    </CardActionArea>

                    <hr
                        style={{
                            color: "black",
                            backgroundColor: "black",
                            height: 2,
                            transform: "rotate(90deg)"
                        }}
                    />
                    <Stack>
                        <FormControl sx={{ minWidth: 130 }} size="small" >
                            <InputLabel id="demo-simple-select-label">Class</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.class}
                                label="Class"
                                onChange={this.handleChange}
                            >
                                <MenuItem value={1}>Economy</MenuItem>
                                <MenuItem value={2}>Business</MenuItem>
                                <MenuItem value={3}>First</MenuItem>
                            </Select>
                        </FormControl>

                        <Stack direction="row" spacing={14} alignItems="center" justifyContent="space-between">

                            <Stack>
                                <Typography variant="overline" gutterBottom component="div">
                                    Baggage
                                </Typography>
                                <Typography variant="h5" gutterBottom component="div">
                                    2
                                </Typography>
                            </Stack>

                            <Stack>
                                <Typography variant="overline" gutterBottom component="div">
                                    PRICE
                                </Typography>
                                <Typography variant="h5" color="#09827C">
                                    $500
                                </Typography>
                            </Stack>

                        </Stack>

                    </Stack>

                </Stack>
                </CardContent>

            </Card>


        );
    }
}


export default Flight;






