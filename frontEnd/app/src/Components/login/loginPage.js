import React, { Component } from 'react';
import LoginComponent from './components/loginComponent';
import { Grid } from '@mui/material'

class loginPage extends Component {
    render() {
        return (
            <div style={{ backgroundImage: `url(${'/download.jpg'})` ,minHeight: 900 }}>
                <Grid container justifyContent="center" alignItems="center" height={750}>
                    <Grid item>
                        <LoginComponent />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default loginPage;