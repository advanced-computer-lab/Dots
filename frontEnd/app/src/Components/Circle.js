import * as React from 'react';
import './Circle.css';

const Circle = (props) => {

    var circleStyle = {
        padding:10,
        margin:20,
        display:"inline-block",
        position:'absolute',
        //  backgroundColor: '#076F72',
        borderRadius: "50%",
        border: '1px solid #076F72',
        width:500,
        height:500,
        left:505,
        top:110
      };


      return (
        <div style={circleStyle}>
        </div>
      );
}


export default Circle;