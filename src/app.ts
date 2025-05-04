import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import { errorMiddleware } from './middlewares/error.middleware'
import { loggerMiddleware } from './middlewares/logger.middleware'

dotenv.config()
const app = express()

const isProduction = process.env.NODE_ENV === 'production'

// Configure CORS properly for production
const corsOptions = {
  origin: ['*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}

app.use(isProduction ? cors(corsOptions) : cors())

app.use(express.json())
app.use(loggerMiddleware)
app.use('/api/auth', authRoutes)
app.use(errorMiddleware)

app.get('/', (_req, res) => {
  res.json({ message: 'Hello World!' })
})

app.get('/test-cors', (_req, res) => {
  res.json({ message: 'CORS test successful' })
})

export default app
