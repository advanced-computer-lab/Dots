import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Divider,
  Grid,
  Typography,
  CardActions,
  CircularProgress,
  Button,
  Dialog,
  List,
  ListItem,
  Alert,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";

class ReservationCard extends Component {
  state = {
    openCancelDialog: false,
    isLoading: false,
    error: false,
  };
  openDialog = () => {
    this.setState({ openCancelDialog: true });
  };
  closeDialog = () => {
    this.setState({ openCancelDialog: false, error: false });
  };

  onDeleteReservation = () => {
    this.setState({ isLoading: true, error: false });
    axios
      .delete(
        `http://localhost:8000/reservations/${
          this.props.id ? this.props.id : ""
        }`
      )
      .then(() => {
        this.setState({ openCancelDialog: false });
        setTimeout(() => {
          this.setState({ isLoading: false });
        }, 200);
      })
      .catch(() => {
        this.setState({ isLoading: false, error: true });
      });
  };

  render() {
    var cardStyle = {
      borderRadius: "1vw",
    };
    return (
      <Card style={cardStyle} elevation={7}>
        <CardHeader
          title="Reservation Number: Qw123e"
          sx={{ backgroundColor: "#008080", color: "white" }}
        />

        <CardContent>
          <Grid container rowSpacing={3} alignItems="center">
            <Grid item xs={2}>
              <Avatar
                alt="Takeoff Logo"
                src="/Plane.jpg"
                sx={{ width: 150, height: 150 }}
              />
            </Grid>
            <Grid item xs={10}>
              <Grid container columns={11} alignItems="center">
                <Grid item xs={2}>
                  <Typography align="center" variant="h3">
                    Cairo
                  </Typography>
                  <Typography align="center">
                    12th Dec 2021 15:00 GMT
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Divider>
                    <ArrowForwardIcon fontSize="large" />
                  </Divider>
                  Flight Qw123e
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center" variant="h3">
                    Cairo
                  </Typography>
                  <Typography align="center">
                    12th Dec 2021 15:00 GMT
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Avatar
                alt="Takeoff Logo"
                src="/Plane.jpg"
                sx={{ width: 150, height: 150 }}
              />
            </Grid>
            <Grid item xs={10}>
              <Grid container columns={11} alignItems="center">
                <Grid item xs={4}>
                  <Typography align="center" variant="h3">
                    Cairo
                  </Typography>
                  <Typography align="center">
                    12th Dec 2021 15:00 GMT
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Divider>
                    <ArrowForwardIcon fontSize="large" />
                  </Divider>
                  Flight Qw123e
                </Grid>
                <Grid item xs={4}>
                  <Typography align="center" variant="h3">
                    Cairo
                  </Typography>
                  <Typography align="center">
                    12th Dec 2021 15:00 GMT
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Flight No. Qw123e (Outbound)
                  </Typography>
                  <Typography>
                    Country:
                    <br />
                    City:
                    <br />
                    Airport:
                    <br />
                    Terminal:
                    <br />
                    From:
                    <br />
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Flight No. Qw123e (Inbound)
                  </Typography>
                  <Typography>
                    Country:
                    <br />
                    City:
                    <br />
                    Airport:
                    <br />
                    Terminal:
                    <br />
                    From:
                    <br />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ width: "60%" }} />
            </Grid>
            <Grid item>
              <Typography variant="h4">Total Price = $123</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="center">
                <CardActions>
                  <Button
                    onClick={this.openDialog}
                    variant="contained"
                    size="large"
                    color="error"
                  >
                    Cancel My Reservation
                  </Button>
                </CardActions>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>

        <Dialog onClose={this.closeDialog} open={this.state.openCancelDialog}>
          {this.state.error && (
            <Alert variant="filled" severity="error" sx={{ borderRadius: 0 }}>
              Something went wrong. Please try again.
            </Alert>
          )}
          <List>
            <ListItem>
              You are about to cancel your reservation. Please note that the
              rate for your flights may have been changed and if you wish to
              repurchase your flights, you will be charged the new rate. You
              will be fully refunded and sent an email to confirm the amount.
              Are you sure you want to delete this flight?
            </ListItem>
            <ListItem sx={{ justifyContent: "center" }}>
              <LoadingButton
                onClick={this.onDeleteReservation}
                loadingIndicator={
                  <CircularProgress color="inherit" size={30} />
                }
                variant="contained"
                size="large"
                color="error"
                loading={this.state.isLoading}
              >
                Confirm Cancellation
              </LoadingButton>
            </ListItem>
          </List>
        </Dialog>
      </Card>
    );
  }
}

export default ReservationCard;
