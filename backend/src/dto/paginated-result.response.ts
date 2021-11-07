import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose, Type } from 'class-transformer'

export type ClassType<T = any> = new (...args: any[]) => T

/**
 * Returns class that extends pagination output
 * @param ItemClass
 * @returns extended class
 */
export function PaginatedOutputResponse<T extends ClassType>(ItemClass: T): any {
  @Exclude()
  class PaginatedResultResponse {
    @ApiProperty({ description: 'Requested page', example: 1 })
    @Expose()
    readonly page: number

    @ApiProperty({ description: 'Max number of entries', example: 10 })
    @Expose()
    readonly limit?: number

    @ApiProperty({ description: 'Items found in the page', type: () => ItemClass, isArray: true })
    @Type(() => ItemClass)
    @Expose()
    readonly items: typeof ItemClass[]

    @ApiProperty({ description: 'Total number of pages', example: 5 })
    @Expose()
    readonly pages: number

    @ApiProperty({ description: 'Total number of items', example: 5 })
    @Expose()
    readonly count: number
  }

  return PaginatedResultResponse
}
