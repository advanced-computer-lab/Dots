import React, { Component } from "react";
import SeatPicker from "../SeatPicker/index";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PropTypes from "prop-types";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { create } from "jss";
import rtl from "jss-rtl";
import Button from "@mui/material/Button";
import Seat from "../SeatPicker/SeatPicker/Seat";
import {
  ThemeProvider,
  createTheme,
  withStyles,
} from "@material-ui/core/styles";
import { typography } from "@mui/system";
import { Container } from "@mui/material";
import "./SeatSelectorCSS.scss";
import classNames from "classnames";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Zoom from "@mui/material/Zoom";
import Slide from "@mui/material/Slide";
import { SwitchTransition, CSSTransition, Transition } from "react-transition-group";
import { ContactSupportOutlined } from "@material-ui/icons";
import styled from "styled-components";
import TransitionControl from '../SeatMapTransitionControl/SeatMapTransitionControl.js'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import background from '../UserLanding/travel2.jpg';
import GuestNavBar from '../GuestNavBar/GuestNavBar';
import axios from 'axios';

class SeatSelector extends Component {
  constructor(props) {
    super(props);

    console.log("wowow")
    console.log(this.props.details)

    let outBoundClass = this.props.details.depflightClass;
    let inBoundClass = this.props.details.returnflightClass;
    let passengers = this.props.details.passengers

    passengers.forEach((passenger) => {
      passenger.outBoundSeat = "N/A";
      passenger.inBoundSeat = "N/A";
    });

    let outBoundtotalEconomySeats = this.props.details.depchosenflight.totalEconomySeats;
    let outBoundtotalBusinessSeats = this.props.details.depchosenflight.totalBusinessSeats;
    let outBoundtotalFirstSeats = this.props.details.depchosenflight.totalFirstSeats;

    let inBoundtotalEconomySeats = this.props.details.returnchosenflight.totalEconomySeats;;
    let inBoundtotalBusinessSeats = this.props.details.depchosenflight.totalBusinessSeats;;
    let inBoundtotalFirstSeats = this.props.details.depchosenflight.totalFirstSeats;;

    let departureCity = this.props.details.depchosenflight.departureLocation.city;
    let arrivalCity = this.props.details.depchosenflight.arrivalLocation.city;

    let outBoundSelectedSeats = [];
    let inBoundSelectedSeats = [];

    this.props.details.depchosenflight.reservations.forEach((reservation) => {
      reservation.passengers.forEach((passenger) => {
        outBoundSelectedSeats.push(passenger.outBoundSeat)
        inBoundSelectedSeats.push(passenger.inBoundSeat)
      })
    })

    let outBoundRows = [];

    let id = 1;
    let lastRowNum = "@";
    let firstRows = this.generateClassSeats(outBoundtotalFirstSeats, "First", id, outBoundSelectedSeats, lastRowNum);
    id = firstRows.id;
    lastRowNum = firstRows.lastRow;
    let businessRows = this.generateClassSeats(outBoundtotalBusinessSeats, "Business", id, outBoundSelectedSeats, lastRowNum);
    id = businessRows.id;
    lastRowNum = businessRows.lastRow;
    let economyRows = this.generateClassSeats(outBoundtotalEconomySeats, "Economy", id, outBoundSelectedSeats, lastRowNum);
    outBoundRows.push([]);
    outBoundRows = outBoundRows.concat(firstRows.rows);
    outBoundRows.push([]);
    outBoundRows = outBoundRows.concat(businessRows.rows);
    outBoundRows.push([]);
    outBoundRows = outBoundRows.concat(economyRows.rows);
    outBoundRows.push([]);



    let inBoundRows = [];

    id = 1;
    lastRowNum = "@";
    firstRows = this.generateClassSeats(inBoundtotalFirstSeats, "First", id, inBoundSelectedSeats, lastRowNum);
    id = firstRows.id;
    lastRowNum = firstRows.lastRow;
    businessRows = this.generateClassSeats(inBoundtotalBusinessSeats, "Business", id, inBoundSelectedSeats, lastRowNum);
    id = businessRows.id;
    lastRowNum = businessRows.lastRow;
    economyRows = this.generateClassSeats(inBoundtotalEconomySeats, "Economy", id, inBoundSelectedSeats, lastRowNum);
    inBoundRows.push([]);
    inBoundRows = inBoundRows.concat(firstRows.rows);
    inBoundRows.push([]);
    inBoundRows = inBoundRows.concat(businessRows.rows);
    inBoundRows.push([]);
    inBoundRows = inBoundRows.concat(economyRows.rows);
    inBoundRows.push([]);

    const confirmationNumber = Math.floor(Math.random() * 100000000000 + 1)

    this.state = {
      selectedSeats: [],
      outBoundRows: outBoundRows,
      inBoundRows: inBoundRows,
      departureCity: departureCity,
      arrivalCity: arrivalCity,
      passengers: passengers,
      activeFlight: 0,
      activePassenger: 0,
      outBoundClass: outBoundClass,
      inBoundClass: inBoundClass,
      previousStage: this.props.details,
      confirmationNumber:confirmationNumber,
    };
  }

