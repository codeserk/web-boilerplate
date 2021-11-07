import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose, Type } from 'class-transformer'
import { IsPositive, Min } from 'class-validator'

import { PaginationInput } from '../interfaces/pagination.types'

@Exclude()
export class PaginationRequest implements PaginationInput {
  @ApiProperty({ description: 'Requested page', minimum: 0, example: 0 })
  @Min(0)
  @Type(() => Number)
  @Expose()
  readonly page: number

  @ApiProperty({ description: 'Max number of items', minimum: 1, example: 10 })
  @IsPositive()
  @Type(() => Number)
  @Expose()
  readonly limit: number
}
