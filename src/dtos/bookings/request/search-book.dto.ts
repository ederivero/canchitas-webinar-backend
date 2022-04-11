import { IsUUID } from 'class-validator'
import { BaseDto } from '../../base.dto'

export class SearchBookDto extends BaseDto {
  @IsUUID()
  readonly placeId: string
}
