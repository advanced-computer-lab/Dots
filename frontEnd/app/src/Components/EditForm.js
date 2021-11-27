import React, { Component } from 'react';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Box, FormControl, TextField, Button, MenuItem } from '@mui/material';

class EditForm extends Component {
    state = {
        _id: '',
        oldFlightNumber: '',
        flightNumber: '',
        arrivalTime: new Date(),
        departureTime: new Date(),
        economySeatsAvailable: '',
        businessSeatsAvailable: '',
        firstSeatsAvailable: '',
        departureTerminal: '',
        arrivalTerminal: '',
        from: '',
        to: '',

        flightNumberError: '',
        economySeatsAvailableError: '',
        businessSeatsAvailableError: '',
        firstSeatsAvailableError: '',
        departureTerminalError: '',
        arrivalTerminalError: '',
        fromError: '',
        toError: '',

    };

    handleChange = (e) => {
        const numReg = /^\d+$/
        const airportReg = /^[A-Z]{3}$/;
        let errorMsg = ''
        const targetError = e.target.name + 'Error'

        this.setState({ [e.target.name]: e.target.value });

        if (e.target.value === '')
            errorMsg = 'This field is required'

        else if ((e.target.name === 'economySeatsAvailable'
            || e.target.name === 'businessSeatsAvailable'
            || e.target.name === 'firstSeatsAvailable')
            && !numReg.test(e.target.value))

            errorMsg = 'Input must be a number'

        else if ((e.target.name === 'from'
            || e.target.name === 'to')
            && !airportReg.test(e.target.value))

            errorMsg = 'Input must be 3 upper case letters'

        this.setState({ [targetError]: errorMsg })
    }

    handleChangeArrival = (value) => {
        this.setState({ arrivalTime: value });
    }

    handleChangeDeparture = (value) => {
        this.setState({ departureTime: value });
    }

    areFieldsValid() {
        const {
            flightNumberError,
            economySeatsAvailableError,
            businessSeatsAvailableError,
            firstSeatsAvailableError,
            departureTerminalError,
            arrivalTerminalError,
            fromError,
            toError } = this.state

        return flightNumberError === '' &&
            economySeatsAvailableError === '' &&
            businessSeatsAvailableError === '' &&
            firstSeatsAvailableError === '' &&
            departureTerminalError === '' &&
            arrivalTerminalError === '' &&
            fromError === '' &&
            toError === ''
    }
    onSubmit = (e) => {
        e.preventDefault()
        const data = {
            _id: this.state._id,
            oldFlightNumber: this.state.oldFlightNumber,
            flightNumber: this.state.flightNumber,
            arrivalTime: this.state.arrivalTime,
            departureTime: this.state.departureTime,
            economySeatsAvailable: this.state.economySeatsAvailable,
            businessSeatsAvailable: this.state.businessSeatsAvailable,
            firstSeatsAvailable: this.state.firstSeatsAvailable,
            departureTerminal: this.state.departureTerminal,
            arrivalTerminal: this.state.arrivalTerminal,
            from: this.state.from,
            to: this.state.to,
        }
        this.props.handleSubmit(data)
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/flights/${this.props.id}`)
            .then(({ data }) => {
                const { economySeatsAvailable, businessSeatsAvailable, firstSeatsAvailable,
                    from, to, arrivalTime, departureTime, departureTerminal, arrivalTerminal,
                    _id, flightNumber } = data
                this.setState({
                    _id,
                    flightNumber,
                    oldFlightNumber: flightNumber,
                    economySeatsAvailable,
                    businessSeatsAvailable,
                    firstSeatsAvailable,
                    from,
                    to,
                    arrivalTime,
                    departureTime,
                    departureTerminal,
                    arrivalTerminal
                })
            })

    }

    render() {
        const { economySeatsAvailable, businessSeatsAvailable, firstSeatsAvailable, from, to, arrivalTime,
            departureTime, departureTerminal, arrivalTerminal, fromError, toError, departureTerminalError,
            arrivalTerminalError, economySeatsAvailableError, businessSeatsAvailableError, firstSeatsAvailableError,
            flightNumber, flightNumberError } = this.state
        return (
            <Box sx={{ '& .MuiTextField-root': { m: 4, width: '40ch' }, }} noValidateautoComplete="off">
                <form onSubmit={this.onSubmit}>
                    <FormControl >
                        <IconButton sx={{ ml: "auto" }} onClick={this.props.close}><CloseIcon /></IconButton>
                        <TextField error={flightNumberError !== ''} helperText={flightNumberError} value={flightNumber} onChange={this.handleChange} label="Flight Number" required type="input" className="formElements" id="flightNumber" placeholder="Ex: kM7wXs" name="flightNumber" ></TextField>
                        <TextField error={fromError !== ''} helperText={fromError} value={from} onChange={this.handleChange} label="From" required type="input" className="formElements" id="from" placeholder="Ex: LAX" name="from" ></TextField>
                        <TextField error={toError !== ''} helperText={toError} value={to} onChange={this.handleChange} label="To" required type="input" className="to" id="to" placeholder="Ex: JFK" name="to" ></TextField>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DateTimePicker
                                maxDateTime={new Date(arrivalTime)}
                                label="Departure Time"
                                value={departureTime}
                                onChange={this.handleChangeDeparture}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DateTimePicker
                                minDateTime={new Date(departureTime)}
                                label="Arrival Time"
                                value={arrivalTime}
                                onChange={this.handleChangeArrival}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>

                        <TextField onChange={this.handleChange} error={departureTerminalError !== ''} helperText={departureTerminalError} value={departureTerminal} label="Departure Terminal" required type="input" className="formElements" id="dTerminal" placeholder="Ex: 1" name="departureTerminal" ></TextField>
                        <TextField onChange={this.handleChange} error={arrivalTerminalError !== ''} helperText={arrivalTerminalError} value={arrivalTerminal} label="Arrival Terminal" required type="input" className="formElements" id="aTerminal" placeholder="Ex: 1" name="arrivalTerminal" ></TextField>
                        <TextField onChange={this.handleChange} error={economySeatsAvailableError !== ''} helperText={economySeatsAvailableError} value={economySeatsAvailable} label="Available Economy Class Seats" required type="input" className="formElements" id="economySeats" placeholder="Ex: 20" name="economySeatsAvailable" ></TextField>
                        <TextField onChange={this.handleChange} error={businessSeatsAvailableError !== ''} helperText={businessSeatsAvailableError} value={businessSeatsAvailable} label="Available Business Class Seats" required type="input" className="formElements" id="businessSeats" placeholder="Ex: 20" name="businessSeatsAvailable" ></TextField>
                        <TextField onChange={this.handleChange} error={firstSeatsAvailableError !== ''} helperText={firstSeatsAvailableError} value={firstSeatsAvailable} label="Available First Class Seats" required type="input" className="formElements" id="firstSeats" placeholder="Ex: 20" name="firstSeatsAvailable" ></TextField>
                        <Button disabled={!this.areFieldsValid()} type="submit">Submit</Button>
                    </FormControl>
                </form>
            </Box>

        );
    }
}

export default EditForm;