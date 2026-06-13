import { z } from 'zod';

export const updateUserSchema = z.object({
    params: z.object({
        id: z.string(),
    }),

    body: z.object({
        firstName: z.string().trim().min(2).max(50).optional(),
        lastName: z.string().trim().min(2).max(50).optional(),
        phoneNumber: z.string().trim().min(5).max(20).optional(),
    }),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;