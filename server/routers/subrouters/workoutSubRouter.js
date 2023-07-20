// IMPORTING NECESSARY LIBRARIES AND MIDDLEWARE
const express = require('express')
const workoutSubController = require('../../controllers/subController/workoutSubController')

// INITIALIZE EXPRESS ROUTER
const workoutSubRouter = express.Router()

// ROUTE MIDDLEWARES
workoutSubRouter.route("/:id")
    .get(workoutSubController.getController)
    .delete(workoutSubController.deleteController)
    .patch(workoutSubController.patchController)

// EXPORT WORKOUTSUBROUTER
module.exports = workoutSubRouter