import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, LeanDocument, Model } from 'mongoose'

import { UserRole } from './interfaces/user.interface'

/** The user class for defining the schema. */
@Schema({ timestamps: true, toObject: { virtuals: true } })
export class UserEntity {
  @Prop({ required: true, unique: true })
  readonly username!: string

  @Prop({ required: true })
  password!: string

  @Prop({ required: true })
  readonly role: UserRole
}

/** The user mongo schema. */
export const UserSchema = SchemaFactory.createForClass(UserEntity)

/** The user document. */
export type UserDocument = UserEntity & Document

/** The user model. */
export type UserModel = Model<UserDocument>

// eslint-disable-next-line require-jsdoc
export const InjectUserModel = (): any => InjectModel(UserEntity.name)

/** The user object from the database without the password. */
export type UserObject = LeanDocument<Omit<UserDocument, 'password'>>
