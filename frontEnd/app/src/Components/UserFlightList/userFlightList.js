import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import TabBar from './TabBar/tabBar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './userFlightList.css'
import './passengerForm/passengerForm'
import Button from '@mui/material/Button';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { FormControl } from '@mui/material';
import {
    ThemeProvider,
    createTheme,
    withStyles,
} from "@material-ui/core/styles";
import PassengerForm from './passengerForm/passengerForm';
import Container from '@mui/material/Container';

class userFlightList extends Component {


    constructor(props) {
        super(props);
        const buildpassengers= (n)=>{
            let p=[];
            for(let i=0;i<n;i++){
                p[i]={
                    firstName:'',
                    lastName:'',
                    passportNo:''
                }
            }
            return p;
        }
        this.state = {
            depfaded: this.props.depfaded ? this.props.depfaded : true,
            /*depvalue: this.props.depsearchdate,
            depOriginalFlights: this.props.depOriginalFlights,
            depAllflights: this.props.depAllFlights,
            depchosenflight: this.depchosenflight,
            depflightClass: this.props.depflightClass? this.props.depflightClass : '',
            returnfaded: this.props.returnfaded,
            returnvalue: this.props.returnsearchdate,
            returnOriginalFlights: this.props.returnOriginalFlights,
            returnAllflights: this.props.returnAllFlights,
            returnchosenflight: this.props.returnchosenflight,
            returnflightClass: this.props.returnflightClass?this.props.returnflightClass  : '',
            numberOfpassengers: this.props.numberOfpassengers*/
            returnfaded: this.props.returnfaded ? this.props.returnfaded : true,
            passengers:this.props.passengers?this.props.passengers:buildpassengers(2)
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
    updatedepClass = (val1) => {
        this.setState({ depflightClass: val1 });
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
    updatereturnClass = (val1) => {
        this.setState({ returnflightClass: val1 });
    }
    onSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.passengers)
    }
    updatepassengerFirstName=(val,i )=>{
        let p=this.state.passengers;
        p[i].firstName=val;
        this.setState({
            passengers:p
        });
    }
    updatepassengerlastName=(val,i )=>{
        let p=this.state.passengers;
        p[i].lastName=val;
        this.setState({
            passengers:p
        });
    }
    updatepassengerPassportNo=(val,i )=>{
        let p=this.state.passengers;
        p[i].passportNo=val;
        this.setState({
            passengers:p
        });
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
            <Container maxWidth="xl" id="cont">

                <Typography variant="h4" component="div" id='flightText' > <FlightTakeoffIcon fontSize='large' /> {`${Allflights[0].flights[0].departureLocation.city} to ${Allflights[0].flights[0].arrivalLocation.city}`}</Typography>

                <TabBar Allflights={Allflights} value={Allflights[1].date} return={false} updateFaded={this.updatedepFaded}
                    updatevalue={this.updatedepvalue} updateAllflights={this.updatedepAllflights}
                    updatechosenflight={this.updatedepchosenflight} updateclass={this.updatedepClass} />

                <Typography variant="h4" component="div" id='flightText' > <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
                    <DirectionAwareFlightTakeoffIcon fontSize='large' />
                </ThemeProvider> {`${Allflights[0].flights[0].departureLocation.city} to ${Allflights[0].flights[0].arrivalLocation.city}`}</Typography>

                <TabBar Allflights={Allflights} value={Allflights[1].date} return={true} updateFaded={this.updatereturnFaded}
                    updatevalue={this.updatereturnvalue}
                    updateAllflights={this.updatereturnAllflights}
                    updatechosenflight={this.updatereturnchosenflight}
                    updateclass={this.updatereturnClass} />

                {!this.state.depfaded && !this.state.returnfaded ?
                    <div id="passengersForm">
                        <form onSubmit={this.onSubmit}>
                            <FormControl >
                                {Array.from(Array(2), (e, i) => {
                                    return <PassengerForm ind={i + 1} updatepassengerlastName={this.updatepassengerlastName} updatepassengerFirstName={this.updatepassengerFirstName} p={(this.state.passengers)[i]} updatepassengerPassportNo={this.updatepassengerPassportNo} />
                                })}
                                <Button variant = "contained" type="submit">Next</Button>
                            </FormControl>
                        </form>
                    </div>
                    : <div></div>}

            </Container>


        );
    }
}
export default userFlightList;