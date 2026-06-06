import bcrypt from 'bcryptjs';
import {
  HydratedDocument,
  InferSchemaType,
  Schema,
  model,
} from 'mongoose';

import {
  addAuditFields,
  baseSchemaOptions,
} from '../../../database/base.schema';
import { COLLECTION_NAMES } from '../../../database/constants/collection-names';
import { softDeletePlugin } from '../../../database/plugins/soft-delete.plugin';
import { USER_TYPES } from '../constants/user-role.constants';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    phoneNumber: {
      type: String,
      default: null,
    },

    userType: {
      type: String,

      enum: Object.values(
        USER_TYPES,
      ),

      required: true,
    },

    role: {
      type: Schema.Types.ObjectId,

      ref: 'Role',

      required: true,
    },

    isActive: {
      type: Boolean,

      default: true,
    },

    lastLoginAt: {
      type: Date,

      default: null,
    },
  },
  baseSchemaOptions,
);

addAuditFields(userSchema);

userSchema.plugin(
  softDeletePlugin,
);

export type UserDocument =
  InferSchemaType<typeof userSchema>;

userSchema.pre(
  'save',
  async function (
    this: HydratedDocument<UserDocument>,
  ) {
    if (
      !this.isModified(
        'password',
      )
    ) {
      return;
    }

    this.password =
      await bcrypt.hash(
        this.password,
        12,
      );
  },
);

export const User = model(
  'User',
  userSchema,
  COLLECTION_NAMES.USERS,
);