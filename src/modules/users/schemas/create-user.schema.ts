import { z } from 'zod';    
import { USER_TYPES } from '../constants/user-role.constants';

export const createUserSchema = z.object({
    body: z.object({
        firstName: z.string().trim().min(2).max(50),
        lastName: z.string().trim().min(2).max(50),
        email: z.email().trim().toLowerCase(),
        phoneNumber: z.string().trim().min(5).max(20).optional(),
        userType: z.enum(Object.values(USER_TYPES) as [string, ...string[]]),
        roleId: z.string().min(1)
    }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;