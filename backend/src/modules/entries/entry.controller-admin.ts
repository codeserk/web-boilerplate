import { ClassSerializerInterceptor, Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { plainToClass } from 'class-transformer'

import { PaginatedOutputResponse } from '../../dto/paginated-result.response'
import { PaginationRequest } from '../../dto/pagination.reques'
import { PaginatedOutput } from '../../interfaces/pagination.types'
import { RequireRole } from '../auth/decorators/permissions.decorator'
import { PermissionsGuard } from '../auth/guards/permissions.guard'
import { UserRole } from '../users/interfaces/user.interface'
import { EntryDto, PopulatedEntryDto } from './dtos/entry.dto'
import { EntryStatsResponse } from './dtos/entry-stats.response'
import { GetEntriesRequest } from './dtos/get-entries.request'
import { EntryService } from './entry.service'
import { EntryStats } from './interfaces/entry.types'

const PaginatedEntriesResponse = PaginatedOutputResponse(PopulatedEntryDto)

@Controller('api/v1/admin/entries')
@ApiBearerAuth()
@RequireRole(UserRole.Admin)
@UseGuards(PermissionsGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('entries', 'admin')
@ApiUnauthorizedResponse({ description: 'If the user is not logged in' })
@ApiInternalServerErrorResponse({ description: 'If there is any unexpected error' })
export class EntryControllerAdmin {
  /**
   * Constructor.
   * @param service
   */
  constructor(protected readonly service: EntryService) {}

  /**
   * Gets all entires paginated.
   * @param request
   * @param pagination
   */
  @Get()
  @ApiOperation({ operationId: 'getAllEntriesPaginated', description: 'Gets all entries paginated' })
  @ApiOkResponse({ type: PaginatedEntriesResponse })
  async getAllEntriesPaginated(
    @Query() request: GetEntriesRequest,
    @Query() pagination: PaginationRequest,
  ): Promise<PaginatedOutput<EntryDto>> {
    const result = await this.service.findMultiplePaginated(request, pagination)

    return plainToClass(PaginatedEntriesResponse, result)
  }

  /**
   * Gets stats for the entries
   */
  @Get('stats')
  @ApiOperation({ operationId: 'getEntryStats', description: 'Gets stats for the entries' })
  @ApiOkResponse({ type: EntryStatsResponse })
  async getEntryStats(): Promise<EntryStats> {
    const stats = await this.service.calculateStats()

    return plainToClass(EntryStatsResponse, stats)
  }
}
