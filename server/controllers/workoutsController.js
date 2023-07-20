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
}

//DEFINING A POSTCONTROLLER FUNCTION THAT HANDLES POST REQUESTS
async function postController(req, res, next){
    try{
        const {title, reps, load} = req.body
        const createdWorkout = await WorkoutModel.create({title, reps, load})
        res.status(201).send("Workout created successfully")
        eventLogger("A new workout successfully added to database", `Workout id is ${createdWorkout._id}`, "databaseLogs.tzt")
    }catch(error){
        res.status(400).json({ Error: { [error.name]: error.message } })
        eventLogger(error.name, error.message, "errorLogs.txt")
    }
}

//DEFINING A DELETECONTROLLER FUNCTION THAT HANDLES DELETE REQUESTS
function deleteController(req, res, next){
    res.send("Hello")
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