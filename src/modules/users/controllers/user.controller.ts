import { Request, Response } from 'express';
import { sendResponse } from '../../../common/utils/api-response';
import { UserService } from '../services/user.service';

const userService = new UserService();

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result =
    await userService.createUser(
      req.body,
    );

  sendResponse(
    res,
    201,
    result,
    'User created successfully',
  );
};

export const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result =
    await userService.getUserById(
      req.params.id as string,
    );

  sendResponse(
    res,
    200,
    result,
    'User fetched successfully',
  );
};

export const listUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result =
    await userService.listUsers({
      page: Number(
        req.query.page ?? 1,
      ),

      limit: Number(
        req.query.limit ?? 10,
      ),

      search:
        req.query.search as
          | string
          | undefined,

      roleId:
        req.query.roleId as
          | string
          | undefined,

      isActive:
        req.query.isActive as
          | string
          | undefined,
    });

  sendResponse(
    res,
    200,
    result,
    'Users fetched successfully',
  );
};