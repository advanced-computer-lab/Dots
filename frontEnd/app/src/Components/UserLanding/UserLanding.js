import React, { Component } from 'react';
import UserSearch from '../UserSearch/UserSearch';
import Typography from "@material-ui/core/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Stack from '@mui/material/Stack'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './UserLanding.css';
import DestinationList from "../DestinationList/DestinationList";

import background from './travel3.jpg';
import mobileBackground from './takeoffMobile1.2.jpg';
import { borderRadius } from '@mui/system';
class UserLanding extends Component {

    componentDidMount() {
        // media query for mobile
        const handler = e => this.setState({ desktop: e.matches });
        window.matchMedia("(min-width: 900px)").addEventListener('change', handler);

    }



    constructor(props) {
        super(props);
        this.state = {
            desktop: window.matchMedia("(min-width: 900px)").matches,
        };

    }


    render() {
        return (
            <div>

                {
                    this.state.desktop ?
                        <div id="back" style={{
                            backgroundImage: `url(${background})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }} >



                            <Stack spacing={30} alignItems="center">
                                <Stack id="alignTitle" direction="row" justifyContent="flex-start" >
                                    <Typography id="titleLanding" variant="h2" gutterBottom component="div">
                                        Explore the world  with Takeoff
                                    </Typography>
                                </Stack>


                                <Card id="search" sx={{ maxWidth: 900, borderRadius: 5 }}>

                                    <CardContent>
                                        <UserSearch isChangeSearch={true} desktop={this.state.desktop} />
                                    </CardContent>

                                </Card>

                            </Stack>
                        </div>


                        :
                        <div id="back" style={{
                            backgroundImage: `url(${mobileBackground})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }} >



                            <Stack spacing={30} alignItems="center">
                                <Stack direction="row" id="alignMobile" justifyContent="flex-start" >
                                    <Typography id="titleLanding" variant="h4" gutterBottom component="div">
                                        Explore the world  with Takeoff
                                    </Typography>
                                </Stack>


                                <Card id="searchMobile" sx={{ maxWidth: 500, borderRadius: 5 }}>

                                    <CardContent>
                                        <UserSearch isChangeSearch={true} desktop={this.state.desktop} />
                                    </CardContent>

                                </Card>

                            </Stack>
                        </div>



                }

                <Stack id="destinationsStack"  spacing={2}>

                    <Typography id = "destinationStackHeading" variant="h6" gutterBottom component="div">
                        Our Popular Destinations
                    </Typography>

                    <DestinationList id = "destinationList">

                    </DestinationList>


                </Stack>


            </div>




        );
    }
}


export default UserLanding;
