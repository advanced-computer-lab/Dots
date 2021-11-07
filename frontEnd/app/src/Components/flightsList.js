import React, { Component } from 'react';
import 'tachyons';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import SearchModule from './SearchModule/SearchModule'
import './SearchModule/SearchModule.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button'
import EditForm from './EditForm';

import DialogTitle from '@mui/material/DialogTitle';





class FlightsList extends Component {
    constructor() {
        super()
        this.state = {
            permanentFlights: [],
            flights: [],
            flightNum: '',
            from: '',
            to: '',
            depDate: null,
            arrDate: null,
            depTime: null,
            arrTime: null,
            arrTerminal: '',
            depTerminal: '',
            pageSize: 10,
            cabin: '',
            seats: '',
            openDialog: false,
            openDeleteDialog: false,
            selectedFlight: '',
            dialogFlight: '',
            openEditDialog: false,
            filterOpen: false,



        }
    }


    onFilterClose = () => {
        this.setState({
            filterOpen: false, from: '',
            to: '',
            depDate: null,
            arrDate: null,
            depTime: null,
            arrTime: null,
            arrTerminal: '',
            depTerminal: '',
            cabin: '',
            seats: ''
        })

    }

    onFilterShow = () => {
        this.setState({ filterOpen: true })
    }



    onDialogShowEdit = (id) => {
        this.setState({ openEditDialog: true, selectedFlight: id, dialogFlight: id })
    }
    onDialogCloseEdit = () => {
        this.setState({ openEditDialog: false })
    }



    onDialogShow = (id) => {
        this.setState({ openDialog: true })
    }
    onDialogShowDelete = (id) => {
        this.setState({ openDeleteDialog: true, selectedFlight: id, dialogFlight: id })
    }

    onDialogClose = () => {
        this.setState({ openDialog: false })
    }

    onCancelDelete = () => {
        this.setState({ openDeleteDialog: false, selectedFlight: "null" })
    }

    onDialogCloseDelete = () => {

        fetch("http://localhost:8000/flight/" + this.state.selectedFlight + "/delete", {
            method: "DELETE",
        }).then(res => {
            console.log("Request complete! response:", res);
        }).then(() => {
            this.setState((prev) => ({
                flights: prev.flights.filter(
                    (row) => row.id !== prev.selectedFlight
                ),
                permanentFlights: prev.permanentFlights.filter(
                    (row) => row.id !== prev.selectedFlight
                ),
                selectedFlight: null,
                openDeleteDialog: false
            }));
        })

    }

    onSubmit = (data) => {
        axios.put(`http://localhost:8000/flights/${this.props.id}`, data)
            .then(() => {
                this.setState((prev) => ({
                    flights: prev.flights.map(
                        (row) => row.id === prev.dialogFlight ? data : row
                    ),
                    permanentFlights: prev.permanentFlights.map(
                        (row) => row.id === prev.dialogFlight ? data : row
                    ),
                    openEditDialog: false,
                    dialogFlight: null
                }))
            })
    }





    componentDidMount() {
        //const {flights} = await axios.get('http://localhost:8000/flights');
        fetch('http://localhost:8000/flights')
            .then(response => response.json())
            .then(flights => {
                this.setState({ permanentFlights: flights, flights: flights })

                let airportSet = new Set();
                this.state.permanentFlights.map((flight) => {
                    airportSet.add(flight.from)
                    airportSet.add(flight.to)
                })
                this.setState({ airports: Array.from(airportSet) })
                console.log(this.state.airports)

            }).catch( err => { console.log(err) } ) 

    }




