import { Exclude, Expose, Transform } from 'class-transformer'

@Exclude()
export class AdminDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly fullName: string

  @Expose()
  readonly email: string

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly createdAt: Date
}
