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
        value: new Date()
    };

    handleChange = (value) => {
        this.setState({value});
    }

    componentDidMount(){
        axios.get('http://localhost:8000/flights')
    }

    render() {
        return (
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 4, width: '40ch' }, }} noValidateautoComplete="off">
                {/*change endpoint according to put */}
                <form action='http://localhost:8000/flights' method="PUT">
                    <FormControl>
                        <TextField label="From" required type="input" className="formElements" id="from" placeholder="From" name="from" ></TextField>
                        <TextField label="To" required type="input" className="to" id="to" placeholder="To" name="to" ></TextField>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DateTimePicker
                                label="Flight Date and Time"
                                value={this.state.value}
                                onChange={this.handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <TextField label="Flight Terminal" required type="input" className="formElements" id="terminal" placeholder="Cairo" name="terminal" ></TextField>
                        <TextField label="Cabin" required type="input" className="formElements" id="cabin" placeholder="Cabin" name="cabin" ></TextField>
                        <TextField label="Available Seats" required type="input" className="formElements" id="seats" placeholder="Seats" name="availableSeats" ></TextField>
                        <Input type="hidden" name="date" value={this.state.startDate ? this.state.value : null} ></Input>
                        <Button type="submit">Create Flight</Button>
                    </FormControl>
                </form>
            </Box>

        );
    }
}

export default EditForm;