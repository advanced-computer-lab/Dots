import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import ReservationCard from '../Summary/ReservationCard.js'
import './FakePayment.css'

function FakePayment (props) {      
    let location = useLocation();
    const { result } = location.state
    console.log(result);
    const [count, setCount] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
          setCount(true);
        }, 5000);
        return () => clearTimeout(timer);
      }, [])
      if (!count){
      return(

<div id ="parent">
<img id = "image" src = "/download.jpg"/>
<div id = "circle">
<CircularProgress/></div>
<div id = "paymentText"> Processing Payment...</div>
</div>
);
}
else return(<ReservationCard/>);
}

export default FakePayment;