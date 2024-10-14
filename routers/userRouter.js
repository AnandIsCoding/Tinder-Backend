const express = require('express');
const userRouter = express.Router(); 
const { userAuthentication } = require('../middlewares/userAuthentication');
const connectionModel = require('../models/connection');

userRouter.get('/requests/received', userAuthentication, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await connectionModel.find({
            receiverId: loggedInUser._id,
            status: 'interested',
        }).populate("senderId", " firstName lastName age gender userimage ")

        res.status(200).json({
            message: 'Connection requests fetched successfully',
            data: connectionRequests,
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

userRouter.get('/requests/connections', userAuthentication, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const allConnections = await connectionModel.find({
            $or: [
                { status: 'accepted', senderId: loggedInUser._id },
                { status: 'accepted', receiverId: loggedInUser._id }
            ]
        }).populate('senderId', 'firstName lastName age gender userimage')
          .populate('receiverId', 'firstName lastName age gender userimage');

        // Create an array to store connection details
        const connectionsData = allConnections.map(connection => {
            if (loggedInUser._id.toString() === connection.senderId._id.toString()) {
                return connection.receiverId; // If logged-in user is sender, show receiver's details
            } else {
                return connection.senderId; // If logged-in user is receiver, show sender's details
            }
        });

        res.status(200).json({
            message: 'All connections fetched successfully',
            data: connectionsData,
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});


module.exports = userRouter;
