import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { Response } from 'express'
import { createReadStream } from 'fs'

import { Public } from '../auth/decorators/public.decorator'
import { InjectUser } from '../auth/decorators/user.decorator'
import { User } from '../users/interfaces/user.interface'
import { MediaService } from './media.service'

@Controller('api/v1/media')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('media')
@ApiUnauthorizedResponse({ description: 'If the user is not logged in' })
@ApiInternalServerErrorResponse({ description: 'If there is any unexpected error' })
export class MediaController {
  /**
   * Constructor.
   * @param service
   */
  constructor(protected readonly service: MediaService) {}

  /**
   * Returns the file stream for file
   * @param res
   * @param id
   */
  @Get(':id')
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  @ApiNotFoundResponse({ description: 'If the image is not found' })
  async getFile(@Res() res: Response, @Param('id') id: string): Promise<void> {
    const media = await this.service.getMedia(id)
    if (!media) {
      throw new NotFoundException()
    }

    res.set({
      'Content-Type': 'image/png',
    })

    const file = createReadStream(media.path)
    file.pipe(res)
  }

  /**
   * Uploads a file
   * @param user
   * @param file
   */
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiCreatedResponse({ description: 'Id of the created media item', type: String })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@InjectUser() user: User, @UploadedFile() file: Express.Multer.File): Promise<string> {
    const newFile = await this.service.saveFile(user, file.buffer)

    return newFile?.id
  }
}
