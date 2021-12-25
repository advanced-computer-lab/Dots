import axios from 'axios';
import React, { Component } from 'react';
import GuestNavBar from './GuestNavBar';
import AdminNavBar from './AdminNavBar';
import UserNavBar from './UserNavBar';

class NavBarSelector extends Component {
    state = {
        show: 'guest'
    }

    componentDidMount() {
        axios.get('http://localhost:8000/checkAuth')
            .then(() => {
                axios.get('http://localhost:8000/checkAdmin')
                    .then(() => {
                        this.setState({ show: 'admin' })
                    })
                    .catch(() => {
                        this.setState({ show: 'user' })
                    })
            })
            .catch(() => {
                this.setState({ show: 'guest' })
            })
    }
    render() {
        const { show } = this.state
        if (show === 'admin')
            return <AdminNavBar />
        if (show === 'user')
            return <UserNavBar />
        if (show === 'guest')
            return <GuestNavBar />
    }
}

export default NavBarSelector;