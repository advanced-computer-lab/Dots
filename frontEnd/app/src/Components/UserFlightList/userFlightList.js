import React, { Component } from 'react';
import Flight from '../Flight/Flight';
import TabBar from './TabBar/tabBar';
import FlightClassCard from './collapsedCard/collapsedCard';
import Collapse from '@mui/material/Collapse';
class userFlightList extends Component {

    constructor() {
        super();
        this.state = {
            checked: false,
            faded: false
        }
    }
    update = val => {
        this.setState({ faded: val })// or with es6 this.setState({name})
    }
    selectFlight = (flight) => {
        this.setState({
            checked: !(this.state.checked)
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
        },{
            date: new Date('2021-12-18T00:24:00'),
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
                }, departureTime: new Date('2021-12-18T00:24:00'),
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
        },{
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
            }]
        }]
        return (
            <div>
                <TabBar Allflights={Allflights} value={Allflights[1].date}/>
                


            </div>


        );
    }
}
export default userFlightList;
/*<Flight faded={this.state.faded} selectFlight={this.selectFlight} />
                <Collapse in={this.state.checked} collapsedSize={0}>
                    <FlightClassCard faded={this.state.faded} update={this.update} />
                </Collapse>

                <TabBar />
                <Flight />*/ 