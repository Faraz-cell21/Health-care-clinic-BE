import { Schema } from 'mongoose';

export const baseSchemaOptions = {
  timestamps: true,

  versionKey: false,

  toJSON: {
    virtuals: true,

    transform: (
      _doc: unknown,
      ret: Record<string, unknown>,
    ) => {
      ret.id = ret._id;

      delete ret._id;

      return ret;
    },
  },

  toObject: {
    virtuals: true,
  },
} as const;

export const addAuditFields = (
  schema: Schema,
): void => {
  schema.add({
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  });
};