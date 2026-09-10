import { z } from 'zod';

const NAME_REGEX = /^[A-Za-z0-9_]+$/;

export const registerFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required' })
    .max(50, { message: 'Name can be max 50 characters' })
    .regex(NAME_REGEX, {
      message: 'Name can only use a-Z, 0-9, and _',
    }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(100, { message: 'Email max 100 characters' })
    .email('Invalid email format')
    .endsWith('@stud.noroff.no', {
      message: '@stud.noroff.no only',
    }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(40, { message: 'Password can be max 40 characters' }),
  venueManager: z.boolean().optional(),
});

export type RegisterData = z.infer<typeof registerFormSchema>;
