// IMPORTING NECESSARY LIBRARY MODULES
const fs = require('fs')
const path = require('path')
const {format} = require('date-fns')
const {v4: uuid} = require('uuid')
const fsPromises = require('fs').promises

// A FUNCTION THAT LOGS OUT MESSAGES IN A SPECIFIED FORMAT AND SAVES THEM IN THE LOGS FOLDER UNDER SPECIFIED FILE NAMES
async function eventLogger(message1, message2, fileName){
    const dateTime = `${format(new Date(), "do 'of' MMM yyyy\thh:mm:ss aaaa")}`
    const loggedItem = `${dateTime}\t${uuid()}\t${message1}\t${message2}\n`

    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }

        fsPromises.appendFile(path.join(__dirname, '..', 'logs', fileName), loggedItem, "utf-8")
        console.log(loggedItem)
    }catch(error){
        const errorItem = `${dateTime}\t${uuid()}\t${error.name}\t${error.message}\n`

        try{
            if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
                fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
            }
            
            fsPromises.appendFile(path.join(__dirname, '..', 'logs', 'errorLogs.txt'), errorItem, "utf-8")
            console.log(errorItem)
        }catch(secondError){
            console.log(`${dateTime}\t${uuid()}\t${secondError.name}\t${secondError.message}\n`)
        }
    }
}

// EXPORTING EVENTLOGGER
module.exports = eventLogger