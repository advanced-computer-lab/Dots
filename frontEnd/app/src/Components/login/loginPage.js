import React, { Component } from 'react';
import LoginComponent from './components/loginComponent';
import { Grid } from '@mui/material'

class loginPage extends Component {
    render() {
        return (
            <Grid container justifyContent="center" sx={{ mt: 4 }} alignItems="center" height={750}>
                    <Grid item>
                        <LoginComponent />
                    </Grid>
            </Grid>
        );
    }
}

export default loginPage;