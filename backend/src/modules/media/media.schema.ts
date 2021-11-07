import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, LeanDocument, Model } from 'mongoose'
import * as mongoose from 'mongoose'

import { UserEntity } from '../users/user.schema'

/** The class for defining the schema. */
@Schema({ timestamps: true, toObject: { virtuals: true } })
export class MediaEntity {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: UserEntity.name, index: true, sparse: true })
  readonly userId: mongoose.ObjectId

  @Prop({ required: true })
  path: string
}

/** The Media mongo schema. */
export const MediaSchema = SchemaFactory.createForClass(MediaEntity)

/** The Media document. */
export type MediaDocument = MediaEntity & Document

/** The Media model. */
export type MediaModel = Model<MediaDocument>

// eslint-disable-next-line require-jsdoc
export const InjectMediaModel = (): any => InjectModel(MediaEntity.name)

/** The Media object from the database */
export type MediaObject = LeanDocument<MediaDocument>
