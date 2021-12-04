import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import './tabBar.css';
import Flight from '../../Flight/Flight';
import FlightClassCard from '../collapsedCard/collapsedCard';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

class TabPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseCard: false,
            faded: false,
        }

    }
    update = (val, val1, val2) => {
        this.setState({ faded: val, collapseCard: val1 })
        this.props.update1(this.state.faded);
        if (!this.state.faded) {
            let f = [];
            f.push({
                date: this.props.flight.departureTime,
                flights: [this.props.flight]
            });
            this.props.update2(f, this.props.flight, val2);
        }
    }

    render() {
        const selectFlight = (flight) => {
            this.setState({ collapseCard: !this.state.collapseCard });
        }
        const { children, value, index, flight, ...other } = this.props;


        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    (this.props.flightslen===0 ? <div id='noFlights'>No Flights Available</div> :
                        <div>
                            <Flight faded={this.state.faded} flight={flight} selectFlight={selectFlight} return={this.props.return} />
                            <Collapse in={this.state.collapseCard && !this.state.faded} collapsedSize={0}>
                                <FlightClassCard update={this.update} flight={flight} />
                            </Collapse>
                        </div>)
                )}
            </div>
        );
    }
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

class BasicTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            OriginalFlights: this.props.OriginalFlights,
            Allflights: this.props.Allflights,
            faded: this.props.faded,
            chosenflight: this.props.chosenflight,
            chosenClass: this.props.chosenClass
        }

    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
        this.props.updatevalue(newValue);
    };
    update1 = (val) => {
        this.setState({ faded: val })
        this.props.updateFaded(val);// or with es6 this.setState({name})
    }
    update2 = (val, val1, val2) => {
        this.setState({ Allflights: val, chosenflight: val1, chosenClass: val2 })
        this.props.updateAllflights(val);
        this.props.updatechosenflight(val1);
        this.props.updateclass(val2);
    }

    reset = () => {
        this.setState({
            Allflights: this.state.OriginalFlights,
            chosenflight: null,
            faded: !this.state.faded,
            chosenClass: ''
        });
        this.props.updateAllflights(this.state.Allflights);
        this.props.updatechosenflight(this.state.chosenflight);
        this.props.updateFaded(true);
        this.props.updateclass(this.state.chosenClass);

    }

    render() {
        const { Allflights } = this.state;
        Allflights?.map((flight) => {
            flight.date = new Date(flight.date)
        })
        return (
            <Box >
                <Collapse in={this.state.faded} collapsedSize={0}>
                    <Box sx={{ maxWidth: 900, bgcolor: 'background.paper' }} id='flightTab'>
                        <Paper elevation={3} id='papertab'>
                            <Tabs value={(new Date(this.state.value)).setHours(0, 0, 0, 0)} onChange={this.handleChange} variant="scrollable"
                                scrollButtons={true}
                                sx={{
                                    [`& .${tabsClasses.scrollButtons}`]: {
                                        '&.Mui-disabled': { opacity: 0.3 },
                                    },
                                }}
                                aria-label="scrollable auto tabs example" id='tab'>
                                {Allflights?.map((flight, i) => (
                                    <Tab value={(flight.date).setHours(0, 0, 0, 0)} key={i} label={(new Date(flight.date)).toDateString()} {...a11yProps({ i })} />
                                ))}
                            </Tabs>
                        </Paper>
                    </Box>
                </Collapse>

                {Allflights?.map((flight, i) => (
                    flight.flights ? flight.flights.length > 0 ? flight.flights.map((f, j) => (
                        this.state.faded ?
                            <TabPanel return={this.props.return} value={(flight.date).setHours(0, 0, 0, 0)} Allflights={Allflights} update2={this.update2} update1={this.update1} index={(new Date(this.state.value)).setHours(0, 0, 0, 0)} flight={f}></TabPanel> :
                            <div id="chosendiv">
                                <Flight id="flightCard" return={this.props.return} flight={f} faded={!this.state.faded} />
                                <Button variant="text" id='diffFlighttext' onClick={this.reset}> <HighlightOffIcon />Choose different flight</Button>
                            </div>
                    )) : this.state.faded ? <TabPanel return={this.props.return} value={(flight.date).setHours(0, 0, 0, 0)} Allflights={Allflights} update2={this.update2} update1={this.update1} index={(new Date(this.state.value)).setHours(0, 0, 0, 0)} flight={null} flightslen={flight.flights.length}></TabPanel>
                        : <div></div>
                        : <div></div>
                ))}

            </Box>
        );
    }
}

export default BasicTabs;