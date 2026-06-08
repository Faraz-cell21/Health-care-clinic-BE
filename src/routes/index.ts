import { Router } from 'express';
import healthRouter from '../modules/health/routes/health.routes';
import swaggerRouter from './swagger.route';
import authRouter from '../modules/auth/routes/auth.routes';

const router = Router();

router.use('/health', healthRouter);
router.use('/docs', swaggerRouter);
router.use('/auth', authRouter);

export default router;
