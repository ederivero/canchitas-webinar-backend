import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import {
  me,
  updateMe,
  create,
  find,
  deleteAdmin,
  update,
  findOne,
} from '../controllers/admins.controller'
import { adminValidator, authValidator } from '../utils/auth-guard'

const router = express.Router()
export function adminsRoutes(): Router {
  router
    .route('/me')
    .all(asyncHandler(authValidator), asyncHandler(adminValidator))
    .get(asyncHandler(me))
    .patch(asyncHandler(updateMe))

  router
    .route('')
    .all(asyncHandler(authValidator), asyncHandler(adminValidator))
    .post(asyncHandler(create))
    .get(asyncHandler(find))

  router
    .route('/:uuid')
    .all(asyncHandler(authValidator), asyncHandler(adminValidator))
    .get(asyncHandler(findOne))
    .delete(asyncHandler(deleteAdmin))
    .patch(asyncHandler(update))

  return router
}
