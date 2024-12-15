const express = require('express');
const { userAuthentication } = require('../middlewares/userAuthentication');
const connectionModel = require('../models/connection');
const connectionRequest = express.Router();

connectionRequest.post('/request/send/:status/:receiverId', userAuthentication, async (req, res) => {
  try {
    const senderId = req.user._id;
    const { status, receiverId } = req.params;

    // Validate status
    if (['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status for sending a request.' });
    }

    // Prevent self-connections
    if (senderId.toString() === receiverId.toString()) {
      return res.status(400).json({ message: 'Sender and Receiver cannot be the same.' });
    }

    // Check if request already exists
    const existingRequest = await connectionModel.findOne({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Request already exists.' });
    }

    // Create and save the new connection request
    const newConnection = new connectionModel({
      senderId,
      receiverId,
      status,
    });
    const savedConnection = await newConnection.save();

    res.status(201).json({
      message: 'Connection request sent successfully.',
      data: savedConnection,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

connectionRequest.post('/request/review/:status/:requestId', userAuthentication, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    // Validate status
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Use "accepted" or "rejected".' });
    }

    // Find and validate the connection request
    const connectionRequestReview = await connectionModel.findOne({
      _id: requestId,
      receiverId: loggedInUser._id,
      status: 'interested',
    });

    if (!connectionRequestReview) {
      return res.status(404).json({ message: 'Connection request not found or already reviewed.' });
    }

    // Update status and save
    connectionRequestReview.status = status;
    const updatedConnection = await connectionRequestReview.save();

    res.status(200).json({
      message: `Connection request ${status} successfully.`,
      data: updatedConnection,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = connectionRequest;
