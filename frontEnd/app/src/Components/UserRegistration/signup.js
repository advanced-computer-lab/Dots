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
import Fade from "react-reveal/Fade";
import "./signup.css";
const PasswordStrengthBar = React.lazy(() =>
  import("react-password-strength-bar")
);
const finalJson = {};
let usernameTaken = false;
let emailTaken = false;
function Signup() {
  const [finaljson, setFinalJson] = useState({});
  const [buttondisabled, setButtonDisabled] = useState(false);
  function handlerjson() {
    console.log(finalJson);
    setFinalJson(finalJson);
    console.log("test " + emailTaken);
  }
  function handlerbutton(input) {
    setButtonDisabled(input);
    console.log("button: " + buttondisabled);
  }
  const [display, setDisplay] = useState(true);
  return (
    <div>
      <img
        style={{
          zIndex: -999,
          height: "100vh",
          width: "65%",
          display: "flex",
        }}
        id="image"
        src="/plane.gif"
      />
      <Card
        sx={{
          backgroundColor: "#3277ed",
          height: "100vh",
          position: "fixed",
          zIndex: "1000",
          width: "600px",
          display: "flex",
          justifyContent: "center",
          right: "0px",
        }}
      >
        <Typography
          id="createAccount"
          sx={{
            top: "70px",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Create your account
        </Typography>
        <CardContent
          sx={{
            zoom: "0.9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {display ? (
            <div>
              <Signup1 handler={handlerjson} handlerbutton={handlerbutton} />
              <Button
                sx={
                  !buttondisabled
                    ? {
                        backgroundColor: "green !important",
                        height: "50px",
                        width: "300px",
                        left: "50px",
                        top: "80px",
                      }
                    : {
                        backgroundColor: "grey !important",
                        height: "50px",
                        width: "300px",
                        left: "50px",
                        top: "80px",
                      }
                }
                disabled={buttondisabled}
                variant="contained"
                onClick={() => setDisplay(false)}
              >
                Proceed
              </Button>
            </div>
          ) : (
            <Fade left>
              <div>
                <Signup2 handler={handlerjson} />
                <Button
                  sx={{
                    backgroundColor: "green !important",
                    height: "50px",
                    width: "300px",
                    left: "50px",
                    top: "80px",
                  }}
                  variant="contained"
                  type="submit"
                  onClick={async () =>
                    await axios.post(
                      "http://localhost:8000/register",
                      finaljson
                    )
                  }
                >
                  Complete your registration
                </Button>
              </div>
            </Fade>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
function Signup1(props) {
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
    <div id="signupBody">
      <br />
      <TextField
        required
        sx={{
          width: "400px",
          display: "flex",
          justifyContent: "center",
        }}
        label="Username"
        variant="outlined"
        name="username"
        onChange={async (e) => {
          //console.log("target" + e.target.value);
          //console.log("data " + data);
          finalJson.username = e.target.value;
          props.handler();
          usernameTaken = false;
          setTakenUsername(false);
          props.handlerbutton(false);
          let repeat;
          try {
            repeat = await axios.post("http://localhost:8000/checkusername", {
              username: e.target.value,
            });
          } catch (error) {
            console.log(error);
          }
          if (repeat.data) {
            setTakenUsername(repeat.data);
            props.handlerbutton(true);
          }
        }}
      ></TextField>
      {takenUsername ? (
        <Alert sx={{ backgroundColor: "black" }} severity="warning">
          Username already taken.
        </Alert>
      ) : (
        () => setTakenUsername(false)
      )}
      <br />
      <TextField
        required
        sx={{
          width: "400px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          marginBottom: "15px",
        }}
        label="Password"
        type="password"
        variant="outlined"
        name="password"
        onChange={(e) => {
          finalJson.password = e.target.value;
          props.handler();
          setPassword(e.target.value);
        }}
      ></TextField>
      {/*<Suspense fallback={null} scoreWordStyle={"fontSize: larger"}>
        <PasswordStrengthBar id="signupBody" password={password} />
      </Suspense>*/}
      <br />
      <TextField
        required
        sx={{
          width: "400px",
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

          finalJson.email = e.target.value;
          props.handler();
          props.handlerbutton(false);
          emailTaken = false;
          setTakenEmail(false);
          let repeat;
          try {
            repeat = await axios.post("http://localhost:8000/checkemail", {
              email: e.target.value,
            });
          } catch (error) {
            console.log(error);
          }
          if (repeat.data) {
            setTakenEmail(repeat.data);
            emailTaken = true;
            props.handlerbutton(true);
          }
        }}
      ></TextField>
      {takenEmail ? (
        <Alert sx={{ backgroundColor: "black" }} severity="warning">
          An account with this e-mail already exists.
        </Alert>
      ) : (
        () => setTakenEmail(false)
      )}
      <br />
    </div>
  );
}

function Signup2(props) {
  return (
    <div id="signupBody">
      <TextField
        required
        sx={{
          width: "400px",
          display: "flex",
          justifyContent: "center",
        }}
        label="First Name"
        variant="outlined"
        name="first"
        onChange={(e) => {
          finalJson.first = e.target.value;
          props.handler();
        }}
      ></TextField>
      <br />
      <TextField
        required
        sx={{
          width: "400px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
        }}
        label="Last Name"
        variant="outlined"
        name="last"
        onChange={(e) => {
          finalJson.last = e.target.value;
          props.handler();
        }}
      ></TextField>
      <br />
      <TextField
        required
        sx={{
          width: "400px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
        }}
        label="Passport Number"
        variant="outlined"
        name="passportnumber"
        onChange={(e) => {
          finalJson.passportnumber = e.target.value;
          props.handler();
        }}
      ></TextField>
      <br />
      <TextField
        required
        sx={{
          width: "400px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
        }}
        label="Phone Number"
        variant="outlined"
        name="phonenumber"
        onChange={(e) => {
          finalJson.phonenumber = e.target.value;
          props.handler();
        }}
      ></TextField>
      <br />
      <TextField
        required
        sx={{
          width: "400px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
        }}
        label="Home Address"
        variant="outlined"
        name="address"
        onChange={(e) => {
          finalJson.address = e.target.value;
          props.handler();
        }}
      ></TextField>
      <br />
      <TextField
        required
        sx={{
          width: "400px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
        }}
        label="Country Code"
        variant="outlined"
        name="countrycode"
        onChange={(e) => {
          finalJson.countrycode = e.target.value;
          props.handler();
        }}
      ></TextField>
      <br />
    </div>
  );
}

export default Signup;
