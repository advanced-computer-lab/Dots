import React, { Component } from 'react';
import { TextField, InputAdornment, IconButton, Box, Card, CardActions, Typography } from '@mui/material'
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
        const {errors,username,password} = this.state
        const errorsArr = Object.keys(errors)
        let valid = true
        errorsArr.forEach(error => {
            if (this.state.errors[error] !== '') {
                valid = false
            }
        });
        return valid && username!=='' && password!==''
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
            <Card sx={{ p: 4, height: 400, alignItems: "center" }}>
                    <Typography variant='h4' gutterBottom textAlign="center" sx={{fontWeight:'bold', color:'#076F72' }}>
                        Login
                    </Typography><br/>
                <Box component="form" onSubmit={this.onSubmit} >

                    <TextField onBlur={this.handleChange}
                        error={usernameError !== ''} helperText={usernameError}
                        fullWidth sx={{ mb: 2 }} value={username} onChange={this.handleChange}
                        label="Username" required type="input" id="username" placeholder="johndoe1"
                        name="username" />

                    <TextField onBlur={this.handleChange}
                        error={passwordError !== ''} helperText={passwordError}
                        fullWidth sx={{ mb: 2 }} value={password} onChange={this.handleChange}
                        label="Password" required id="password"
                        placeholder="Ex: password123" name="password"
                        type={showPassword ? 'input' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }} />
                    <CardActions sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}>
                        <LoadingButton disabled={!this.areFieldsValid()}
                            onClick={this.onSubmit} size="large" variant="contained">
                            Sign In
                        </LoadingButton>
                    </CardActions>
                </Box><br/>
                <Typography variant='h3' gutterBottom textAlign="center" sx={{fontWeight:'bold', color:'#076F72' }}>
                        Ready to take-off?
                    </Typography>
            </Card>
        )
    }
}
loginComponent.contextType = AuthContext;
export default loginComponent;