const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authenticationRouter = express.Router()
const CookieParser = require('cookie-parser')
const User = require('../models/user')
const {validateSignUpData, validateLogindata} = require('../utils/validation')
const {userAuthentication} = require('../middlewares/userAuthentication')

const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function uploadFiletocloudinary(file, folder){
    const options = {folder}
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}
async function isFiletypesupported(type, supportedTypes){
    return supportedTypes.includes(type)
} 



authenticationRouter.post('/signup', async (req, res) => {
    const validationResult =  validateSignUpData(req)
    // Validate the user data before saving it to the database
    if(validationResult){
       return res.status(403).send(validationResult)
    }
    const { firstName, lastName, email, password, gender, age,bio} = req.body   
    
    const file = req.files.userimage
    if(!file) return res.status(403).json({success:false, message:"Profile image is required"})
    if(!bio){
        return res.status(403).json({success:false, message:"Bio is required and it should contain you mob no"})
    }
    //file validation
    const supportedTypes = ['jpg','jpeg','png']
    const fileType = file.name.split('.')[1].toLowerCase()
    if(!isFiletypesupported(fileType, supportedTypes)){
            return res.status(403).json({success:false, message:'File Type not supported only [jpg jpeg png accepted'})
    }
    //if fileType supported
    const response = await uploadFiletocloudinary(file, "Tinder")

    //encrypt password
    const encryptedUserPassword = await bcrypt.hash(password, 10)
    
    
    try {
        const user = new User({
            firstName,
            lastName,
            email,
            password : encryptedUserPassword ,
            userimage:response.secure_url,
            age,
            gender,
            bio
        });         
       
        
        const userCreated = await user.save(); // Save the user and validate the schema
        var token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY , {expiresIn : '7d'} );
        res.cookie("token" , token,  {
            httpOnly: true,
            sameSite: "strict",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          })       
        res.status(201).json({success:true, message:'User registered successfully', user:userCreated , token:token})

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            res.status(400).send(`Validation error: ${messages.join(', ')}`);
            console.log(error)
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
        var token = jwt.sign({ _id: user._id },  process.env.SECRET_KEY, {expiresIn : '7d'} );
        res.cookie("token" , token, token,  {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          }).json({message:'Login successfull', success:true, user, token:token})
    }else{
        return res.status(404).json({success:false, message:'Invalid credentials'})
    }
})

authenticationRouter.delete('/logout', async(req,res) =>{
    res.cookie("token" , null , { expires: new Date(Date.now()) }) 
    res.status(200).json({success:true, message:"Logout successfully"})
})

module.exports =  authenticationRouter
