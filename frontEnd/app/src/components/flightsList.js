import React, { Component } from 'react';
import 'tachyons';
import { DataGrid } from '@mui/x-data-grid';



class FlightsList extends Component {
    constructor() {
        super()
        this.state = {
            flights: []
        }
    }


    componentDidMount() {
        //const {flights} = await axios.get('http://localhost:8000/flights');
        fetch('http://localhost:8000/flights')
            .then(response => response.json())
            .then(flights => { this.setState({ flights: flights }) });


        // this.setState({
        //   flights: flights
        // })
    }



    render() {
        const { flights } = this.state;
        flights.map((flight, i) => {
            return flight.id=i;
        });
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
        ];
        return flights.length === 0 ? <h1>Loading</h1> : (
            <div style={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={flights}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>)
    }
}

export default FlightsList;
