import bcrypt from 'bcryptjs';
import {
  HydratedDocument,
  Model,
  Schema,
  Types,
  model,
} from 'mongoose';

import {
  addAuditFields,
  baseSchemaOptions,
} from '../../../database/base.schema';
import { COLLECTION_NAMES } from '../../../database/constants/collection-names';
import { softDeletePlugin } from '../../../database/plugins/soft-delete.plugin';
import '../../roles/models/role.model';
import { USER_TYPES } from '../constants/user-role.constants';

export interface IUserMethods {
  comparePassword(
    password: string,
  ): Promise<boolean>;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string | null;
  userType: string;
  role: Types.ObjectId;
  isActive: boolean;
  lastLoginAt?: Date | null;
}

type UserModel = Model<
  IUser,
  Record<string, never>,
  IUserMethods
>;

export type UserDocument =
  HydratedDocument<
    IUser,
    IUserMethods
  >;

const userSchema = new Schema<
  IUser,
  UserModel,
  IUserMethods
>(
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

userSchema.pre(
  'save',
  async function () {
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

userSchema.methods.comparePassword =
  async function (
    password: string,
  ): Promise<boolean> {
    return bcrypt.compare(
      password,
      this.password,
    );
  };

export const User =
  model<
    IUser,
    UserModel
  >(
    'User',
    userSchema,
    COLLECTION_NAMES.USERS,
  );