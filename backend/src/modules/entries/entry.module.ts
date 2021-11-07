import { Module } from '@nestjs/common'

import { EntryController } from './entry.controller'
import { EntryControllerAdmin } from './entry.controller-admin'
import { EntryService } from './entry.service'

@Module({
  controllers: [EntryController, EntryControllerAdmin],
  providers: [EntryService],
  exports: [EntryService],
})
export class EntryModule {}
