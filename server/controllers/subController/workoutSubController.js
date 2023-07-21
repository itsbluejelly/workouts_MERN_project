// IMPORTING NECESSARY MIDDLEWARE AND LIBRARIES
const mongoose = require('mongoose')
const eventLogger = require('../../middleware/eventLogger')
const WorkoutModel = require('../../models/Workout')

//DEFINING A GETCONTROLLER FUNCTION THAT HANDLES GET REQUESTS
async function getController(req, res, next){
    const queryParameters = req.query
    const idParameter = req.params.id
    let selectedFields = ''

    try{
        if(!mongoose.Types.ObjectId.isValid(idParameter)){
            throw new Error("The Id given is invalid")
        }

        if(queryParameters.selectedFields){
            const regex = /_id|title|__v|reps|load|createdAt|updatedAt/g
            const querySelectedFields = queryParameters.selectedFields

            const acceptedQuerySelectedFields = `${querySelectedFields.match(regex)}`

            if(!acceptedQuerySelectedFields){
                throw new Error("Invalid query selectedFields parameter")
            }

            const sanitizedQuerySelectedFields = acceptedQuerySelectedFields.replace(/,/g, ' ')
            selectedFields = sanitizedQuerySelectedFields
        }

        const foundWorkout = await WorkoutModel
            .findById(req.params.id)
            .select(selectedFields)
        res.status(200).json(foundWorkout)
        eventLogger(`Workout with an id of ${foundWorkout._id} from collection successful`, foundWorkout, "databaseLogs.txt")
    }catch(error){
        res.status(404).json({Error: {[error.name]: error.message}})
        eventLogger(error.name, error.message, "errorLogs,txt")
    }

    next()
}

//DEFINING A DELETECONTROLLER FUNCTION THAT HANDLES DELETE REQUESTS
function deleteController(req, res, next){
    res.send("Hello")
    next()
}

//DEFINING A PATCHCONTROLLER FUNCTION THAT HANDLES PATCH REQUESTS
function patchController(req, res, next){
    res.send("Hello")
    next()
}

// EXPORTING VARIOUS CONTROLLERS
module.exports = { 
    getController,
    deleteController,
    patchController
}