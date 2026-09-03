import { z } from 'zod';

const STRING_REGEX = /^[A-Za-z_]+$/;

export const registerFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required' })
    .max(50, { message: 'Name can not be longer than 50 characters' })
    .regex(STRING_REGEX, {
      message: 'Name can only contain letters and underscores',
    }),
  email: z
    .string()
    .trim()
    .max(100, { message: 'Email can not be longer than 100 characters' })
    .email('Invalid email format')
    .endsWith('@stud.noroff.no', {
      message: 'Email must be a stud.noroff.no email address',
    }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  venueManager: z.boolean().optional(),
});

export type RegisterData = z.infer<typeof registerFormSchema>;
