import { Router } from 'express';

import { asyncHandler } from '../../../common/handlers/async-handler';
import { validate } from '../../../common/middleware/validate.middleware';

import { authenticate } from '../../auth/middleware/auth.middleware';

import {
  createUser,
  getUserById,
  listUsers,
} from '../controllers/user.controller';

import { createUserSchema } from '../schemas/create-user.schema';
import { listUsersSchema } from '../schemas/list-users.schema';
import { userIdSchema } from '../schemas/user-id.schema';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  validate(listUsersSchema),
  asyncHandler(listUsers),
);

router.get(
  '/:id',
  validate(userIdSchema),
  asyncHandler(getUserById),
);

router.post(
  '/',
  validate(createUserSchema),
  asyncHandler(createUser),
);

export default router;