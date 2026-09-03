import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(100, { message: 'Email can not be longer than 100 characters' })
    .email('Invalid email format')
    .endsWith('@stud.noroff.no', {
      message: 'Email must be a stud.noroff.no email address',
    }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export type LoginData = z.infer<typeof loginFormSchema>;
