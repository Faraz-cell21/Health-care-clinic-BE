import mongoose from 'mongoose';
import { env } from '../env';
import { logger } from '../../common/logger/logger';

export const connectDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(env.MONGODB_URI,);

        logger.info('MongoDB connection established');
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}