import express, { Router } from 'express'

const expressRouter = express.Router()

export function router(app: Router): Router {
  return expressRouter
}
