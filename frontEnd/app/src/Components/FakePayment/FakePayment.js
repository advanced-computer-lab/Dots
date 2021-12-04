import React, {useEffect} from 'react';
import { useNavigate } from 'react-router'
import CircularProgress from '@mui/material/CircularProgress';
import './FakePayment.css'

function Navigate () {
    let navigate = useNavigate();
    setTimeout(() => {
        navigate('/detailedsummary')}, 5000);
    
}
function FakePayment (props) {
 Navigate();
return(
<div id ="parent">
<img id = "image" src = "/download.jpg"/>
<div id = "circle">
<CircularProgress/></div>
<div id = "paymentText"> Processing Payment...</div>
</div>
);
}

export default FakePayment;