  generateClassSeats = (totalSeats, cabin, currentId, selectedSeats, lastRowNum) => {
    let id = currentId;
    let m = 0;
    //Get already selected seats


    if (cabin === "Economy") {
      m = 6;
    } else {
      m = 4;
    }
    let rows = [];
    let totalRows = Math.floor(totalSeats / m);
    if (totalSeats % m !== 0) {
      totalRows++;
    }
    let rowNum = 'A'
    for (let i = 0; i < totalRows; i++) {
      const rowNumber = String.fromCharCode((lastRowNum + 1).charCodeAt(0) + i + 1);
      rowNum = rowNumber

      if (i === totalRows - 1 && (totalSeats % m) !== 0) {
        let arr = [];
        for (let k = 0; k < m; k++) {
          if (k >= totalSeats % m) {
            arr.push({
              id: id++,
              number: k + 1,
              isReserved: true,
              cabin: cabin,
            });
            console.log(rowNum + k)
          } else {
            arr.push({ id: id++, number: k + 1, isReserved: selectedSeats.includes(rowNumber + "" + k) ? true : false, cabin: cabin });
          }
          if (cabin === "Economy" && (k === 2)) arr.push("number");
          if (cabin !== "Economy" && (k === 0 | k === 2)) arr.push(null);
          if (cabin !== "Economy" && (k === 1)) arr.push("number");
        }
        rows.push(arr);
      } else {
        if (m === 4)
          rows.push([{ id: id++, number: 1, isReserved: selectedSeats.includes(rowNumber + "" + 1) ? true : false, cabin: cabin }, null, { id: id++, number: 2, isReserved: selectedSeats.includes(rowNumber + "" + 2) ? true : false, cabin: cabin }, "number", { id: id++, number: 3, isReserved: selectedSeats.includes(rowNumber + "" + 3) ? true : false, cabin: cabin }, null, { id: id++, number: 4, isReserved: selectedSeats.includes(rowNumber + "" + 4) ? true : false, cabin: cabin },]);
        else
          rows.push([{ id: id++, number: 1, isReserved: selectedSeats.includes(rowNumber + "" + 1) ? true : false, cabin: cabin }, { id: id++, number: 2, isReserved: selectedSeats.includes(rowNumber + "" + 2) ? true : false, cabin: cabin }, { id: id++, number: 3, isReserved: selectedSeats.includes(rowNumber + "" + 3) ? true : false, cabin: cabin }, "number", { id: id++, number: 4, isReserved: selectedSeats.includes(rowNumber + "" + 4) ? true : false, cabin: cabin }, { id: id++, number: 5, isReserved: selectedSeats.includes(rowNumber + "" + 5) ? true : false, cabin: cabin }, { id: id++, number: 6, isReserved: selectedSeats.includes(rowNumber + "" + 6) ? true : false, cabin: cabin },]);
      }
    }
    return { rows: rows, id: id, lastRow: rowNum };
  };

