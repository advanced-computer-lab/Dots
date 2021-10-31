import React from "react";
import TextField from '@mui/material/TextField';
import { Component } from 'react';
import './SearchModule.css';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
// import AutoComplete from "../autoComplete/AutoComplete";
import Autocomplete from '@mui/material/Autocomplete';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
class SearchModule extends Component {

  render() {
    return <div className="search">
      <div className="search1" >

        <div>    <TextField id="outlined-basic"
          label="Search Flight Number"
          variant="outlined"
          className="flightNumber"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        /></div>

        <div>  <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={airports}
          sx={{ width: 400 }}
          renderInput={(params) => <TextField {...params} label="From" />}
        /></div>

        <div>   <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={airports}
          sx={{ width: 400 }}
          renderInput={(params) => <TextField {...params} label="To" />}
        /></div>



      </div>
      <div>
        <div className = "search2">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Choose Departure Date"
              // value={value}
              // onChange={(newValue) => {
              //   setValue(newValue);
              // }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>

      </div>
    </div>

  }
}

const airports = [{ label: 'LAX' }, { label: 'CAI' }]


export default SearchModule;