import React, { Component } from 'react';
import { Card, CardHeader, Divider } from '@mui/material';
import { Stack } from '@mui/material'

class ReservationCard extends Component {
    render() {
        const tempArr = [1, 2, 3]
        var cardStyle = {
            height: '15vw',
        }
        return (
            <Stack  sx={{ mx: 5, my:15 }} spacing={2}>
                {tempArr.map(() => (
                <Card style={cardStyle}>
                    <CardHeader title="Flight Qw123e"/>
                    <Divider />
                </Card>
                ))}
            </Stack>
        );
    }
}

export default ReservationCard;