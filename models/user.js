const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        lowercase: true,
        trim: true
    },
    gender: {
        type: String,
        validate(value){
            if (!['male', 'female', 'other'].includes(value)) {
                throw new Error('Gender should be either male, female or other');
            }
        },
        required: true,
        lowercase: true
    },
    age: {
        type: Number,
        min: 18,
        max: 100,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Email validation pattern
        trim: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
