import { Component } from 'react';
// import AutoComplete from "../autoComplete/AutoComplete";
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import StaticDatePicker from '@mui/lab/StaticDatePicker';



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
            result: {},
            isChangeSearch: this.props.isChangeSearch,
            airports: [],
            desktop: window.matchMedia("(min-width: 900px)").matches,
            openDatesDialog: false,
            dateTabValue: 0,
            mobileDateText: "Travel Date and Class",
            mobilePassengersText: "Passengers",
            openPassengersDialog: false,
            


        }
    }


    componentDidMount() {

        // let ul = document.getElementsByTagName('a')[1];
        // console.log(ul);
        axios.get('http://localhost:8000/flights')
            .then(({ data }) => {
                const flights = data
                let airportSet = new Set();
                flights.map((flight) => {
                    airportSet.add(flight.departureLocation.airport)
                    airportSet.add(flight.arrivalLocation.airport)
                })
                this.setState({ airports: Array.from(airportSet) })

                const handler = e => this.setState({ desktop: e.matches });
                window.matchMedia("(min-width: 900px)").addEventListener('change', handler);

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
        if (input.length > 39) input = ""
        this.setState({ from: input })

    }

    onToChange = (event) => {
        let input = event.target.innerHTML
        if (input.length > 39) input = ""
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

        console.log(this.state);
        if (this.areFieldsValid()) {
            if (this.isDateValid()) {
                if (this.arePassengersValid()) {
                    console.log("Search");


                    const { from, to, depDate, arrDate, depClass, arrClass, adults, kids } = this.state

                    let query = { "out": { "dep": depDate, "class": classes[depClass].toLowerCase() }, "in": { "dep": arrDate, "class": classes[arrClass].toLowerCase() }, "from": from, "to": to, "adults": adults, "kids": kids }


                    axios.post('http://localhost:8000/flights/flightquery', query)
                        .then(({ data }) => {
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
                this.setState({ openAlert: true, errorMessage: "Departure date must be before arrival date" })
            }

        }
        else {
            this.setState({ openAlert: true, errorMessage: "Please fill 2 different Departure and Return airports" })

        }
    }

    a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    handleClickOpen = () => {
        this.setState({ openDatesDialog: true });
    }


    handleClose = () => {
        this.setState({ openDatesDialog: false });
        this.setState({
            mobileDateText: this.state.depDate.toDateString().substring(0, 10) + "-" + this.state.arrDate.toDateString().substring(0, 10)
        })
    }


    handleDateTabChange = (event, newValue) => {
        this.setState({ dateTabValue: newValue });
    };


    handlePassengersMobileOpen = () => {
        this.setState({ openPassengersDialog: true });
    }
    handlePassengersMobileClose = () => {
        this.setState({ openPassengersDialog: false });
        this.setState({ mobilePassengersText: "Adults: " + this.state.adults + "-" + "Children: " +this.state.kids });
    }



    render() {
        return (
            <div>

                <Stack spacing={20} >

                    {this.state.desktop ?
                        <Stack spacing={3}>
                            <Stack direction="row" spacing={5} alignItems="center" alignContent="Center">
                                <Autocomplete
                                    options={this.state.airports}
                                    sx={{ width: 200 }}
                                    renderInput={(params) => <TextField {...params} label="From" />}
                                    onChange={this.onFromChange}
                                />

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
                                        <MenuItem value={0}>Economy</MenuItem>
                                        <MenuItem value={1}>Business</MenuItem>
                                        <MenuItem value={2}>First</MenuItem>
                                    </Select>
                                </FormControl>


                            </Stack>

                            <Stack direction="row" spacing={5}>
                                <Autocomplete
                                    options={this.state.airports}
                                    sx={{ width: 200 }}
                                    renderInput={(params) => <TextField {...params} label="To" />}
                                    onChange={this.onToChange}
                                />

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

                                    <Button variant="contained" onClick={this.onSearch} type="submit">
                                        Search Flights    </Button>

                                    <Link to="/flights" id="flightLink" type="submit" state={{ result: this.state.result }} > </Link>



                                </Stack>


                            </Stack>
                        </Stack> :
                        <Stack spacing={2} >
                            <Autocomplete
                                options={this.state.airports}
                                sx={{ width: 200 }}
                                renderInput={(params) => <TextField {...params} label="From" />}
                                onChange={this.onFromChange}
                            />

                            <Autocomplete
                                options={this.state.airports}
                                sx={{ width: 200 }}
                                renderInput={(params) => <TextField {...params} label="To" />}
                                onChange={this.onToChange}
                            />


                            <Button variant="outlined" onClick={this.handleClickOpen}>
                                {this.state.mobileDateText}
                            </Button>
                            <Dialog
                                fullWidth={false}
                                maxWidth={'lg'}
                                open={this.state.openDatesDialog}
                                onClose={this.handleClose}
                            >
                                <DialogContent>

                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={this.state.dateTabValue} onChange={this.handleDateTabChange} aria-label="basic tabs example">
                                            <Tab label="Fly Out" {...this.a11yProps(0)} />
                                            <Tab label="Fly Back" {...this.a11yProps(1)} />
                                        </Tabs>
                                    </Box>
                                    <TabPanel value={this.state.dateTabValue} index={0} >
                                        <Stack spacing = {5}>  
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <MobileDatePicker
                                                label="Outward Date"
                                                sx={{ width: 50 }}
                                                value={this.state.depDate}
                                                onChange={this.onDepChange}
                                                renderInput={(params) => <TextField error={false}
                                                    {...params} />}
                                                cancelText='Cancel'
                                                clearable={false}
                                                allowSameDateSelection={true}
                                                error={false}
                                                class="mobileDate"
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


                                    </TabPanel>
                                    <TabPanel value={this.state.dateTabValue} index={1} >
                                        <Stack spacing = {5}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <MobileDatePicker
                                                label="Inward Date"
                                                sx={{ width: 50 }}
                                                value={this.state.arrDate}
                                                onChange={this.onArrChange}
                                                renderInput={(params) => <TextField error={false}
                                                    {...params} />}
                                                cancelText='Cancel'
                                                clearable={false}
                                                allowSameDateSelection={true}
                                                error={false}
                                                class="mobileDate"
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

                                    </TabPanel>



                                </DialogContent>
                            </Dialog>
                            
                            <Button variant="outlined" onClick={this.handlePassengersMobileOpen}>
                                {this.state.mobilePassengersText}
                            </Button>
                            <Dialog
                                fullWidth={false}
                                maxWidth={'lg'}
                                open={this.state.openPassengersDialog}
                                onClose={this.handlePassengersMobileClose}
                            >
                                <DialogContent>
                                    <Stack spacing = {5}> 
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

                                </DialogContent>

                            </Dialog>






                            <Button variant="contained" onClick={this.onSearch} type="submit">
                                Search Flights    </Button>

                            <Link to="/flights" id="flightLink" type="submit" state={{ result: this.state.result }} > </Link>

                        </Stack>



                    }

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
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};



export default UserSearch;
