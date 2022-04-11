import express, { Router } from 'express'
import { adminsRoutes } from './routes/admin.route'
import { authRoutes } from './routes/auth.route'
import { bookingRoutes } from './routes/booking.route'
import { placesRoutes } from './routes/place.route'
import { userRoutes } from './routes/user.route'

const expressRouter = express.Router()

export function router(app: Router): Router {
  app.use('/api/v1/admins', adminsRoutes())
  app.use('/api/v1/auth', authRoutes())
  app.use('/api/v1/booking', bookingRoutes())
  app.use('/api/v1/place', placesRoutes())
  app.use('/api/v1/users', userRoutes())

  return expressRouter
}
