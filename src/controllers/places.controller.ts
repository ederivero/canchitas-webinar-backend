import { Request, Response } from 'express'
import { PlacesService } from '../services/place.service'

export async function getPlaces(req: Request, res: Response): Promise<void> {
  const { page, perPage } = req.query

  const result = PlacesService.getPlaces({
    page: page ? +page : 1,
    perPage: perPage ? +perPage : 10,
  })
  res.status(200).json(result)
}
