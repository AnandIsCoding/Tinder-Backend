const mongoose = require('mongoose');
const User = require('./user')

const connectionSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User'
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref :'User'
    },
    status: {
        type: String, // Define the type as String
        enum: ['interested', 'ignore', 'accepted', 'rejected'], // Allowed values for status
        required: true // Mark it as required
    }
}, {
    timestamps:true
});

const connectionModel = mongoose.model('Connection', connectionSchema);

module.exports = connectionModel;
