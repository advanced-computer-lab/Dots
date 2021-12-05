import React, { Component } from 'react';
import ReservationCard from './ReservationCard'
import { Stack } from '@mui/material'

class ReservationsList extends Component {
    render() {
        const tempArr = [1, 2, 3]
        return (
            <Stack sx={{ my: 15, mx: 10, width: '70%' }} alignItems="center" justifyContent="center" spacing={7}>
                {tempArr.map((element) => (
                    <ReservationCard key={element} />
                ))}
            </Stack>

        );
    }
}

export default ReservationsList;