const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    gender:{
        type:String,
    },
    age:{
        type:Number,
    },
    password:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
        required:true
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User;