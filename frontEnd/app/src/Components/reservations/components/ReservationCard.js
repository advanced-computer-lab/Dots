import React, { Component } from 'react';
import { Card, CardHeader, Divider } from '@mui/material';
import { Stack } from '@mui/material'

class ReservationCard extends Component {
    render() {
        const tempArr = [1, 2, 3]
        var cardStyle = {
            height: '15vw',
            borderRadius: '1vw'
        }
        return (
            <Stack  sx={{ mx: 40, my:15 }} spacing={7}>
                {tempArr.map(() => (
                <Card style={cardStyle} elevation="7">
                    <CardHeader title="Flight Qw123e"/>

                    <Divider style={{width:'100%'}} />
                </Card>
                ))}
            </Stack>
        );
    }
}

export default ReservationCard;