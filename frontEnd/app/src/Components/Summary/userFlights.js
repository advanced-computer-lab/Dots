import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import ReservationCardFinal from "./ReservationCardFinal";
import "./Summary2.css";
import LightSpeed from "react-reveal/LightSpeed";
import Fade from "react-reveal/Fade";
import { List, ListItem, Box } from "@mui/material";

function UserFlights(props) {
  const [data, setData] = useState([]);
  useEffect(async () => {
    const result = await axios.get("http://localhost:8000/userflights");

    setData(result.data);
    console.log(data);
  }, []);
  return (
    <div style={{ minHeight: 825, backgroundImage: "url('/download.jpg')" }}>
      {/*<img src="/download.jpg" id="image" />*/}
      <div id="animTitle">
        <LightSpeed left>Your Reserved Flights</LightSpeed>
      </div>
      {data.map((item) => (
        <div key={item}>
          <ReservationCardFinal
            outBound={item.outBoundflight}
            inBound={item.inBoundflight}
            reservation={item}
          />
        </div>
      ))}
    </div>
  );
}

export default UserFlights;