  addFunctionality = (row, number) => {
    this.setState((prevState) => {
      if (this.state.activeFlight === 0)
        prevState.passengers[prevState.activePassenger].outBoundSeat =
          row + number;
      else
        prevState.passengers[prevState.activePassenger].inBoundSeat =
          row + number;
      return { passengers: prevState.passengers };
    });
  };

  outBoundAddSeatCallback = async ({ row, number, id }, addCb, removeCb) => {

    if (this.state.passengers[this.state.activePassenger].outBoundSeat !== "N/A") {
      let x = this.state.passengers[this.state.activePassenger].outBoundSeat.split("");

      let gapCounter = 0;
      this.setState((prevState) => {
        prevState.outBoundRows.forEach((row, index) => {
          if (row.length === 0) {
            gapCounter++;
          }
          const rowNumber = String.fromCharCode("A".charCodeAt(0) + index - gapCounter);
          row.forEach((seat) => {
            if (seat !== null && rowNumber + "" + seat.number === this.state.passengers[this.state.activePassenger].outBoundSeat) {
              seat.isSelected = false;
            }
          });
        });
        return { outBoundRows: prevState.outBoundRows };
      });

      await removeCb(x[0], x[1]);
    }

    this.addFunctionality(row, number);
    if (this.state.activePassenger === this.state.passengers.length - 1) {
      if (this.state.activeFlight === 0) {
        this.setState({ activePassenger: 0, activeFlight: 1 });
      }
    } else {
      this.setState((prevState) => {
        return { activePassenger: prevState.activePassenger + 1 };
      });
    }

    addCb(row, number, id);

    this.setState((prevState) => {
      prevState.outBoundRows.forEach((row) => {
        row.forEach((seat) => {
          if (seat !== null && seat.id === id) {
            seat.isSelected = true;
          }
        });
      });

      return { outBoundRows: prevState.outBoundRows };
    });

  };


  inBoundAddSeatCallback = async ({ row, number, id }, addCb, removeCb) => {

    if (this.state.passengers[this.state.activePassenger].inBoundSeat !== "N/A") {
      let x = this.state.passengers[this.state.activePassenger].inBoundSeat.split("");

      let gapCounter = 0;
      this.setState((prevState) => {
        prevState.inBoundRows.forEach((row, index) => {
          if (row.length === 0) {
            gapCounter++;
          }
          const rowNumber = String.fromCharCode("A".charCodeAt(0) + index - gapCounter);
          row.forEach((seat) => {
            if (seat !== null && rowNumber + "" + seat.number === this.state.passengers[this.state.activePassenger].inBoundSeat) {
              seat.isSelected = false;
            }
          });
        });
        return { inBoundRows: prevState.inBoundRows };
      });

      await removeCb(x[0], x[1]);
    }

    this.addFunctionality(row, number);
    if (this.state.activePassenger === this.state.passengers.length - 1) {
      if (this.state.activeFlight === 0) {
        this.setState({ activePassenger: 0, activeFlight: 1 });
      }
    } else {
      this.setState((prevState) => {
        return { activePassenger: prevState.activePassenger + 1 };
      });
    }

    addCb(row, number, id);

    this.setState((prevState) => {
      prevState.inBoundRows.forEach((row) => {
        row.forEach((seat) => {
          if (seat !== null && seat.id === id) {
            seat.isSelected = true;
          }
        });
      });

      return { inBoundRows: prevState.inBoundRows };
    });

  };


  outBoundRemoveSeatCallback = ({ row, number, id }, removeCb) => {

    for (let i = 0; i < this.state.passengers.length; i++) {
      if (this.state.passengers[i].outBoundSeat === row + number) {
        this.setState((prevState) => {
          prevState.passengers[i].outBoundSeat = "N/A";
          prevState.activePassenger = i;

          return {
            passengers: prevState.passengers,
            activePassenger: prevState.activePassenger,
            activeFlight: 0,
          };
        });
      }
    }
    removeCb(row, number);
    this.setState((prevState) => {
      prevState.outBoundRows.forEach((row) => {
        row.forEach((seat) => {
          if (seat !== null && seat.id === id) {
            seat.isSelected = false;
          }
        });
      });
      return { outBoundRows: prevState.outBoundRows };
    });
  };

