import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { BookingDto } from '../dtos/bookings/request/booking.dto'
import { BookingService } from '../services/booking.service'
import { Authenticated } from '../utils/types'

export async function createBook(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(BookingDto, req.body)
  await dto.isValid()

  const result = await BookingService.createBook(dto, req.user as Authenticated)
  res.status(201).json(result)
}

export async function booksByPlace(req: Request, res: Response): Promise<void> {
  const { placeId } = req.params
  const result = await BookingService.booksByPlace(placeId)

  res.status(200).json(result)
}

export async function userBooks(req: Request, res: Response): Promise<void> {
  const result = await BookingService.userBooks(req.user as Authenticated)
  res.status(200).json(result)
}
