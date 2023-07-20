// IMPORTING NECESSARY LIBRARIES AND MIDDLEWARE
const express = require('express')

// INITIALIZE EXPRESS ROUTER
const workoutsRouter = express.Router()

// ROUTE MIDDLEWARES
workoutsRouter.get("/", workoutsController.getController)

// EXPORTING WORKOUTSROUTER
module.exports = workoutsRouter