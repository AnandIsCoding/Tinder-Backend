const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
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
        validate(value) {
            if (!['male', 'female', 'other'].includes(value.toLowerCase())) {
                throw new Error('Gender should be either male, female, or other');
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
        required: true,
        trim: true,
        validate: {
            validator: function(value) {
                if (!validator.isStrongPassword(value, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                })) {
                    throw new Error('Password should be strong: at least 8 characters long, contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character.');
                }
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: {
            validator: function(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Not a valid email');
                }
            }
        }
    },
    userimage: {
        type: String,
        trim: true,
        validate(value) {
            if (!value.startsWith('http')) {
                throw new Error('Image URL should start with http or https');
            }
        }
    },
    skills: {
        type: [String],  // Define skills as an array of strings
        required: true,
        validate: {
            validator: function(value) {
                if (value.length > 10) {
                    throw new Error('You cannot have more than 10 skills');
                }
                value.forEach(skill => {
                    if (skill.includes(' ')) {
                        throw new Error(`Skill "${skill}" should not contain spaces`);
                    }
                    if (skill.length < 3 || skill.length > 50) {
                        throw new Error(`Skill "${skill}" must be between 3 and 50 characters`);
                    }
                });
                return true;  // Return true if all validations pass
            }
        }
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;

