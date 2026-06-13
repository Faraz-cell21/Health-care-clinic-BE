import { z } from 'zod';

export const listUsersSchema = z.object({
    query: z.object({
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10),
        search: z.string().optional(),
        roleId: z.string().optional(),
        isActive: z.enum(['true', 'false']).optional(),
    }),
});

export type ListUsersInput = z.infer<typeof listUsersSchema>;