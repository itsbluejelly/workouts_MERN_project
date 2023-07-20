// IMPORTING NECESSARY LIBRARIES AND MIDDLEWARE
const express = require('express')
const workoutsController = require('../controllers/workoutsController')

// INITIALIZE EXPRESS ROUTER
const workoutsRouter = express.Router()

// ROUTE MIDDLEWARES
workoutsRouter.get("/", workoutsController.getController)

// EXPORTING WORKOUTSROUTER
module.exports = workoutsRouter