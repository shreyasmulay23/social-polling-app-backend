import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import pollsRoutes from './routes/polls.routes'
import voteRoutes from './routes/votes.routes'
import { errorMiddleware } from './middlewares/error.middleware'
import { loggerMiddleware } from './middlewares/logger.middleware'

const app = express()

app.use(cors({ origin: '*' }))

app.use(express.json())
app.use(loggerMiddleware)
app.use('/api/auth', authRoutes)
app.use('/api/polls', pollsRoutes)
app.use('/api/votes', voteRoutes)
app.use(errorMiddleware)

app.get('/', (_req, res) => {
  res.json({ message: 'Hello World!' })
})

app.get('/test-cors', (_req, res) => {
  res.json({ message: 'CORS test successful' })
})

export default app
