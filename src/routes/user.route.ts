import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { registerUser } from '../controllers/user.controller'

const router = express.Router()

export function userRoutes(): Router {
  router.post('/register', asyncHandler(registerUser))
  return router
}
