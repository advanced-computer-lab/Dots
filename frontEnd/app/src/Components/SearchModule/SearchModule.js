import React from "react";
import TextField from '@mui/material/TextField';
import { Component } from 'react';
import './SearchModule.css';
import CreateFlights from '../createFlight'

import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
// import AutoComplete from "../autoComplete/AutoComplete";
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button'

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TimePicker from '@mui/lab/TimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

class SearchModule extends Component {




  constructor(props) {
    super(props);
    this.state = {
      // flightNum: '',
      // from: '',
      // to: '',
      // depDate: new Date(),
      // flights: flightData,
      filterOpen: false,
      airports: []
    }

  }

  componentDidMount() {
    //const {flights} = await axios.get('http://localhost:8000/flights');
    fetch('http://localhost:8000/flights')
      .then(response => response.json())
      .then(flights => {

        let airportSet = new Set();
        flights.map((flight) => {
          airportSet.add(flight.from)
          airportSet.add(flight.to)
        })
        this.setState({ airports: Array.from(airportSet) })

      });
  }


  onFilterShow = () => {
    this.setState({ filterOpen: true })
}
  

  // onFilterClose = () => {
  //   this.setState({ filterOpen: false })
  // }

  // closeFilter = () => {
  //   this.setState({ to: '', from: '', depDate: new Date(), filterOpen: false })
  //   console.log(this.state.flights)

  // }
  render() {
    const { depDate, arrDate, arrTime, depTime, onflightNumChange, onFromChange, onToChange, onDepChange, filterFlight, onDepTimeChange, onArrChange, onArrTimeChange,
      onArrTerminalChange, onDepTerminalChange, onCabinChange, onSeatsChange, onFilterClose } = this.props
    return <div className="search">
      <div className="search1" >
        <Stack direction="row" spacing={50}>
          <div>    <TextField id="outlined-basic"
            label="Search Flight Number"
            variant="outlined"
            className="flightNumber"
            onChange={onflightNumChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          /></div>

          <Stack direction="row" spacing={5}>

            <Button variant="outlined"
              startIcon={<FilterAltRoundedIcon />}
              onClick={this.onFilterShow}
            >
              Filter
            </Button>

            <CreateFlights />


          </Stack>



        </Stack>


        <Dialog
          fullWidth={true}
          maxWidth={false}
          open={this.state.filterOpen}
          onClose={ () => { onFilterClose(); this.state.filterOpen = false } }
        >
          <DialogTitle>Filter By</DialogTitle>
          <DialogContent>
            <Stack
              spacing={5}
              id="filters"
            >
              <div>  <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={this.state.airports}
                sx={{ width: 400 }}
                onInputChange={onFromChange}
                renderInput={(params) =>
                  <TextField {...params} label="From" onChange={onFromChange} />}

              /></div>

              <div>   <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={this.state.airports}
                sx={{ width: 400 }}
                renderInput={(params) => <TextField {...params} label="To" />}
                onChange={onToChange}

              /></div>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Choose Departure Date"
                  value={depDate}
                  onChange={onDepChange}
                  renderInput={(params) => <TextField error={false}
                    {...params} />}
                  cancelText='Cancel'
                  clearable={true}
                  allowSameDateSelection={true}
                  error={false}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Choose Arrival Date"
                  value={arrDate}
                  onChange={onArrChange}
                  renderInput={(params) => <TextField error={false}
                    {...params} />}
                  cancelText='Cancel'
                  clearable={true}
                  allowSameDateSelection={true}
                  error={false}

                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Choose Departure Time"
                  value={depTime}
                  onChange={onDepTimeChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Choose Arrival Time"
                  value={arrTime}
                  onChange={onArrTimeChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>


              {/* <div>  <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={['1', '2', '3']}
                sx={{ width: 400 }}
                onInputChange={onDepTerminalChange}
                renderInput={(params) =>
                  <TextField {...params} label="Departure Terminal" onChange={onDepTerminalChange} />}

              /></div> */}

              <div>  <TextField id="outlined-basic"
                label="Departure Terminal"
                variant="outlined"
                onChange={onDepTerminalChange}
              /></div>

              {/* <div>  <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={['1', '2', '3']}
                sx={{ width: 400 }}
                onInputChange={onArrTerminalChange}
                renderInput={(params) =>
                  <TextField {...params} label="Arrival Terminal" onChange={onArrTerminalChange} />}

              /></div> */}


              <div>  <TextField id="outlined-basic"
                label="Arrival Terminal"
                variant="outlined"
                onChange={onArrTerminalChange}
              /></div>

              <div>  <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={['Economy', 'Business', 'First']}
                sx={{ width: 400 }}
                onInputChange={onCabinChange}
                renderInput={(params) =>
                  <TextField {...params} label="Cabin" onChange={onCabinChange} />}

              /></div>

              <div>  <TextField id="outlined-basic"
                label="Filter By Minimum Available Seats"
                variant="outlined"
                onChange={onSeatsChange}
                id="seats"
              />
              </div>


              <Stack
                direction="row"
                spacing={3}
              >

                <Button
                  variant="outlined"
                  onClick={onFilterClose}
                >Close</Button>

                <Button
                  variant="contained"
                  onClick={filterFlight}
                >Apply Filters</Button>
              </Stack>

            </Stack>



          </DialogContent>



        </Dialog>




      </div>
      <div>
        <div className="search2">

        </div>

        <div className="search3">
          <div>

          </div>

        </div>


      </div>



    </div>

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


// const flightData = [
//   { "_id": { "$oid": "617ee2fed20e685a3485cf79" }, "seatsAvailable": { "$numberInt": "20" }, "from": "LAX", "to": "JFK", "flightDate": { "$date": { "$numberLong": "1641938391000" } }, "cabin": "Economy", "__v": { "$numberInt": "0" } },
//   { "_id": { "$oid": "617ee300d20e685a3485cf7c" }, "seatsAvailable": { "$numberInt": "10" }, "from": "LAX", "to": "JFK", "flightDate": { "$date": { "$numberLong": "1641938391000" } }, "cabin": "Business", "__v": { "$numberInt": "0" } },
//   { "_id": { "$oid": "617ee301d20e685a3485cf94" }, "seatsAvailable": { "$numberInt": "22" }, "from": "CAI", "to": "DXB", "flightDate": { "$date": { "$numberLong": "1649541591000" } }, "cabin": "Business", "__v": { "$numberInt": "0" } }

// ]




export default SearchModule;