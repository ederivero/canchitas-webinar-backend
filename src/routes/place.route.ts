import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { getPlaces } from '../controllers/places.controller'

const router = express.Router()

export function placesRoutes(): Router {
  router.route('/places').get(asyncHandler(getPlaces))

  return router
}
