// IMPORTING NECESSARY LIBRARIES AND MIDDLEWARES
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const eventLogger = require('./middleware/eventLogger')
const rootRouter = require('./routers/rootRouter')
const workoutsRouter = require('./routers/workoutsRouter')
const connectDB = require('./config/connectDB')

// INITIATING EXPRESS APP WITH OTHER LIBRARIES
const app = express()
dotenv.config()
connectDB()

// NON-ROUTE MIDDLEWARES
app.use(cors())
app.use(express.json())

// ROUTE MIDDLEWARES
app.use("/", rootRouter)
app.use("/workouts", workoutsRouter)

// INITIALIZING SERVER
const port = process.env.PORT_NUMBER || 4000

app.listen(port, () => eventLogger("Server activated successfully", `Server listening on port ${port}`, "eventLogs.txt"))