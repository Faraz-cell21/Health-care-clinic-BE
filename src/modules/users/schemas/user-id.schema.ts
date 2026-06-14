import { z } from 'zod';

export const userIdSchema = z.object({
    params: z.object({
        id: z.string().min(1),
    }),
});

export type UserIdInput = z.infer<typeof userIdSchema>;