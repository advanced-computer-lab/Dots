import React, { Component } from 'react';
import { Grid, TextField, FormControl, Card, CardActions } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert";

class EditFormClass extends Component {
    state = {
        data: {
            firstName: '',
            lastName: '',
            homeAddress: '',
            countryCode: '',
            phoneNumber: '',
            email: '',
            passportNumber: '',
        },
        errors: {
            firstNameError: '', lastNameError: '', homeAddressError: '', countryCodeError: '', phoneNumberError: '',
            emailError: '', passportNumberError: '',
        },
        loading: false,
        editSnackBarOpen: false,
    }
    handleChange = (e) => {
        const numReg = /^\d+$/
        const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let errorMsg = ''
        const targetError = e.target.name + 'Error'

        this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } });

        if (e.target.value === '')
            errorMsg = 'This field is required'

        else if ((e.target.name === 'phoneNumber')
            && !numReg.test(e.target.value))

            errorMsg = 'Input must be a number'

        else if ((e.target.name === 'email')
            && !emailReg.test(e.target.value))

            errorMsg = 'Invalid email format'

        this.setState({ errors: { ...this.state.errors, [targetError]: errorMsg } })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.setState({ loading: true })
        const data = this.state.data
        axios.put(`http://localhost:8000/user`, data).then(() => {
            this.setState({ loading: false ,editSnackBarOpen:true})
        }).catch((err) => {
            console.log(err)
        })
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/user`)
            .then(({ data }) => {
                this.setState({ data })
                const dataArr = Object.keys(this.state.data)
                dataArr.forEach(field => {
                    this.handleChange({ target: { value: this.state.data[field], name: field } })
                })

            })
    }


    areFieldsValid = () => {
        const errorsArr = Object.keys(this.state.errors)
        let valid = true
        errorsArr.forEach(error => {
            if (this.state.errors[error] !== '') {
                valid = false
            }
        });
        return valid
    }


    editSnackBarHandleOpen = () => {
        this.setState({ editSnackBarOpen: true })
    }

    editSnackBarHandleClose = () => {
        this.setState({ editSnackBarOpen: false })
    }


    render() {
        const { firstName, lastName, homeAddress, countryCode, phoneNumber, email, passportNumber } = this.state.data
        const { firstNameError, lastNameError, homeAddressError, countryCodeError, phoneNumberError,
            emailError, passportNumberError } = this.state.errors
        return (
            <div>

            <FormControl >
                <Card sx={{ m: 10, ml: 40,mt:10, width: '60%', height: 430 }}>
                    <form>
                        <Grid container sx={{ mr: 6, mt: 5, mb: 4, ml: 2, width: 'auto' }} rowSpacing={1} spacing={5}>
                            <Grid item xs={6}>
                                <TextField onBlur={this.handleChange} error={firstNameError !== ''} helperText={firstNameError} fullWidth sx={{ mb: 2 }} value={firstName} onChange={this.handleChange} label="First Name" required type="input" id="firstName" placeholder="Ex: John" name="firstName" ></TextField>
                                <TextField onBlur={this.handleChange} error={homeAddressError !== ''} helperText={homeAddressError} fullWidth sx={{ mb: 2 }} value={homeAddress} onChange={this.handleChange} label="Home Address" required type="input" id="homeAddress" placeholder="Ex: 15 Lorem Street, Building 12" name="homeAddress" ></TextField>
                                <TextField onBlur={this.handleChange} error={phoneNumberError !== ''} helperText={phoneNumberError} fullWidth sx={{ mb: 2 }} value={phoneNumber} onChange={this.handleChange} label="Phone Number" required type="input" id="phoneNumber" placeholder="Ex: 01111080444" name="phoneNumber" ></TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField onBlur={this.handleChange} error={lastNameError !== ''} helperText={lastNameError} fullWidth sx={{ mb: 2 }} value={lastName} onChange={this.handleChange} label="Last Name" required type="input" id="lastName" placeholder="Ex: Doe" name="lastName" ></TextField>
                                <TextField onBlur={this.handleChange} error={countryCodeError !== ''} helperText={countryCodeError} fullWidth sx={{ mb: 2 }} value={countryCode} onChange={this.handleChange} label="Country Code" required type="input" id="countryCode" placeholder="Ex: +20" name="countryCode" ></TextField>
                                <TextField onBlur={this.handleChange} error={emailError !== ''} helperText={emailError} fullWidth sx={{ mb: 2 }} value={email} onChange={this.handleChange} label="Email" required type="input" id="email" placeholder="Ex: o@a.com" name="email" ></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onBlur={this.handleChange} error={passportNumberError !== ''} helperText={passportNumberError} fullWidth sx={{ mb: 2 }} value={passportNumber} onChange={this.handleChange} label="Passport Number" required type="input" id="passportNumber" placeholder="Ex: A12345" name="passportNumber" ></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <CardActions>
                                    <LoadingButton loading={this.state.loading} disabled={!this.areFieldsValid()} onClick={this.onSubmit} size="large" variant="contained">
                                        Save Changes
                                    </LoadingButton>
                                </CardActions>
                            </Grid>
                        </Grid>
                    </form >
                </Card>
            </FormControl>

            <Snackbar open={this.state.editSnackBarOpen} autoHideDuration={6000} onClose={this.editSnackBarHandleClose}>
                    <Alert onClose={this.editSnackBarHandleClose} severity="success" sx={{ width: '100%' }}>
                        Information Updated!
                    </Alert>
                </Snackbar>
    </div>
        );
    }
}

const EditForm = (props) => (
    <EditFormClass
        {...props}
        params={useParams()}
        />
);

export default EditForm