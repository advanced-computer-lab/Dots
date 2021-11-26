import React, { Component } from 'react';
import GuestNavBar from '../GuestNavBar/GuestNavBar';
import Flight from '../Flight/Flight';

import './UserLanding.css';

class UserLanding extends Component {


    render() {
        return (
            <div>

                <GuestNavBar />
                <Flight/>


            </div>

        );
    }
}


export default UserLanding;
