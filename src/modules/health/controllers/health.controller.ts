import { Request, Response } from 'express';
import { sendResponse } from '../../../common/utils/api-response';

export const getHealth = (_req: Request, res: Response): void => {
  sendResponse(res, 200, 'Server is healthy');
};
