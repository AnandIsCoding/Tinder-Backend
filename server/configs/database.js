const mongoose = require('mongoose');

const cluster = 'mongodb+srv://Anand:Anandtinder@tinder.pvxr2.mongodb.net/Tinder?retryWrites=true&w=majority&appName=Tinder';

const connectToDb = async() =>{
   await mongoose.connect(cluster);
}

module.exports = connectToDb;

