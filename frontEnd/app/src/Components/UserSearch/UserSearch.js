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
import {withRouter} from 'react-router';


import { Link , useNavigate , Navigate } from 'react-router-dom';

import './UserSearch.css'


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
            depClass: 0,
            arrClass: 0,
            depDate: new Date(),
            arrDate: new Date(),
            from: "",
            to: "",
            adults: 1,
            kids: 0,
            openAlert: false,
            errorMessage: "",
        }
    }



    resetState = (newState) => {
        // set all state props to initial state
        this.setState( {depClass:newState.depClass , arrClass: newState.arrClass , depDate: newState.depDate , arrDate:newState.arrDate,
        from:newState.from , to:newState.to , adults:newState.adults , kids:newState.kids , openAlert:false , errorMessage:"" } )
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
        return from.length > 0 && to.length > 0

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


    onSearch = () => {

        if (this.areFieldsValid()) {
            if (this.isDateValid()) {
                if (this.arePassengersValid()) {
                    console.log("Search");

                    // <Navigate to="/flights" />

                    //  let navigate = this.props.navigate();
                    //  this.props.history.push(
                    //      '/flights'
            
                    //       );

                    //  navigate("/flights");
                    
                    // const { from, to, depDate, arrDate, depClass, arrClass, adults, kids } = this.state
                    // let query = { "out" : { "dep": depDate, "class": depClass } , "in" :{ "dep": arrDate , "class": arrClass } ,  "from":"POLONIA",  "to":"LUQA" , "adults" : "2" , "kids" : "0" }

                    // fetch('http://localhost:8000//flights/flightquery').then(res => res.json()).then(data => {
                    //     <Link to="/flights"/>
                    //     console.log(data)
                    // } )

                }
                else {
                    this.setState({ openAlert: true, errorMessage: "Please select at least one passenger" })
                }

            } else {
                this.setState({ openAlert: true, errorMessage: "Departure date must be before arrival date" })
            }

        }
        else {
            this.setState({ openAlert: true, errorMessage: "Please fill Departure and Return airports" })

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
                            
                            <Button variant="contained" class = "filled" onClick={this.onSearch} type="submit"> 
                            Search Flights    </Button>

                            <Link to="/flights"> Search   </Link>



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

const airports = [ "POLONIA",
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


export default  UserSearch ;
