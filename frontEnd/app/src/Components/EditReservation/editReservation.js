import { useLocation } from "react-router-dom";
import React, { Component } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditSearch from './EditSearch/editSearch';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TabBar from '../UserFlightList/TabBar/tabBar';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { Link } from 'react-router-dom';
import {
    ThemeProvider,
    createTheme,
    withStyles,
} from "@material-ui/core/styles";


class EditReservation extends Component {

    state = {
        oldDepartureFlight: this.props.oldDepartureFlight,
        reservation: this.props.reservation,
        depClass: this.props.depClass,
        arrClass: this.props.arrClass,
        depDate: this.props.depDate,
        arrDate: this.props.arrDate,
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
        adults: this.props.adults,
        departureSearch: this.props.departureSearch,
        returnSearch: this.props.returnSearch,
        oldReturnFlight: this.props.oldReturnFlight,
        noOutFlights: this.props.noOutFlights,
        noInFlights: this.props.noInFlights,
        openDialog: false
    }

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
    editSearch = (e) => {
        this.setState({ openDialog: true })

    }

    onSearchClose = () => {
        this.setState({ openDialog: false })
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
        console.log(this.props);
        return <div>
            <Card>
                <CardContent>
                    <Stack direction="row" spacing={10} alignContent="center" alignItems="center">
                        {this.state.departureSearch ?
                            <Typography id="flightText" variant="h6" gutterBottom component="div">
                                {this.state.oldDepartureFlight.departureLocation.airport} - {this.state.oldDepartureFlight.arrivalLocation.airport}
                            </Typography> : <Typography id="flightText" variant="h6" gutterBottom component="div">
                                {this.state.oldDepartureFlight.arrivalLocation.airport} - {this.state.oldDepartureFlight.departureLocation.airport}
                            </Typography>}
                        <Button variant="contained" onClick={this.editSearch}>Edit Search</Button>
                    </Stack>
                </CardContent>
            </Card>
            <Snackbar open={this.state.openAlert} autoHideDuration={10000} onClose={this.handleCloseAlert}>
                <Alert onClose={this.handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                    {this.state.errorMessage}
                </Alert>
            </Snackbar>
            <Dialog
                fullWidth={true}
                maxWidth={false}
                open={this.state.openDialog}
                onClose={() => { this.onSearchClose(); this.state.openDialog = false }}
            >
                <DialogTitle>Edit Search</DialogTitle>
                <DialogContent>
                    <EditSearch isChangeSearch={false} oldDepartureFlight={this.props.oldDepartureFlight}
                        reservation={this.props.reservation} oldReturnFlight={this.props.oldReturnFlight}
                        depClass={this.props.depClass}
                        arrClass={this.props.arrClass}
                        depDate={this.props.depDate}
                        arrDate={this.props.arrDate}
                        from={this.props.from}
                        to={this.props.to}
                        adults={this.props.adults}
                        departureSearch={this.props.departureSearch}
                        returnSearch={this.props.returnSearch} />
                </DialogContent>
            </Dialog>

            <Container maxWidth="xl" id="cont">
                {this.state.departureSearch ?
                    <Typography variant="h4" component="div" id='flightText' > <FlightTakeoffIcon fontSize='large' /> {`${this.state.from} to ${this.state.to}`}</Typography>
                    : <Typography variant="h4" component="div" id='flightText' > <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
                        <DirectionAwareFlightTakeoffIcon fontSize='large' />
                    </ThemeProvider> {`${this.state.to} to ${this.state.from}`}</Typography>}

                {this.state.departureSearch ? <TabBar Allflights={this.state.depAllFlights} OriginalFlights={this.state.depOriginalFlights} chosenClass={this.state.depchosenflight}
                    faded={this.state.depfaded} chosenflight={this.state.depchosenflight} value={new Date(this.state.depsearchdate)}
                    return={false} updateFaded={this.updatedepFaded}
                    updatevalue={this.updatedepvalue} updateAllflights={this.updatedepAllflights}
                    updatechosenflight={this.updatedepchosenflight} updateclass={this.updatedepClass} /> : <TabBar Allflights={this.state.returnAllflights} OriginalFlights={this.state.returnOriginalFlights} chosenClass={this.state.returnchosenflight}
                        faded={this.state.returnfaded} chosenflight={this.state.returnchosenflight} value={new Date(this.state.returnsearchdate)} return={true}
                        updateFaded={this.updatereturnFaded}
                        updatevalue={this.updatereturnvalue}
                        updateAllflights={this.updatereturnAllflights}
                        updatechosenflight={this.updatereturnchosenflight}
                        updateclass={this.updatereturnClass} />}
                <div>
                    {!this.state.depfaded || !this.state.returnfaded ? <Button variant="contained" type="submit" id='submitButton'>Next</Button>
                        : <div></div>}
                    <Link to="/summary" id="summaryLink" type="submit" state={{ result: this.state }} > </Link>
                </div>
            </Container>
        </div>
    }
}

function EditReservationFunction(props) {
    let location = useLocation();
    const { reservation,
        depClass,
        arrClass,
        depDate,
        arrDate,
        from,
        to,
        adults,
        departureSearch,
        returnSearch,
        oldDepartureFlight,
        oldReturnFlight,
        invalidDepdate,
        invalidReturndate, result } = location.state;

    const depfaded = result.depfaded
    const depvalue = result.depsearchdate
    const depOriginalFlights = result.depOriginalFlights
    const depAllflights = result.depAllFlights
    const depchosenflight = result.depchosenflight
    const depflightClass = result.depflightClass
    const returnfaded = result.returnfaded
    const returnvalue = result.returnsearchdate
    const returnOriginalFlights = result.returnOriginalFlights
    const returnAllflights = result.returnAllflights
    const returnchosenflight = result.returnchosenflight
    const returnflightClass = result.returnflightClass
    const numberOfpassengers = result.numberOfpassengers
    const noOutFlights = result.noOutFlights;
    const noInFlights = result.noInFlights;


    return <EditReservation
        reservation={reservation}
        depClass={depClass}
        arrClass={arrClass}
        depDate={depDate}
        arrDate={arrDate}
        from={from}
        to={to}
        adults={adults}
        departureSearch={departureSearch}
        returnSearch={returnSearch}
        oldDepartureFlight={oldDepartureFlight}
        oldReturnFlight={oldReturnFlight}
        invalidDepdate={invalidDepdate}
        invalidReturndate={invalidReturndate}
        depfaded={depfaded}
        depvalue={depvalue}
        depOriginalFlights={depOriginalFlights}
        depAllflights={depAllflights}
        depchosenflight={depchosenflight}
        depflightClass={depflightClass}
        returnfaded={returnfaded}
        returnvalue={returnvalue}
        returnAllflights={returnAllflights}
        returnOriginalFlights={returnOriginalFlights}
        returnchosenflight={returnchosenflight}
        returnflightClass={returnflightClass}
        numberOfpassengers={numberOfpassengers}
        noOutFlights={noOutFlights}
        noInFlights={noInFlights}
    />
}

export default EditReservationFunction;