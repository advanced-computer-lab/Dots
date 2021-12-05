import React, { Component } from 'react';
import EditForm from './components/EditForm';
import { Paper, Typography } from '@mui/material'

class EditPage extends Component {
    render() {
        const styles = {
            paperContainer: {
                backgroundImage: `url(${'/download.jpg'})`,
                width: '100%',
                height: 821,
            },
            title: {
                color: 'white',
                fontWeight: 'bold',
            }
        }
        return (
            <div style={styles.paperContainer}>
                <Typography style={styles.title} sx={{ ml: 10,pt:10 }} paragraph variant="h1">
                    Edit your information
                </Typography>
                <EditForm />
            </div>
        );
    }
}

export default EditPage;