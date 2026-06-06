import app from './app';
import { logger } from './common/logger/logger';
import { connectDatabase } from './config/database';
import { env } from './config/env';

const startServer =
  async (): Promise<void> => {
    try {
      await connectDatabase();

      app.listen(env.PORT, () => {
        logger.info(
          `Server running on port ${env.PORT}`,
        );
      });
    } catch (error) {
      logger.error(error);

      process.exit(1);
    }
  };

void startServer();