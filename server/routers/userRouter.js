// IMPORT REQUIRED LIBRARIES
const express = require('express')
const userController = require('../controllers/userController')

// INITIATE EXPRESS ROUTER
const userRouter = express.Router()

// ROUTE MIDDLEWARES
userRouter.post("/login", userController.loginController.postController)
userRouter.post("/signup", userController.signupController.postController)

// EXPORT USERROUTER
module.exports = userRouter