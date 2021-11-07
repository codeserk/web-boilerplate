import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsDateString, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'

import { EntryParams } from '../interfaces/entry.interface'

@Exclude()
export class EntryParamsRequest implements Omit<EntryParams, 'userId'> {
  @ApiProperty({ description: 'Title of the entry', example: 'Lunch at the office' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  readonly title: string

  @ApiProperty({
    description: 'Description of the entry.',
    example: 'I had lunch at the office with all my colleagues',
  })
  @IsString()
  @IsNotEmpty()
  @Expose()
  readonly description: string

  @ApiPropertyOptional({ description: 'ID of the image.', example: '617ebbfb27b32a444bf05ec5' })
  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly image: string

  @ApiProperty({ description: 'Date when the entry was added.', type: Date })
  @IsDateString()
  @IsNotEmpty()
  @Expose()
  readonly date: Date
}
