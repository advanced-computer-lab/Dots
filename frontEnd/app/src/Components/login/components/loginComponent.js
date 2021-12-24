import React, { Component } from 'react';
import { TextField, InputAdornment, IconButton, } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'
import { AuthContext } from '../../../context/authContext'
class loginComponent extends Component {
    state = {
        username: '',
        password: '',

        errors: {
            usernameError: '',
            passwordError: '',
        },

        showPassword: false
    }
    handleChange = (e) => {
        let errorMsg = ''
        const targetError = e.target.name + 'Error'

        this.setState({ [e.target.name]: e.target.value });

        if (e.target.value === '')
            errorMsg = 'This field is required'

        this.setState({ errors: { ...this.state.errors, [targetError]: errorMsg } })
    }
    onSubmit = (e) => {
        e.preventDefault()
        const data = { username: this.state.username, password: this.state.password }
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
    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    render() {
        const { username, password, showPassword } = this.state
        const { usernameError, passwordError } = this.state.errors
        return (
            <div>
                <TextField onBlur={this.handleChange}
                    error={usernameError !== ''} helperText={usernameError}
                    fullWidth sx={{ mb: 2 }} value={username} onChange={this.handleChange}
                    label="Username" required type="input" id="username" placeholder="johndoe1" name="username" ></TextField>

                <TextField onBlur={this.handleChange}
                    error={passwordError !== ''} helperText={passwordError}
                    fullWidth sx={{ mb: 2 }} value={password} onChange={this.handleChange}
                    label="Password" required type="input" id="password"
                    placeholder="Ex: password123" name="password" >
                    type={showPassword ? 'text' : 'password'}
                    endAdornment=
                    {
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                </TextField>
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