import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import './tabBar.css';
import Flight from '../../Flight/Flight';
import FlightClassCard from '../collapsedCard/collapsedCard';
import Collapse from '@mui/material/Collapse';

class TabPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseCard: false,
            faded: false
        }

    }
    update = (val, val1) => {
        this.setState({ faded: val, collapseCard: val1 })
        this.props.update1(this.state.faded);
        console.log(this.state.faded);
        if (!this.state.faded) {
            let f = [];
            f.push({
                date: this.props.flight.departureTime,
                flights: [this.props.flight]
            });
            console.log(f);
            this.props.update2(f);
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
                    <div>
                        <Flight faded={this.state.faded} flight={flight} selectFlight={selectFlight} />
                        <Collapse in={this.state.collapseCard && !this.state.faded} collapsedSize={0}>
                            <FlightClassCard update={this.update} />
                        </Collapse>
                    </div>
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
            OriginalFlights: this.props.Allflights,
            Allflights: this.props.Allflights,
            faded: true,
            chosenflight: null
        }

    }

    handleChange = (event, newValue) => {
        console.log(newValue);
        this.setState({ value: newValue })
    };
    update1 = (val) => {
        this.setState({ faded: val })// or with es6 this.setState({name})
    }
    update2 = (val) => {
        this.setState({ Allflights: val })// or with es6 this.setState({name})
    }


    render() {
        const { Allflights } = this.state;
        return (
            <Box >
                <Collapse in={this.state.faded} collapsedSize={0}>
                    <Box sx={{ maxWidth: 900, bgcolor: 'background.paper' }} id='flightTab'>
                        <Paper elevation={3} id='papertab'>
                            <Tabs value={this.state.value} onChange={this.handleChange} variant="scrollable"
                                scrollButtons={true}
                                sx={{
                                    [`& .${tabsClasses.scrollButtons}`]: {
                                        '&.Mui-disabled': { opacity: 0.3 },
                                    },
                                }}
                                aria-label="scrollable auto tabs example" id='tab'>
                                {Allflights?.map((flight, i) => (
                                    <Tab value={flight.date} label={flight.date.toDateString()} {...a11yProps({ i })} />
                                ))}
                            </Tabs>
                        </Paper>
                    </Box>
                </Collapse>

                {Allflights?.map((flight, i) => (
                    flight.flights?.map((f, j) => (
                        this.state.faded ? <TabPanel value={flight.date} Allflights={Allflights} update2={this.update2} update1={this.update1} index={this.state.value} flight={f}></TabPanel> : <Flight flight={f} faded={!this.state.faded} />
                    ))
                ))}

            </Box>
        );
    }
}

export default BasicTabs;