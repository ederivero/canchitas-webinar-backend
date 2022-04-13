import { DayOfWeek } from '@prisma/client'
import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class ScheduleDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly day: DayOfWeek

  @Expose()
  readonly dtStart: string

  @Expose()
  readonly dtEnd: string

  @Expose()
  readonly placeId: string
}
