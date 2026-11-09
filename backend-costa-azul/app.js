import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import reservationRoutes from './routes/reservationRoutes.js'
import locationRoutes from './routes/locationRoutes.js'

const app = express()

const corsOptions = {
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
    : ['http://localhost:3000'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
}

app.use(morgan('dev'))
app.use(cors(corsOptions))
app.options('/{*path}', cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/reservas', reservationRoutes)
app.use('/api/sedes', locationRoutes)

export default app
