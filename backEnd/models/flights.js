const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Reservation = require('./reservations');


const flightSchema = new Schema({
    flightNumber:{
        type:String,
        
    },
    economyFlightProductId :{
        type:String,
        default:null
    },
    businessFlightProductId :{
        type:String,
        default:null
    },
    firstFlightProductId : {
        type:String,
        default:null
    },
    economyFlightPriceId :{
        type:String,
        default:null
    },
    businessFlightPriceId :{
        type:String,
        default:null
    },
    firstFlightPriceId : {
        type:String,
        default:null
    },
   
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

flightSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Reservation.deleteMany({
            _id: {
                $in: doc.reservations
            }
        })
    }
})

module.exports = mongoose.model("Flight", flightSchema);