  inBoundRemoveSeatCallback = ({ row, number, id }, removeCb) => {

    for (let i = 0; i < this.state.passengers.length; i++) {
      if (this.state.passengers[i].inBoundSeat === row + number) {
        this.setState((prevState) => {
          prevState.passengers[i].inBoundSeat = "N/A";
          prevState.activePassenger = i;

          return {
            passengers: prevState.passengers,
            activePassenger: prevState.activePassenger,
            activeFlight: 1,
          };
        });
      }
    }
    removeCb(row, number);
    this.setState((prevState) => {
      prevState.inBoundRows.forEach((row) => {
        row.forEach((seat) => {
          if (seat !== null && seat.id === id) {
            seat.isSelected = false;
          }
        });
      });
      return { inBoundRows: prevState.inBoundRows };
    });
  };

  seatChosenFlag = (pos, e) => {
    for (let i = 0; i < this.state.passengers.length; i++) {
      if (
        pos === 0 &&
        i === e &&
        this.state.passengers[i].outBoundSeat !== "N/A"
      ) {
        return true;
      } else if (
        pos === 1 &&
        i === e &&
        this.state.passengers[i].inBoundSeat !== "N/A"
      ) {
        return true;
      }
    }
    return false;
  };

  successFlag = () => {
    for (let i = 0; i < this.state.passengers.length; i++) {
      if (this.state.passengers[i].outBoundSeat === "N/A" || this.state.passengers[i].inBoundSeat === "N/A") {
        return false;
      }
    }
    return (true);
  };

  currentFlightFlag = () => {
    return this.state.activeFlight === 0 ? true : false;
  };

