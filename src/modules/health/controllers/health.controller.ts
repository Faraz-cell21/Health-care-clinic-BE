import { Request, Response } from 'express';

import { getDatabaseHealth } from '../../../config/database/database-health';
import { sendResponse } from '../../../common/utils/api-response';

export const getHealth = (
  _req: Request,
  res: Response,
): void => {
  sendResponse(
    res,
    200,
    {
      database: getDatabaseHealth(),
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
    'Server is healthy',
  );
};