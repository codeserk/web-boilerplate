import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, LeanDocument, Model } from 'mongoose'
import * as mongoose from 'mongoose'

import { UserEntity } from '../users/user.schema'

/** The class for defining the schema. */
@Schema({ timestamps: true, toObject: { virtuals: true } })
export class EntryEntity {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: UserEntity.name, index: true, sparse: true })
  readonly userId: mongoose.ObjectId

  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  description: string

  @Prop({})
  image: string

  @Prop({ required: true, index: true, sparse: true })
  date: Date
}

/** The entry mongo schema. */
export const EntrySchema = SchemaFactory.createForClass(EntryEntity)

/** The entry document. */
export type EntryDocument = EntryEntity & Document

/** The entry model. */
export type EntryModel = Model<EntryDocument>

// eslint-disable-next-line require-jsdoc
export const InjectEntryModel = (): any => InjectModel(EntryEntity.name)

/** The entry object from the database. */
export type EntryObject = LeanDocument<EntryDocument>