  render() {
    const { loading } = this.state;

    const DirectionAwareFlightTakeoffIcon = withStyles((theme) => ({
      root: {
        transform: theme.direction === "rtl" ? "scaleX(-1)" : undefined,
      },
    }))(FlightTakeoffIcon);

    const ltrTheme = createTheme({ direction: "ltr" });
    const rtlTheme = createTheme({ direction: "rtl" });
    const isRtl = true;

    var buttonClasses = (pos, index) => {
      let x = this.seatChosenFlag(pos, index);
      return classNames({
        active:
          this.state.activePassenger === index &&
          this.state.activeFlight === pos,
        done: x,
        defaultButton: !x,
      });
    };


    let outBoundSeatMap = () => {
      return (<div>
        <div class="cockpit" style={{ marginTop: '-60px' }}>
          <h2 style={{ textAlign: 'center', marginTop: '60px' }} > OutBound Flight </h2>
        </div>
        <div class="fuselage">
          <div class="pick">
            <SeatPicker
              addSeatCallback={this.outBoundAddSeatCallback}
              removeSeatCallback={this.outBoundRemoveSeatCallback}
              rows={this.state.outBoundRows}
              selectedCabin={this.state.outBoundClass}
              maxReservableSeats={this.state.passengers.length * 2 + 1}
              alpha
              visible
              selectedByDefault
              loading={loading}
              tooltipProps={{ multiline: true }}
            />
          </div>
        </div>
      </div>
      )
    }

    let inBoundSeatMap = () => {

      return (
        <div>
          <div class="cockpit" style={{ marginTop: '-60px' }}>
            <h2 style={{ textAlign: 'center', marginTop: '60px' }} > InBound Flight </h2>
          </div>
          <div class="fuselage">
            <div class="pick">
              <SeatPicker
                addSeatCallback={this.inBoundAddSeatCallback}
                removeSeatCallback={this.inBoundRemoveSeatCallback}
                rows={this.state.inBoundRows}
                selectedCabin={this.state.inBoundClass}
                maxReservableSeats={this.state.passengers.length * 2 + 1}
                alpha
                visible
                selectedByDefault
                loading={loading}
                tooltipProps={{ multiline: true }}
              />
            </div>
          </div>
        </div>
      )
    }



    return (
      <div>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            bgcolor: "transparent",
            justifyContent: "space-around",
            mt: "40px",
          }}
        >
          <div >
            <TransitionControl switch={this.currentFlightFlag()} outBoundSeatMap={outBoundSeatMap()} inBoundSeatMap={inBoundSeatMap()}></TransitionControl>
          </div>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              mt: "50px",
              width: "50%",
              height: "100%",
              // bgcolor: '#005cb2',
            }}
          >
            <Box
              sx={{ alignSelf: "flex-end" }}
            >
              <Link to="/summary" type="submit" state={{ result: this.props.details }} >
                <Button sx={{ alignSelf: "flex-end", mb: '5px' }} variant="contained">
                  Go back
                </Button>
              </Link>
            </Box>


            <Card sx={{ bgcolor: "#076F72" }}>
              <CardContent>
                <Typography sx={{ font: '30px Railway ' }}>
                  You can only select {this.state.activeFlight === 0 ? this.state.outBoundClass : this.state.inBoundClass} Class
                </Typography>
              </CardContent>
            </Card>


            <Card sx={{ mt: "30px", bgcolor: "#076F72" }}>
              <CardContent>

                {/* This is the right box */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    bgcolor: "#098286",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      width: "30%",
                      fontFamily: "Monospace",
                      fontWeight: "bold",
                      fontSize: 26,
                    }}
                  >
                    Passengers:
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      width: "70%",
                    }}
                  >
                    <Box
                      sx={{
                        fontFamily: "Monospace",
                        fontWeight: "bold",
                        fontSize: 26,
                      }}
                    >
                      {this.state.departureCity}
                      <DirectionAwareFlightTakeoffIcon />
                      {this.state.arrivalCity}
                    </Box>

                    <Box
                      sx={{
                        fontFamily: "Monospace",
                        fontWeight: "bold",
                        fontSize: 26,
                      }}
                    >

                      {this.state.arrivalCity}
                      <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
                        <DirectionAwareFlightTakeoffIcon />
                      </ThemeProvider>
                      {this.state.departureCity}
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "background.paper",
                    justifyContent: "space-between",
                  }}
                >

                  {this.state.passengers.map((passenger, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          bgcolor: "background.paper",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            width: "30%",
                            fontFamily: "Monospace",
                            fontWeight: "bold",
                            fontSize: 20,
                            border: 1,
                          }}
                        >
                          {passenger.firstName} {passenger.lastName}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            bgcolor: "background.paper",
                            justifyContent: "space-around",
                            border: 1,
                            width: "70%",
                          }}
                        >
                          <Button
                            variant="outlined"
                            className={buttonClasses(0, index)}
                            onClick={() => {
                              this.setState({
                                activeFlight: 0,
                                activePassenger: index,
                              });
                            }}
                          >
                            {passenger.outBoundSeat}
                          </Button>
                          <Button
                            variant="outlined"
                            className={buttonClasses(1, index)}
                            onClick={() => {
                              this.setState({
                                activeFlight: 1,
                                activePassenger: index,
                              });
                            }}
                          >
                            {passenger.inBoundSeat}
                          </Button>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>

            <Slide direction="up" in={this.successFlag()} mountOnEnter unmountOnExit>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "space-around",
                }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: "center" }}>
                  <Alert variant="filled" severity="success" sx={{ mt: "10px" }}>
                    You have selected all seats! Click Checkout to proceed to payment!
                  </Alert>

                </Box>

                <Box
                sx={{
                  display: "flex",
                  flexDirection: 'row',
                  justifyContent: "flex-end",
                }}>
                  <Link to="/payment" type="submit" state={{ result: this.state }} >
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mt: "30px" }}
                      onClick={() => {
                        axios.post('http://localhost:8000/reservationinsertion', this.state);
                      }}
                    >
                      Checkout
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Slide>



          </Box>
        </Box>
      </div>
    );
  }
}

function SeatSelectorFunction(props) {
  let location = useLocation();
  const { result } = location.state
  return (

    <div id = "back" style={{
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'

  }}>
      <GuestNavBar />
      <SeatSelector details={result} />
    </div>
  );
}




export default SeatSelectorFunction;
