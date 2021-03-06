import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import {
  booksByPlace,
  createBook,
  userBooks,
} from '../controllers/booking.controller'
import { registerUser } from '../controllers/user.controller'
import { authValidator, userValidator } from '../utils/auth-guard'

const router = express.Router()

export function bookingRoutes(): Router {
  router.post(
    '',
    asyncHandler(authValidator),
    asyncHandler(userValidator),
    asyncHandler(createBook),
  )

  router.get(
    '/:placeId',
    asyncHandler(authValidator),
    asyncHandler(userValidator),
    asyncHandler(booksByPlace),
  )

  router.get(
    '/users/bookings',
    asyncHandler(authValidator),
    asyncHandler(userValidator),
    asyncHandler(userBooks),
  )

  return router
}
