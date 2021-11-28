import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
// import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import './createFlight.css'; 


function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [value1, setValue1] = React.useState(new Date());
  const [value2, setValue2] = React.useState(new Date());
  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleChange1 = (newValue) => {
    setValue1(newValue);
  };
  const handleChange2 = (newValue) => {
    setValue2(newValue);
  };
  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true}
    >
      <DialogTitle ><div id= "title">Flight Details</div> </DialogTitle>
      <Box component="form" sx={{ '& .MuiTextField-root': { m: 4, width: '40ch' }, }} noValidateautoComplete="off">
        <form action='http://localhost:8000/flights' method="POST">
        
          <FormControl>
          <div className="formElements">
            <TextField label="Flight Number" required type="input" className="formElements" id="flightNo" placeholder="Flight Number" name="flightNo" ></TextField>
            <TextField label="From" required type="input" className="formElements" id="from" placeholder="From" name="from" ></TextField>
            <TextField label="To" required type="input" className="formElements" id="to" placeholder="To" name="to" ></TextField>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DateTimePicker id= "dt"
                label="Arrival Date and Time"
                value={value1}
                onChange={handleChange1}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DateTimePicker id ="dt" 
                label="Departure Date and Time"
                value={value2}
                onChange={handleChange2}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
           <TextField label="Arrival Terminal" required type="input" className="formElements" id="terminal" placeholder="Cairo" name="arrival" ></TextField>
            <TextField label="Departure Terminal" required type="input" className="formElements" id="terminal" placeholder="Cairo" name="departure" ></TextField>
            <div className = "invisible">
            <Input name="datearrive" value={value1 ? new Date(value1) : null} ></Input>
            <Input name="datedepart" value={value2 ? new Date(value2) : null} ></Input>
            </div>
            {/*<FormControlLabel type = "input" name = "economy" control={<Checkbox />} label="Economy" />*/}
            <TextField label="Economy Available Seats" required type="input" className="formElements" id="seats" placeholder="Seats" name="economyseats" ></TextField>
            {/*<FormControlLabel type = "input" name = "business" control={<Checkbox />} label="Business" />*/}
            <TextField label="Business Available Seats" required type="input" className="formElements" id="seats" placeholder="Seats" name="businessseats" ></TextField>
            {/*<FormControlLabel type = "input" name = "first" control={<Checkbox />} label="First Class" />*/}
            <TextField label="First Class Available Seats" required type="input" className="formElements" id="seats" placeholder="Seats" name="firstseats" ></TextField>
            <TextField label="Number of Bags Allowed" required type="input" className="formElements" id="seats" placeholder="e.g, 2 bags" name="bags" ></TextField>
            <Button variant = "contained" type="submit" id = "submitButton">Create Flight</Button></div>
          </FormControl>
        </form>
      </Box>
    </Dialog>
  )

}




const CreateFlight = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);

  };
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create Flight
      </Button>
      <SimpleDialog id="dialog"
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
  )
}







export default CreateFlight;
