// IMPORTING NECESSARY MIDDLEWARE
const eventLogger = require('../middleware/eventLogger')
const WorkoutModel = require('../models/Workout')

//DEFINING A GETCONTROLLER FUNCTION THAT HANDLES GET REQUESTS
async function getController(req, res, next){
    const queryParameters = req.query
    const filterObject = {}
    const sortObject = {}
    let selectedFields = ''
    let limitNumber = null
    
    try{
        if(queryParameters.title){
            const regex = /^[A-Za-z- ]+$/g
            const queryTitle = queryParameters.title

            if(!regex.test(queryTitle)){
                throw new Error("Invalid query title parameter value")
            }
            
            filterObject.title = queryTitle.toLowerCase()
        }
        
        if(queryParameters.reps){
            const regex = /^[0-9.]+$/g
            const queryReps = queryParameters.reps

            if(!regex.test(queryReps)){
                throw new Error("Invalid query reps parameter value")
            }

            const sanitizedQueryReps = parseFloat(queryReps)
            filterObject.reps = sanitizedQueryReps
        }

        if(queryParameters.load){
            const regex = /^[0-9.]+$/g
            const queryLoad = queryParameters.load

            if(!regex.test(queryLoad)){
                throw new Error("Invalid query load parameter value")
            }

            const sanitizedQueryLoad = parseFloat(queryLoad)
            filterObject.load = sanitizedQueryLoad
        }
        
        if(queryParameters.limit){
            const regex = /^[0-9]+$/g
            const queryLimit = queryParameters.limit

            if(!regex.test(queryLimit)){
                throw new Error("Invalid query limit parameter")
            }

            const sanitizedQueryLimit = parseInt(queryLimit)
            limitNumber = sanitizedQueryLimit
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
                sortObject.title = queryParameters.sortByTitle === 'desc' ? -1 : 1
            }
        }

        if(queryParameters.sortByReps){
            if(queryParameters.sortByReps !== 'desc' && queryParameters.sortByReps !== 'asce'){
                throw new Error("Wrong query sortByReps parameter")
            }else{
                sortObject.reps = queryParameters.sortByReps === 'desc' ? -1 : 1
            }
        }

        if(queryParameters.sortByLoad){
            if(queryParameters.sortByLoad !== 'desc' && queryParameters.sortByLoad !== 'asce'){
                throw new Error("Wrong query sortByLoad parameter")
            }else{
                sortObject.load = queryParameters.sortByLoad === 'desc' ? -1 : 1
            }
        }

        if(queryParameters.selectedFields){
            const regex = /_id|__v|title|load|reps|createdAt|updatedAt/g
            const querySelectedFields = queryParameters.selectedFields

            const acceptedQuerySelectedFields = `${querySelectedFields.match(regex)}`

            if(!acceptedQuerySelectedFields){
                throw new Error("Invalid query selectedFields parameter")
            }

            const sanitizedQuerySelectedFields = acceptedQuerySelectedFields.replace(/,/g, ' ')
            selectedFields = sanitizedQuerySelectedFields
        }
          
        const foundWorkouts = await WorkoutModel
            .find(filterObject)
            .select(selectedFields)
            .sort(sortObject)
            .limit(limitNumber)
        res.status(200).json({ "success": foundWorkouts })
        eventLogger(`Finding ${foundWorkouts.length} of workouts from collection successful`, foundWorkouts, "databaseLogs.txt")
    }catch(error){
        res.status(404).json({ error: error.message })
        eventLogger(error.name, error.message, "errorLogs.txt")
    }
    
    next()
}

//DEFINING A POSTCONTROLLER FUNCTION THAT HANDLES POST REQUESTS
async function postController(req, res, next){
    try{
        const createdWorkout = await WorkoutModel.create(req.body)
        res.status(201).json({
            success: "Workout created successfully",
            data: createdWorkout
        })
        eventLogger("A new workout successfully added to database", createdWorkout, "databaseLogs.txt")
    }catch(error){
        res.status(400).json({error: error.message})
        eventLogger(error.name, error.message, "errorLogs.txt")
    }

    next()
}

//DEFINING A DELETECONTROLLER FUNCTION THAT HANDLES DELETE REQUESTS
async function deleteController(req, res, next){
    try{
        const deletedWorkouts = await WorkoutModel.deleteMany(req.body.actions ? req.body.actions.find : null)
        res.status(200).json({"success": `${deletedWorkouts.deletedCount} workouts deleted successfully`})
        eventLogger("Deletion of workouts from collection successfull", `${deletedWorkouts.deletedCount} workouts deleted`, "databaseLogs.txt")
    }catch(error){
        res.status(404).json({ error: error.message })
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
        res.status(200).json({"success": `${updatedWorkouts.modifiedCount} workouts updated successfully`})
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