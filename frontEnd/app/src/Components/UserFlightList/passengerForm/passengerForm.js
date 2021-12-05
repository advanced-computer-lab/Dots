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
        passportNumber: this.props.p.passportNumber,
        firstNameError: '',
        lastNameError: '',
        passportNumberError: ''
    };

    componentDidMount(){
        if (this.state.firstName===''){
            this.setState({firstNameError:'This field is required'})
        }
        if (this.state.lastName===''){
            this.setState({lastNameError:'This field is required'})
        }
        if (this.state.passportNumber===''){
            this.setState({passportNumberError:'This field is required'})
        }
    }

    handleChange = (e) => {
        let errorMsg = ''
        const targetError = e.target.name + 'Error'
        this.setState({ [e.target.name]: e.target.value });
       
        if (e.target.value === '')
            errorMsg = 'This field is required';

        if (e.target.name === 'firstName') {
            this.props.updatepassengerFirstName(e.target.value, (this.props.ind) - 1);
        } else if (e.target.name === 'lastName') {
            this.props.updatepassengerlastName(e.target.value, (this.props.ind) - 1);
        } else if (e.target.name === 'passportNumber') {
            this.props.updatepassengerPassportNo(e.target.value, (this.props.ind) - 1);
        }
        this.setState({ [targetError]: errorMsg })
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
                        <TextField error={this.state.firstNameError !== ''} helperText={this.state.firstNameError} onChange={this.handleChange} className="formElements" value={this.state.firstName} label="First Name" required type="input" id="firstName" placeholder="Ex: John" name="firstName" ></TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField error={this.state.lastNameError !== ''} helperText={this.state.lastNameError} onChange={this.handleChange} className="formElements" value={this.state.lastName} label="Last Name" required type="input" id="lastName" placeholder="Ex: Doe" name="lastName" ></TextField>
                    </Grid><Grid item xs={4}>
                        <TextField error={this.state.passportNumberError !== ''} helperText={this.state.passportNumberError} onChange={this.handleChange} className="formElements" value={this.state.passportNumber} label="Passport Number" required type="input" id="passportNumber" placeholder="Ex: A1234" name="passportNumber" ></TextField>
                    </Grid>
                </Grid>
            </div>

        );
    }
}

export default passengerForm;