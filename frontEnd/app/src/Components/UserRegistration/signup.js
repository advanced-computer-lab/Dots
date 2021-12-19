import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material/";
import "./signup.css";
function Signup(props) {
  return (
    <React.Fragment
      sx={{
        position: "relative",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img id="image" src="/download.jpg" />
      <Card
        sx={{
          width: "500px",
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          transform: "translate(-50%,-50%)",
          top: "50%",
          left: "50%",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: "larger", paddingLeft: "45px" }}>
            Create an account
          </Typography>
          <br />
          <form method="POST" action="http://localhost:8000/register">
            <TextField
              required
              sx={{
                width: "300px",
                display: "flex",
                justifyContent: "center",
              }}
              label="First Name"
              variant="outlined"
              name="first"
            ></TextField>
            <br />
            <TextField
              required
              sx={{
                height: "50px",
                display: "flex",
                justifyContent: "center",
              }}
              label="Last Name"
              variant="outlined"
              name="last"
            ></TextField>
            <br />
            <TextField
              required
              sx={{
                height: "50px",
                display: "flex",
                justifyContent: "center",
              }}
              label="E-mail"
              type="email"
              variant="outlined"
              name="email"
            ></TextField>
            <br />
            <TextField
              required
              sx={{
                height: "50px",
                display: "flex",
                justifyContent: "center",
              }}
              label="Password"
              type="password"
              variant="outlined"
              name="password"
            ></TextField>
            <br />
            <TextField
              required
              sx={{
                height: "50px",
                display: "flex",
                justifyContent: "center",
              }}
              label="Passport Number"
              variant="outlined"
              name="passportnumber"
            ></TextField>
            <br />
            <TextField
              required
              sx={{
                height: "50px",
                display: "flex",
                justifyContent: "center",
              }}
              label="Home Address"
              variant="outlined"
              name="address"
            ></TextField>
            <br />
            <TextField
              required
              sx={{
                height: "50px",
                display: "flex",
                justifyContent: "center",
              }}
              label="Country Code"
              variant="outlined"
              name="countrycode"
            ></TextField>
            <br />
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "green !important", marginLeft: "10px" }}
            >
              Complete Your Registration
            </Button>
          </form>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default Signup;
