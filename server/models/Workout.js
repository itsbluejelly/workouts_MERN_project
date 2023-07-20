// IMPORTING NECESSARY LIBRARIES
const mongoose = require('mongoose')

// INITIATING A SCHEMA CLASS
const Schema = mongoose.Schema()

// CREATING A WORKOUT SCHEMA
const WorkoutSchema = new Schema({
    title:{
        type: String,
        required: [true, "You must have a name for your workout"]
    },

    reps:{
        type: Number,
        required: [true, "You must specify the reps undergone in this exercise"]
    },

    load:{
        type: Number,
        required: [true, "You must specify the amount of weights you've lifted"]
    }
}, { timestamps: true })

// EXPORTING A WORKOUT MODEL OF THE WORKOUT SCHEMA
module.exports = mongoose.model("Workout", WorkoutSchema)