// IMPORTING NECESSARY LIBRARIES
const mongoose = require('mongoose')

// INITIATING A SCHEMA CLASS
const Schema = mongoose.Schema

// DEFINING A USER SCHEMA
const UserSchema = new Schema({
    email:{
        type: String,
        required: [true, "You must have a correct email"],
        unique: [true, "You email must be unique"] 
    },

    password: {
        type: String,
        required: [true, "You must have a password"],
    },

    username: {
        type: String,
        required: [true, "You must provide a username"]
    }
})

// EXPORTING A MODEL OF THE USERSCHEMA
module.exports = mongoose.model("User", UserSchema)