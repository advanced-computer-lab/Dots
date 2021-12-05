const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./users');
const Flight = require('./flights');

const reservationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    outBoundflight: {
        type: Schema.Types.ObjectId,
        ref: 'Flight'
    },
    inBoundflight: {
        type: Schema.Types.ObjectId,
        ref: 'Flight'
    },
    outBoundClass: {
        type: String, enum: ["Economy", "First", "Business"]
    },
    inBoundClass: {
        type: String, enum: ["Economy", "First", "Business"]
    },
    passengers: [{
        firstName:{type: String} ,
        lastName: {type: String},
        passportNumber:{type: String},
        outBoundSeat:{type: String},
        inBoundSeat:{type: String}
    }],
    confirmationNumber: {
        type: Number
    },
    totalPrice: {
        type:Number
    }


});


module.exports = mongoose.model("Reservation", reservationSchema);