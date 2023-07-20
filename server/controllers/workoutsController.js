// IMPORTING NECESSARY MIDDLEWARE
const eventLogger = require('../middleware/eventLogger')
const WorkoutModel = require('../models/Workout')

//DEFINING A GETCONTROLLER FUNCTION THAT HANDLES GET REQUESTS
async function getController(req, res, next){
    try{
        const foundWorkouts = await WorkoutModel
            .find(req.body.actions ? req.body.actions.find : null)
            .select(req.body.actions ? req.body.actions.select : null)
            .sort(req.body.actions ? req.body.actions.sort : null)
            .limit(req.body.actions ? req.body.actions.limit : null)
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
        res.status(200).send(`${deletedWorkouts.deletedCount} deleted successfully`)
        eventLogger("Deletion of workouts from collection successfull", `${deletedWorkouts.deletedCount} workouts deleted`, "databaseLogs.txt")
    }catch(error){
        res.status(404).json({ Error: { [error.name]: error.message } })
        eventLogger(error.name, error.message, "errorLogs.txt")
    }

    next()
}

//DEFINING A PUTCONTROLLER FUNCTION THAT HANDLES PUT REQUESTS
function putController(req, res, next){
    res.send("Hello")
    next()
}

// EXPORTING VARIOUS CONTROLLERS
module.exports = { 
    getController,
    postController,
    deleteController,
    putController
}