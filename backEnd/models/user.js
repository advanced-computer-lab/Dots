const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required:true,
        unique:true
    },
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required:true
    },
    homeAddress: {
        type: String,
        required:true
    },
    countryCode: {
        type: String,
        required:true
    },
    phoneNumber: {
        type: String,
        required:true
    },
    passportNumber: {
        type: String,
        required:true,
        unique:true
    },
    flights: [
        {
            flightId:{ type: Schema.Types.ObjectId, ref: 'Flight' },
            chosenSeats:[{ seatNumber: String, seatType:{type:String,enum:["Economy","First","Business"]}}]
        }
    ]





});

adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);