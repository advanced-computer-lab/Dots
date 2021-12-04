import React, { Component } from 'react';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import '@fontsource/roboto/700.css'
import './passengerForm.css'
class passengerForm extends Component {
    state = {
        firstName: this.props.p.firstName,
        lastName: this.props.p.lastName,
        passportNo: this.props.p.passportNo
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.name === 'firstName') {
            this.props.updatepassengerFirstName(e.target.value, (this.props.ind) - 1);
        } else if (e.target.name === 'lastName') {
            this.props.updatepassengerlastName(e.target.value, (this.props.ind) - 1);
        } else if (e.target.name === 'passportNo') {
            this.props.updatepassengerPassportNo(e.target.value, (this.props.ind) - 1);
        }
    }


    areFieldsValid() {

    }
    onSubmit = (e) => {
        e.preventDefault()
    }

    render() {
        return (

            <div>
                <Typography variant="h6" component="div" id='ptext'>Passenger {this.props.ind}</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField onChange={this.handleChange} className="formElements" value={this.state.firstName} label="First Name" required type="input" id="firstName" placeholder="Ex: John" name="firstName" ></TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField onChange={this.handleChange} className="formElements" value={this.state.lastName} label="Last Name" required type="input" id="lastName" placeholder="Ex: Doe" name="lastName" ></TextField>
                    </Grid><Grid item xs={4}>
                        <TextField onChange={this.handleChange} className="formElements" value={this.state.passportNo} label="Passport Number" required type="input" id="passportNo" placeholder="Ex: A1234" name="passportNo" ></TextField>
                    </Grid>
                </Grid>
            </div>

        );
    }
}

export default passengerForm;