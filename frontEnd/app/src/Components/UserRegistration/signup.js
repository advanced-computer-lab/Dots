import React, { useState, Suspense, useEffect, useContext } from "react";
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/authContext';
import { Card, CardContent, Typography, TextField, Button, } from "@mui/material/";
import axios from "axios";
import "./signup.css";
const PasswordStrengthBar = React.lazy(() =>
  import("react-password-strength-bar")
);
function Signup(props) {
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [username, setUsername] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [passportnumber, setPassportNum] = useState("");
  const [phonenumber, setPhoneNum] = useState("");
  const [countrycode, setCountryCode] = useState("");
  const [address, setAddress] = useState("");
  const authContext = useContext(AuthContext)
  useEffect(async () => {
    const result = await axios.get("http://localhost:8000/register");
    setData(result.data);
    console.log(data);
  }, []);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      username, password, first, last, countrycode, address, passportnumber, phonenumber, email
    }
    const authData = await axios.post('http://localhost:8000/register', formData)
    console.log(authData)
    authContext.setAuthState(authData.data)
    navigate("/")
  }
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
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          transform: "translate(-50%,-50%)",
          top: "55%",
          left: "50%",
          zoom: "0.9",
          maxHeight: "800px",
          overflow: "auto",
        }}
      >
        <CardContent>
          <div id="signupBody">
            <Typography sx={{ fontSize: "larger", paddingLeft: "45px" }}>
              Create an account
            </Typography>
            <br />
            <form onSubmit={handleSubmit}>
              <TextField
                onChange={e => setUsername(e.target.value)}
                required
                sx={{
                  width: "300px",
                  display: "flex",
                  justifyContent: "center",
                }}
                label="Username"
                variant="outlined"
                name="username"
              ></TextField>
              {data === "repeated" ? (
                <Typography sx={{ color: "red" }}>
                  Username already taken!
                </Typography>
              ) : null}
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
                onChange={e => setFirst(e.target.value)}
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
                onChange={e => setLast(e.target.value)}
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
                onChange={e => setEmail(e.target.value)}
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
                onChange={e => setPassportNum(e.target.value)}
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
                onChange={e => setPhoneNum(e.target.value)}
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
                onChange={e => setAddress(e.target.value)}
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
                onChange={e => setCountryCode(e.target.value)}
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
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default Signup;
