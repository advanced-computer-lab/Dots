import React, { Component } from "react";

export default class Blank extends Component {
  render() {
    const className= "blank" + ((this.props.cabin==="Business")?" blank--business":"")
    return <div className={className}  />;
  }
}
