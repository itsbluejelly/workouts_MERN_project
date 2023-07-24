// IMPORT NECESSARY MODULES AND MIDDLEWARE
const eventLogger = require('../middleware/eventLogger')

// A LOGINPOSTCONTROLLER TO DEAL WITH POST REQUESTS
function loginPostController(req, res, next){
    res.send("Hi")
    next()
}

// A SIGNUPPOSTCONTROLLER TO DEAL WITH POST REQUESTS
function signupPostController(req, res, next){
    res.send("Hi")
    next()
}

// EXPORTING VARIOUS CONTROLLERS
module.exports = {
    "loginController": {"postController": loginPostController},
    "signupController": {"postController": signupPostController},
}