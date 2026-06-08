import { logger } from '../../common/logger/logger';
import { Permission } from '../../modules/permissions/models/permission.model';
import { Role } from '../../modules/roles/models/role.model';

export const seedRoles = async (): Promise<void> => {
    logger.info('Seeding Roles...');

    const permissions = await Permission.find();

    await Role.updateOne(
        {
            name: 'SUPER_ADMIN'
        },
        {
            name: 'SUPER_ADMIN',
            description: 'System Super Administrator',
            permissions: permissions.map((permission) => permission._id),
        },
        {
            upsert: true,
        },
    );

    logger.info('Roles seeded successfully');
}