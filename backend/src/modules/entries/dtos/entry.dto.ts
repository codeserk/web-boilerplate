import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Exclude, Expose, Transform, Type } from 'class-transformer'

import { UserDto } from '../../users/dtos/user.dto'
import { User } from '../../users/interfaces/user.interface'
import { Entry } from '../interfaces/entry.interface'

@Exclude()
/** Entry dto */
export class EntryDto implements Entry {
  @ApiProperty({ description: "Entry's id.", example: '6179d0975632c1470ebd22cb' })
  @Expose()
  readonly id: string

  @ApiProperty({ description: 'Id of the user that has created the entry.', example: '6179d0975632c1470ebd22ca' })
  @Transform(({ value }) => value?._id?.toString() ?? value?.toString())
  @Expose()
  readonly userId: string

  @ApiProperty({ description: 'Title of the entry', example: 'Lunch at the office' })
  @Expose()
  readonly title: string

  @ApiProperty({
    description: 'Description of the entry.',
    example: 'I had lunch at the office with all my colleagues',
  })
  @Expose()
  readonly description: string

  @ApiPropertyOptional({
    description: 'URI of the attached image',
    example: '/api/v1/media/617ebbfb27b32a444bf05ec5',
  })
  @Transform(({ value }) => (value ? `/api/v1/media/${value}` : undefined), {
    toPlainOnly: true,
  })
  @Expose()
  readonly image?: string

  @ApiProperty({ description: 'Date when the entry was added.' })
  @Expose()
  readonly date: Date
}

@Exclude()
export class PopulatedEntryDto extends EntryDto {
  @ApiProperty({ description: 'User that added the entry', type: UserDto })
  @Type(() => UserDto)
  @Expose()
  readonly user: User
}
