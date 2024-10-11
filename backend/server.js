// backend/server.js
import express from 'express'
import locationRoutes from './routes/locationRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import helmet from 'helmet'
import compression from 'compression'
import errorHandler from './middleware/errorHandler.js'
import cors from 'cors'

const app = express()

app.use(helmet()) // Secure HTTP headers
app.use(cors()) // Enable CORS for all requests
app.use(compression()) // Enables gzip compression for all responses, reducing response size
app.use(express.json()) // Parse JSON bodies from requests
app.use(express.urlencoded({ extended: true })) // Parse complex form bodies from requests, makes the data available in req.body

// location routes
app.use('/locations', locationRoutes)

// event routes
app.use('/locations/:locationId/events', eventRoutes)

// Error handler middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})