// IMPORT NECESSARY MODULES AND MIDDLEWARE
const bcrypt = require('bcrypt')
const validator = require('validator')
const eventLogger = require('../middleware/eventLogger')
const UserModel = require('../models/User')
const { default: isEmail } = require('validator/lib/isEmail')

// A LOGINPOSTCONTROLLER TO DEAL WITH POST REQUESTS
function loginPostController(req, res, next){
    res.send("Hi")
    next()
}

// A SIGNUPPOSTCONTROLLER TO DEAL WITH POST REQUESTS
async function signupPostController(req, res, next){
    const {username, email, password} = req.body

    try{
        if(!username){
            throw new Error("You must provide a username")
        }else if(!email){
            throw new Error("You must provide an email")
        }else if(!validator.isEmail(email)){
            throw new Error("You must provide a correct email")
        }else if(password.length < 5){
            throw new Error("Your password must have a minimum of 5 characters")
        }else if(!validator.isStrongPassword(password)){
            throw new Error("Your password is not strong enough")
        }else{
            const foundUser = await UserModel.findOne({email})
        
            if(foundUser){
                throw new Error("This email is already registered")
            }else{
                const saltRounds = await bcrypt.genSalt(12)
                const hashedPassword = await bcrypt.hash(password, saltRounds)
                const createdUser = await UserModel.create({username, email, password: hashedPassword})
                res.status(201).json({success: `${createdUser.username}'s account created successfully`})
                eventLogger(`User with id ${createdUser._id} successfully created`, createdUser, "UserLogs.txt")
            }   
        }
    }catch(error){
        res.status(400).json({error: error.message})
        eventLogger(error.name, error.message, "errorLogs.txt")
    }

    next()
}

// EXPORTING VARIOUS CONTROLLERS
module.exports = {
    loginController: {"postController": loginPostController},
    signupController: {"postController": signupPostController},
}