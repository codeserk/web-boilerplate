import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsMongoId } from 'class-validator'

@Exclude()
export class GetEntryRequest {
  @ApiProperty({ description: 'Id of the entry' })
  @IsMongoId()
  @Expose()
  readonly id: string
}
