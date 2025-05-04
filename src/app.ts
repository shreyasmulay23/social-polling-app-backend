import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import { errorMiddleware } from './middlewares/error.middleware'
import { loggerMiddleware } from './middlewares/logger.middleware'

dotenv.config()
const app = express()

app.use(
  cors({
    origin: '*'
  })
)

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
