import { Response } from 'express';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  data?: T,
  message?: string,
): void => {
  const response: ApiResponse<T> = {
    success: true,
    message: message || '',
    data,
  };
  res.status(statusCode).json(response);
};
