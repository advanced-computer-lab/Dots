import React, { Component } from 'react';
import GuestNavBar from '../GuestNavBar/GuestNavBar';
import UserFlightList from '../UserFlightList/userFlightList.js';

import './UserLanding.css';

class UserLanding extends Component {


    render() {
        return (
            <div>

                <GuestNavBar />
               <UserFlightList/>


            </div>

        );
    }
}


export default UserLanding;
