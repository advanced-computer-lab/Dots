const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    flightNumber:{
        type:String,
        required:true
    },
    from: {
        type:String,
        required:true
    },
    departureTerminal: {
        type:String,
        required:true
    },
    arrivalTerminal: {
        type:String,
        required:true
    },
    to: {
        type:String,
        required:true
    },
    departureTime: {
        type:Date,
        required:true
    },
    arrivalTime: {
        type:Date,
        required:true
    },
    economySeatsAvailable:
    {
        type: Number,
        default: 0
    },
    businessSeatsAvailable:
    {
        type: Number,
        default: 0
    },
    firstSeatsAvailable:
    {
        type: Number,
        default: 0
    },
    takenSeats:
    [
        { 
            seatNumber: String,
            seatType:{type:String,enum:["Economy","First","Business"]}
        }
    ],
    passengers:
    [
            { type: Schema.Types.ObjectId, ref: 'User' }
    ],
    baggageAllowance:
    {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Flight", flightSchema);