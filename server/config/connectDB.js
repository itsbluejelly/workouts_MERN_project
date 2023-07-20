// IMPORTING NECESSARY LIBRARIES AND MIDDLEWARE
const mongoose = require('mongoose')
const eventLogger = require('../middleware/eventLogger')

// AN ASYNC FUNCTION TO CONNECT TO MONGODB GYM DATABASE
async function connectDB(){
    try{
        await mongoose.connect(
            process.env.DATABASE_URI,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }
        )
    }catch(error){
        eventLogger(error.name, error.message, "errorLogs.txt")
    }
}

// EXPORTING CONNECTDB
module.exports = connectDB