import { plainToInstance } from 'class-transformer'
import { PlaceDto } from '../dtos/places/response/place.dto'
import { prisma } from '../prisma'
import { getPagination, SkipAndTake } from '../utils/pagination'
import { AttachmentService } from './attachment.service'

export class PlacesService {
  static async getPlaces({ page = 1, perPage = 10 }) {
    const { skip } = SkipAndTake({ page, perPage })

    const [count, places] = await Promise.all([
      prisma.place.count(),
      prisma.place.findMany({
        skip,
        take: perPage,
        include: { schedules: true, attachment: true },
      }),
    ])

    const placesWithSignedUrl = places.map((place) => ({
      ...place,
      image: place.attachment
        ? {
            ...place.attachment,
            signedUrl: AttachmentService.getSignedUrl(
              `${place.attachment.path}/${place.attachment.key}.${place.attachment.ext}`,
            ),
          }
        : undefined,
    }))

    const placesClass = plainToInstance(PlaceDto, placesWithSignedUrl)

    return {
      places: placesClass,
      pagination: getPagination({ page, perPage }, count),
    }
  }
}
