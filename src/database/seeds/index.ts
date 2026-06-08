import mongoose from 'mongoose';
import { logger } from '../../common/logger/logger';
import { connectDatabase } from '../../config/database';
import { seedPermissions } from './permissions.seed';
import { seedRoles } from './roles.seed';
import { seedSuperAdmin } from './super-admin.seed';

const runSeeders = async (): Promise<void> => {
    try {
        await connectDatabase();

        await seedPermissions();

        await seedRoles();

        await seedSuperAdmin();

        logger.info('Database seeding completed');

        await mongoose.disconnect();

        process.exit(0);
    } catch (error) {
        logger.error(error);

        process.exit(1);
    }
}

void runSeeders();