import 'dotenv/config'
import express from 'express'
import { authorization } from './middleware/authorization.js'
import { callFunction } from './routes/callFunction.js'
import { docs } from './routes/docs.js'
import { errorHandler } from './middleware/errorHandler.js'
import { helloWorld } from './routes/helloWorld.js'
import { logging } from './middleware/logging.js'
import { lowerCaseHeaders } from './middleware/lowerCaseHeaders.js'

export const app = express()
app.use(express.json())

app.use(logging)
app.use(lowerCaseHeaders)

app.get(`/hello`,helloWorld)
app.get(`/getWeather/docs`,docs)
app.post(`/getWeather/function`,authorization,callFunction)

app.use(errorHandler)