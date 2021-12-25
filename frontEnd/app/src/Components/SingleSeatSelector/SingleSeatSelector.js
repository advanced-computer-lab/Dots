import React, { Component } from "react";
import SeatPicker from "../SeatPicker/index";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Button from "@mui/material/Button";
import {
  ThemeProvider,
  createTheme,
  withStyles,
} from "@material-ui/core/styles";
import "./SingleSeatSelector.scss";
import classNames from "classnames";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import TransitionControl from '../SeatMapTransitionControl/SeatMapTransitionControl.js'
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import background from '../UserLanding/travel3.jpg';

class SingleSeatSelector extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    
    let Direction = this.props.details.direction;
    let Class = this.props.details.flightClass;
    let passengers = this.props.details.passengers

    passengers.forEach((passenger) => {
      passenger.Seat = "N/A";
    });

    let totalEconomySeats = this.props.details.chosenFlight.totalEconomySeats;
    let totalBusinessSeats = this.props.details.chosenFlight.totalBusinessSeats;
    let totalFirstSeats = this.props.details.chosenFlight.totalFirstSeats;

    let departureCity = this.props.details.chosenFlight.departureLocation.city;
    let arrivalCity = this.props.details.chosenFlight.arrivalLocation.city;

    let SelectedSeats = [];

    this.props.details.chosenFlight.reservations.forEach((reservation) => {
      if(this.props.details.reservation._id===reservation._id)return;
      if(this.props.details.chosenFlight._id===reservation.outBoundflight){
        reservation.passengers.forEach((passenger) => {
          SelectedSeats.push(passenger.outBoundSeat)
        })
      }else{
        reservation.passengers.forEach((passenger) => {
          SelectedSeats.push(passenger.inBoundSeat)
        })
      }
    })

    let Rows = [];

    let id = 1;
    let lastRowNum = "@";
    let firstRows = this.generateClassSeats(totalFirstSeats, "First", id, SelectedSeats, lastRowNum);
    id = firstRows.id;
    lastRowNum = firstRows.lastRow;
    let businessRows = this.generateClassSeats(totalBusinessSeats, "Business", id, SelectedSeats, lastRowNum);
    id = businessRows.id;
    lastRowNum = businessRows.lastRow;
    let economyRows = this.generateClassSeats(totalEconomySeats, "Economy", id, SelectedSeats, lastRowNum);
    Rows.push([]);
    Rows = Rows.concat(firstRows.rows);
    Rows.push([]);
    Rows = Rows.concat(businessRows.rows);
    Rows.push([]);
    Rows = Rows.concat(economyRows.rows);
    Rows.push([]);


    this.state = {
      selectedSeats: [],
      Rows: Rows,
      departureCity: departureCity,
      arrivalCity: arrivalCity,
      passengers: passengers,
      activePassenger: 0,
      Class: Class,
      previousStage: this.props.details,
      confirmationNumber:this.props.details.reservation.confirmationNumber,
      direction:Direction,
    };
  }

  generateClassSeats = (totalSeats, cabin, currentId, selectedSeats, lastRowNum) => {
    let id = currentId;
    let m = 0;

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
      prevState.passengers[prevState.activePassenger].Seat =
        row + number;
      return { passengers: prevState.passengers };
    });
  };

  AddSeatCallback = async ({ row, number, id }, addCb, removeCb) => {

    if (this.state.passengers[this.state.activePassenger].Seat !== "N/A") {
      let x = this.state.passengers[this.state.activePassenger].Seat.split("");

      let gapCounter = 0;
      this.setState((prevState) => {
        prevState.Rows.forEach((row, index) => {
          if (row.length === 0) {
            gapCounter++;
          }
          const rowNumber = String.fromCharCode("A".charCodeAt(0) + index - gapCounter);
          row.forEach((seat) => {
            if (seat !== null && rowNumber + "" + seat.number === this.state.passengers[this.state.activePassenger].Seat) {
              seat.isSelected = false;
            }
          });
        });
        return { Rows: prevState.Rows };
      });

      await removeCb(x[0], x[1]);
    }

    this.addFunctionality(row, number);
    if (this.state.activePassenger !== this.state.passengers.length - 1) {
      this.setState((prevState) => {
        return { activePassenger: prevState.activePassenger + 1 };
      });
    }

    addCb(row, number, id);

    this.setState((prevState) => {
      prevState.Rows.forEach((row) => {
        row.forEach((seat) => {
          if (seat !== null && seat.id === id) {
            seat.isSelected = true;
          }
        });
      });

      return { Rows: prevState.Rows };
    });

  };


  RemoveSeatCallback = ({ row, number, id }, removeCb) => {

    for (let i = 0; i < this.state.passengers.length; i++) {
      if (this.state.passengers[i].Seat === row + number) {
        this.setState((prevState) => {
          prevState.passengers[i].Seat = "N/A";
          prevState.activePassenger = i;

          return {
            passengers: prevState.passengers,
            activePassenger: prevState.activePassenger,
          };
        });
      }
    }
    removeCb(row, number);
    this.setState((prevState) => {
      prevState.Rows.forEach((row) => {
        row.forEach((seat) => {
          if (seat !== null && seat.id === id) {
            seat.isSelected = false;
          }
        });
      });
      return { Rows: prevState.Rows };
    });
  };

  seatChosenFlag = (e) => {
    for (let i = 0; i < this.state.passengers.length; i++) {
      if (i === e && this.state.passengers[i].Seat !== "N/A" ) {
        return true;
      }
    }
    return false;
  };

  successFlag = () => {
    for (let i = 0; i < this.state.passengers.length; i++) {
      if (this.state.passengers[i].Seat === "N/A") {
        return false;
      }
    }
    return (true);
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
    const isRtl = this.state.direction==="inbound"?true:false;

    var buttonClasses = (index) => {
      let x = this.seatChosenFlag(index);
      return classNames({
        active: this.state.activePassenger === index,
        done: x,
        defaultButton: !x,
      });
    };


    let SeatMap = () => {
      return (<div>
        <div class="cockpit" style={{ marginTop: '-60px' }}>
          <h2 style={{ textAlign: 'center', marginTop: '60px' }} > {this.state.direction} Flight </h2>
        </div>
        <div class="fuselage">
          <div class="pick">
            <SeatPicker
              addSeatCallback={this.AddSeatCallback}
              removeSeatCallback={this.RemoveSeatCallback}
              rows={this.state.Rows}
              selectedCabin={this.state.Class}
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

    let button = () => {
      if(this.props.details.editingSeats===true){
        return(
          <Link to="/userflights" type="submit" state={{ result: this.state }} style={{textDecoration: "none"}}>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: "30px" }}
              onClick= { () => {
                if(this.props.details.direction==="outbound"){
                  this.props.details.passengers.forEach((passenger)=>{
                    passenger.outBoundSeat=passenger.Seat;
                    delete passenger.Seat
                  })
                }else{
                  this.props.details.passengers.forEach((passenger)=>{
                    passenger.inBoundSeat=passenger.Seat;
                    delete passenger.Seat
                  })
                }

                let newReservation = {
                  _id:this.props.details.reservation._id,
                  outBoundflight: this.props.details.reservation.outBoundflight._id,
                  inBoundflight: this.props.details.reservation.inBoundflight._id,
                  outBoundClass: this.props.details.reservation.outBoundClass,
                  inBoundClass: this.props.details.reservation.inBoundClass,
                  passengers: this.props.details.passengers,
                  confirmationNumber: this.props.details.confirmationNumber,
                  totalPrice: this.props.details.reservation.totalPrice,
                }

                axios.put('http://localhost:8000/changeseats', {newReservation});
              }}
            >
              Change Seats
            </Button>
          </Link>
          
        )
      }else{
        return(
          <Button
              variant="contained"
              color="success"
              sx={{ mt: "30px" }}
              onClick={ async()=>{
                if(this.props.details.direction==="outbound"){
                  this.props.details.passengers.forEach((passenger)=>{
                    passenger.outBoundSeat=passenger.Seat;
                    delete passenger.Seat
                  })
                }else{
                  this.props.details.passengers.forEach((passenger)=>{
                    passenger.inBoundSeat=passenger.Seat;
                    delete passenger.Seat
                  })
                }
                let paramaters={
                  chosenFlight : this.props.details.chosenFlight,
                  priceDifference : this.props.details.priceDifference,
                  direction : this.props.details.direction,
                  newReservation : {
                    _id:this.props.details.reservation._id,
                    outBoundflight: this.props.details.direction==="outbound"?this.props.details.chosenFlight._id:this.props.details.reservation.outBoundflight._id,
                    inBoundflight: this.props.details.direction==="inbound"?this.props.details.chosenFlight._id:this.props.details.reservation.inBoundflight._id,
                    outBoundClass: this.props.details.direction==="outbound"?this.props.details.flightClass:this.props.details.reservation.outBoundClass,
                    inBoundClass: this.props.details.direction==="inbound"?this.props.details.flightClass:this.props.details.reservation.inBoundClass,
                    passengers: this.props.details.passengers,
                    confirmationNumber: this.props.details.confirmationNumber,
                    totalPrice: this.props.details.newPrice,
                  }
                }
                console.log(paramaters)
                await axios.post('http://localhost:8000/change-flight-payment', paramaters)
              }}
            >
              Checkout
            </Button>
        )
      }

    }

    let backButton = () => {
      if(this.props.details.editingSeats===true){
        return(
              <Link to="/userflights" type="submit" >
                <Button sx={{ alignSelf: "flex-end", mb: '5px' }} variant="contained">
                  Go back
                </Button>
              </Link>
        )
      }else{
        return(
              <Link to="/editsummary" type="submit" state={{ result: this.props.details }} >
                <Button sx={{ alignSelf: "flex-end", mb: '5px' }} variant="contained">
                  Go back
                </Button>
              </Link>
        )
      }
    }

    return (
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            bgcolor: "transparent",
            justifyContent: "space-around",
          }}
        >
          <div >
          <TransitionControl noTransition={true} Map={SeatMap()}></TransitionControl>
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
              {backButton()}
            </Box>


            <Card sx={{ bgcolor: "#076F72" }}>
              <CardContent>
                <Typography sx={{ font: '30px Railway ' }}>
                  You can only select {this.state.Class} Class
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
                            className={buttonClasses(index)}
                            onClick={() => {
                              this.setState({
                                activePassenger: index,
                              });
                            }}
                          >
                            {passenger.Seat}
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
                    {(this.props.details.editingSeats===true)&&"You have selected all seats! Click Change Seats to proceed!"}
                    {(this.props.details.editingSeats===false)&&"You have selected all seats! Click Checkout to proceed to payment!"}
                  </Alert>

                </Box>

                <Box
                sx={{
                  display: "flex",
                  flexDirection: 'row',
                  justifyContent: "flex-end",
                }}>
                  {button()}
                </Box>
              </Box>
            </Slide>



          </Box>
        </Box>
      </div>
    );
  }
}

function SingleSeatSelectorFunction(props) {
  let location = useLocation();
  const { result } = location.state
  if(location.state.flag===undefined){

    result.priceDifference=location.state.priceDifference
    result.newPrice=location.state.newPrice
    
    if(result.departureSearch===true){
      result.direction="outbound";
      result.flightClass=result.depflightClass;
      result.chosenFlight=result.depchosenflight;
    }else{
      result.direction="inbound";
      result.flightClass=result.returnflightClass;
      result.chosenFlight=result.returnchosenflight;
    }
    
    result.editingSeats=false;
    
  }else{
    if(location.state.flag==="outbound"){
      result.direction="outbound";
      result.flightClass=result.reservation.outBoundClass;
      result.chosenFlight=result.outBound;
    }else{
      result.direction="inbound";
      result.flightClass=result.reservation.inBoundClass;
      result.chosenFlight=result.inBound;
    }
    
    result.editingSeats=true;
  } 
  
  result.passengers=result.reservation.passengers;

  console.log(result);
  
  return (

    <div style={{
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'

  }}>
      <SingleSeatSelector details={result} />
     </div>
  );
}




export default SingleSeatSelectorFunction;
