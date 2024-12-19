const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const urlencoded = require('express');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const connectToDb = require('./configs/database');
const { validateSignUpData, validateLogindata } = require('./utils/validation');
const { userAuthentication } = require('./middlewares/userAuthentication');

// Load environment variables
dotenv.config();

// CORS configuration
const allowedOrigins = ["https://lovefinder.onrender.com", "http://localhost:3000"];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));

// Middleware setup
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: tempDir }));

// Cloudinary connection
const { cloudinaryConnect } = require('./configs/cloudinary');
cloudinaryConnect();

// Routers
const authenticationRouter = require('./routers/authenticationRouter');
const profileRouter = require('./routers/profileRouter');
const connectionRequest = require('./routers/connectionRequest');
const userRouter = require('./routers/userRouter');

// Use routers
app.use('/', authenticationRouter);
app.use('/', profileRouter);
app.use('/', connectionRequest);
app.use('/', userRouter);

// Serve React frontend
// Serve React frontend
app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));

// This sends all other requests to the React app's index.html (single-page application routing)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});


// Database connection and server start


connectToDb()
    .then(() => {
        console.log('Database connection established');
        app.listen(3000, () => {
            console.log(`Server is listening at http://localhost:3000}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed');
        console.error(err);
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
