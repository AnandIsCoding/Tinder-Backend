const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authenticationRouter = express.Router()
const CookieParser = require('cookie-parser')
const User = require('../models/user')
const {validateSignUpData, validateLogindata} = require('../utils/validation')
const {userAuthentication} = require('../middlewares/userAuthentication')



authenticationRouter.post('/signup', async (req, res) => {
    const validationResult =  validateSignUpData(req)
    // Validate the user data before saving it to the database
    if(validationResult){
       res.send(validationResult)
    }
    const { firstName, lastName, email, password, userimage, gender, age} = req.body    

    //encrypt password
    const encryptedUserPassword = await bcrypt.hash(password, 10)
    
    
    try {
        const user = new User({
            firstName,
            lastName,
            email,
            password : encryptedUserPassword ,
            userimage,
            age,
            gender
        });         
        
        const userCreated = await user.save(); // Save the user and validate the schema
        var token = jwt.sign({ _id: user._id }, "Anand@Tinder.comstoken", {expiresIn : '7d'} );
        res.cookie("token" , token, { expires: new Date(Date.now() + 604800000) })       
        res.status(201).json({success:true, message:'User registered successfully', user:userCreated , token:token})

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            res.status(400).send(`Validation error: ${messages.join(', ')}`);
        } else {
            // Handle other errors (e.g., database connection issues)
            res.status(500).json({success:false, message:'An error occurred. Please try again later.'});
        }
        console.log('Error:', error);
    }
});

authenticationRouter.post('/login' , async(req,res) =>{
    validateLogindata(req)
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if(!user){
        return res.status(404).json({success:false, message:'Invalid Credentials'})
    }
    const match = await bcrypt.compare(password, user.password);
    
    if(match) {
        //create a jwt token nd add it to cookie, and send to user
        var token = jwt.sign({ _id: user._id }, "Anand@Tinder.comstoken", {expiresIn : '7d'} );
        res.cookie("token" , token, { expires: new Date(Date.now() + 604800000) })       
        return res.status(200).json({message:'Login successfull', success:true, user, token:token})
    }else{
        return res.status(404).json({success:false, message:'Invalid credentials'})
    }
})

authenticationRouter.post('/logout', async(req,res) =>{
    res.cookie("token" , null , { expires: new Date(Date.now()) }) 
    res.status(200).json({success:true, message:"Logout successfully"})
})

module.exports =  authenticationRouter
