import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { login, logout } from '../controllers/auth.controller'

const router = express.Router()

export function authRoutes(): Router {
  router.post('/login', asyncHandler(login))
  router.post('/logout', asyncHandler(logout))
  return router
}
