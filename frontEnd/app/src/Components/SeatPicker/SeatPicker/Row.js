import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Row extends Component {
  static propTypes = {
    rowNumber: PropTypes.string,
    visible: PropTypes.bool,
    isSelected: PropTypes.bool,
    children: PropTypes.array,
  };

  render() {
    const { visible, rowNumber, isSelected } = this.props;
    const className =
      "seat-picker__row" +
      (isSelected
        ? " seat-picker__row--selected"
        : " seat-picker__row--enabled");


    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}
