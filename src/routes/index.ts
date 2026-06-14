import { Router } from 'express';
import healthRouter from '../modules/health/routes/health.routes';
import swaggerRouter from './swagger.route';
import authRouter from '../modules/auth/routes/auth.routes';
import userRouter from '../modules/users/routes/user.routes';

const router = Router();

router.use('/health', healthRouter);
router.use('/docs', swaggerRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;
