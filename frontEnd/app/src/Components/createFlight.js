import React, {Component, useState} from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
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
import stringifyObject from 'stringify-object';



function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
    const [startDate, setStartDate] = useState(new Date());
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };

    const handleChange = (newValue) => {
      setValue(newValue);
    };
    return (
        <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Flight Details: </DialogTitle>
      <Box component="form" sx= {{'& .MuiTextField-root': { m: 4, width: '40ch' },}} noValidateautoComplete="off">
            <form action = 'http://localhost:8000/flights' method = "POST">
            <FormControl>
                <TextField label = "From" required type="input" className = "formElements" id = "from" placeholder = "From" name = "from" ></TextField>
                <TextField label = "To" required type="input" className = "to" id = "to" placeholder = "To" name = "to" ></TextField>
                <LocalizationProvider dateAdapter={DateAdapter}>
                     <DateTimePicker
                         label="Flight Date and Time"
                         value={value}
                         onChange={handleChange}
                         renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <TextField label = "Flight Terminal" required type="input" className = "formElements" id = "terminal" placeholder = "Cairo" name = "terminal" ></TextField>
                <TextField label = "Cabin" required type="input" className = "formElements" id = "cabin" placeholder = "Cabin" name = "cabin" ></TextField>
                <TextField label = "Available Seats" required type="input" className = "formElements" id = "seats" placeholder = "Seats" name = "availableSeats" ></TextField>
                <Input type = "hidden" name = "date" value = {startDate ? value: null} ></Input>
                <Button type="submit">Create Flight</Button>
            </FormControl>
            </form>
        </Box>
      </Dialog>
    )

}





const CreateFlight = () => {
        const [startDate, setStartDate] = useState(new Date());
        const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    
  };
        return (
            <div>
            <Button variant="outlined" onClick={handleClickOpen}>
        Create Flight
      </Button>
      <SimpleDialog id= "dialog"
        open={open}
        onClose={handleClose}
      />
      </div>
      
            /*<form action = 'http://localhost:3000/flights' method = "POST">
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                <label htmlFor = "from"> from </label><br/>
                <input type = "text" name ="from" id = "from"></input><br/>
                <label htmlFor = "to"> to </label><br/>
                <input type = "text" name = "to" id = "to"></input>
                <input type = "hidden" name = "date" value = {startDate ? JSON.stringify(startDate) : null} ></input><br/>
                <label htmlFor = "cabin"> cabin </label><br/>
                <input type = "text" name = "cabin" id = "cabin"></input><br/>
                <label htmlFor = "seats"> available seats </label><br/>
                <input type = "text" name = "availableseats" id = "seats"></input>
                <input type = "Submit"></input>
            </form>*/
        )}
    
    





export default CreateFlight;  