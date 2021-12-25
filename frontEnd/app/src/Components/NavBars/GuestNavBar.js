import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import './NavBar.css';
import logo from './logo2.jpeg';
import {Link} from 'react-router-dom'


const GuestNavBar = () => {
  // const [anchorElNav, setAnchorElNav] = React.useState(null);


  return (
    <AppBar position="static">
      <Container maxWidth="xl">

          <Stack direction="row" alignItems="center">
            <a style={{marginRight:1200}} href="/">
              <img src={logo} alt="Logo" width="120" />
            </a>
                <Link to="/register" style={{textDecoration:'none' , marginRight:'auto'}}>
                  <Typography color='white' variant="Button" display="block" gutterBottom>
                    Sign Up
                  </Typography>
                </Link>
                <Link to="/login" style={{textDecoration:'none'}}>
                  <Typography color='white' variant="Button" display="block" gutterBottom>
                    Log In
                  </Typography>
                </Link>
          </Stack>


      </Container>
    </AppBar>
  );
};
export default GuestNavBar;
