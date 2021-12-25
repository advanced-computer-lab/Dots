import { Grid } from '@mui/material';
import React, { Component } from 'react';
import ChangePassword from './components/ChangePassword'

class ChangePasswordPage extends Component {
    render() {
        return (
            <div style={{ backgroundImage: `url(${'/download.jpg'})`, minHeight: 900 }}>

                <Grid container justifyContent="center" alignItems="center" height={750}>
                    <Grid item>
                        <ChangePassword />
                    </Grid>
                </Grid>
            </div>

        );
    }
}

export default ChangePasswordPage;