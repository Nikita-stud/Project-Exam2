import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Invalid email format')
    .min(3, { message: 'Email must be at least 3 characters.' })
    .max(50, { message: 'Email can not be longer than 50 characters' })
    .endsWith('@stud.noroff.no', {
      message: 'Email must be a stud.noroff.no email address',
    }),
  password: z
    .string()
    .trim()
    .min(4, { message: 'Password must be at least 4 characters' }),
});

export type LoginData = z.infer<typeof loginFormSchema>;
