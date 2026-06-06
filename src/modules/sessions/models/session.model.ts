import {
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
  
  const sessionSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
      },
  
      refreshToken: {
        type: String,
        required: true,
      },
  
      ipAddress: {
        type: String,
        default: null,
      },
  
      userAgent: {
        type: String,
        default: null,
      },
  
      expiresAt: {
        type: Date,
        required: true,
        index: true,
      },
  
      lastUsedAt: {
        type: Date,
        default: Date.now,
      },
    },
    baseSchemaOptions,
  );
  
  addAuditFields(sessionSchema);
  
  sessionSchema.plugin(
    softDeletePlugin,
  );
  
  export type SessionDocument =
    InferSchemaType<
      typeof sessionSchema
    >;
  
export const Session = model(
  'Session',
  sessionSchema,
  COLLECTION_NAMES.SESSIONS,
);