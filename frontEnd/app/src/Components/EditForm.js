import React, { Component, useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import axios from 'axios'


class EditForm extends Component {
    state = {
        startDate: new Date(),
        flightDate: new Date(),
        seatsAvailable: 0,
        cabin: '',
        flightTerminal: '',
        from: '',
        to: '',
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = () => {
        const data = {
            flightDate: this.state.flightDate,
            seatsAvailable: this.state.seatsAvailable,
            cabin: this.state.cabin,
            flightTerminal: this.state.flightTerminal,
            from: this.state.from,
            to: this.state.to,
        }
        this.props.handleSubmit(data)
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/flights/${this.props.id}`)
            .then((data) => {
                console.log(data)
                const { seatsAvailable, cabin, from, to, flightTerminal, flightDate } = data
                this.setState({
                    seatsAvailable,
                    cabin,
                    from,
                    to,
                    flightTerminal,
                    flightDate,
                })
            })
    }

    render() {
        const { seatsAvailable, cabin, from, to, flightTerminal, flightDate } = this.state
        return (
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 4, width: '40ch' }, }} noValidateautoComplete="off">
                {/*change endpoint according to put */}
                <form onsubmit={this.onSubmit}>
                    <FormControl>
                        <TextField value={from} onChange={this.handleChange} label="From" required type="input" className="formElements" id="from" placeholder="From" name="from" ></TextField>
                        <TextField value={to} onChange={this.handleChange} label="To" required type="input" className="to" id="to" placeholder="To" name="to" ></TextField>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DateTimePicker
                                label="Flight Date and Time"
                                value={flightDate}
                                onChange={this.handleChange}
                                renderInput={(params) => <TextField {...params} />}
                                name="flightDate"
                            />
                        </LocalizationProvider>
                        <TextField onChange={this.handleChange} value={flightTerminal} label="Flight Terminal" required type="input" className="formElements" id="terminal" placeholder="Cairo" name="terminal" ></TextField>
                        <TextField onChange={this.handleChange} value={cabin} label="Cabin" required type="input" className="formElements" id="cabin" placeholder="Cabin" name="cabin" ></TextField>
                        <TextField onChange={this.handleChange} value={seatsAvailable} label="Available Seats" required type="input" className="formElements" id="seats" placeholder="Seats" name="seatsAvailable" ></TextField>
                        <Input type="hidden" name="date" flightDate={this.state.startDate ? this.state.flightDate : null} ></Input>
                        <Button type="submit">Create Flight</Button>
                    </FormControl>
                </form>
            </Box>

        );
    }
}

export default EditForm;