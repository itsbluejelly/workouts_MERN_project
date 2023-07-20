// IMPORTING NECESSARY LIBRARIES AND MIDDLEWARE
const express = require('express')
const workoutsController = require('../controllers/workoutsController')
const workoutSubRouter = require('./subrouters/workoutSubRouter')

// INITIALIZE EXPRESS ROUTER
const workoutsRouter = express.Router()

// ROUTE MIDDLEWARES
workoutsRouter.route("/")
    .get(workoutsController.getController)
    .post(workoutsController.postController)
    .delete(workoutsController.deleteController)
    .patch(workoutsController.patchController)

    // SUB-ROUTE MIDDLEWARE
workoutsRouter.use("/workout", workoutSubRouter)

// EXPORTING WORKOUTSROUTER
module.exports = workoutsRouter