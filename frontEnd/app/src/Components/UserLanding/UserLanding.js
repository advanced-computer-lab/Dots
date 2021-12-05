import React, { Component } from 'react';
import GuestNavBar from '../GuestNavBar/GuestNavBar';
import UserFlightList from '../UserFlightList/userFlightList.js';
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

import background from './travel3.jpg';
import { borderRadius } from '@mui/system';
class UserLanding extends Component {


    render() {
        return (


            <div id = "back" style={{
                backgroundImage: `url(${background})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'



            }}>

                {/* <GuestNavBar /> */}
                <Stack spacing = {30} alignItems = "center">
                    <Stack id = "alignTitle" direction = "row" justifyContent="flex-start" > 
                    <Typography id="titleLanding" variant="h2" gutterBottom component="div">
                        Explore the world  with Takeoff
                    </Typography>
                    </Stack>

                    <Card id="search" sx={{ maxWidth: 900, borderRadius: 5 }}>

                        <CardContent>
                            <UserSearch isChangeSearch = {true} />
                        </CardContent>

                    </Card>

                </Stack>
            </div>

        );
    }
}


export default UserLanding;
