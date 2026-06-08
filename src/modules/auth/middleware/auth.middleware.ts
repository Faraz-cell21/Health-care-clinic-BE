import {
    NextFunction,
    Response,
  } from 'express';
  
  import { AppError } from '../../../common/errors/app-error';
  
  import { AuthRequest } from '../types/auth-request';
  import { verifyAccessToken } from '../utils/jwt';
  
  export const authenticate =
    (
      req: AuthRequest,
      _res: Response,
      next: NextFunction,
    ): void => {
      const authorization =
        req.headers.authorization;
  
      if (
        !authorization ||
        !authorization.startsWith(
          'Bearer ',
        )
      ) {
        next(
          new AppError(
            'Authentication required',
            401,
          ),
        );
  
        return;
      }
  
      const token =
        authorization.replace(
          'Bearer ',
          '',
        );
  
      try {
        const payload =
          verifyAccessToken(
            token,
          );
  
        req.user = payload;
  
        next();
      } catch {
        next(
          new AppError(
            'Invalid token',
            401,
          ),
        );
      }
    };