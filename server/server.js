// IMPORTING NECESSARY LIBRARIES AND MIDDLEWARES
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const eventLogger = require('./middleware/eventLogger')
const rootRouter = require('./routers/rootRouter')

// INITIATING EXPRESS APP WITH OTHER LIBRARIES
const app = express()
dotenv.config()

// NON-ROUTE MIDDLEWARES
app.use(cors())
app.use(express.json())

// ROUTE MIDDLEWARES
app.use("/", rootRouter)