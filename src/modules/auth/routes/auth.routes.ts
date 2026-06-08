import { Router } from 'express';
import { asyncHandler } from '../../../common/handlers/async-handler';
import { validate } from '../../../common/middleware/validate.middleware';
import { LoginSchema } from '../schemas/login.schema';
import { login, logout, refreshToken } from '../controllers/auth.controller';

const router = Router();

router.post('/login', validate(LoginSchema), asyncHandler(login));
  
  router.post('/refresh-token', asyncHandler(refreshToken));
  
  router.post('/logout', asyncHandler(logout));
  
  export default router;