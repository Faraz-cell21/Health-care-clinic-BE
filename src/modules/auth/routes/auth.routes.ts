import { Router } from 'express';
import { asyncHandler } from '../../../common/handlers/async-handler';
import { validate } from '../../../common/middleware/validate.middleware';
import { LoginSchema } from '../schemas/login.schema';
import { login, logout, logoutAll, me, refreshToken } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', validate(LoginSchema), asyncHandler(login));
  
  router.post('/refresh-token', asyncHandler(refreshToken));
  
  router.post('/logout', asyncHandler(logout));

  router.get('/me', authenticate, asyncHandler(me));

  router.post('/logout-all', authenticate, asyncHandler(logoutAll));
  
  export default router;