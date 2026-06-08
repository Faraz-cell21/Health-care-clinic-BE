import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum([
    'development',
    'test',
    'production',
  ]),

  PORT: z.coerce.number().default(5000),

  MONGODB_URI: z.string().min(1),

  JWT_ACCESS_SECRET:
    z.string().min(1),

  JWT_REFRESH_SECRET:
    z.string().min(1),

  JWT_ACCESS_EXPIRES_IN:
    z.string().min(1),

  JWT_REFRESH_EXPIRES_IN:
    z.string().min(1),

  SUPER_ADMIN_EMAIL:
    z.string().email(),

  SUPER_ADMIN_PASSWORD:
    z.string().min(8),

  SUPER_ADMIN_FIRST_NAME:
    z.string().min(1),

  SUPER_ADMIN_LAST_NAME:
    z.string().min(1),
});

export type Env = z.infer<
  typeof envSchema
>;