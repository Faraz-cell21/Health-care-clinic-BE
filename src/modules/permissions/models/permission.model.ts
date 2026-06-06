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
  
  const permissionSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
  
      resource: {
        type: String,
        required: true,
        trim: true,
      },
  
      action: {
        type: String,
        required: true,
        trim: true,
      },
  
      description: {
        type: String,
        default: null,
      },
    },
    baseSchemaOptions,
  );
  
  addAuditFields(permissionSchema);
  
  permissionSchema.plugin(
    softDeletePlugin,
  );
  
  export type PermissionDocument =
    InferSchemaType<
      typeof permissionSchema
    >;
  
  export const Permission = model(
    'Permission',
    permissionSchema,
    COLLECTION_NAMES.PERMISSIONS,
  );