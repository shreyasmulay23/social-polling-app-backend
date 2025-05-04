import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import { errorMiddleware } from './middlewares/error.middleware'
import { loggerMiddleware } from './middlewares/logger.middleware'

dotenv.config()
const app = express()

// Enable CORS with default settings (allows all origins)
app.use(cors())

app.use(express.json())
app.use(loggerMiddleware)
app.use('/api/auth', authRoutes)
app.use(errorMiddleware)

export default app
