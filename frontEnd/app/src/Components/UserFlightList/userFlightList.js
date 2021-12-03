import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import TabBar from './TabBar/tabBar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './userFlightList.css'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import {
    ThemeProvider,
    createTheme,
    withStyles,
} from "@material-ui/core/styles";

class userFlightList extends Component {

    constructor() {
        super();
        this.state = {
            // depfaded: this.props.depfaded,
            // depvalue: this.props.depsearchdate,
            // depOriginalFlights: this.props.depOriginalFlights,
            // depAllflights: this.props.depAllFlights,
            // depchosenflight: this.depchosenflight,
            // returnfaded: this.props.returnfaded,
            // returnvalue: this.props.returnsearchdate,
            // returnOriginalFlights: this.props.returnOriginalFlights,
            // returnAllflights: this.props.returnAllFlights,
            // returnchosenflight: this.props.returnchosenflight,
            // numberOfpassengers: this.props.numberOfpassengers
        }
    }

    updatedepFaded = (val1) => {
        this.setState({ depfaded: val1 });
    }
    updatedepvalue = (val1) => {
        this.setState({ depvalue: val1 });
    }
    updatedepAllflights = (val1) => {
        this.setState({ depAllflights: val1 });
    }
    updatedepchosenflight = (val1) => {
        this.setState({ depchosenflight: val1 });
    }
    updatereturnFaded = (val1) => {
        this.setState({ returnfaded: val1 });
    }
    updatereturnvalue = (val1) => {
        this.setState({ returnvalue: val1 });
    }
    updatereturnAllflights = (val1) => {
        this.setState({ returnAllflights: val1 });
    }
    updatereturnchosenflight = (val1) => {
        this.setState({ returnchosenflight: val1 });
    }

    render() {
        const Allflights = [{
            date: new Date('2021-12-17T00:24:00'),
            flights: [{
                flightNumber: '4325', departureLocation: {
                    country: 'Germany',
                    city: 'Berlin',
                    airport: 'SXC',
                    terminal: '2'
                }, arrivalLocation: {
                    country: 'Egypt',
                    city: 'Cairo',
                    airport: 'CAI',
                    terminal: '1'
                }, departureTime: new Date('2021-12-17T00:24:00'),
                arrivalTime: new Date('2021-12-17T03:24:00')
            }, {
                flightNumber: '4325', departureLocation: {
                    country: 'Germany',
                    city: 'Berlin',
                    airport: 'SXC',
                    terminal: '2'
                }, arrivalLocation: {
                    country: 'Egypt',
                    city: 'Cairo',
                    airport: 'CAI',
                    terminal: '1'
                }, departureTime: new Date('2021-12-17T00:24:00'),
                arrivalTime: new Date('2021-12-17T03:24:00')
            }]
        }, {
            date: new Date('2021-12-18T00:24:00'),
            flights: [{
                flightNumber: '4325', departureLocation: {
                    country: 'Germanyyyy',
                    city: 'Berlinnnn',
                    airport: 'SXC',
                    terminal: '2'
                }, arrivalLocation: {
                    country: 'Egypt',
                    city: 'Cairo',
                    airport: 'CAI',
                    terminal: '1'
                }, departureTime: new Date('2021-12-18T00:22:00'),
                arrivalTime: new Date('2021-12-18T03:24:00')
            }, {
                flightNumber: '4325', departureLocation: {
                    country: 'Germany',
                    city: 'Berlin',
                    airport: 'SXC',
                    terminal: '2'
                }, arrivalLocation: {
                    country: 'Egypt',
                    city: 'Cairo',
                    airport: 'CAI',
                    terminal: '1'
                }, departureTime: new Date('2021-12-18T00:24:00'),
                arrivalTime: new Date('2021-12-18T03:24:00')
            }]
        }, {
            date: new Date('2021-12-19T00:24:00'),
            flights: [{
                flightNumber: '4325', departureLocation: {
                    country: 'Germany',
                    city: 'Berlin',
                    airport: 'SXC',
                    terminal: '2'
                }, arrivalLocation: {
                    country: 'Egypt',
                    city: 'Cairo',
                    airport: 'CAI',
                    terminal: '1'
                }, departureTime: new Date('2021-12-19T00:24:00'),
                arrivalTime: new Date('2021-12-19T03:24:00')
            }, {
                flightNumber: '4325', departureLocation: {
                    country: 'United Kingdom',
                    city: 'Berlin',
                    airport: 'SXC',
                    terminal: '2'
                }, arrivalLocation: {
                    country: 'Egypt',
                    city: 'Cairo',
                    airport: 'CAI',
                    terminal: '1'
                }, departureTime: new Date('2021-12-19T00:24:00'),
                arrivalTime: new Date('2021-12-19T03:24:00')
            }]
        }]
        const DirectionAwareFlightTakeoffIcon = withStyles((theme) => ({
            root: {
                transform: theme.direction === "rtl" ? "scaleX(-1)" : undefined,
            },
        }))(FlightTakeoffIcon);

        const ltrTheme = createTheme({ direction: "ltr" });
        const rtlTheme = createTheme({ direction: "rtl" });
        const isRtl = true;


        return (
            <div>

                <Typography variant="h4" component="div" id='flightText' > <FlightTakeoffIcon fontSize='large' /> {`${Allflights[0].flights[0].departureLocation.city} to ${Allflights[0].flights[0].arrivalLocation.city}`}</Typography>

                <TabBar Allflights={Allflights} value={Allflights[1].date} return={false} updateFaded={this.updatedepFaded}
                    updatevalue={this.updatedepvalue} updateAllflights={this.updatedepAllflights}
                    updatechosenflight={this.updatedepchosenflight} />

                <Typography variant="h4" component="div" id='flightText' > <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
                    <DirectionAwareFlightTakeoffIcon fontSize='large' />
                </ThemeProvider> {`${Allflights[0].flights[0].departureLocation.city} to ${Allflights[0].flights[0].arrivalLocation.city}`}</Typography>

                <TabBar Allflights={Allflights} value={Allflights[1].date} return={true} updateFaded={this.updatereturnFaded}
                    updatevalue={this.updatereturnvalue}
                    updateAllflights={this.updatereturnAllflights}
                    updatechosenflight={this.updatereturnchosenflight} />

            </div>


        );
    }
}
export default userFlightList;