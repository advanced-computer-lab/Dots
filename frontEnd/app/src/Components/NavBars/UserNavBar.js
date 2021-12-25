import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Stack from "@mui/material/Stack";
import "./NavBar.css";
import logo from "./logo2.jpeg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";
import { useNavigate } from "react-router";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const UserNavBar = () => {
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const authContext = React.useContext(AuthContext);
  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseLogOut = () => {
    console.log("hi");
    setAnchorEl(null);
    authContext.logout();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#076F72" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack direction="row" spacing={155} alignItems="center">
            <a href="/">
              <img src={logo} alt="Logo" width="120" />
            </a>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle fontSize="medium" color="white" />
            </IconButton>
            {authContext && authContext.authState.name}
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/profile/edit-info");
                }}
              >
                <Typography
                  color="#076F72"
                  variant="overline"
                  display="block"
                  gutterBottom
                >
                  My Profile
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/userflights");
                }}
              >
                <Typography
                  color="#076F72"
                  variant="overline"
                  display="block"
                  gutterBottom
                >
                  My Flights
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/changepassword");
                }}
              >
                <Typography
                  color="#076F72"
                  variant="overline"
                  display="block"
                  gutterBottom
                >
                  Change My Password
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseLogOut();
                  navigate("/");
                  window.location.reload();
                }}
              >
                <Typography
                  color="#076F72"
                  variant="overline"
                  display="block"
                  gutterBottom
                >
                  Log Out
                </Typography>
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default UserNavBar;
