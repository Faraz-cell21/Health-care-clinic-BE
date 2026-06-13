import { Types } from 'mongoose';

import { User } from '../models/user.model';

export type UserFilter = {
  $or?: Array<
    Partial<{
      firstName: {
        $regex: string;
        $options?: string;
      };
      lastName: {
        $regex: string;
        $options?: string;
      };
      email: {
        $regex: string;
        $options?: string;
      };
    }>
  >;
  role?: string | Types.ObjectId;
  isActive?: boolean;
};

export class UserRepository {
  async create(
    data: Record<string, unknown>,
  ) {
    return User.create(data);
  }

  async findById(
    id: string,
  ) {
    return User.findById(id)
      .populate({
        path: 'role',
        populate: {
          path: 'permissions',
        },
      });
  }

  async findByEmail(
    email: string,
  ) {
    return User.findOne({
      email,
    })
      .select('+password')
      .populate({
        path: 'role',
        populate: {
          path: 'permissions',
        },
      });
  }

  async existsByEmail(
    email: string,
  ) {
    return User.exists({
      email,
    });
  }

  async findMany(
    filter: UserFilter,
    page: number,
    limit: number,
  ) {
    const skip =
      (page - 1) * limit;

    const [items, total] =
      await Promise.all([
        User.find(filter)
          .populate('role')
          .skip(skip)
          .limit(limit)
          .sort({
            createdAt: -1,
          }),

        User.countDocuments(
          filter,
        ),
      ]);

    return {
      items,
      total,
    };
  }

  async update(
    id: string,
    data: Record<
      string,
      unknown
    >,
  ) {
    return User.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      },
    );
  }

  async updateLastLogin(
    userId: string,
  ) {
    return User.findByIdAndUpdate(
      userId,
      {
        lastLoginAt:
          new Date(),
      },
      {
        new: true,
      },
    );
  }

  async softDelete(
    userId: string,
  ) {
    return User.findByIdAndUpdate(
      userId,
      {
        deletedAt:
          new Date(),
      },
      {
        new: true,
      },
    );
  }

  async incrementFailedLogin(
    userId: string,
  ) {
    return User.findByIdAndUpdate(
      userId,
      {
        $inc: {
          failedLoginAttempts: 1,
        },
      },
      {
        new: true,
      },
    );
  }

  async lockAccount(
    userId: string,
    lockedUntil: Date,
  ) {
    return User.findByIdAndUpdate(
      userId,
      {
        lockedUntil,
      },
      {
        new: true,
      },
    );
  }

  async resetFailedLogin(
    userId: string,
  ) {
    return User.findByIdAndUpdate(
      userId,
      {
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
      {
        new: true,
      },
    );
  }
}