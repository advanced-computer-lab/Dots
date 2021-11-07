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
        flightNumber: '',
        arrivalTime: new Date(),
        departureTime: new Date(),
        seatsAvailable: '',
        cabin: '',
        departureTerminal: '',
        arrivalTerminal: '',
        from: '',
        to: '',

        seatsAvailableError: '',
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

        else if ((e.target.name === 'arrivalTerminal'
            || e.target.name === 'departureTerminal'
            || e.target.name === 'seatsAvailable')
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
            seatsAvailableError,
            departureTerminalError,
            arrivalTerminalError,
            fromError,
            toError } = this.state

        return seatsAvailableError === '' &&
            departureTerminalError === '' &&
            arrivalTerminalError === '' &&
            fromError === '' &&
            toError === ''
    }
    onSubmit = (e) => {
        e.preventDefault()
        const data = {
            _id: this.state._id,
            flightNumber: this.state.flightNumber,
            arrivalTime: this.state.arrivalTime,
            departureTime: this.state.departureTime,
            seatsAvailable: this.state.seatsAvailable,
            cabin: this.state.cabin,
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
                const { seatsAvailable, cabin, from, to, arrivalTime,
                    departureTime, departureTerminal, arrivalTerminal, _id, flightNumber } = data
                this.setState({
                    _id,
                    flightNumber,
                    seatsAvailable,
                    cabin,
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
        const { seatsAvailable, cabin, from, to, arrivalTime,
            departureTime, departureTerminal, arrivalTerminal, fromError, toError, departureTerminalError,
            arrivalTerminalError, seatsAvailableError } = this.state
        return (
            <Box sx={{ '& .MuiTextField-root': { m: 4, width: '40ch' }, }} noValidateautoComplete="off">
                <form onSubmit={this.onSubmit}>
                    <FormControl >
                        <IconButton sx={{ ml: "auto" }} onClick={this.props.close}><CloseIcon /></IconButton>
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
                        <TextField
                            select
                            id="cabin"
                            name="cabin"
                            value={cabin}
                            label="Cabin"
                            className="formElements"
                            onChange={this.handleChange}
                        >
                            <MenuItem value='Economy'>Economy</MenuItem>
                            <MenuItem value='Business'>Business</MenuItem>
                            <MenuItem value='First'>First</MenuItem>
                        </TextField>
                        <TextField onChange={this.handleChange} error={seatsAvailableError !== ''} helperText={seatsAvailableError} value={seatsAvailable} label="Available Seats" required type="input" className="formElements" id="seats" placeholder="Ex: 20" name="seatsAvailable" ></TextField>
                        <Button disabled={!this.areFieldsValid()} type="submit">Submit</Button>
                    </FormControl>
                </form>
            </Box>

        );
    }
}

export default EditForm;