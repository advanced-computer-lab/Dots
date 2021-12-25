const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    });

module.exports = mongoose.model('Admin', adminSchema);