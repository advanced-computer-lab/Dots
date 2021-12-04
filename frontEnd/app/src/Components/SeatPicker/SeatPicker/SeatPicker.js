import React, { Component } from "react";
import PropTypes from "prop-types";
import Row from "./Row";
import Seat from "./Seat";
import Blank from "./Blank";
import RowNumber from "./RowNumber";

export class SeatPicker extends Component {
  static defaultProps = {
    addSeatCallback: ({ row, number, id }, addCb) => {
      console.log(`Added seat ${number}, row ${row}, id ${id}`);
      addCb(row, number, id);
    },
    removeSeatCallback: ({ row, number, id }, removeCb) => {
      console.log(`Removed seat ${number}, row ${row}, id ${id}`);
      removeCb(row, number);
    },
    maxReservableSeats: 0,
  };

  constructor(props) {
    super(props);
    const { rows } = props;
    const { selectedSeats, size } = this.getAlreadySelectedSeats();
    this.state = {
      tooltipOverrides: {},
      selectedSeats: selectedSeats,
      size: size,
      rowLength: Math.max.apply(
        null,
        rows.map(row => row.length)
      ),
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.maxReservableSeats < state.size) {
      let sum = 0;
      const selectedSeats = {};
      for (const array in state.selectedSeats) {
        if (
          sum + state.selectedSeats[array].length <
          props.maxReservableSeats
        ) {
          selectedSeats[array] = state.selectedSeats[array].slice(0);
        } else {
          const dif = props.maxReservableSeats - sum;
          selectedSeats[array] = state.selectedSeats[array].slice(0, dif);
          return {
            selectedSeats: selectedSeats,
            size: props.maxReservableSeats,
          };
        }
        sum = sum + state.selectedSeats[array].length;
      }
    }
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.selectedSeats !== this.state.selectedSeats ||
      this.props.loading !== nextProps.loading
    );
  }

  getAlreadySelectedSeats = () => {
    let selectedSeats = {};
    let size = 0;
    const { maxReservableSeats, alpha, selectedByDefault } = this.props;
    if (selectedByDefault) {
      let gapCounter = 0;
      this.props.rows.forEach((row, index) => {

        if (row.length === 0) {
          gapCounter++;
        }
        const rowNumber = alpha
          ? String.fromCharCode("A".charCodeAt(0) + index - gapCounter)
          : (index + 1).toString();
        row.forEach((seat, index) => {
          if (seat && seat.isSelected) {
            const seatAlreadySelected = this.includeSeat(
              selectedSeats,
              rowNumber,
              seat.number
            );
            if (size < maxReservableSeats && !seatAlreadySelected) {
              selectedSeats = this.addSeat(
                selectedSeats,
                rowNumber,
                seat.number,
                seat.id
              );
              size = size + 1;
            }
          }
        });
      });
    }
    return { selectedSeats, size };
  };

  includeSeat = (selectedSeats, row, number) => {
    if (selectedSeats[row]) {
      return !!selectedSeats[row][number];
    }
    return false;
  };

  addSeat = (selectedSeats, row, number, id) => {
    if (selectedSeats[row]) {
      if (!selectedSeats[row][number]) {
        selectedSeats[row][number] = id;
      }
    } else {
      selectedSeats[row] = {};
      selectedSeats[row][number] = id;
    }
    return { ...selectedSeats };
  };

  deleteSeat = (row, number) => {
    const { selectedSeats } = this.state;
    if (selectedSeats[row]) {
      delete selectedSeats[row][number];
      if (!Object.keys(selectedSeats[row]).length > 0) {
        delete selectedSeats[row];
      }
    }
    return { ...selectedSeats };
  };

  addTooltip = (tooltipOverrides, row, number, tooltip) => {
    if (!tooltipOverrides[row]) {
      tooltipOverrides[row] = {};
    }
    tooltipOverrides[row][number] = tooltip;
    return { ...tooltipOverrides };
  };

  acceptSelection = (row, number, id, tooltip) => {
    const { selectedSeats, tooltipOverrides, size } = this.state;
    const { maxReservableSeats } = this.props;
    if (size < maxReservableSeats) {
      this.setState({
        tooltipOverrides: this.addTooltip(
          tooltipOverrides,
          row,
          number,
          tooltip
        ),
        selectedSeats: this.addSeat(selectedSeats, row, number, id),
        size: size + 1,
      }, () => {
      });
    }
  };

  acceptDeselection = (row, number, tooltip) => {
    const { size, tooltipOverrides } = this.state;
    this.setState({
      tooltipOverrides: this.addTooltip(tooltipOverrides, row, number, tooltip),
      selectedSeats: this.deleteSeat(row, number),
      size: size - 1,
    }, () => {
    });
  };

  selectSeat = (row, number, id) => {
    const { selectedSeats } = this.state;
    const size = this.state.size;
    const {
      maxReservableSeats,
      addSeatCallback,
      removeSeatCallback,
    } = this.props;
    const seatAlreadySelected = this.includeSeat(selectedSeats, row, number);

    if (seatAlreadySelected) {
      removeSeatCallback({ row, number, id }, this.acceptDeselection);
    } else {
      if (size < maxReservableSeats) {
        addSeatCallback({ row, number, id }, this.acceptSelection, this.acceptDeselection);
      }
    }
  };

  render() {
    return (
      <div className="seat-content">
        <div className={this.props.loading ? "loader" : null} />
        <div className="seat-picker">{this.renderRows()}</div>
      </div>
    );
  }

  renderRows() {
    const { selectedSeats: seats } = this.state;
    const { alpha, visible } = this.props;
    let gapCounter = 0;

    let splitter = () => {
      if (gapCounter === 1) {
        return <h4 style={{ textAlign: 'center' }} > First </h4>
      } else if (gapCounter === 2) {
        return <h4 style={{ textAlign: 'center' }} > Business </h4>
      } else if (gapCounter == 3) {
        return <h4 style={{ textAlign: 'center' }} > Economy </h4>
      } else {
        return <h4 style={{ textAlign: 'center' }} >  <br></br> </h4>
      }
    }

    return this.props.rows.map((row, index) => {
      let rowNumber = alpha
        ? String.fromCharCode("A".charCodeAt(0) + index - gapCounter)
        : (index + 1).toString();

      if (row.length === 0) {
        gapCounter++;
        rowNumber = "";
      }
      const isSelected = !!seats[rowNumber];
      const props = {
        visible,
        rowNumber,
        isSelected,
        selectedSeat: null,
        seats: row,
        length: row.length
        // key: `Row${rowNumber}`,
        // selectSeat: this.selectSeat,
      };


      if (row.length !== 0) {
        return (
          <Row key={index} {...props}>
            {this.renderSeats(row, rowNumber, isSelected)}{" "}
          </Row>
        );
      } else {
        return (
          <Row key={index} {...props}>
            {splitter()}
          </Row>
        )
      }
    });
  }

  renderSeats(seats, rowNumber, isRowSelected) {
    const { selectedSeats, size, tooltipOverrides } = this.state;
    const { maxReservableSeats, continuous, selectedCabin } = this.props;
    let rowCabin = seats[0].cabin
    const row = seats.map((seat, index) => {
      if (seat === null) return <Blank key={index} cabin={rowCabin} />;
      if (seat === "number") return <RowNumber key={index} rowNumber={rowNumber} visible={true} />;

      const isSelected =
        isRowSelected &&
        this.includeSeat(selectedSeats, rowNumber, seat.number);
      let tooltip = seat.tooltip;
      let cabin = seat.cabin
      // let reservationCabin=seat[0].reservationCabin
      if (
        tooltipOverrides[rowNumber] &&
        tooltipOverrides[rowNumber][seat.number] != null
      ) {
        tooltip = tooltipOverrides[rowNumber][seat.number];
      }
      const props = {
        isSelected,
        orientation: seat.orientation,
        isReserved: seat.isReserved,
        tooltip,
        isEnabled: size < maxReservableSeats || continuous,
        selectSeat: this.selectSeat.bind(this, rowNumber, seat.number, seat.id),
        seatNumber: seat.number,
        tooltipProps: this.props.tooltipProps,
        cabin,
        selectedCabin,
        zero: index,
        // reservationCabin
      };
      return <Seat key={index} {...props} />;
    });
    return row;
  }
}

// SeatPicker.propTypes = {
//   addSeatCallback: PropTypes.func,
//   alpha: PropTypes.bool,
//   visible: PropTypes.bool,
//   continuous: PropTypes.bool,
//   selectedByDefault: PropTypes.bool,
//   removeSeatCallback: PropTypes.func,
//   maxReservableSeats: PropTypes.number,
//   rows: PropTypes.arrayOf(
//     PropTypes.arrayOf(
//       PropTypes.shape({
//         number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//         isReserved: PropTypes.bool,
//         tooltip: PropTypes.string,
//         isSelected: PropTypes.bool,
//       })
//     )
//   ).isRequired,
//   tooltipProps: PropTypes.object,
//   loading: PropTypes.bool,
// };
