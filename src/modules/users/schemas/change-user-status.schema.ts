import { z } from 'zod';

export const changeUserStatusSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        isActive: z.boolean(),
    }),
});

export type ChangeUserStatusInput = z.infer<typeof changeUserStatusSchema>;