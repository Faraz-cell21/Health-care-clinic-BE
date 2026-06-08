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
  import '../../permissions/models/permission.model';
  
  const roleSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
  
      description: {
        type: String,
        default: null,
      },
  
      permissions: [
        {
          type: Schema.Types.ObjectId,
  
          ref: 'Permission',
  
          required: true,
        },
      ],
    },
    baseSchemaOptions,
  );
  
  addAuditFields(roleSchema);
  
  roleSchema.plugin(
    softDeletePlugin,
  );
  
  export type RoleDocument =
    InferSchemaType<typeof roleSchema>;
  
  export const Role = model(
    'Role',
    roleSchema,
    COLLECTION_NAMES.ROLES,
  );