import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';
import './NavBar.css';
import logo from './logo2.jpeg';
import { Link } from 'react-router-dom';
import {AuthContext} from '../../context/authContext.js'

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const UserNavBar = () => {
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const authContext = React.useContext(AuthContext)
  console.log(authContext)
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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseLogOut= ()=>{
    console.log("hi")
    setAnchorEl(null);
    authContext.logout()
  }

  return (
    <AppBar position="static">
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
              <AccountCircle fontSize="medium" color = "white"/>
            </IconButton>
            {authContext && authContext.authState.name}
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <a className = "menuItem" href="/profile/edit-info">
                  <Typography variant="overline" display="block" gutterBottom>
                    Profile
                  </Typography>
                </a>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <a className = "menuItem"  href="/userflights">
                  <Typography variant="overline" display="block" gutterBottom>
                    My Flights
                  </Typography>
                </a>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <a className = "menuItem"  href="/changepassword">
                  <Typography variant="overline" display="block" gutterBottom>
                    My Flights
                  </Typography>
                </a>
              </MenuItem>
              <MenuItem onClick={handleCloseLogOut}>
                <a className = "menuItem"  href="/">
                  <Typography variant="overline" display="block" gutterBottom>
                    Logout
                  </Typography>
                </a>
              </MenuItem>
            </Menu>
          </Stack>


        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default UserNavBar;
