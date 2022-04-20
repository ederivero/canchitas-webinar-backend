import { IsString, IsUUID, Matches } from 'class-validator'
import { BaseDto } from '../../base.dto'

export class BookingDto extends BaseDto {
  @IsString()
  readonly day: Date

  @IsString()
  @Matches(/([0-9][0-9]:[0-9][0-9])/)
  readonly dtStart: string

  @IsString()
  @Matches(/([0-9][0-9]:[0-9][0-9])/)
  readonly dtEnd: string

  @IsUUID()
  readonly placeId: string
}
