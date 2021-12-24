import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import ReservationCard from "../Summary/ReservationCard.js";
import "./FakePayment.css";

const confirmationNumber = Math.floor(Math.random() * 100000000000 + 1);
function FakePayment(props) {
  let location = useLocation();
  // const confirmationNumber = Math.floor(Math.random() * 100000000000 + 1)
  // console.log(confirmationNumber);
  const { result } = location.state;
  console.log(result);
  // result.confirmationNumber = confirmationNumber;
  const [count, setCount] = useState(false);
  useEffect(() => {
    // axios.post('http://localhost:8000/reservationinsertion', result);
    const timer = setTimeout(() => {
      setCount(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  if (!count) {
    return (
      <div id="parent">
        <img id="image" src="/download.jpg" />
        <div id="circle">
          <CircularProgress />
        </div>
        <div id="paymentText"> Processing Payment...</div>
      </div>
    );
  } else
    return (
      <div>
        <img id="image" src="/download.jpg" />
        <ReservationCard
          outBound={result.previousStage.depchosenflight}
          inBound={result.previousStage.returnchosenflight}
          reservation={result.previousStage}
          confirmationNumber={result.confirmationNumber}
          top={result}
        />
      </div>
    );
}

export default FakePayment;
