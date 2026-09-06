import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(100, { message: 'Email max 100 characters' })
    .email('Invalid email format')
    .endsWith('@stud.noroff.no', {
      message: 'Must be stud.noroff.no address',
    }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(40, { message: 'Password can be max 40 characters' }),
});

export type LoginData = z.infer<typeof loginFormSchema>;
