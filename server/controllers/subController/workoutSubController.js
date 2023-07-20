// IMPORTING NECESSARY MIDDLEWARE
const eventLogger = require('../../middleware/eventLogger')

//DEFINING A GETCONTROLLER FUNCTION THAT HANDLES GET REQUESTS
function getController(req, res, next){
    res.send("Hello")
    next()
}

//DEFINING A DELETECONTROLLER FUNCTION THAT HANDLES DELETE REQUESTS
function deleteController(req, res, next){
    res.send("Hello")
    next()
}

//DEFINING A PATCHCONTROLLER FUNCTION THAT HANDLES PATCH REQUESTS
function patchController(req, res, next){
    res.send("Hello")
    next()
}

// EXPORTING VARIOUS CONTROLLERS
module.exports = { 
    getController,
    deleteController,
    patchController
}