import React, { Component } from 'react';
import { TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'
import {AuthContext} from '../../../context/authContext'
class loginComponent extends Component {
    state = {
        email: '',
        password: '',

        errors: {
            emailError: '',
            passwordError: '',
        }
    }
    handleChange = (e) => {
        const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let errorMsg = ''
        const targetError = e.target.name + 'Error'

        this.setState({ [e.target.name]: e.target.value });

        if (e.target.value === '')
            errorMsg = 'This field is required'

        else if ((e.target.name === 'email')
            && !emailReg.test(e.target.value))

            errorMsg = 'Invalid email format'

        this.setState({ errors: { ...this.state.errors, [targetError]: errorMsg } })
    }
    onSubmit = (e) => {
        e.preventDefault()
        const data = { email: this.state.email, password: this.state.password }
        axios.post(`http://localhost:8000/login`, data).then(({ data }) => {
            this.context.setAuthState(data)
        }).catch((err) => {
            console.log(err)
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
    render() {
        const { email, password } = this.state
        const{emailError, passwordError} = this.state.errors
        return (
            <div>
                <TextField onBlur={this.handleChange}
                    error={emailError !== ''} helperText={emailError}
                    fullWidth sx={{ mb: 2 }} value={email} onChange={this.handleChange}
                    label="Email" required type="input" id="email" placeholder="Ex: johndoe@gmail.com" name="email" ></TextField>

                <TextField onBlur={this.handleChange}
                    error={passwordError !== ''} helperText={passwordError}
                    fullWidth sx={{ mb: 2 }} value={password} onChange={this.handleChange}
                    label="Password" required type="input" id="password"
                    placeholder="Ex: password123" name="password" ></TextField>
                <LoadingButton disabled={!this.areFieldsValid()}
                    onClick={this.onSubmit} size="large" variant="contained">
                    Sign In
                </LoadingButton>

            </div>
        );
    }
}
loginComponent.contextType = AuthContext;
export default loginComponent;