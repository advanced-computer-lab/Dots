const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({

    from: String,
    to: String,
    flightDate: String,
    cabin: String,
    seatsAvailable: {type: Number,
        default:0}
});

module.exports = mongoose.model("Flight", flightSchema);