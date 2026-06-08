import { env } from '../../config/env';
import { logger } from '../../common/logger/logger';
import { Role } from '../../modules/roles/models/role.model';
import { User } from '../../modules/users/models/user.model';
import { USER_TYPES } from '../../modules/users/constants/user-role.constants';

export const seedSuperAdmin =
  async (): Promise<void> => {
    logger.info(
      'Seeding super admin...',
    );

    const existingUser =
      await User.findOne({
        email:
          env.SUPER_ADMIN_EMAIL,
      });

    if (existingUser) {
      logger.info(
        'Super admin already exists',
      );

      return;
    }

    const role =
      await Role.findOne({
        name: 'SUPER_ADMIN',
      });

    if (!role) {
      throw new Error(
        'SUPER_ADMIN role not found',
      );
    }

    await User.create({
      firstName:
        env.SUPER_ADMIN_FIRST_NAME,

      lastName:
        env.SUPER_ADMIN_LAST_NAME,

      email:
        env.SUPER_ADMIN_EMAIL,

      password:
        env.SUPER_ADMIN_PASSWORD,

      role: role._id,

      userType:
        USER_TYPES.SUPER_ADMIN,
    });

    logger.info(
      'Super admin seeded successfully',
    );
  };