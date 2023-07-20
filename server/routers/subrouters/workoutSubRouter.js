// IMPORTING NECESSARY LIBRARIES AND MIDDLEWARE
const express = require('express')

// INITIALIZE EXPRESS ROUTER
const workoutSubRouter = express.Router()

// ROUTE MIDDLEWARES
workoutSubRouter.get("/:id", workoutSubController.getController)

// EXPORT WORKOUTSUBROUTER
module.exports = workoutSubRouter