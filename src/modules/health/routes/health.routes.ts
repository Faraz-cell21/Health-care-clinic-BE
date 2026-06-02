import { Router } from 'express';
import { getHealth } from '../controllers/health.controller';
import { validate } from '../../../common/middleware/validate.middleware';
import { healthSchema } from '../schemas/health.schema';

const healthRouter = Router();

healthRouter.get('/', validate(healthSchema), getHealth);

export default healthRouter;
