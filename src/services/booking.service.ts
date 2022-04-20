import { plainToClass, plainToInstance } from 'class-transformer'
import { BookingDto } from '../dtos/bookings/request/booking.dto'
import { SearchBookDto } from '../dtos/bookings/request/search-book.dto'
import { BookResponseDto } from '../dtos/bookings/response/book.dto'
import { prisma } from '../prisma'
import { Authenticated } from '../utils/types'
import { BadRequest } from 'http-errors'

export class BookingService {
  static async createBook(input: BookingDto, user: Authenticated) {
    const book = await prisma.booking.findFirst({
      where: {
        placeId: input.placeId,
        day: input.day,
        dtStart: input.dtStart,
      },
      rejectOnNotFound: false,
    })

    if (book) {
      throw new BadRequest(`This place has already a booking for that hours`)
    }

    const newBook = await prisma.booking.create({
      data: { ...input, userId: user.id },
    })

    return plainToClass(BookResponseDto, newBook)
  }

  static async booksByPlace(placeId: string) {
    const books = await prisma.booking.findMany({ where: { placeId } })

    return plainToInstance(BookResponseDto, books)
  }

  static async userBooks(user: Authenticated) {
    const books = await prisma.booking.findMany({ where: { userId: user.id } })

    return plainToInstance(BookResponseDto, books)
  }
}
