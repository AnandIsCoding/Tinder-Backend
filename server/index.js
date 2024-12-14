const express = require('express')
const app = express();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors');
const urlencoded = require('express')

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // replace with your frontend URL
    credentials: true
};
app.use(cors(corsOptions));



const CookieParser = require('cookie-parser')
const connectToDb = require("./configs/database")

const {validateSignUpData, validateLogindata} = require('./utils/validation')
const {userAuthentication} = require('./middlewares/userAuthentication')

app.use(express.json());
app.use(CookieParser())
app.use(urlencoded({ extended: true }));

//import routers
const authenticationRouter = require('./routers/authenticationRouter')
const profileRouter = require('./routers/profileRouter')
const connectionRequest = require('./routers/connectionRequest')
const userRouter = require('./routers/userRouter')


//use Routers
app.use('/', authenticationRouter)
app.use('/', profileRouter)
app.use('/', connectionRequest)
app.use('/', userRouter)



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


app.get('*', (req,res) =>{
    res.status(404).send('404 Not Found')
})

