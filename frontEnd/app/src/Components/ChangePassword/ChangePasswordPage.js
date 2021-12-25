import { Grid } from '@mui/material';
import React, { Component } from 'react';
import ChangePassword from './components/ChangePassword'

class ChangePasswordPage extends Component {
    render() {
        return (
            <Grid container justifyContent="center" sx={{ mt: 4 }} alignItems="center" height={750}>
                <Grid item>
                    <ChangePassword />
                </Grid>
            </Grid>
        );
    }
}

export default ChangePasswordPage;