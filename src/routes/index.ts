import { Router } from 'express';
import healthRouter from '../modules/health/routes/health.routes';
import swaggerRouter from './swagger.route';

const router = Router();

router.use('/health', healthRouter);
router.use('/docs', swaggerRouter);

export default router;
