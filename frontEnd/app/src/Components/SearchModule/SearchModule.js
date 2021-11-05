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
import ClearIcon from '@mui/icons-material/Clear';


class SearchModule extends Component {


  constructor(props) {
    super(props);
    this.state = {
      // flightNum: '',
      // from: '',
      // to: '',
      // depDate: new Date(),
      // flights: flightData,
      filterOpen: false
    }

  }



  // filterFlight = () => {
  //   const { flightNum, from, to, depDate } = this.state;
  //   // console.log( flightData[0]._id.$oid.substring(start) )
  //   console.log('From', from)
  //   console.log('To', to)
  //   let filterByFrom = flightData.filter(flight => {
  //     return from === flight.from || from.length === 0
  //   })

  //   let filterByTo = flightData.filter(flight => {
  //     return to === flight.to || to.length === 0
  //   })


  //   console.log(filterByFrom)
  //   console.log(filterByTo)

  //   let aggFilter = filterByTo.filter(flight => {
  //     return filterByFrom.includes(flight)
  //   })

  //   let filterByDep = flightData.filter(flight => {
  //     if (depDate) {
  //       let inDate = new Date(parseInt(flight.flightDate.$date.$numberLong))
  //       inDate.setHours(0, 0, 0, 0)
  //       depDate.setHours(0, 0, 0, 0)
  //       // console.log(   inDate.valueOf() === depDate.valueOf())
  //       return inDate.valueOf() === depDate.valueOf()
  //     }
  //     else return true
  //   })
  //     console.log(filterByDep)

  //   aggFilter = aggFilter.filter(flight => {
  //     return filterByDep.includes(flight)
  //   })


  //   console.log(aggFilter)
  //   this.setState({ flights: aggFilter })

  // }

  

  // onflightNumChange = (event) => {
  //   this.setState({ flightNum: event.target.value })
  //   let filteredFlights = flightData.filter(flight => {
  //     let id = flight._id.$oid // simulate that we have an ID till we decide what is a flight ID 
  //     id = id.substring(id.length - 2,)
  //     return id.startsWith(event.target.value)
  //   })

  //   console.log(filteredFlights)

  //   this.setState({ flights: filteredFlights })

  // }
  // onFromChange = (event) => {
  //   let input = event.target.innerHTML
  //   if (input.length > 4) input = ""
  //   this.setState({ from: input })

  // }

  // onToChange = (event) => {
  //   let input = event.target.innerHTML
  //   if (input.length > 4) input = ""
  //   this.setState({ to: input })


  // }
  // onDepChange = (event) => {
  //   this.setState({ depDate: event })

  // }

  onFilterShow = () => {
    this.setState({ filterOpen: true })
  }

  onFilterClose = () => {
    this.setState({ filterOpen: false })
  }

  closeFilter = () => {
    this.setState({ to: '', from: '', depDate: new Date(), filterOpen: false })
    console.log(this.state.flights)

  }
  render() {
     const { filterOpen } = this.state
    const {  depDate , onflightNumChange , onFromChange , onToChange , onDepChange ,  filterFlight } = this.props
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

          <Button variant="outlined"
            startIcon={<FilterAltRoundedIcon />}
            onClick={this.onFilterShow}
          >
            Filter
          </Button>
        </Stack>


        <Dialog
          fullWidth={true}
          maxWidth={false}
          open={filterOpen}
          onClose={this.onFilterClose}
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
                options={airports}
                sx={{ width: 400 }}
                onInputChange={onFromChange}
                renderInput={(params) =>
                  <TextField {...params} label="From" onChange={onFromChange} />}

              /></div>

              <div>   <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={airports}
                sx={{ width: 400 }}
                renderInput={(params) => <TextField {...params} label="To" />}
                onChange={onToChange}

              /></div>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Choose Departure Date"
                  value={depDate}
                  onChange= {onDepChange}
                  renderInput={(params) => <TextField {...params} />}
                  cancelText='Cancel'
                  clearable={true}
                  allowSameDateSelection={true}
                />
              </LocalizationProvider>

              <Stack
                direction="row"
                spacing={3}
              >

                <Button
                  variant="outlined"
                  onClick={this.closeFilter}
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

const airports = [{ label: 'LAX' }, { label: 'CAI' }, { label: 'JFK' }, { label: 'DXB' }]

const flightData = [
  { "_id": { "$oid": "617ee2fed20e685a3485cf79" }, "seatsAvailable": { "$numberInt": "20" }, "from": "LAX", "to": "JFK", "flightDate": { "$date": { "$numberLong": "1641938391000" } }, "cabin": "Economy", "__v": { "$numberInt": "0" } },
  { "_id": { "$oid": "617ee300d20e685a3485cf7c" }, "seatsAvailable": { "$numberInt": "10" }, "from": "LAX", "to": "JFK", "flightDate": { "$date": { "$numberLong": "1641938391000" } }, "cabin": "Business", "__v": { "$numberInt": "0" } },
  { "_id": { "$oid": "617ee301d20e685a3485cf94" }, "seatsAvailable": { "$numberInt": "22" }, "from": "CAI", "to": "DXB", "flightDate": { "$date": { "$numberLong": "1649541591000" } }, "cabin": "Business", "__v": { "$numberInt": "0" } }

]




export default SearchModule;