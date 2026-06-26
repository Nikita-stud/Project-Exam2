import { z } from 'zod';

export const registerFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Invalid email format')
    .min(3, { message: 'Email must be at least 3 characters.' })
    .max(50, { message: 'Email can not be longer than 50 characters' }),
});

export type RegisterData = z.infer<typeof registerFormSchema>;
