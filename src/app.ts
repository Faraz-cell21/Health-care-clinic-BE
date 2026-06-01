import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import routes from './routes';
import { errorMiddleware } from './common/middleware/error.middleware';
import { notFoundMiddleware } from './common/middleware/not-found.middleware';

const app = express();

app.use(helmet());
app.use(cors());

app.use(compression());

app.use(express.json());

app.use('/api/v1', routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
