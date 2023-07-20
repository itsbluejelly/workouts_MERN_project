// IMPORTING NECESSARY MIDDLEWARE
const eventLogger = require('../middleware/eventLogger')

//DEFINING A GETCONTROLLER FUNCTION THAT HANDLES GET REQUESTS
function getController(req, res, next){
    res.send("Hello")
    next()
}

//DEFINING A POSTCONTROLLER FUNCTION THAT HANDLES POST REQUESTS
function postController(req, res, next){
    res.send("Hello")
    next()
}

// EXPORTING VARIOUS CONTROLLERS
module.exports = { 
    getController,
    postController
}