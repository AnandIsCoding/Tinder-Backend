const User = require('../models/user')
const jwt = require('jsonwebtoken')

const userAuthentication = async(req, res, next) =>{
    // check if user is authenticated or not by checking if token is present in cookies
    ////validate jwt token here
    // if token is not present, return a 403 status and send a message to the user to go signup and login
    // if token is present, verify it and attach user details to req.user
    // use middleware next() to continue the execution of the route handler or controller function
    // next() should be called after verifying token and attaching user details to req.user


    const {token} = req.cookies
    if(!token) return res.status(404).send('go Signup and login');
    jwt.verify(token, "Anand@Tinder.comstoken" , async (error, decoded) =>{
        if(error){
            return res.status(404).send('User not found')
        }
        const {_id} = decoded;
        //find user using id got from decoded
        const userDetails = await User.findById(_id)
        
        if(!userDetails) return res.status(404).send("User not Found")

        // attaching user details of user found with _id of decoded             
        req.user = userDetails;
        
    next();

    })
}

module.exports = {
    userAuthentication
};