import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import TabBar from './TabBar/tabBar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Grid from '@mui/material/Grid';
import './userFlightList.css';
import './passengerForm/passengerForm';
import Button from '@mui/material/Button';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { FormControl } from '@mui/material';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {
    ThemeProvider,
    createTheme,
    withStyles,
} from "@material-ui/core/styles";
import PassengerForm from './passengerForm/passengerForm';
import Container from '@mui/material/Container';
import { useLocation } from "react-router-dom"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import UserSearch from '../UserSearch/UserSearch';
import Stack from '@mui/material/Stack';
class DestinationFlightList extends Component {


    componentDidMount() {
        console.log(this.state)

        if (this.state.noInFlights && this.state.noOutFlights) {
            this.setState({ openAlert: true, errorMessage: 'Sorry. There are no flights matching your query. Try searching with other parameters' })
        }

        else if (this.state.noInFlights) {
            this.setState({ openAlert: true, errorMessage: 'Sorry. There are no inward flights matching your query. Try searching with other parameters' })
        }
        else if (this.state.noOutFlights) {
            this.setState({ openAlert: true, errorMessage: 'Sorry. There are no outward flights matching your query. Try searching with other parameters' })
        }

    }

    editSearch = (e) => {
        this.setState({ openDialog: true })

    }
    onSearchClose = () => {
        this.setState({ openDialog: false })
    }


