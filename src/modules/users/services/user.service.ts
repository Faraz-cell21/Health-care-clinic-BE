import { AppError } from '../../../common/errors/app-error';
import { generatePassword } from '../../../common/utils/generate-password';

import { Role } from '../../roles/models/role.model';

import { toUserResponse } from '../mappers/user.mapper';
import {
  UserRepository,
  type UserFilter,
} from '../repositories/user.repository';

export class UserService {
  private readonly userRepository =
    new UserRepository();

  async createUser(
    payload: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber?: string;
      userType: string;
      roleId: string;
    },
  ) {
    const emailExists =
      await this.userRepository.existsByEmail(
        payload.email,
      );

    if (emailExists) {
      throw new AppError(
        'Email already exists',
        409,
      );
    }

    const role =
      await Role.findById(
        payload.roleId,
      );

    if (!role) {
      throw new AppError(
        'Role not found',
        404,
      );
    }

    const temporaryPassword =
      generatePassword();

    const user =
      await this.userRepository.create(
        {
          firstName:
            payload.firstName,

          lastName:
            payload.lastName,

          email:
            payload.email,

          phoneNumber:
            payload.phoneNumber,

          userType:
            payload.userType,

          role:
            payload.roleId,

          password:
            temporaryPassword,
        },
      );

    return {
      user:
        toUserResponse(
          user,
        ),

      temporaryPassword,
    };
  }

  async getUserById(
    userId: string,
  ) {
    const user =
      await this.userRepository.findById(
        userId,
      );

    if (!user) {
      throw new AppError(
        'User not found',
        404,
      );
    }

    return toUserResponse(
      user,
    );
  }

  async listUsers(
    query: {
      page: number;
      limit: number;
      search?: string;
      roleId?: string;
      isActive?: string;
    },
  ) {
    const filter: UserFilter = {};

    if (
      query.search
    ) {
      filter.$or = [
        {
          firstName: {
            $regex:
              query.search,
            $options: 'i',
          },
        },

        {
          lastName: {
            $regex:
              query.search,
            $options: 'i',
          },
        },

        {
          email: {
            $regex:
              query.search,
            $options: 'i',
          },
        },
      ];
    }

    if (
      query.roleId
    ) {
      filter.role =
        query.roleId;
    }

    if (
      query.isActive
    ) {
      filter.isActive =
        query.isActive ===
        'true';
    }

    const result =
      await this.userRepository.findMany(
        filter,
        query.page,
        query.limit,
      );

    return {
      items:
        result.items.map(
          toUserResponse,
        ),

      pagination: {
        page:
          query.page,

        limit:
          query.limit,

        total:
          result.total,

        totalPages:
          Math.ceil(
            result.total /
              query.limit,
          ),
      },
    };
  }
}