// IMPORTING NECESSARY MODULES
const JWT = require('jsonwebtoken')

// CREATING A JWTGENERATOR FUNCTION
function JWTGenerator(payLoad, secret, duration){
    if(typeof payLoad !== 'object'){
        throw new TypeError("payload, 1st argument, must be an object")
    }else if(typeof duration !== 'string'){
        throw new TypeError("duration, 3rd parameter, must be a string")
    }

    const token = JWT.sign(payLoad, secret, {expiresIn: duration})
    return token
}

// EXPORTING THE TOKEN GENERATOR
module.exports = JWTGenerator
