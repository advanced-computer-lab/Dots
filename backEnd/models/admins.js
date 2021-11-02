const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Admin', adminSchema);