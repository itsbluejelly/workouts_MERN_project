// IMPORTING NECESSARY MIDDLEWARE
const { urlencoded } = require('express')
const eventLogger = require('../middleware/eventLogger')
const WorkoutModel = require('../models/Workout')

//DEFINING A GETCONTROLLER FUNCTION THAT HANDLES GET REQUESTS
async function getController(req, res, next){
    const queryParameters = req.query
    const filterObject = {}
    const sortObject = {}
    let selectedFields = ''
    let limit = null
    
    try{
        if(queryParameters.title){
            const sanitizedTitle = queryParameters.title.replace(/[^a-zA-Z-]+/g, '')
            
            if(!sanitizedTitle){
                throw new Error("Wrong query title parameter")
            }else{
                filterObject.title = sanitizedTitle
            }
        }
        
        if(queryParameters.reps){
            const sanitizedReps = parseFloat(queryParameters.reps.replace(/\D+/g, ''))
            
            if(!sanitizedReps){
                throw new Error("Wrong query reps parameter")
            }else{
                filterObject.reps = sanitizedReps
            }
        }

        if(queryParameters.load){
            const sanitizedLoad = parseFloat(queryParameters.load.replace(/\D+/g, ''))
            
            if(!sanitizedLoad){
                throw new Error("Wrong query load parameter")
            }else{
                filterObject.load = sanitizedLoad
            }
        }
        
        if(queryParameters.limit){
            const sanitizedLimit = parseInt(queryParameters.limit.replace(/\D+/g, ''))
            
            if(!sanitizedLimit){
                throw new Error("Wrong query limit parameter")
            }else{
                limit = sanitizedLimit
            }
        }

        if(queryParameters.sortByLatest){
            if(queryParameters.sortByLatest !== 'true' && queryParameters.sortByLatest !== 'false'){
                throw new Error("Wrong query sortByLatest parameter")
            }else{
                sortObject.createdAt = queryParameters.sortByLatest === 'true' ? -1 : 1
            }
        }

        if(queryParameters.sortByUpdate){
            if(queryParameters.sortByUpdate !== 'true' && queryParameters.sortByUpdate !== 'false'){
                throw new Error("Wrong query sortByUpdate parameter")
            }else{
                sortObject.updatedAt = queryParameters.sortByUpdate === 'true' ? -1 : 1
            }
        }

        if(queryParameters.sortByTitle){
            if(queryParameters.sortByTitle !== 'desc' && queryParameters.sortByTitle !== 'asce'){
                throw new Error("Wrong query sortByTitle parameter")
            }else{
                sortObject.title = queryParameters.sortByTitle === 'desc' ? 1 : -1
            }
        }

        if(queryParameters.sortByReps){
            if(queryParameters.sortByReps !== 'desc' && queryParameters.sortByReps !== 'asce'){
                throw new Error("Wrong query sortByReps parameter")
            }else{
                sortObject.reps = queryParameters.reps === 'desc' ? 1 : -1
            }
        }

        if(queryParameters.sortByLoad){
            if(queryParameters.sortByLoad !== 'desc' && queryParameters.sortByLoad !== 'asce'){
                throw new Error("Wrong query sortByLoad parameter")
            }else{
                sortObject.load = queryParameters.load === 'desc' ? 1 : -1
            }
        }

        if (queryParameters.selectedFields) {
            const allowedFieldsRegex = /^(title|reps|load|createdAt|updatedAt|_id|__v)(\s*,\s*(title|reps|load|createdAt|updatedAt|_id|__v))*$/;
            const sanitizedFields = queryParameters.selectedFields.replace(
              new RegExp(allowedFieldsRegex.source, 'g'),
              ''
            );
          
            if (!sanitizedFields) {
              throw new Error("Wrong selected fields parameters");
            } else {
              const parsedFields = sanitizedFields.replace(/%20/g, ' ');
              selectedFields = parsedFields;
            }
        }
          
        const foundWorkouts = await WorkoutModel
            .find(filterObject)
            .select(selectedFields)
            .sort(sortObject)
            .limit(limit)
        res.status(200).json(foundWorkouts)
        eventLogger(`Finding ${foundWorkouts.length} of workouts from collection successful`, foundWorkouts, "databaseLogs.txt")
    }catch(error){
        res.status(404).json({ Error: { [error.name]: error.message } })
        eventLogger(error.name, error.message, "errorLogs.txt")
    }
    
    next()
}

//DEFINING A POSTCONTROLLER FUNCTION THAT HANDLES POST REQUESTS
async function postController(req, res, next){
    try{
        const createdWorkout = await WorkoutModel.create(req.body.post)
        res.status(201).send("Workout created successfully")
        eventLogger("A new workout successfully added to database", createdWorkout, "databaseLogs.txt")
    }catch(error){
        res.status(400).json({ Error: { [error.name]: error.message } })
        eventLogger(error.name, error.message, "errorLogs.txt")
    }

    next()
}

//DEFINING A DELETECONTROLLER FUNCTION THAT HANDLES DELETE REQUESTS
async function deleteController(req, res, next){
    try{
        const deletedWorkouts = await WorkoutModel.deleteMany(req.body.actions ? req.body.actions.find : null)
        res.status(200).send(`${deletedWorkouts.deletedCount} workouts deleted successfully`)
        eventLogger("Deletion of workouts from collection successfull", `${deletedWorkouts.deletedCount} workouts deleted`, "databaseLogs.txt")
    }catch(error){
        res.status(404).json({ Error: { [error.name]: error.message } })
        eventLogger(error.name, error.message, "errorLogs.txt")
    }

    next()
}

//DEFINING A PUTCONTROLLER FUNCTION THAT HANDLES PUT REQUESTS
async function putController(req, res, next){
    try{
        const updatedWorkouts = await WorkoutModel.updateMany(
            req.body.actions ? req.body.actions.find : null,
            req.body.update
        )
        res.status(200).send(`${updatedWorkouts.modifiedCount} workouts updated successfully`)
        eventLogger("Updating of workouts from collection successfull", `${updatedWorkouts.modifiedCount} workouts updated`, "databaseLogs.txt")
    }catch(error){
        res.status(404).json({ Error: { [error.name]: error.message } })
        eventLogger(error.name, error.message, "errorLogs.txt")
    }

    next()
}

// EXPORTING VARIOUS CONTROLLERS
module.exports = { 
    getController,
    postController,
    deleteController,
    putController
}