const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: { 
      type: String, 
      required: [true, 'First name is required'], 
      minlength: [3, 'First name must be at least 3 characters'], 
      maxlength: [30, 'First name must be at most 30 characters'] 
    },
    lastName: { 
      type: String, 
      required: [true, 'Last name is required'], 
      minlength: [3, 'Last name must be at least 3 characters'], 
      maxlength: [30, 'Last name must be at most 30 characters'] 
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'], 
      unique: true
    },
    password: { 
      type: String, 
      required: [true, 'Password is required'], 
      minlength: [5, 'Password must be at least 8 characters'], 
      unique: true 
    },
    userimage: { 
      type: String, 
      required: [true, 'User image URL is required'], 
      validate: [validator.isURL, 'Please provide a valid URL'] 
    },
    age: { 
      type: Number, 
      required: [true, 'Age is required'], 
      min: [18, 'Age must be at least 18'], 
      max: [100, 'Age must be at most 100'] 
    },
    gender: { 
      type: String, 
      required: [true, 'Gender is required'], 
      enum: {
        values: ['male', 'female', 'other'], 
        message: 'Gender must be either male, female, or other'
      } 
    },
    bio:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