    filterFlight = () => {
        const { permanentFlights, from, to, depDate, arrDate, depTime, arrTime, depTerminal,
            arrTerminal, cabin, seats } = this.state;

        if (!depDate && from.length === 0 && to.length === 0 && depTime === null && arrTime === null && depTerminal.length === 0 &&
            arrTerminal.length === 0 && cabin.length === 0 && seats.length === 0) {
            this.setState({ flights: permanentFlights })
            console.log('Break')
            return;
        }





        console.log('Dep Date', depDate);
        const intersectionFLights = (arr1, arr2) => {
            return arr1.filter(x => arr2.includes(x));
        }        // console.log( this,state.flights[0]._id.$oid.substring(start) )
        console.log('From', from)
        console.log('To', to)


        let filterByFrom = permanentFlights.filter(flight => {
            return from === flight.from || from.length === 0
        })


        let filterByTo = permanentFlights.filter(flight => {
            return to === flight.to || to.length === 0
        })



        let aggFilter = intersectionFLights(filterByTo, filterByFrom)
        // console.log(aggFilter)

        let filterByDep = permanentFlights.filter(flight => {
            if (depDate) {
                let inDate = new Date(flight.departureTime)
                inDate.setHours(0, 0, 0, 0)
                depDate.setHours(0, 0, 0, 0)
                console.log('Input Date : ', inDate)
                console.log('Input Date : ', depDate)

                // console.log(inDate.valueOf() === depDate.valueOf())
                return inDate.valueOf() === depDate.valueOf()
            }
            else return true
        })
        aggFilter = intersectionFLights(aggFilter, filterByDep)
        // console.log(aggFilter)

        let filterByArr = permanentFlights.filter(flight => {
            if (arrDate) {
                let inDate = new Date(flight.arrivalTime)
                inDate.setHours(0, 0, 0, 0)
                arrDate.setHours(0, 0, 0, 0)
                // console.log('Input Date : ', inDate)
                // console.log(inDate.valueOf() === depDate.valueOf())
                return inDate.valueOf() === depDate.valueOf()
            }
            else return true
        })

        aggFilter = intersectionFLights(aggFilter, filterByArr)
        // console.log(aggFilter)
        let filtrByDepTime = permanentFlights.filter(flight => {
            if (depTime) {
                let inTime = new Date(flight.departureTime)
                if (inTime.getHours() > 12) {
                    inTime.setHours(inTime.getHours() - 12)
                }
                inTime.setHours(inTime.getHours() - 2)
                // console.log('inTime' , inTime.getHours())
                // console.log('depTime' , depTime.getHours())
                // console.log(inTime.getHours() === depTime.getHours())
                return inTime.getHours() === depTime.getHours()
            }
            else return true
        })

        // console.log(filtrByDepTime)
        aggFilter = intersectionFLights(aggFilter, filtrByDepTime)

        let filterByArrTime = permanentFlights.filter(flight => {
            if (arrTime) {
                let inTime = new Date(flight.departureTime)
                if (inTime.getHours() > 12) {
                    inTime.setHours(inTime.getHours() - 12)
                }
                inTime.setHours(inTime.getHours() - 2)
                // console.log('inTime' , inTime.getHours())
                // console.log('depTime' , depTime.getHours())
                // console.log(inTime.getHours() === depTime.getHours())
                return inTime.getHours() === arrTime.getHours()
            }
            else return true
        })

        aggFilter = intersectionFLights(aggFilter, filterByArrTime)

        let filterByDepTerminal = permanentFlights.filter(flight => {
            // console.log('Dep Terminal : ', depTerminal)
            if (depTerminal) {
                return flight.departureTerminal === depTerminal
            }
            else return true
        })

        aggFilter = intersectionFLights(aggFilter, filterByDepTerminal)

        let filterByArrTerminal = permanentFlights.filter(flight => {

            // console.log('Arr Terminal : ', arrTerminal)
            if (arrTerminal) {
                return flight.arrivalTerminal === arrTerminal
            }
            else return true
        })

        aggFilter = intersectionFLights(aggFilter, filterByArrTerminal)

        let filterByCabin = []
        if (cabin) {
            filterByCabin = permanentFlights.filter(flight => {
                console.log(cabin)
                console.log(flight.cabin)
                console.log(flight.cabin === cabin)
                return flight.cabin === cabin
            })

        }
        else {
            filterByCabin = permanentFlights
        }

        console.log(filterByCabin)

        aggFilter = intersectionFLights(aggFilter, filterByCabin)

        console.log(aggFilter)


        let filterBySeats = []
        if (seats) {
            filterBySeats = permanentFlights.filter(flight => {
                console.log('inseats', flight.seatsAvailable)
                console.log('search', seats)
                // type cast string to int  and compare
                return parseInt(flight.seatsAvailable) >= parseInt(seats)
            })

        }
        else {
            filterBySeats = permanentFlights
        }

        console.log(aggFilter)
        console.log(filterBySeats)
        aggFilter = intersectionFLights(aggFilter, filterBySeats)

        console.log(aggFilter)

        this.setState({ flights: aggFilter })

    }

    onflightNumChange = (event) => {
        this.setState({ flightNum: event.target.value })
        let filteredFlights = this.state.permanentFlights.filter(flight => {
            let id = flight.flightNumber

            return (id.toLowerCase()).startsWith((event.target.value.toLowerCase()))
        })

        console.log(filteredFlights)

        this.setState({ flights: filteredFlights })

    }
    onFromChange = (event) => {
        let input = event.target.innerHTML
        if (input.length > 4) input = ""
        this.setState({ from: input })

    }

    onToChange = (event) => {
        let input = event.target.innerHTML
        if (input.length > 4) input = ""
        this.setState({ to: input })


    }


    onDepChange = (event) => {
        this.setState({ depDate: event })

    }

