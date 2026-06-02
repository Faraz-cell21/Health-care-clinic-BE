import { z } from 'zod';

export const healthSchema = z.object({
    query: z.object({
        ping: z.string().optional(),
    }),
});