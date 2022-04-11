import { Place, Prisma } from '@prisma/client'
import { Exclude, Expose } from 'class-transformer'
import { AttachmentDto } from '../../attachments/respose/attachment.dto'

@Exclude()
export class PlaceDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly name: string

  @Expose()
  readonly direction: string

  @Expose()
  readonly latitude: number

  @Expose()
  readonly longitud: number

  @Expose()
  readonly aditionalData: Prisma.JsonValue

  @Expose()
  readonly attachment: AttachmentDto
}
