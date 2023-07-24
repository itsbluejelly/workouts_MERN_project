// IMPORT REQUIRED LIBRARIES
const express = require('express')
const { loginController, signupController } = require('../controllers/userController')

// INITIATE EXPRESS ROUTER
const userRouter = express.Router()

// ROUTE MIDDLEWARES
userRouter.post("/login", loginController.postController)
userRouter.post("/signup", signupController.postController)

// EXPORT USERROUTER
module.exports = userRouter