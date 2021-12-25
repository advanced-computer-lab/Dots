import React, { Component } from 'react';
import { TextField, InputAdornment, IconButton, Box, Card, CardActions, Typography, Alert } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'

class ChangePassword extends Component {
    state = {
        newPassword: '',
        currentPassword: '',
        currentPasswordConfirmation: '',

        errors: {
            newPasswordError: '',
            currentPasswordError: '',
            currentPasswordConfirmationError: '',
        },

        showPassword: false,
        error: false,
        errorMsg: ''
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
        const { newPassword, currentPassword, currentPasswordConfirmation } = this.state
        const dataSent = { newPassword, currentPassword, currentPasswordConfirmation }
        axios.post(`http://localhost:8000/login`, dataSent)
            .then(({ data }) => {
                this.context.setAuthState(data)
                this.setState({ newPassword: '', currentPasswordConfirmation: '', currentPassword: '' })
            }).catch((err) => {
                const errorMsg = err.response.data.msg
                this.setState({ errorMsg, error: true })
            })
    }

    areFieldsValid = () => {
        const { errors, newPassword, currentPassword, currentPasswordConfirmation } = this.state
        const errorsArr = Object.keys(errors)
        let valid = true
        errorsArr.forEach(error => {
            if (this.state.errors[error] !== '') {
                valid = false
            }
        });
        return valid && newPassword !== '' && currentPassword !== '' && currentPasswordConfirmation !== ''
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
        const { newPassword, currentPassword, currentPasswordConfirmation, showPassword, error, errorMsg } = this.state
        const { newPasswordError, currentPasswordError, currentPasswordConfirmationError } = this.state.errors
        return (
            <Card sx={{ p: 4, height: 400, alignItems: "center" }}>
                {
                    error &&
                    <Alert variant="filled" severity="error" sx={{ borderRadius: 0 }}>
                        {errorMsg}
                    </Alert>
                }
                <Typography variant='h4' gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: '#076F72' }}>
                    Change your password
                </Typography><br />
                <Box component="form" onSubmit={this.onSubmit} >

                    <TextField onBlur={this.handleChange}
                        error={newPasswordError !== ''} helperText={newPasswordError}
                        fullWidth sx={{ mb: 2 }} value={newPassword} onChange={this.handleChange}
                        label="New Password" required id="newPassword"
                        placeholder="Ex: password123" name="newPassword"
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

                    <TextField onBlur={this.handleChange}
                        error={currentPasswordError !== ''} helperText={currentPasswordError}
                        fullWidth sx={{ mb: 2 }} value={currentPassword} onChange={this.handleChange}
                        label="Current Password" required id="currentPassword"
                        placeholder="Ex: password123" name="currentPassword"
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

                    <TextField onBlur={this.handleChange}
                        error={currentPasswordConfirmationError !== ''} helperText={currentPasswordConfirmationError}
                        fullWidth sx={{ mb: 2 }} value={currentPasswordConfirmation} onChange={this.handleChange}
                        label="Confirm your current password" required id="currentPasswordConfirmation"
                        placeholder="Ex: password123" name="currentPasswordConfirmation"
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
                        <LoadingButton disabled={!this.areFieldsValid()} type="submit"
                            onClick={this.onSubmit} size="large" variant="contained">
                            Confirm Change
                        </LoadingButton>
                    </CardActions>
                </Box><br />
            </Card>
        )
    }
}

export default ChangePassword;