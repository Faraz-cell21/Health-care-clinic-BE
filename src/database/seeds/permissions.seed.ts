import { Permission } from '../../modules/permissions/models/permission.model';
import { PERMISSIONS } from '../../modules/permissions/constants/permissions.constants';
import { logger } from '../../common/logger/logger';

export const seedPermissions = async (): Promise<void> => {
    logger.info('Seeding Permissions...');

    for (const permission of PERMISSIONS) {
        const [resource, action] = permission.split(':');

        await Permission.updateOne(
            {
                name: permission,
            },
            {
                name: permission,
                resource,
                action,
            },
            {
                upsert: true,
            },
        );
    }

    logger.info('Permissions seeded successfully');
};