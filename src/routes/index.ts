import { Router } from 'express';
import healthRouter from '../modules/health/routes/health.routes';

const router = Router();

router.use('/health', healthRouter);

export default router;
