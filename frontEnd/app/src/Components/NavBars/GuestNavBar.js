import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import "./NavBar.css";
import logo from "./logo2.jpeg";
import { Link } from "react-router-dom";

const GuestNavBar = () => {
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
     
  return (
    <AppBar position="static" sx={{ backgroundColor: "#076F72" }}>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center"   spacing={{ xs: 10  , sm: 55, md: 150 }} >
          <a  href="/">
            <img src={logo} alt="Logo" width="120" />
          </a>
          <Stack direction="row" spacing = {5} alignItems="center">
          <Link
            to="/register"
            style={{ textDecoration: "none", marginRight: "auto" }}
          >
            <Typography
              color="white"
              variant="Button"
              display="block"
              gutterBottom
            >
              Sign Up
            </Typography>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Typography
              color="white"
              variant="Button"
              display="block"
              gutterBottom
            >
              Log In
            </Typography>
          </Link>
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
};
export default GuestNavBar;
