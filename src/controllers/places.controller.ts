import { Request, Response } from 'express'
import { PlacesService } from '../services/place.service'

export async function getPlaces(req: Request, res: Response): Promise<void> {
  const { page, perPage } = req.params

  const result = PlacesService.getPlaces({ page: +page, perPage: +perPage })
  res.status(200).json(result)
}
