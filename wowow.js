import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './tabBar.css';

class TabPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    render() {
        const { children, value, index, ...other } = this.props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

}

class BasicTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }

    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue })
    };
    render() {
        return (
            <Box >
                <Box sx={{ maxWidth: 900, bgcolor: 'background.paper' }} id='flightTab'>
                    <Tabs value={this.state.value} onChange={this.handleChange} variant="scrollable"
                        scrollButtons={true}
                        aria-label="scrollable auto tabs example" id='tab'>
                        <Tab label="Item One" {...a11yProps(0)} />
                        <Tab label="Item Two" {...a11yProps(1)} />
                        <Tab label="Item Three" {...a11yProps(2)} />
                        <Tab label="Item Four" />
                        <Tab label="Item Five" />
                        <Tab label="Item Six" />
                        <Tab label="Item Seven" />
                        <Tab label="Item Six" />
                        <Tab label="Item Seven" />
                        <Tab label="Item Six" />
                        <Tab label="Item Seven" />
                    </Tabs>
                </Box>
                <TabPanel value={this.state.value} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                    Item Three
                </TabPanel>
            </Box>
        );
    }
}

export default BasicTabs;