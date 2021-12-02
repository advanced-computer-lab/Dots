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

import './UserSearch.css'

class UserSearch extends Component {


    constructor(props) {
        super(props);
        this.state = {
            depClass: "",
            arrClass: "",
            depDate: new Date(),
            arrDate: new Date(),
            from: "",
            to: "",
            adults: 1,
            kids: 0,
            openAlert: false
        }
    }

    onFromChange = (event) => {
        let input = event.target.innerHTML
        if (input.length > 4) input = ""
        this.setState({ from: input })

    }

    onToChange = (event) => {
        let input = event.target.innerHTML
        if (input.length > 4) input = ""
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
            adults, kids, arrClass, from, depClass, to } = this.state
        //    console.log(from.length > 0 &&  to.length > 0)
        const depc = classes[depClass]
        const arrc = classes[arrClass]
        return (parseInt(adults) > 0 || parseInt(kids) > 0) && from.length > 0 && to.length > 0 && depc && arrc

    }

    handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openAlert: false })
    };


    onSearch = () => {

        if (this.areFieldsValid()) {
            console.log("Search")
        }
        else {
            this.setState({ openAlert: true })

        }
    }



    render() {
        return (
            <div>

                <Stack spacing={5} >
                    <Stack direction="row" spacing={5} alignItems="center" alignContent="Center">
                        <Autocomplete
                            options={airports}
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} label="Departure Airport" />}
                            onChange={this.onFromChange}
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Departure Date"
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
                                <MenuItem value={0}>Economy</MenuItem>
                                <MenuItem value={1}>Business</MenuItem>
                                <MenuItem value={2}>First</MenuItem>
                            </Select>
                        </FormControl>


                    </Stack>

                    <Stack direction="row" spacing={5}>
                        <Autocomplete
                            options={airports}
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} label="Arrival Airport" />}
                            onChange={this.onToChange}
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Arrival Date"
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
                                <MenuItem value={0}>Economy</MenuItem>
                                <MenuItem value={1}>Business</MenuItem>
                                <MenuItem value={2}>First</MenuItem>
                            </Select>
                        </FormControl>

                    </Stack>

                    <Stack direction="row" spacing={44} alignItems="center">
                        <Stack direction="row" spacing={3}>
                            <FormControl sx={{ width: 150, p: 0.5 }} size="Large" p={1} >
                                <InputLabel id="demo-simple-select-label">Adults</InputLabel>
                                <Select
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
                            <Button variant="contained" onClick={this.onSearch} type="submit">Search Flights</Button>



                        </Stack>


                    </Stack>



                </Stack>
                <Snackbar open={this.state.openAlert} autoHideDuration={5000} onClose={this.handleCloseAlert}>
                    <Alert onClose={this.handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                        Complete all fields to searh flights
                    </Alert>
                </Snackbar>

            </div>
        );
    }
}


const airports = ["LAX",
    "JFK",
    "LHR",
    "CAI",
    "DXB",
    "CDG",
    "MUC",
    "RUH",
    "YYZ",
    "FRA"
]


const vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const classes = ['Economy', 'Business', 'First']


export default UserSearch;
