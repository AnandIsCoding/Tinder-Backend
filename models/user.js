const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique : true },
    password: { type: String, required: true, unique : true},
    userimage: { type: String, required: true },
    age: { type: Number, required: true },  // Optional field
    gender: { type: String, required: true }  // Optional field
    },
 {
    timestamps:true
});

const User = mongoose.model('User', userSchema);
module.exports = User;

