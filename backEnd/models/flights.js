const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Reservation = require('./reservations');


const flightSchema = new Schema({
    flightNumber:{
        type:String,
        
    },
<<<<<<< HEAD
    from: {
        type:String
        /*required:true*/
    },
=======
   
>>>>>>> 0e6130bbea68900913f54d5d134ea320da9d7a49
    departureLocation: {
        country:{type:String /*required:true*/},
        city:{type:String /*required:true*/},
        airport:{type:String /*required:true*/},
        terminal:{type:String /*required:true*/}
    },
    arrivalLocation: {
        country:{type:String /*required:true*/},
        city:{type:String /*required:true*/},
        airport:{type:String /*required:true*/},
        terminal:{type:String /*required:true*/}
    },
<<<<<<< HEAD
    to: {
        type:String,
        /*required:true*/
    },
=======
  
>>>>>>> 0e6130bbea68900913f54d5d134ea320da9d7a49
    departureTime: {
        type:Date,
        /*required:true*/
    },
    arrivalTime: {
        type:Date,
        /*required:true*/
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
    totalEconomySeats:
    {
        type: Number,
        default: 0
    },
    totalBusinessSeats:
    {
        type: Number,
        default: 0
    },
    totalFirstSeats:
    {
        type: Number,
        default: 0
    },
    reservations:
    [
            { type: Schema.Types.ObjectId, ref: 'Reservation' }
    ],
    firstClassPrice:
    {
        type: Number,
        default: 0
    },
    businessClassPrice:
    {
        type: Number,
        default: 0
    },
    economyClassPrice:
    {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model("Flight", flightSchema);