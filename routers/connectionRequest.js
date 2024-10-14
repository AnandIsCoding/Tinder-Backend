const express = require('express')
const {userAuthentication} = require('../middlewares/userAuthentication')
//import model
const connectionModel = require('../models/connection')
const connectionRequest = express.Router()

connectionRequest.post('/request/send/:status/:receiverId', userAuthentication , async(req, res) =>{
    
   try{
        const senderId = req.user._id;
        const {status, receiverId} = req.params;
        // create instanse 
        const newConnection = new connectionModel({
            senderId,
            receiverId,
            status
        }) 

        //check if status is other than interested or ignore than return
        if((status === 'accepted') || (status === 'rejected')) return res.status(500).json({message : 'bad status '})
        
        //check if sender and receiver is same than return

        if (senderId.toString() === receiverId.toString()) {
            
            return res.status(400).json({ message: 'Bad Request: Sender and Receiver cannot be the same.' });
        }


        //check if receiver or sender is already in db
        const checkAlreadyStored = await connectionModel.findOne({
            $or: [
                {senderId: senderId, receiverId: receiverId},
                {senderId: receiverId, receiverId: senderId}
            ]
        })    
        
        if(checkAlreadyStored) return res.status(500).json({message : 'Request already sent'})

        // save connectiondetails in database
            const savedConnection = await newConnection.save()
             res.json({
                message:'connection sent successfully', 
                savedConnection
             })
   }
   catch(err){
       res.send(err.message)
   }
})

connectionRequest.post('/request/review/:status/:requestId', userAuthentication, async(req,res) =>{
    try{
        const loggedInUser = req.user;
        const {status, requestId} = req.params;

        //check for valid status
        let allowedStatus = ['accepted' , 'rejected']
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: 'Invalid status. Please choose between "interested", "ignore", "accepted", or "rejected".' });
        }

        const conectionRequestReview = await connectionModel.findOne({
            _id: requestId,
            receiverId: loggedInUser._id,
            status:"interested"
        })

       // Find the connection request
       const connectionRequestReview = await connectionModel.findOne({
        _id: requestId,
        receiverId: loggedInUser._id,
        status: 'interested' // Only allow reviewing requests with "interested" status
    });

    if (!connectionRequestReview) {
        return res.status(404).json({ message: 'Connection request not found or already reviewed.' });
    }

    // Update the status
    connectionRequestReview.status = status;

    // Save the updated connection request
    const updatedConnectionRequest = await connectionRequestReview.save();

    // Respond with success
    res.json({
        message: 'Review submitted successfully',
        data: updatedConnectionRequest
    });
        
    }catch(error){
        res.status(400).send(error.message)
    }
})

module.exports = connectionRequest;