    constructor(props) {
        super(props);
        const buildpassengers = (n) => {
            let p = [];
            for (let i = 0; i < n; i++) {
                p[i] = {
                    firstName: '',
                    lastName: '',
                    passportNumber: ''
                }
            }
            return p;
        }
        this.state = {
            from: this.props.from,
            depfaded: this.props.depfaded,
            depsearchdate: this.props.depvalue,
            depOriginalFlights: this.props.depOriginalFlights,
            depAllFlights: this.props.depAllflights,
            depchosenflight: this.props.depchosenflight ? this.props.depchosenflight : null,
            depflightClass: this.props.depflightClass ? this.props.depflightClass : '',
            to: this.props.to,
            returnfaded: this.props.returnfaded,
            returnsearchdate: this.props.returnvalue,
            returnOriginalFlights: this.props.returnOriginalFlights,
            returnAllflights: this.props.returnAllflights,
            returnchosenflight: this.props.returnchosenflight ? this.props.returnchosenflight : null,
            returnflightClass: this.props.returnflightClass ? this.props.returnflightClass : '',
            numberOfpassengers: this.props.numberOfpassengers,
            passengers: this.props.passengers !== '' ? this.props.passengers : buildpassengers(this.props.numberOfpassengers),
            openDialog: false,
            openAlert: false,
            errorMessage: '',
            noOutFlights: this.props.noOutFlights,
            noInFlights: this.props.noInFlights,
        }
    }
    updatedepFaded = (val1) => {
        this.setState({ depfaded: val1 });
    }
    updatedepvalue = (val1) => {
        this.setState({ depsearchdate: val1 });
    }
    updatedepAllflights = (val1) => {
        this.setState({ depAllFlights: val1 });
    }
    updatedepchosenflight = (val1) => {
        this.setState({ depchosenflight: val1 });
    }
    updatedepClass = (val1) => {
        this.setState({ depflightClass: val1 });
    }
    updatereturnFaded = (val1) => {
        this.setState({ returnfaded: val1 });
    }
    updatereturnvalue = (val1) => {
        this.setState({ returnsearchdate: val1 });
    }
    updatereturnAllflights = (val1) => {
        this.setState({ returnAllflights: val1 });
    }
    updatereturnchosenflight = (val1) => {
        this.setState({ returnchosenflight: val1 });
    }
    updatereturnClass = (val1) => {
        this.setState({ returnflightClass: val1 });
    }
    handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openAlert: false })
    };
    onSubmit = (e) => {
        e.preventDefault()
        if (this.state.depchosenflight.departureTime < this.state.returnchosenflight.departureTime) {
            let link = document.getElementById('summaryLink');
            link.click();
        } else {
            this.setState({ openAlert: true, errorMessage: "The return flight is before the departure on.Please select another flights" })
        }

    }
    updatepassengerFirstName = (val, i) => {
        let p = this.state.passengers;
        p[i].firstName = val;
        this.setState({
            passengers: p
        });
    }
    updatepassengerlastName = (val, i) => {
        let p = this.state.passengers;
        p[i].lastName = val;
        this.setState({
            passengers: p
        });
    }
    areFieldsVaild() {

        const pa = this.state.passengers
        for (let i = 0; i < pa.length; i++) {
            if (pa[i].firstName === '') {
                return true
            }
            if (pa[i].lastName === '') {
                return true;
            } if (pa[i].passportNumber === '') {
                return true;
            }
        }
        return false;

    }
    updatepassengerPassportNo = (val, i) => {
        let p = this.state.passengers;
        p[i].passportNumber = val;
        this.setState({
            passengers: p
        });
    }
    render() {
        const DirectionAwareFlightTakeoffIcon = withStyles((theme) => ({
            root: {
                transform: theme.direction === "rtl" ? "scaleX(-1)" : undefined,
            },
        }))(FlightTakeoffIcon);

        const ltrTheme = createTheme({ direction: "ltr" });
        const rtlTheme = createTheme({ direction: "rtl" });
        const isRtl = true;
        //console.log(this.state);
        //console.log(this.state.passengers);
        const {from , to} = this.state;
        return (


            <div>
                {/* <Card>
                    <CardContent>
                        <Stack direction="row" spacing={10} alignContent="center" alignItems = "center">
                            <Typography id = "flightText" variant="h6" gutterBottom component="div">
                               {from} - {to}
                            </Typography>
                            <Button variant="contained" onClick={this.editSearch}>Edit Search</Button>
                        </Stack>
                    </CardContent>
                </Card> */}

                {/* <Dialog
                    fullWidth={true}
                    maxWidth={false}
                    open={this.state.openDialog}
                    onClose={() => { this.onSearchClose(); this.state.openDialog = false }}
                >
                    <DialogTitle>Edit Search</DialogTitle>
                    <DialogContent>
                        <UserSearch isChangeSearch={false} />
                    </DialogContent>
                </Dialog> */}

                <Snackbar open={this.state.openAlert} autoHideDuration={10000} onClose={this.handleCloseAlert}>
                    <Alert onClose={this.handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                        {this.state.errorMessage}
                    </Alert>
                </Snackbar>

                <Container maxWidth="xl" id="cont">

                    <Typography variant="h4" component="div" id='flightText' > <FlightTakeoffIcon fontSize='large' /> {`${this.state.from} to ${this.state.to}`}</Typography>

                    <TabBar Allflights={this.state.depAllFlights} OriginalFlights={this.state.depOriginalFlights} chosenClass={this.state.depchosenflight}
                        faded={this.state.depfaded} chosenflight={this.state.depchosenflight} value={new Date(this.state.depsearchdate)}
                        return={false} updateFaded={this.updatedepFaded}
                        updatevalue={this.updatedepvalue} updateAllflights={this.updatedepAllflights}
                        updatechosenflight={this.updatedepchosenflight} updateclass={this.updatedepClass} />

                    <Typography variant="h4" component="div" id='flightText' > <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
                        <DirectionAwareFlightTakeoffIcon fontSize='large' />
                    </ThemeProvider> {`${this.state.to} to ${this.state.from}`}</Typography>

                    <TabBar Allflights={this.state.returnAllflights} OriginalFlights={this.state.returnOriginalFlights} chosenClass={this.state.returnchosenflight}
                        faded={this.state.returnfaded} chosenflight={this.state.returnchosenflight} value={new Date(this.state.returnsearchdate)} return={true}
                        updateFaded={this.updatereturnFaded}
                        updatevalue={this.updatereturnvalue}
                        updateAllflights={this.updatereturnAllflights}
                        updatechosenflight={this.updatereturnchosenflight}
                        updateclass={this.updatereturnClass} />

                    {!this.state.depfaded && !this.state.returnfaded ?
                        <div id="passengersForm">
                            <form onSubmit={this.onSubmit}>
                                <FormControl >
                                    {Array.from(Array(this.state.numberOfpassengers), (e, i) => {
                                        return <PassengerForm ind={i + 1} updatepassengerlastName={this.updatepassengerlastName} updatepassengerFirstName={this.updatepassengerFirstName} p={(this.state.passengers)[i]} updatepassengerPassportNo={this.updatepassengerPassportNo} />
                                    })}
                                    <Grid container spacing={2}>
                                        <Grid item xs={9}>

                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button disabled={this.areFieldsVaild()} variant="contained" type="submit" id='submitButton'>Next</Button>
                                            <Link to="/summary" id="summaryLink" type="submit" state={{ result: this.state }} > </Link>
                                        </Grid>

                                    </Grid>
                                </FormControl>

                            </form>
                        </div>
                        : <div></div>}

                </Container>

            </div>

        );
    }
}



export default DestinationFlightList;