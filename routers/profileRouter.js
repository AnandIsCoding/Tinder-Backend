const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const profileRouter = express.Router()
const CookieParser = require('cookie-parser')
const User = require('../models/user')
const {validateSignUpData, validateLogindata} = require('../utils/validation')
const {userAuthentication} = require('../middlewares/userAuthentication')

profileRouter.get('/profile/view', userAuthentication, async(req,res) =>{
    try{
       
        const user = req.user
        res.status(200).send(user)
    }catch(error){
        res.status(500).send(error.message)
    }
})

profileRouter.patch('/profile/edit', userAuthentication, async (req, res) => {
    try {
        const user = req.user;
        const { firstName, lastName,age, gender, password } = req.body;
        const fieldsthatcanbechanged = ['firstName','lastName', 'age', 'gender', 'password' ];

        // Check if all keys in req.body are allowed to be changed
        const areFieldsAllowed = Object.keys(req.body).every(field => 
            fieldsthatcanbechanged.includes(field)
        );

        // If not all fields are allowed, send a 400 status code
        if (!areFieldsAllowed) {
            return res.status(400).send("You can change only 'firstName', 'lastName', 'age', 'gender', 'password' ");
        }
        
        // Update only the allowed fields 
        if (firstName) user.firstName = firstName;
        if (age) user.age = age;
        if (lastName) user.lastName = lastName;
        if (gender) user.gender = gender;
        if(password){
            if (!validator.isStrongPassword(password, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            })) {
                return 'Password should be strong: at least 8 characters long, contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character.';
            }
            const encryptedUserPassword = await bcrypt.hash(password, 10)
            user.password = encryptedUserPassword;
        } 

        await user.save();
        res.status(200).send('Profile updated successfully');
        
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = profileRouter;