import React from "react";
import TextField from '@mui/material/TextField';
import { Component } from 'react';
import './SearchModule.css';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
// import AutoComplete from "../autoComplete/AutoComplete";
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button'

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class SearchModule extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flightNum: '',
      from: '',
      to: '',
      depDate: new Date(),
      flights: flightData,
      filterOpen: false
    }

  }



  filterFlight = () => {
    const { flightNum, from, to, depDate } = this.state;
    // console.log( flightData[0]._id.$oid.substring(start) )
    console.log('From', from)
    console.log('To', to)
    let filterByFrom = flightData.filter(flight => {
      return from === flight.from || from.length === 0
    })

    let filterByTo = flightData.filter(flight => {
      return to === flight.to || to.length === 0
    })


    console.log(filterByFrom)
    console.log(filterByTo)

    let aggFilter = filterByTo.filter(flight => {
      return filterByFrom.includes(flight)
    })

    console.log(aggFilter)

  }

  onflightNumChange = (event) => {
    this.setState({ flightNum: event.target.value })
    let filteredFlights = flightData.filter(flight => {
      let id = flight._id.$oid // simulate that we have an ID till we decide what is a flight ID 
      id = id.substring(id.length - 2,)
      return id.startsWith(event.target.value)
    })

    console.log(filteredFlights)

    this.setState({ flights: filteredFlights })

  }
  onFromChange = (event) => {
    let input = event.target.innerHTML
    if (input.length > 4) input = ""
    this.setState({ from: input })

    console.log(input)
  }

  onToChange = (event) => {
    let input = event.target.innerHTML
    if (input.length > 4) input = ""
    this.setState({ to: input })


  }
  onDepChange = (event) => {
    this.setState({ depDate: event })
    console.log(event.getDay())

  }

  onFilterShow = () => {
    this.setState({ filterOpen: true })
  }

  onFilterClose = () => {
    this.setState({ filterOpen: false })
  }

  render() {
    const { depDate, filterOpen } = this.state
    return <div className="search">
      <div className="search1" >
        <Stack direction="row" spacing={50}>
          <div>    <TextField id="outlined-basic"
            label="Search Flight Number"
            variant="outlined"
            className="flightNumber"
            onChange={this.onflightNumChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          /></div>

          <Button variant="outlined"
            startIcon={<FilterAltRoundedIcon />}
            onClick={this.onFilterShow}
          >
            Filter
          </Button>
        </Stack>


        <Dialog
          fullWidth='sm'
          maxWidth={false}
          open={filterOpen}
          onClose={this.onFilterClose}
        >
          <DialogTitle>Filter By</DialogTitle>
          <DialogContent>
            <Stack
              spacing={5}
            >
              <div>  <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={airports}
                sx={{ width: 400 }}
                onInputChange={this.onFromChange}
                renderInput={(params) =>
                  <TextField {...params} label="From" onChange={this.onFromChange} />}

              /></div>

              <div>   <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={airports}
                sx={{ width: 400 }}
                renderInput={(params) => <TextField {...params} label="To" />}
                onChange={this.onToChange}

              /></div>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Choose Departure Date"
                  value={depDate}
                  onChange={(newValue) => {
                    this.setState({ depDate: newValue })
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <Button
                variant="contained"
                onClick={this.filterFlight}
              >Apply Filters</Button>

              <Button
                variant="outlined"
                onClick={this.filterFlight}
              >Clear Filters</Button>

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

const airports = [{ label: 'LAX' }, { label: 'CAI' }, { label: 'JFK' }, { label: 'DXB' }]

const flightData = [
  { "_id": { "$oid": "617ee2fed20e685a3485cf79" }, "seatsAvailable": { "$numberInt": "20" }, "from": "LAX", "to": "JFK", "flightDate": { "$date": { "$numberLong": "1641938391000" } }, "cabin": "Economy", "__v": { "$numberInt": "0" } },
  { "_id": { "$oid": "617ee300d20e685a3485cf7c" }, "seatsAvailable": { "$numberInt": "10" }, "from": "LAX", "to": "JFK", "flightDate": { "$date": { "$numberLong": "1641938391000" } }, "cabin": "Business", "__v": { "$numberInt": "0" } },
  { "_id": { "$oid": "617ee301d20e685a3485cf94" }, "seatsAvailable": { "$numberInt": "22" }, "from": "CAI", "to": "DXB", "flightDate": { "$date": { "$numberLong": "1649541591000" } }, "cabin": "Business", "__v": { "$numberInt": "0" } }

]



export default SearchModule;