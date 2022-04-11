import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class BookResponseDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly day: Date

  @Expose()
  readonly dtStart: Date

  @Expose()
  readonly dtEnd: Date

  @Expose()
  readonly placeId: string
}
