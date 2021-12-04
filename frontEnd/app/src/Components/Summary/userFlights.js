import React, { Component,useState,useEffect } from 'react';
import axios from 'axios';
import ReservationCard from './ReservationCard';
import './Summary2.css';
import LightSpeed from 'react-reveal/LightSpeed';
import Fade from 'react-reveal/Fade';
import {List, ListItem, Box} from '@mui/material';


function UserFlights (props) {
    const [data, setData] = useState([]);
    useEffect(async () => {
        const result = await axios.get (
          'http://localhost:8000/userflights'
        );
    
      setData(result.data);
      console.log(data);
      },[]);
    return(
        <div>
        <img id ="background2" src='/download.jpg'/>
        <div id= "animTitle"><LightSpeed left>Your Reserved Flights</LightSpeed></div>
        {
            data.map(item => (<div key= {item}><ReservationCard 
            outBound = {item.outBoundflight}
            inBound = {item.inBoundflight}
            reservation = {item}
            />
           </div>))}
        </div>
    );
}



export default UserFlights;