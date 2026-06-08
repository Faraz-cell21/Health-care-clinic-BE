import {
    Request,
    Response,
  } from 'express';
  
  import { sendResponse } from '../../../common/utils/api-response';
  
  import { AuthService } from '../services/auth.service';
  
  const authService =
    new AuthService();
  
  export const login =
    async (
      req: Request,
      res: Response,
    ): Promise<void> => {
      const result =
        await authService.login(
          req.body.email,
          req.body.password,
          req.ip,
          req.get(
            'user-agent',
          ),
        );
  
      sendResponse(
        res,
        200,
        result,
        'Login successful',
      );
    };
  
  export const refreshToken =
    async (
      req: Request,
      res: Response,
    ): Promise<void> => {
      const result =
        await authService.refreshToken(
          req.body.refreshToken,
        );
  
      sendResponse(
        res,
        200,
        result,
        'Token refreshed',
      );
    };
  
  export const logout =
    async (
      req: Request,
      res: Response,
    ): Promise<void> => {
      await authService.logout(
        req.body.refreshToken,
      );
  
      sendResponse(
        res,
        200,
        'Logout successful',
      );
    };