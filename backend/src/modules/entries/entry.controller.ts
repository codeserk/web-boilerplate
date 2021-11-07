import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { plainToClass } from 'class-transformer'

import { InjectUser } from '../auth/decorators/user.decorator'
import { User, UserRole } from '../users/interfaces/user.interface'
import { EntryDto } from './dtos/entry.dto'
import { EntryParamsRequest } from './dtos/entry-params.request'
import { GetEntriesRequest } from './dtos/get-entries.request'
import { GetEntryRequest } from './dtos/get-entry.request'
import { EntryService } from './entry.service'
import { Entry } from './interfaces/entry.interface'

@Controller('api/v1/entries')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('entries')
@ApiUnauthorizedResponse({ description: 'If the user is not logged in' })
@ApiInternalServerErrorResponse({ description: 'If there is any unexpected error' })
export class EntryController {
  /**
   * Constructor.
   * @param service
   */
  constructor(protected readonly service: EntryService) {}

  /**
   * Creates a new diary entry.
   * @param user
   * @param request
   */
  @Post()
  @ApiOperation({ operationId: 'createEntry', description: 'Creates a new diary entry' })
  @ApiCreatedResponse({ type: EntryDto })
  async createEntry(@InjectUser() user: User, @Body() request: EntryParamsRequest): Promise<Entry> {
    const entry = await this.service.createOne({
      userId: user.id,
      ...request,
    })

    return plainToClass(EntryDto, entry)
  }

  /**
   * Gets all the entries for the connected user.
   * @param user
   * @param request
   */
  @Get()
  @ApiOperation({ operationId: 'getEntries', description: 'Gets all the entries for the connected user' })
  @ApiOkResponse({ type: EntryDto, isArray: true })
  async getEntries(@InjectUser() user: User, @Query() request: GetEntriesRequest): Promise<Entry[]> {
    const entries = await this.service.findMultiple({ userId: user.id, ...request })

    return plainToClass(EntryDto, entries)
  }

  /**
   * Gets one entry by id
   * @param user
   * @param params
   */
  @Get(':id')
  @ApiOperation({ operationId: 'getEntry', description: 'Gets one entry by id' })
  @ApiOkResponse({ type: EntryDto })
  @ApiNotFoundResponse({ description: 'If the entry is not found' })
  @ApiForbiddenResponse({ description: 'If the user does not have access to read the entry' })
  async getEntry(@InjectUser() user: User, @Param() params: GetEntryRequest): Promise<Entry> {
    const entry = await this.service.findById(params.id)
    if (!entry) {
      throw new NotFoundException()
    }
    if (user.role !== UserRole.Admin && entry.userId.toString() !== user.id) {
      throw new ForbiddenException()
    }

    return plainToClass(EntryDto, entry)
  }

  /**
   * Updates one entry by its id
   * @param user
   * @param params
   * @param request
   */
  @Put(':id')
  @ApiOperation({ operationId: 'updateEntry', description: 'Updates one entry by its id' })
  @ApiOkResponse({ type: EntryDto })
  @ApiNotFoundResponse({ description: 'If the entry is not found' })
  @ApiForbiddenResponse({ description: 'If the user does not have access to read the entry' })
  async updateEntry(
    @InjectUser() user: User,
    @Param() params: GetEntryRequest,
    @Body() request: EntryParamsRequest,
  ): Promise<Entry> {
    const entry = await this.service.findById(params.id)
    if (!entry) {
      throw new NotFoundException()
    }
    if (user.role !== UserRole.Admin && entry.userId.toString() !== user.id) {
      throw new ForbiddenException()
    }

    const updatedEntry = await this.service.updateBtId(params.id, request)

    return plainToClass(EntryDto, updatedEntry)
  }

  /**
   * Deletes one entry by its id
   * @param user
   * @param params
   * @param request
   */
  @Delete(':id')
  @ApiOperation({ operationId: 'deleteEntry', description: 'Deletes one entry by its id' })
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: 'If the entry is not found' })
  @ApiForbiddenResponse({ description: 'If the user does not have access to read the entry' })
  async deleteEntry(@InjectUser() user: User, @Param() params: GetEntryRequest): Promise<void> {
    const entry = await this.service.findById(params.id)
    if (!entry) {
      throw new NotFoundException()
    }
    if (user.role !== UserRole.Admin && entry.userId.toString() !== user.id) {
      throw new ForbiddenException()
    }

    await this.service.deleteById(params.id)
  }
}
