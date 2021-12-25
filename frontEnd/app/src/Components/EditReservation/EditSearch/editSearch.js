import { Component } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
// import AutoComplete from "../autoComplete/AutoComplete";
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { withRouter } from 'react-router';


import { Link, useNavigate, Navigate } from 'react-router-dom';

import './editSearch.css'


// const dummy = () => {
//     return (
//         <div>
//             <h1>Hello</h1>
//         </div>
//     )

//    navigate = useNavigate();


// }


class UserSearch extends Component {

    // include propse that init the state
    constructor(props) {
        super(props);
        this.state = {
            depClass: this.props.depClass,
            arrClass: this.props.arrClass,
            depDate: this.props.depDate,
            arrDate: this.props.arrDate,
            from: this.props.from,
            to: this.props.to,
            adults: this.props.adults,
            kids: 0,
            openAlert: false,
            errorMessage: "",
            result: {},
            isChangeSearch: this.props.isChangeSearch,
            airports: [],
            departureSearch: this.props.departureSearch,
            returnSearch: this.props.returnSearch,
            oldDepartureFlight: this.props.oldDepartureFlight,
            oldReturnFlight: this.props.oldReturnFlight,
            reservation: this.props.reservation,
            invalidDepdate: false,
            invalidReturndate: false

        }
    }


    componentDidMount() {
        // let ul = document.getElementsByTagName('a')[1];
        // console.log(ul);
        fetch('http://localhost:8000/flights')
            .then(response => response.json())
            .then(flights => {

                let airportSet = new Set();
                flights.map((flight) => {
                    airportSet.add(flight.departureLocation.airport)
                    airportSet.add(flight.arrivalLocation.airport)
                })
                this.setState({ airports: Array.from(airportSet) })

            });
    }



    resetState = (newState) => {
        // set all state props to initial state
        this.setState({
            depClass: newState.depClass, arrClass: newState.arrClass, depDate: newState.depDate, arrDate: newState.arrDate,
            from: newState.from, to: newState.to, adults: newState.adults, kids: newState.kids, openAlert: false, errorMessage: ""
        })
    }

    onFromChange = (event) => {
        let input = event.target.innerHTML
        if (input.length > 15) input = ""
        this.setState({ from: input })

    }

    onToChange = (event) => {
        let input = event.target.innerHTML
        if (input.length > 15) input = ""
        this.setState({ to: input })

    }

    onDepChange = (event) => {
        this.setState({ depDate: event })

    }

    onArrChange = (event) => {
        this.setState({ arrDate: event })

    }


    handleDepChange = (event) => {

        this.setState({ depClass: event.target.value });
    };

    handleArrChange = (event) => {
        this.setState({ arrClass: event.target.value });
    };

    onAdultsChange = (event) => {

        this.setState({ adults: event.target.value });
    };

    onKidsChange = (event) => {
        this.setState({ kids: event.target.value });
    };

    areFieldsValid = () => {
        const {
            from, to } = this.state
        console.log(from === to)
        return (from.length > 0 && to.length > 0) && (from !== to)

    }

    handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openAlert: false })
    };


    isDateValid = () => {
        const { depDate, arrDate } = this.state
        return depDate < arrDate
    }

    arePassengersValid = () => {
        const { adults, kids } = this.state
        return parseInt(adults) + parseInt(kids) > 0
    }

    refreshPage = () => {
        window.location.reload();
    }

    onSearch = () => {

        if (this.areFieldsValid()) {
            if (this.isDateValid()) {
                if (this.arePassengersValid()) {
                    console.log("Search");

                    if (!this.isDateValid && this.state.departureSearch) {
                        this.setState({ invalidDepdate: true })
                    }
                    if (!this.isDateValid && this.state.returnSearch) {
                        this.setState({ invalidReturndate: true })
                    }
                    const { from, to, depDate, arrDate, depClass, arrClass, adults, kids } = this.state

                    let query = { "out": { "dep": depDate, "class": depClass.toLowerCase() }, "in": { "dep": arrDate, "class": arrClass.toLowerCase() }, "from": from, "to": to, "adults": adults, "kids": kids }

                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(query)
                    };


                    fetch('http://localhost:8000/flights/flightquery', requestOptions).then(res => res.json()).then(data => {
                        console.log('data', data)
                        this.setState({ result: data })
                        console.log('result', this.state.result)
                        let link = document.getElementById('flightLink');
                        console.log('cond', this.state.isChangeSearch)

                        if (this.state.isChangeSearch) link.click();
                        else {
                            console.log('here');
                            link.click();
                            this.refreshPage();

                        }

                        console.log('Link', link)

                    })
                }
                else {
                    this.setState({ openAlert: true, errorMessage: "Please select at least one passenger" })
                }
            } else {
                if (this.state.returnSearch) {
                    this.setState({ openAlert: true, errorMessage: "Arrival date must be after Departure date.Please change your Departure flight first." })
                }else{
                    this.setState({ openAlert: true, errorMessage: "Departure date must be before Arrival date.Please change your Return flight first." })
                }
            }
        }
        else {
            this.setState({ openAlert: true, errorMessage: "Please fill 2 different Departure and Return airports" })

        }
    }



    render() {
        console.log(this.state.arrClass, this.state.from);
        return (
            <div>

                <Stack spacing={5} >
                    <Stack direction="row" spacing={2} alignItems="center" alignContent="Center">
                        <Autocomplete
                            disabled={true}
                            value={this.state.from}
                            options={this.state.airports}
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} label="From" />}
                            onChange={this.onFromChange}
                        />

                        {this.state.departureSearch ?
                            (
                                <Stack direction="row" spacing={1} alignItems="center" alignContent="Center">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Outward Date"
                                            value={this.state.depDate}
                                            sx={{ width: 100 }}
                                            onChange={this.onDepChange}
                                            renderInput={(params) => <TextField error={false}
                                                {...params} />}
                                            cancelText='Cancel'
                                            clearable={false}
                                            allowSameDateSelection={true}
                                            error={false}
                                        />
                                    </LocalizationProvider>

                                    <FormControl id="class" sx={{ width: 150, p: 0.5 }} size="small" p={1} >
                                        <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={this.state.depClass}
                                            label="Class"
                                            onChange={this.handleDepChange}
                                        >
                                            <MenuItem value={"Economy"}>Economy</MenuItem>
                                            <MenuItem value={"Business"}>Business</MenuItem>
                                            <MenuItem value={"First"}>First</MenuItem>
                                        </Select>
                                    </FormControl></Stack>) : <div></div>}


                    </Stack>

                    <Stack direction="row" spacing={2}>
                        <Autocomplete
                            disabled={true}
                            value={this.state.to}
                            options={this.state.airports}
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} label="To" />}
                            onChange={this.onToChange}
                        />
                        {this.state.returnSearch ?
                            (<Stack direction="row" spacing={1} alignItems="center" alignContent="Center">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Inward Date"
                                        value={this.state.arrDate}
                                        sx={{ width: 100 }}
                                        onChange={this.onArrChange}
                                        renderInput={(params) => <TextField error={false}
                                            {...params} />}
                                        cancelText='Cancel'
                                        clearable={false}
                                        allowSameDateSelection={true}
                                        error={false}
                                    />
                                </LocalizationProvider>

                                <FormControl id="class" sx={{ width: 150, p: 0.5 }} size="small" p={1} >
                                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.arrClass}
                                        label="Class"
                                        onChange={this.handleArrChange}
                                    >
                                        <MenuItem value={"Economy"}>Economy</MenuItem>
                                        <MenuItem value={"Business"}>Business</MenuItem>
                                        <MenuItem value={"First"}>First</MenuItem>
                                    </Select>
                                </FormControl> </Stack>) : <div></div>
                        }

                    </Stack>

                    <Stack direction="row" spacing={44} alignItems="center">
                        <Stack direction="row" spacing={3}>
                            <FormControl sx={{ width: 150, p: 0.5 }} size="Large" p={1} >
                                <InputLabel id="demo-simple-select-label">Adults</InputLabel>
                                <Select
                                    disabled={true}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.adults}
                                    label="Class"
                                    onChange={this.onAdultsChange}
                                >
                                    {
                                        vals.map(
                                            (val, index) => {
                                                return <MenuItem value={val} key={index} >{val}</MenuItem>
                                            }

                                        )
                                    }

                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: 150, p: 0.5 }} size="Large" p={1} >
                                <InputLabel id="demo-simple-select-label">Children</InputLabel>
                                <Select
                                    disabled={true}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.kids}
                                    label="Class"
                                    onChange={this.onKidsChange}
                                >
                                    {
                                        vals.map(
                                            (val, index) => {
                                                return <MenuItem value={val} key={index}>{val}</MenuItem>
                                            }

                                        )
                                    }

                                </Select>
                            </FormControl>




                        </Stack>
                        <Stack direction="row">

                            <Button variant="contained" onClick={this.onSearch} type="submit">
                                Search Flights    </Button>

                            <Link to="/editReservation" id="flightLink" type="submit" state={{
                                result: this.state.result,
                                depClass: this.state.depClass,
                                arrClass: this.state.arrClass,
                                depDate: this.state.depDate,
                                arrDate: this.state.arrDate,
                                from: this.state.from,
                                to: this.state.to,
                                adults: this.state.adults,
                                departureSearch: this.state.departureSearch,
                                returnSearch: this.state.returnSearch,
                                oldDepartureFlight: this.state.oldDepartureFlight,
                                oldReturnFlight: this.state.oldReturnFlight,
                                invalidDepdate: this.state.invalidDepdate,
                                invalidReturndate: this.state.invalidReturndate,
                                reservation: this.state.reservation
                            }} > </Link>



                        </Stack>


                    </Stack>



                </Stack>
                <Snackbar open={this.state.openAlert} autoHideDuration={5000} onClose={this.handleCloseAlert}>
                    <Alert onClose={this.handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                        {this.state.errorMessage}
                    </Alert>
                </Snackbar>

            </div>
        );
    }
}


// function WithNavigate(props) {
//     let navigate = useNavigate();
//     return  <UserSearch navigate={navigate} />
// }

const airports = ["POLONIA",
    "IVATO",
    "TAWAU",
    "BARAJAS",
    "LUQA",
    "LANZAROTE",
    "PAPHOS INTL",
    "VALLEE DE SEINE"

]


const vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const classes = ['Economy', 'Business', 'First']


export default UserSearch;
