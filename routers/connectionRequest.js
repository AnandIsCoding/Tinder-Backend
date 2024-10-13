const express = require('express')
const {userAuthentication} = require('../middlewares/userAuthentication')
//import model
const connectionModel = require('../models/connection')
const connectionRequest = express.Router()

connectionRequest.post('/send/:status/:receiverId', userAuthentication , async(req, res) =>{
    
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
            console.log("Sender and Receiver IDs are the same."); // Log for debugging
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

module.exports = connectionRequest;

