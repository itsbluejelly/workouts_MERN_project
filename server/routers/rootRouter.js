// IMPORT NECESSARY LIBRARIES AND MIDDLEWARE
const express = require('express')
const rootController = require('../controllers/rootController')

// INITIALIZING EXPRESS ROUTER
const rootRouter = express.Router()

// ROUTE MIDDLEWARES
rootRouter.get("/", rootController.getController)

// EXPORTING ROOTROUTER
module.exports = rootRouter