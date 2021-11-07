import { ApiPropertyOptional } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsDateString, IsOptional } from 'class-validator'

@Exclude()
export class GetEntriesRequest {
  @ApiPropertyOptional({ description: 'Initial date from which should look for entries', type: Date })
  @IsOptional()
  @IsDateString()
  @Expose()
  readonly fromDate?: Date

  @ApiPropertyOptional({ description: 'Final date before which should look for entries', type: Date })
  @IsOptional()
  @IsDateString()
  @Expose()
  readonly toDate?: Date
}
