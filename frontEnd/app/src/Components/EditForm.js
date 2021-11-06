import React, { Component } from 'react';
import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Grid, Box,FormControl,TextField,Button} from '@mui/material';


class EditForm extends Component {
    state = {
        _id: '',
        arrivalTime: new Date(),
        departureTime: new Date(),
        seatsAvailable: '',
        cabin: '',
        departureTerminal: '',
        arrivalTerminal: '',
        from: '',
        to: '',
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleChangeArrival = (value) => {
        this.setState({ arrivalTime: value });
    }

    handleChangeDeparture = (value) => {
        console.log(value)
        this.setState({ departureTime: value });
    }


    onSubmit = (e) => {
        e.preventDefault()
        const data = {
            _id: this.state._id,
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
                    departureTime, departureTerminal, arrivalTerminal,_id } = data
                this.setState({
                    _id,
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
            departureTime, departureTerminal, arrivalTerminal } = this.state
        return (
            <Box sx={{ '& .MuiTextField-root': { m: 4, width: '40ch' }, }} noValidateautoComplete="off">
                {/*change endpoint according to put */}
                <form onSubmit={this.onSubmit}>
                    <FormControl>
                       <Grid sx={{ml:"auto"}}> <IconButton onClick={this.props.close}><CloseIcon/></IconButton></Grid>
                        <TextField value={from} onChange={this.handleChange} label="From" required type="input" className="formElements" id="from" placeholder="Ex: LAX" name="from" ></TextField>
                        <TextField value={to} onChange={this.handleChange} label="To" required type="input" className="to" id="to" placeholder="Ex: JFK" name="to" ></TextField>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DateTimePicker
                                label="Departure Time"
                                value={departureTime}
                                onChange={this.handleChangeDeparture}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DateTimePicker
                                label="Arrival Time"
                                value={arrivalTime}
                                onChange={this.handleChangeArrival}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                        <TextField onChange={this.handleChange} value={departureTerminal} label="Departure Terminal" required type="input" className="formElements" id="dTerminal" placeholder="Ex: 1" name="departureTerminal" ></TextField>
                        <TextField onChange={this.handleChange} value={arrivalTerminal} label="Arrival Termina;" required type="input" className="formElements" id="aTerminal" placeholder="Ex: 1" name="arrivalTerminal" ></TextField>
                        <TextField onChange={this.handleChange} value={cabin} label="Cabin" required type="input" className="formElements" id="cabin" placeholder="Ex: Economy" name="cabin" ></TextField>
                        <TextField onChange={this.handleChange} value={seatsAvailable} label="Available Seats" required type="input" className="formElements" id="seats" placeholder="Ex: 20" name="seatsAvailable" ></TextField>
                        <Button type="submit">Submit</Button>
                    </FormControl>
                </form>
            </Box>

        );
    }
}

export default EditForm;