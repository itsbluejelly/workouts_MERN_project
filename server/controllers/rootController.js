// IMPORTING NECESSARY LIBRARIES AND MIDDLEWARES
const eventLogger = require('../middleware/eventLogger')

// DEFINING A GETCONTROLLER FUNCTION THAT HANDLES GET REQUESTS
async function getController(req, res, next){
    eventLogger(req.path, req.method, "eventLogs.txt")
    next()
}

// EXPORTING VARIOUS CONTROLLERS
module.exports = { getController }