const express = require('express')
const app = express();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors');
const urlencoded = require('express')
const dotenv = require('dotenv')
const fileupload = require('express-fileupload')
const cloudinary = require('cloudinary')

dotenv.config()

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true,
};
app.use(cors(corsOptions));


const cookieParser = require("cookie-parser");
const connectToDb = require("./configs/database")

const {validateSignUpData, validateLogindata} = require('./utils/validation')
const {userAuthentication} = require('./middlewares/userAuthentication')

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(fileupload({
    useTempFiles: true,
    tempFileDir:'/temp'
}))


// cloudinary function enter here
const {cloudinaryConnect} = require('./configs/cloudinary')
cloudinaryConnect()


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

