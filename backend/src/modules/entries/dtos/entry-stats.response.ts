import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

import { EntryStats, EntryStatsQuantity, EntryStatsWeekComparison } from '../interfaces/entry.types'

@Exclude()
export class EntryStatsQuantityResponse implements EntryStatsQuantity {
  @ApiProperty({ description: 'Stats date' })
  @Expose()
  readonly date: Date

  @ApiProperty({ description: 'Quantity of entries created per day (from all the users)', example: '100' })
  @Expose()
  readonly quantity: number
}

@Exclude()
export class EntryStatsWeekComparisonResponse implements EntryStatsWeekComparison {
  @ApiProperty({ description: 'Entries created in the previous 7 days', example: 10 })
  @Expose()
  readonly previous7Days: number

  @ApiProperty({ description: 'Entries created in the last 7 days', example: 16 })
  @Expose()
  readonly last7Days: number
}

@Exclude()
export class EntryStatsResponse implements EntryStats {
  @ApiProperty({
    description: 'Quantity of entries created per day (from all the users)',
    type: EntryStatsQuantityResponse,
    isArray: true,
  })
  @Expose()
  readonly entriesPerDay: EntryStatsQuantity[]

  @ApiProperty({
    description: 'Quantity of entries created previous 7 days compared to the entries created last 7 days ',
    type: EntryStatsWeekComparisonResponse,
  })
  @Expose()
  readonly entriesWeekComparison: EntryStatsWeekComparison
}
