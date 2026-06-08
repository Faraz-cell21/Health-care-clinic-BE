import {
    NextFunction,
    Response,
  } from 'express';
  
  import { AppError } from '../../../common/errors/app-error';
  
  import { AuthRequest } from '../types/auth-request';
  
  export const requirePermission =
    (
      permission: string,
    ) =>
    async (
      req: AuthRequest,
      _res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const permissions =
        (req.user as any)
          ?.permissions ?? [];
  
      const hasPermission =
        permissions.some(
          (
            item: string,
          ) =>
            item === permission,
        );
  
      if (
        !hasPermission
      ) {
        next(
          new AppError(
            'Forbidden',
            403,
          ),
        );
  
        return;
      }
  
      next();
    };