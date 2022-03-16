import react ,{Component} from 'react';
import Destination from '../Destination/Destinations';
import {Card, CardContent, CardMedia, Typography, Box} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import './DestinationList.css';

class DestinationList extends Component{

    componentDidMount()
    {
        const handler = e => this.setState({ desktop: e.matches });
        window.matchMedia("(min-width: 900px)").addEventListener('change', handler);
    }

    constructor()
    { 
       super();
       this.state = {
        desktop: window.matchMedia("(min-width: 900px)").matches,
    };

    }



    render()
    {
        return(
          <Stack id = "destinationList" direction = "row" spacing = {{"xs": 3 , "lg":10}} alignContent = "center">
            <Destination city = "Rome" country = "Italy" width = {134} height = {128} picWidth = {'134px'} picHeight = {'230px'} />
            <Destination city = "Athens" country = "Greece"  width = {134} height = {128} picWidth = {'134px'} picHeight = {'230px'}/>
            <Destination city = "Kotor" country = "Montonegro" width = {134} height = {128} picWidth = {'134px'} picHeight = {'230px'} />
            <Destination city = "Portofino" country = "Italy"  width = {134} height = {128} picWidth = {'134px'} picHeight = {'230px'}/>
            <Destination city = "Seville" country = "Spain"  width = {134} height = {128} picWidth = {'134px'} picHeight = {'230px'}/>
            <Destination city = "Split" country = "Croatia"  width = {134} height = {128} picWidth = {'134px'} picHeight = {'230px'}/>
          </Stack> 


        );
    }

}


export default DestinationList