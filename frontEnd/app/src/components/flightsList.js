import React, { Component } from 'react';
import 'tachyons';
import {
    DataGrid,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import axios from 'axios';
import SearchModule from './SearchModule/SearchModule'
import CreateFlight from './createFlight';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

class FlightsList extends Component {
    constructor() {
        super()
        this.state = {
            permanentFlights: [],
            flights: [],
            flightNum: '',
            from: '',
            to: '',
            depDate: new Date()
        }
    }


    componentDidMount() {
        //const {flights} = await axios.get('http://localhost:8000/flights');
        fetch('http://localhost:8000/flights')
            .then(response => response.json())
            .then(flights => { this.setState({ permanentFlights: flights, flights: flights }) });


        // this.setState({
        //   flights: flights
        // })
    }
    
    filterFlight = () => {
        const { permanentFlights, flightNum, from, to, depDate } = this.state;
        // console.log( this,state.flights[0]._id.$oid.substring(start) )
        console.log('From', from)
        console.log('To', to)

        if (!depDate && from.length === 0 && to.length === 0) {
            this.setState({ flights: permanentFlights })
            return;
        }

        let filterByFrom = this.state.permanentFlights.filter(flight => {
            return from === flight.from || from.length === 0
        })

        let filterByTo = this.state.permanentFlights.filter(flight => {
            return to === flight.to || to.length === 0
        })


        console.log(filterByFrom)
        console.log(filterByTo)

        let aggFilter = filterByTo.filter(flight => {
            return filterByFrom.includes(flight)
        })

        let filterByDep = this.state.permanentFlights.filter(flight => {
            if (depDate) {
                console.log('Dep Date : ', depDate)
                let inDate = new Date(flight.flightDate)
                inDate.setHours(0, 0, 0, 0)
                depDate.setHours(0, 0, 0, 0)
                console.log('Input Date : ', inDate)
                console.log(inDate.valueOf() === depDate.valueOf())
                return inDate.valueOf() === depDate.valueOf()
            }
            else return true
        })
        console.log(filterByDep)

        aggFilter = aggFilter.filter(flight => {
            return filterByDep.includes(flight)
        })


        console.log(aggFilter)
        this.setState({ flights: aggFilter })

    }

    onflightNumChange = (event) => {
        this.setState({ flightNum: event.target.value })
        let filteredFlights = this.state.flights.filter(flight => {
            let id = flight._id.$oid // simulate that we have an ID till we decide what is a flight ID 
            id = id.substring(id.length - 2,)
            return id.startsWith(event.target.value)
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

    handleEditClick = (_id) => (event) => {
        event.stopPropagation();
    };

    handleDeleteClick = (_id) => (event) => {
        event.stopPropagation();
    };


    render() {
        const { flights, flightNum, from, to, depDate } = this.state;
        flights.map((flight, i) => {
            return flight.id = i;
        });
        const handleEditClick = (id) => (event) => {
            event.stopPropagation();
        };

        const handleDeleteClick = (id) => (event) => {
            event.stopPropagation();
        };
        const columns = [
            { field: 'from', headerName: 'From', width: 200 },
            {
                field: 'to',
                headerName: 'To',
                width: 200,
            },
            {
                field: 'flightDate',
                headerName: 'Flight Date',
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
                getActions: ({ _id }) => {
                    return [
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            onClick={handleEditClick(_id)}
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={handleDeleteClick(_id)}
                        />,
                    ];
                },
            },
        ];
        return (
            <div>
            <CreateFlight></CreateFlight>
                <SearchModule flights={flights}

                    depDate={depDate}
                    onflightNumChange={this.onflightNumChange}
                    onFromChange={this.onFromChange}
                    onToChange={this.onToChange}
                    onDepChange={this.onDepChange}
                    filterFlight={this.filterFlight}

                > </SearchModule>

                <div style={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={flights}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </div>
        )
    }
}

export default FlightsList;
