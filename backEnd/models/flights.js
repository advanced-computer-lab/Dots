const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    from: String,
    flightTerminal: String,
    to: String,
    flightDate: Date,
    cabin: String,
    seatsAvailable:
    {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Flight", flightSchema);