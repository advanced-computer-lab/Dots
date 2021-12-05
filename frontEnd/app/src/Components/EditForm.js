import React, { Component } from 'react';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Box, FormControl, TextField, Button, FormLabel, Divider } from '@mui/material';

class EditForm extends Component {
    state = {
        data: {
            _id: '',
            flightNumber: '',
            arrivalTime: new Date(),
            departureTime: new Date(),
            economySeatsAvailable: '',
            businessSeatsAvailable: '',
            firstSeatsAvailable: '',
            from: '',
            to: '',
            departureLocation: {
                country: '',
                city: '',
                airport: '',
                terminal: ''
            },
            arrivalLocation: {
                country: '',
                city: '',
                airport: '',
                terminal: ''
            }
        },

        errors: {
            flightNumberError: '', economySeatsAvailableError: '', businessSeatsAvailableError: '',
            firstSeatsAvailableError: '', fromError: '', toError: '', dCountryError: '', dCityError: '',
            dAirportError: '', dTerminalError: '', aCountryError: '', aCityError: '', aAirportError: '',
            aTerminalError: ''
        }
    };

    handleChange = (e) => {
        const numReg = /^\d+$/
        const airportReg = /^[A-Z]{3}$/;
        let errorMsg = ''
        const targetError = e.target.id + 'Error'

        if (e.target.name.includes(".")) {
            const fieldArr = e.target.name.split(".")
            this.setState({ data: { ...this.state.data, [fieldArr[0]]: { [fieldArr[1]]: e.target.value } } });
        }
        else
            this.setState({ data: { ...this.state.data, [e.target.id]: e.target.value } });

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

        this.setState({ errors: { ...this.state.errors, [targetError]: errorMsg } })
    }

    handleChangeArrival = (e, value) => {
        console.log(e.target.value)
        this.setState({ data: { arrivalTime: value } });
    }

    handleChangeDeparture = (value) => {
        this.setState({ data: { departureTime: value } });
    }

    areFieldsValid() {
        const errorsArr = Object.keys(this.state.errors)

        errorsArr.forEach(error => {
            if (!this.state.errors[error] === '')
                return false
        });

        return true
    }
    onSubmit = (e) => {
        e.preventDefault()
        const data = this.state.data
        this.props.handleSubmit(data)
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/flights/${this.props.id}`)
            .then(({ data }) => {
                console.log(data)
                this.setState({ data })
            })

    }

    render() {
        const { economySeatsAvailable, businessSeatsAvailable, firstSeatsAvailable, from, to, arrivalTime,
            departureTime, flightNumber, departureLocation, arrivalLocation } = this.state.data

        const { fromError, toError, economySeatsAvailableError, businessSeatsAvailableError, firstSeatsAvailableError,
            flightNumberError, dTerminalError, dCountryError, dCityError, dAirportError, aAirportError, aCityError,
            aCountryError, aTerminalError } = this.state.errors


        return (
            <Box sx={{ '& .MuiTextField-root': { m: 4, width: '40ch' }, }} noValidateautoComplete="off">
                <form onSubmit={this.onSubmit}>
                    <FormControl >
                        <IconButton sx={{ ml: "auto" }} onClick={this.props.close}><CloseIcon /></IconButton>
                        <TextField error={flightNumberError !== ''} helperText={flightNumberError} value={flightNumber} onChange={this.handleChange} label="Flight Number" required type="input" className="formElements" id="flightNumber" placeholder="Ex: kM7wXs" name="flightNumber" ></TextField>

                        <Divider style={{ width: '100%' }}>Departure Location Info</Divider>
                        <TextField error={dCountryError !== ''} helperText={dCountryError} value={departureLocation.country} onChange={this.handleChange} label="Country" required type="input" className="formElements" id="dCountry" placeholder="Ex: Egypt" name="departureLocation.country" ></TextField>
                        <TextField error={dCityError !== ''} helperText={dCityError} value={departureLocation.city} onChange={this.handleChange} label="City" required type="input" className="formElements" id="dCity" placeholder="Ex: Cairo" name="departureLocation.city" ></TextField>
                        <TextField error={dAirportError !== ''} helperText={dAirportError} value={departureLocation.airport} onChange={this.handleChange} label="Airport" required type="input" className="formElements" id="dAirport" placeholder="Ex: Cairo International Airport" name="departureLocation.airport" ></TextField>
                        <TextField error={dTerminalError !== ''} helperText={dTerminalError} value={departureLocation.terminal} onChange={this.handleChange} label="Terminal" required type="input" className="formElements" id="dTerminal" placeholder="Ex: 1" name="departureLocation.terminal" ></TextField>

                        <Divider style={{ width: '100%' }}>Arrival Location Info</Divider>
                        <TextField error={aCountryError !== ''} helperText={aCountryError} value={arrivalLocation.country} onChange={this.handleChange} label="Country" required type="input" className="formElements" id="aCountry" placeholder="Ex: USA" name="arrivalLocation.country" ></TextField>
                        <TextField error={aCityError !== ''} helperText={aCityError} value={arrivalLocation.city} onChange={this.handleChange} label="City" required type="input" className="formElements" id="aCity" placeholder="Ex: New York" name="arrivalLocation.city" ></TextField>
                        <TextField error={aAirportError !== ''} helperText={aAirportError} value={arrivalLocation.airport} onChange={this.handleChange} label="Airport" required type="input" className="formElements" id="aAirport" placeholder="Ex: John F. Kennedy International Airport" name="arrivalLocation.airport" ></TextField>
                        <TextField error={aTerminalError !== ''} helperText={aTerminalError} value={arrivalLocation.terminal} onChange={this.handleChange} label="Terminal" required type="input" className="formElements" id="aTerminal" placeholder="Ex: 4" name="arrivalLocation.terminal" ></TextField>
                        <Divider style={{ width: '100%' }}>Other Flight Info</Divider>

                        <TextField error={fromError !== ''} helperText={fromError} value={from} onChange={this.handleChange} label="From" required type="input" className="formElements" id="from" placeholder="Ex: CAI" name="from" ></TextField>
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