import React, {Component, useState} from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

import './App.css';


function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
    const [startDate, setStartDate] = useState(new Date());
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
    return (
        <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Flight Details: </DialogTitle>
      <Box component="form" sx= {{'& .MuiTextField-root': { m: 4, width: '40ch' },}} noValidateautoComplete="off">
            <form action = 'http://localhost:3000/flights' method = "POST">
            <FormControl>
                
                <TextField label = "To" required type="input" className = "to" id = "to" placeholder = "To" name = "to" ></TextField>
                <TextField label = "From" required type="input" className = "formElements" id = "from" placeholder = "From" name = "from" ></TextField>
                <TextField label = "Cabin" required type="input" className = "formElements" id = "cabin" placeholder = "Cabin" name = "cabin" ></TextField>
                <TextField label = "Available Seats" required type="input" className = "formElements" id = "seats" placeholder = "Seats" name = "availableSeats" ></TextField>
                <Input type = "hidden" name = "date" value = {startDate ? JSON.stringify(startDate) : null} ></Input>
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
        <BrowserRouter>
        <Route exact path='/flights' render ={()=>( 
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
        )}></Route>
        </BrowserRouter>
        );
    
}




export default CreateFlight;  