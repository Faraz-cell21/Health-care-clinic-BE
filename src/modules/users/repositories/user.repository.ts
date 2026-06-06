import { User } from '../models/user.model';

export class UserRepository {
  async create(data: Record<string, unknown>) {
    return User.create(data);
  }

  async findById(id: string) {
    return User.findById(id)
      .populate('role');
  }

  async findByEmail(email: string) {
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

  async findAll() {
    return User.find()
      .populate('role');
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
}