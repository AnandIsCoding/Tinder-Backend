const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express();
const CookieParser = require('cookie-parser')
const connectToDb = require("./configs/database")
const User = require('./models/user')
const {validateSignUpData, validateLogindata} = require('./utils/validation')
const {userAuthentication} = require('../Tinder/middlewares/userAuthentication')

app.use(express.json())
app.use(CookieParser())


connectToDb()
    .then(()=>{
        console.log('database connection established')
        app.listen(3000,() =>{
            console.log('Server is listening at http://localhost:3000');
        })
    })
    .catch((err) =>{
        console.log('database connection failed')
        console.log('Refresh page or wait for sometime')
    })

app.get('/', (req, res) => {
        res.send('Home page');
})

app.post('/signup', async (req, res) => {
    const validationResult =  validateSignUpData(req)
    // Validate the user data before saving it to the database
    if(validationResult){
       res.send(validationResult)
    }
    const { firstName, lastName, email, password, userimage, gender, age} = req.body    

    //encrypt password
    const encryptedUserPassword = await bcrypt.hash(password, 10)
    console.log(encryptedUserPassword)
    
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

app.post('/login' , async(req,res) =>{
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

app.get('/profile',userAuthentication, async(req,res) =>{
    
    // userAuthentication is a middleware which will run before /profile if it doesn't return any error than only /profile will execute req res
   try{
        const user = req.user;
        res.send(user);
   }catch(err){
        res.status(404).send(err.message)
   }

    
})



app.get('*', (req,res) =>{
    res.status(404).send('Not Found')
})

