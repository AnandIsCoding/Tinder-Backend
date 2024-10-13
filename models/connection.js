const mongoose = require('mongoose');

const connectionSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
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
