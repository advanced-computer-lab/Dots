import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import travel2 from './travel2.jpg';
import rome from './Rome.jpg';
import athens from './Athens.jpg';
import kotor from './Kotor.jpg';
import portofino from './Portofino.jpg';
import seville from './Seville.jpg';
import split from './Split.jpg';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './Destinations.css';
import { CardActionArea } from '@mui/material';
import {Link} from 'react-router-dom';
class Destination extends Component {


    constructor(props) {
        super(props);
        this.state = {
            elevation: 0,
            city: this.props.city,
            country: this.props.country,
            image: '',
            width:this.props.width,
            height:this.props.height,
            picWidth:this.props.picWidth,
            picHeight:this.props.picHeight,
            targetUrl: "/" + this.props.country.toLowerCase() + "/" + this.props.city.toLowerCase()
        }
    }

    componentDidMount() {

        let pic = this.getDestinationPic();
        console.log(pic);

        this.setState({ image: pic })
        console.log(this.state);

    }

    onMouseOver = () => {
        if(this.state.width<150)
        this.setState({ elevation: 15 });
    }
    onMouseOut = () => {
        if(this.state.width<150)
        this.setState({ elevation: 0 });
    }

    clickDestination = () => {
        if(this.state.width<150)
        {
            let link = document.getElementById(this.state.city);
            console.log(link)
             link.click();
        }
    }

    getDestinationPic = () => {
        let { city } = this.props;
        switch (city) {
            case "Rome": return rome;
            case "Athens": return athens;
            case "Kotor": return kotor;
            case "Portofino": return portofino;
            case "Seville": return seville;
            case "Split": return split;
            default: return travel2;

        }
    }


    render() {
        return (

            <Box class = "destBox" display="inline-block" sx={{ width: this.state.width, height: this.state.height }}>
                <Card elevation={this.state.elevation} onMouseOver={this.onMouseOver}
                    onMouseOut={this.onMouseOut} borderRadius={9} >
                    <CardActionArea onClick={this.clickDestination}>
                        <div class="destDiv" style={{
                            backgroundImage: `url(${this.getDestinationPic()})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            width: this.state.picWidth,
                            height: this.state.picHeight,
                            borderRadius: '9px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            textAlign: 'center'


                        }} >
                            <Typography class="destinationTitle" variant={this.state.width<150?"h4":"h1"} style = {{ fontWeight: 700}}gutterBottom>
                                {this.state.city}
                            </Typography>

                            <Typography class="destinationSubTitle" variant={this.state.width<150?"h7":"h5 "} style = {{ fontWeight: 300}} gutterBottom>
                                {this.state.country }
                            </Typography>

                        </div>




                    </CardActionArea>





                </Card>

                <Link to= {this.state.targetUrl} id={this.state.city} type="submit" state={{
                    city: this.state.city,
                    country: this.state.country,
                }} > </Link>

            </Box>



        );
    }
}


export default Destination;