    onArrChange = (event) => {
        this.setState({ arrDate: event })

    }

    onDepTimeChange = (event) => {
        console.log(event)
        this.setState({ depTime: event })
    }

    onArrTimeChange = (event) => {
        console.log(event)
        this.setState({ arrTime: event })

    }

    onArrTerminalChange = (event) => {
        let input = event.target.innerHTML
        if (input.length > 4) input = ""
        this.setState({ arrTerminal: input })

    }
    onDepTerminalChange = (event) => {
        let input = event.target.innerHTML
        if (input.length > 4) input = ""
        this.setState({ depTerminal: input })

    }

    onCabinChange = (event) => {
        let input = event.target.innerHTML
        if (input.length > 8) input = ""
        console.log(input)
        this.setState({ cabin: input })
    }

    onSeatsChange = (event) => {
        this.setState({ seats: event.target.value })
    }

    setPageSize = (newVal) => {
        this.setState({ pageSize: newVal })
        // handleDeleteClick = (_id) => (event) => {
        //     event.stopPropagation();
        // };
    }

    close = () => {
        this.setState({ openEditDialog: false })
    }



    render() {
        const { flights, flightNum, from, to, depDate, pageSize, airports } = this.state;
        console.log(this.state.onDialogShowDelete)

        flights.map((flight) => {
            return flight.id = flight._id;
        });
        const handleEditClick = (id) => (event) => {
            this.onDialogShowEdit(id);
            event.stopPropagation();
        };

        const handleDeleteClick = (id) => (event) => {
            this.onDialogShowDelete(id);
            event.stopPropagation();
        };
        const columns = [
            {
                field: 'flightNumber',
                headerName: 'Flight Number',
                width: 200
            },
            {
                field: 'from',
                headerName: 'From',
                width: 200
            },
            {
                field: 'to',
                headerName: 'To',
                width: 200,
            },
            {
                field: 'departureTime',
                headerName: 'Departure Time',
                width: 200,
            },
            {
                field: 'arrivalTime',
                headerName: 'Arrival Time',
                width: 200,
            },
            {
                field: 'departureTerminal',
                headerName: 'Departure Terminal',
                width: 200,
            },
            {
                field: 'arrivalTerminal',
                headerName: 'Arrival Terminal',
                width: 200,
            },
            {
                field: 'cabin',
                headerName: 'Cabin',
                width: 200,
            },
            {
                field: 'seatsAvailable',
                headerName: 'Seats Available',
                width: 200,
            },
            {
                field: 'actions',
                type: 'actions',
                headerName: 'Actions',
                width: 100,
                getActions: ({ id }) => {
                    return [
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            onClick={handleEditClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={handleDeleteClick(id)}
                        />,
                    ];
                },
            },
        ];
        return (
            <div>
                <SearchModule flights={flights}

                    depDate={depDate}
                    arrDate={this.state.arrDate}
                    arrTime={this.state.arrTime}
                    depTime={this.state.depTime}
                    onflightNumChange={this.onflightNumChange}
                    onFromChange={this.onFromChange}
                    onToChange={this.onToChange}
                    onDepChange={this.onDepChange}
                    filterFlight={this.filterFlight}
                    onDepTimeChange={this.onDepTimeChange}
                    onArrChange={this.onArrChange}
                    onArrTimeChange={this.onArrTimeChange}
                    onArrTerminalChange={this.onArrTerminalChange}
                    onDepTerminalChange={this.onDepTerminalChange}
                    onCabinChange={this.onCabinChange}
                    onSeatsChange={this.onSeatsChange}
                    onFilterClose={this.onFilterClose}
                    filterOpen={this.state.filterOpen}
                    onFilterShow={this.onFilterShow}

                > </SearchModule>

                <div style={{ height: 650, width: '70%', position: 'fixed', left: 190 }}>
                    <DataGrid
                        rows={flights}
                        columns={columns}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => this.setPageSize(newPageSize)}
                        rowsPerPageOptions={[10, 20, 50]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>

                <Dialog
                    open={this.state.openDeleteDialog}
                    onClose={this.onCancelDelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"

                >
                    <DialogTitle id="alert-dialog-title">{"Delete a Flight ?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Pressing Yes will delete the Flight with ID {this.state.dialogFlight}.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onCancelDelete} color="primary">
                            No
                        </Button>
                        <Button onClick={this.onDialogCloseDelete} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>


                <Dialog
                    open={this.state.openEditDialog}
                    onClose={this.onDialogCloseEdit}
                >
                    <EditForm id={this.state.dialogFlight} handleSubmit={this.onSubmit} close={this.close} />
                </Dialog>




            </div>
        )
    }

}



export default FlightsList;