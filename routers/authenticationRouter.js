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
        
        await user.save(); // Save the user and validate the schema
        res.status(201).send('Data successfully stored in the database');
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            res.status(400).send(`Validation error: ${messages.join(', ')}`);
        } else {
            // Handle other errors (e.g., database connection issues)
            res.status(500).send('An error occurred. Please try again later.');
        }
        console.log('Error:', error);
    }
});

authenticationRouter.post('/login' , async(req,res) =>{
    validateLogindata(req)
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user){
        return res.status(404).send('Invalid credentials')
    }
    const match = await bcrypt.compare(password, user.password);
    
    if(match) {
        //create a jwt token nd add it to cookie, and send to user
        var token = jwt.sign({ _id: user._id }, "Anand@Tinder.comstoken", {expiresIn : '7d'} );
        res.cookie("token" , token, { expires: new Date(Date.now() + 604800000) })       
        return res.send('login successfull !!!!!!')
    }else{
        return res.status(404).send('Invalid credentials')
    }
})

authenticationRouter.post('/logout', async(req,res) =>{
    res.cookie("token" , null , { expires: new Date(Date.now()) }) 
    res.status(200).send('logout successfull')
})

module.exports =  authenticationRouter
