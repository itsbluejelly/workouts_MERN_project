// IMPORTING NECESSARY MIDDLEWARE
const eventLogger = require('../middleware/eventLogger')
const WorkoutModel = require('../models/Workout')

//DEFINING A GETCONTROLLER FUNCTION THAT HANDLES GET REQUESTS
async function getController(req, res, next){
    try{
        const workouts = await WorkoutModel
            .find(req.body.actions ? req.body.actions.find : null)
            .select(req.body.actions ? req.body.actions.select : null)
            .sort(req.body.actions ? req.body.actions.sort : null)
            .limit(req.body.actions ? req.body.actions.limit : null)
        res.status(200).json(workouts)
        eventLogger(`Finding ${workouts.length} of workouts from collection successful`, workouts, "databaseLogs.txt")
    }catch(error){
        res.status(404).json({ Error: { [error.name]: error.message } })
        eventLogger(error.name, error.message, "errorLogs.txt")
    } 
}

//DEFINING A POSTCONTROLLER FUNCTION THAT HANDLES POST REQUESTS
function postController(req, res, next){
    res.send("Hello")
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
    postController,
    deleteController,
    patchController
}