import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import rome from '../Destination/Rome.jpg';
import athens from '../Destination/Athens.jpg';
import kotor from '../Destination/Kotor.jpg';
import portofino from '../Destination/Portofino.jpg';
import seville from '../Destination/Seville.jpg';
import split from '../Destination/Split.jpg';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ReactFragment } from 'react';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TikTok } from "react-tiktok";
import Stack from '@mui/material/Stack';
import Sticky from 'react-sticky-el';
import Destination from '../Destination/Destinations';
import axios from 'axios';
import cors from 'cors';
import DestinationFlightList from '../UserFlightList/destinationFlightList';


const cities = {
    "cairo": "CAIRO", "munich": "MUNICH INTRL AIRPORT",
    "rome": "LEONARDO DA VINCI INTERNATIONAL AIRPORT", "athens": "ATHENS AIRPORT",
    "kotor": "DUBROVNIK", "portofino": "SESTRI", "seville": "SEVILLE", "split": "SPLIT"
};

class DestinationPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            city: this.props.city,
            country: this.props.country,
            menuTabValue: 0,
            urls: [],
            desktop: window.matchMedia("(min-width: 900px)").matches,
            flights: {}

        }
    }


    componentDidMount = async () => {

        let depDate = new Date('06-12-2022');

        let date = new Date('06-23-2022');

        const location = await axios.get('http://localhost:8000/location');

        let from = "MUNICH INTRL AIRPORT"
        if (location.data) {
            switch (location.data.country) {
                case "Egypt": from = "CAIRO"; break;
                case "Germany": from = "MUNICH INTRL AIRPORT"; break;
                default: from = "MUNICH INTRL AIRPORT"; break;
            }
        }

        let to = "";
        switch (this.state.city) {
            case "Rome": to = cities.rome; break;
            case "Athens": to = cities.athens; break;
            case "Kotor": to = cities.kotor; break;
            case "Portofino": to = cities.portofino; break;
            case "Seville": to = cities.seville; break;
            case "Split": to = cities.split; break;
            default: to = cities.rome; break;
        }


        let query = { "out": { "dep": depDate, "class": "economy" }, "in": { "dep": date, "class": "economy" }, "from": from, "to": to, "adults": 1, "kids": 0 }


        switch (this.state.city) {
            case "Rome": this.setState({ urls: this.destintations.rome }); break;
            case "Athens": this.setState({ urls: this.destintations.athens }); break;
            case "Kotor": this.setState({ urls: this.destintations.kotor }); break;
            case "Portofino": this.setState({ urls: this.destintations.portofino }); break;
            case "Seville": this.setState({ urls: this.destintations.seville }); break;
            case "Split": this.setState({ urls: this.destintations.split }); break;
            default: this.setState({ urls: [] }); break;
        }

        const handler = e => this.setState({ desktop: e.matches });
        window.matchMedia("(min-width: 900px)").addEventListener('change', handler);

        let flightResults = await axios.post('http://localhost:8000/flights/flightquery', query);
        console.log(flightResults.data);
        this.setState({ flights: flightResults.data });

    }


    getDestinationPic = () => {
        let { city } = this.props;
        switch (city) {
            case "Rome": return rome;
            case "Athens": return athens;
            case "Kotor": return kotor;
            case "Portofino": return portofino;
            case "Seville": return seville;
            case "Split": return split;
            default: return null;

        }
    }

    handleDestinationMenuChange = (event, newValue) => {
        this.setState({ menuTabValue: newValue });
    };

    a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    destintations = {
        "rome": ["https://www.tiktok.com/@jeffdhyer/video/7031937141240417583?is_from_webapp=1&sender_device=pc&web_id6944758566327928326", "https://www.tiktok.com/@livevirtualguide/video/7013305827318615302?is_copy_url=1&is_from_webapp=v1&q=rome&t=1646076821391",
            "https://www.tiktok.com/@megansalthouse/video/7062465889953697030", "https://www.tiktok.com/@livevirtualguide/video/7053917635569831174", "https://www.tiktok.com/@sully_97/video/7057171082473917742",
            "https://www.tiktok.com/@coriinthecity/video/7010417651218500870"],
        "athens": ["https://www.tiktok.com/@marivily/video/7022682128571829510", "https://www.tiktok.com/@handluggageonly/video/6964074159802567941", "https://www.tiktok.com/@maryberrybeth/video/7020062977839713541?is_from_webapp=1&sender_device=pc&web_id6944758566327928326",
            "https://www.tiktok.com/@reine.na/video/7043327929081761030", "https://www.tiktok.com/@marivily/video/7001937542522162437", "https://www.tiktok.com/@marivily/video/7049823414785264901"],
        "kotor": ["https://www.tiktok.com/@montenegrosir/video/7035878153474116870", "https://www.tiktok.com/@jackthebackpacker/video/7019924050881318150",
            "https://www.tiktok.com/@ryan.dillow/video/7065369248528452869", "https://www.tiktok.com/@travel_is_my_therapyyy/video/6886887616382356741",
            "https://www.tiktok.com/@aspen_florey/video/7060546549092322607", "https://www.tiktok.com/@lindseykouch/video/6992197607070223622"],
        "portofino": ["https://www.tiktok.com/@_lumadeline/video/7013457836675960069", "https://www.tiktok.com/@italy/video/7052857209377705263", "https://www.tiktok.com/@anniegilldhillon/video/6982926907683704069",
            "https://www.tiktok.com/@travel.siss/video/6944269714734599430", "https://www.tiktok.com/@_lumadeline/video/6986999303482936581", "https://www.tiktok.com/@italy/video/6991100153872567557"],
        "seville": ["https://www.tiktok.com/@luxexperiences/video/7035735695389904134", "https://www.tiktok.com/@explorerssaurus/video/7056849986587266309",
            "https://www.tiktok.com/@lifeontrend/video/7052463472793259311", "https://www.tiktok.com/@gogoespana/video/6995125787049348353", "https://www.tiktok.com/@letravelstyle/video/7055503498779135279", "https://www.tiktok.com/@find.a.palmtree/video/7015269184535940357"],
        "split": ["https://www.tiktok.com/@jesssparkles_/video/6980831103783308550", "https://www.tiktok.com/@croatia_vacations/video/6986190920035175685",
            "https://www.tiktok.com/@anniekovac2/video/7003403459248655621", "https://www.tiktok.com/@leeshbrock/video/7044234113779240194", "https://www.tiktok.com/@sara.travel/video/7019308308062358789"]

    }


    render() {
        return (
            <div>
                {this.state.desktop ? <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                }}>


                    <div style={{
                        marginLeft: '11rem',
                        marginTop: '2rem'
                    }}>
                        <Typography variant="h3" style={{ color: '#076F72', fontWeight: 600 }} gutterBottom>
                            {this.state.city}
                        </Typography>

                        <Typography variant="h4" style={{ color: '#076F72', marginTop: '-1rem', fontWeight: 100 }} gutterBottom>
                            {this.state.country}
                        </Typography>

                    </div>

                    <div class="destDiv" style={{
                        backgroundImage: `url(${this.getDestinationPic()})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        width: '1200px',
                        height: '400px',
                        borderRadius: '11px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        textAlign: 'center',
                        position: 'relative',
                        left: '11%',
                        marginBottom: '2rem'



                    }} >
                    </div>
                    <Sticky>
                        <Box sx={{ borderBottom: 3, borderColor: 'divider', fontSize: 15, fontWeight: 5, padding: 5 }}  >
                            <Tabs orientation="vertical"
                                value={this.state.menuTabValue}
                                onChange={this.handleDestinationMenuChange}
                                aria-label="Destination Menu"
                                centered
                            >
                                <Tab style={{ fontSize: 17, fontWeight: 500 }} label="Get Inspired" {...this.a11yProps(0)} />
                                <Tab style={{ fontSize: 17, fontWeight: 500 }} label="Book Flights" {...this.a11yProps(1)} />
                            </Tabs>
                        </Box>
                    </Sticky>

                    <TabPanel value={this.state.menuTabValue} index={0} style={{ marginTop: '-6rem' }} >
                        <Stack spacing={2} >
                            {this.state.urls.map((url, index) => (
                                <TikTok key={index} url={url} />
                            ))}
                        </Stack>
                    </TabPanel>

                    <TabPanel value={this.state.menuTabValue} index={1}>
                        <DestinationFlightList from={this.state.flights.from}
                            depfaded={this.state.flights.depfaded}
                            depvalue={this.state.flights.depsearchdate}
                            depOriginalFlights={this.state.flights.depOriginalFlights}
                            depAllflights={this.state.flights.depAllFlights}
                            depchosenflight={this.state.flights.depchosenFlight}
                            depflightClass={this.state.flights.depflightClass}
                            to={this.state.flights.to}
                            returnfaded={this.state.flights.returnfaded}
                            returnvalue={this.state.flights.returnsearchdate}
                            returnOriginalFlights={this.state.flights.returnOriginalFlights}
                            returnAllflights={this.state.flights.returnAllflights}
                            returnchosenflight={this.state.flights.returnchosenFlight}
                            returnflightClass={this.state.flights.returnflightClass}
                            numberOfpassengers={this.state.flights.numberOfpassengers}
                            noOutFlights={this.state.flights.noOutFlights}
                            noInFlights={this.state.flights.noInFlights}
                        />


                    </TabPanel>



                </div> :
                    <div>
                        <Destination city={this.state.city}
                            country={this.state.country}
                            width={390} height={220}
                            picWidth={'390px'} picHeight={'220px'} />

                        <Sticky>
                            <Box sx={{ borderBottom: 3, borderColor: 'divider', fontSize: 15, fontWeight: 5, padding: 5 }}  >
                                <Tabs orientation="hortizontal"
                                    value={this.state.menuTabValue}
                                    onChange={this.handleDestinationMenuChange}
                                    aria-label="Destination Menu"
                                    centered
                                    variant="fullWidth"
                                >
                                    <Tab style={{ fontSize: 15, fontWeight: 500 }} label="Get Inspired" {...this.a11yProps(0)} />
                                    <Tab style={{ fontSize: 15, fontWeight: 500 }} label="Book Flights" {...this.a11yProps(1)} />
                                </Tabs>
                            </Box>
                        </Sticky>

                        <TabPanel value={this.state.menuTabValue} index={0} style={{ marginTop: '-1rem' }} >
                            <Stack spacing={2} >
                                {this.state.urls.map((url, index) => (
                                    <TikTok key={index} url={url} />
                                ))}
                            </Stack>
                        </TabPanel>

                        <TabPanel value={this.state.menuTabValue} index={1}>
                            <DestinationFlightList from={this.state.flights.from}
                                depfaded={this.state.flights.depfaded}
                                depvalue={this.state.flights.depsearchdate}
                                depOriginalFlights={this.state.flights.depOriginalFlights}
                                depAllflights={this.state.flights.depAllFlights}
                                depchosenflight={this.state.flights.depchosenFlight}
                                depflightClass={this.state.flights.depflightClass}
                                to={this.state.flights.to}
                                returnfaded={this.state.flights.returnfaded}
                                returnvalue={this.state.flights.returnsearchdate}
                                returnOriginalFlights={this.state.flights.returnOriginalFlights}
                                returnAllflights={this.state.flights.returnAllflights}
                                returnchosenflight={this.state.flights.returnchosenFlight}
                                returnflightClass={this.state.flights.returnflightClass}
                                numberOfpassengers={this.state.flights.numberOfpassengers}
                                noOutFlights={this.state.flights.noOutFlights}
                                noInFlights={this.state.flights.noInFlights}
                                passengers = ''
                            />


                        </TabPanel>

                    </div>}
            </div>




        );
    }
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


export default DestinationPage;



