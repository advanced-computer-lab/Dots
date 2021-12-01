import React, { Component } from 'react';
import GuestNavBar from '../GuestNavBar/GuestNavBar';
import UserFlightList from '../UserFlightList/userFlightList.js';
import Flight from '../Flight/Flight';
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

import background from './travel2.jpg';
import { borderRadius } from '@mui/system';
class UserLanding extends Component {


    render() {
        return (


            <div style={{
                backgroundImage: `url(${background})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: "540px"



            }}>

                <GuestNavBar />
                <Stack spacing = {30} alignItems = "center">
                    <Stack id = "alignTitle" direction = "row" justifyContent="flex-start" > 
                    <Typography id="title" variant="h2" gutterBottom component="div">
                        Explore the world with Takeoff
                    </Typography>
                    </Stack>

                    <Card id="search" sx={{ maxWidth: 900, borderRadius: 5 }}>

                        <CardContent>
                            <UserSearch />
                        </CardContent>

                    </Card>

                    <UserFlightList/>


                </Stack>






            </div>

        );
    }
}


export default UserLanding;
