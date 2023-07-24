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
        res.status(200).json({success: foundWorkout})
        eventLogger(`Workout with an id of ${foundWorkout._id} found from collection successfully`, foundWorkout, "databaseLogs.txt")
    }catch(error){
        res.status(404).json({ error : error.message })
        eventLogger(error.name, error.message, "errorLogs.txt")
    }

    next()
}

//DEFINING A DELETECONTROLLER FUNCTION THAT HANDLES DELETE REQUESTS
async function deleteController(req, res, next){
    const idParameter = req.params.id

    try{
        if(!mongoose.Types.ObjectId.isValid(idParameter)){
            throw new Error("The id given is invalid")
        }
        
        const deletedWorkout = await WorkoutModel.findByIdAndDelete(idParameter)
        res.status(200).json({"success": `Workout with id ${deletedWorkout._id} successfully deleted`})
        eventLogger("Deletion of workout from collection successful", `Workout with id ${deletedWorkout._id} successfully deleted`, "databaseLogs.txt")
    }catch(error){
        res.status(404).json({error: error.message})
        eventLogger(error.name, error.message, "errorLogs.txt")
    }

    next()
}

//DEFINING A PATCHCONTROLLER FUNCTION THAT HANDLES PATCH REQUESTS
async function patchController(req, res, next){
    const idParameter = req.params.id

    try{
        if(!mongoose.Types.ObjectId.isValid){
            throw new Error("The id given is invalid")
        }

        const updatedWorkout = await WorkoutModel.findByIdAndUpdate(
            idParameter, 
            req.body.update ? req.body.update : null,
            {new: true})
        res.status(200).json({success: updatedWorkout})
        eventLogger(`Workout with id ${updatedWorkout._id} successfully updated`, updatedWorkout, "databaseLogs.txt")
    }catch(error){
        res.status(404).json({ error : error.message })
        eventLogger(error.name, error.message, "errorLogs.txt")
    }

    next()
}

// EXPORTING VARIOUS CONTROLLERS
module.exports = { 
    getController,
    deleteController,
    patchController
}