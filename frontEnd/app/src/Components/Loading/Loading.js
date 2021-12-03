import * as react from 'react';
import { Component } from 'react';
import Circle from '../Circle';
import './Loading.css';
import FlightSharpIcon from '@mui/icons-material/FlightSharp';
import background from './map.png';

class Loading extends Component {

    constructor(props) {
        super(props);
        this.myRef = react.createRef();
    }

    timeout = (delay) => {
        return new Promise(res => setTimeout(res, delay));
    }


    componentDidMount() {

        const x = this.myRef.current;
        console.log(x.style)

        x.style.left = "515px";
        x.style.top = "190px";
        console.log(615 + "px")

        let top = 190;
        let i = 1;
        let left = 515;
        // for (let left = 515; left < 800; left += 10) {

            setInterval(() => {
                top += 6;
                left += 6;
                i++;
                x.style.left = left + "px";
                x.style.top = top + "px";
            }, 100);



            // let timer = setTimeout(() => {
            //     console.log(left)

            //     top += 10;
            //     i++;
            //     x.style.left = left + "px";
            //     x.style.top = top + "px";
            // }, 500 * i)

            //    clearTimeout(timer);

            // this.timeout(1000).then( () => {
            //     top += 10;
            //     x.style.left = left + "px";
            //     x.style.top = top + "px";
            // })
        // }



        // while (left<800) {
        //     // setTimeout( () => {
        //         console.log(x.style.left)
        //         x.style.left = left + "px";
        //         x.style.top = top + "px";
        //         left += 10;
        //         top += 10;
        //         console.log(x.style.left)

        //     // }, 200);
        // }

    }




    render() {
        return (
            <div style={{
                backgroundImage: `url(${background})`,
                backgroundPosition: 'center',
                backgroundSize: '70%',
                backgroundRepeat: 'no-repeat',
                height: '720px',
                position: 'relative',
                top: '50px'



            }}>

                {/* <Circle /> */}
                <FlightSharpIcon id="plane" ref={this.myRef} />
                {/* <img src={background} id = "background" alt="map" /> */}

            </div>
        );
    }
}


export default Loading;