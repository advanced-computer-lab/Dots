import React, { useState, Suspense, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material/";
import axios from "axios";
import "./signup.css";
const PasswordStrengthBar = React.lazy(() =>
  import("react-password-strength-bar")
);
function Signup(props) {
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [takenUsername, setTakenUsername] = useState(false);
  const [takenEmail, setTakenEmail] = useState(false);
  //const [button, setButton] = useState(disabled);
  /*useEffect(async () => {
    const result = await axios.get("http://localhost:8000/register");
    setData(result.data);
    console.log(data);
  }, []);*/
  return (
    <React.Fragment>
      <img id="image" src="/download.jpg" />
      <Card
        sx={{
          width: "600px",
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          transform: "translate(-50%,-50%)",
          top: "55%",
          left: "50%",
          zoom: "0.82",
        }}
      >
        <CardContent>
          <div id="signupBody">
            <br />
            <form method="POST" action="http://localhost:8000/register">
              <TextField
                required
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
                label="Username"
                variant="outlined"
                name="username"
                onChange={async (e) => {
                  //console.log("target" + e.target.value);
                  //console.log("data " + data);
                  setTakenUsername(false);
                  let repeat;
                  try {
                    repeat = await axios.post(
                      "http://localhost:8000/checkusername",
                      {
                        username: e.target.value,
                      }
                    );
                  } catch (error) {
                    console.log(error);
                  }
                  if (repeat.data) setTakenUsername(repeat.data);
                }}
              ></TextField>
              {takenUsername ? (
                <Alert severity="warning">Username already taken.</Alert>
              ) : (
                () => setTakenUsername(false)
              )}
              <br />
              <TextField
                required
                sx={{
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "15px",
                }}
                label="Password"
                type="password"
                variant="outlined"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              ></TextField>
              <Suspense fallback={null}>
                <PasswordStrengthBar password={password} />
              </Suspense>
              <br />
              <TextField
                required
                sx={{
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
                onChange={async (e) => {
                  //console.log("target" + e.target.value);
                  //console.log("data " + data);
                  setTakenEmail(false);
                  let repeat;
                  try {
                    repeat = await axios.post(
                      "http://localhost:8000/checkemail",
                      {
                        email: e.target.value,
                      }
                    );
                  } catch (error) {
                    console.log(error);
                  }
                  if (repeat.data) setTakenEmail(repeat.data);
                }}
              ></TextField>
              {takenEmail ? (
                <Alert severity="warning">
                  An account with this e-mail already exists.
                </Alert>
              ) : (
                () => setTakenEmail(false)
              )}
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
                label="Phone Number"
                variant="outlined"
                name="phonenumber"
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
                sx={
                  takenUsername | takenEmail
                    ? {
                        backgroundColor: "grey !important",

                        width: "350px",
                      }
                    : {
                        backgroundColor: "green !important",

                        width: "350px",
                      }
                }
                disabled={takenUsername | takenEmail}
              >
                Complete Your Registration
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default Signup;
