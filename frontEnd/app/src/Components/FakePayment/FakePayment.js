import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import ReservationCard from "../Summary/ReservationCard.js";
import "./FakePayment.css";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
const confirmationNumber = Math.floor(Math.random() * 100000000000 + 1);

const getSession = async (sid) => {
  const session = await axios.post( 'http://localhost:8000/session' , {session_id : sid} );
  console.log(session.data.metadata.depFlightNumber);
  console.log(session.data.metadata.arrFlightNumber);
  const outBound = await axios.post( 'http://localhost:8000/flight' , {flightNum : session.data.metadata.depFlightNumber} );
  const inBound = await axios.post( 'http://localhost:8000/flight' , {flightNum : session.data.metadata.arrFlightNumber} );
  console.log(session);
  console.log(outBound)
  console.log(inBound)
  return [ session.data , outBound.data , inBound.data ];
}
function FakePayment(props) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState(0);
  const [count, setCount] = useState(false);
  const [outBound , setoutBound] = useState([]);
  const [inBound , setinBound] = useState([]);
  const [reservations , setReservations] = useState([]);
  const [top , setTop] = useState(0);
  const [confirmationNumber , setConfirmationNumber] = useState(0);
  let location = useLocation();
  // const confirmationNumber = Math.floor(Math.random() * 100000000000 + 1)
  // console.log(confirmationNumber);
  
  // console.log(result);
  // result.confirmationNumber = confirmationNumber;


  useEffect(() => {
      const sid = searchParams.get( "session_id" );
      console.log(sid)
      getSession(sid).then(res => {
        console.log(res)

      } )

  });
  // axios.post('http://localhost:8000/reservationinsertion', result);
  //   const timer = setTimeout(() => {
  //     setCount(true);
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, []);
  // if (!count) {
  //   return (
  //   <div id="parent">
  //     <img id="image" src="/download.jpg" />
  //     <div id="circle">
  //       <CircularProgress />
  //     </div>
  //     <div id="paymentText"> Processing Payment...</div>
  //   </div>
  // );
  // } else
  return (
    <div>
      {/* <img id="image" src="/download.jpg" /> */}
      {/* <ReservationCard
        outBound={result.previousStage.depchosenflight}
        inBound={result.previousStage.returnchosenflight}
        reservation={result.previousStage}
        confirmationNumber={result.confirmationNumber}
        top={result}
      /> */}
    </div>
  );

}


export default FakePayment;
