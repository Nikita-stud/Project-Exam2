import { z } from 'zod';

const STRING_REGEX = /^[a-zA-ZæøåÆØÅ .'-]+$/;

export const registerFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Name must be at least 3 characters.' })
    .max(20, { message: 'Name can not be longer than 20 characters' })
    .regex(STRING_REGEX, {
      message: 'Name must contain allowed characters',
    }),
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

export type RegisterData = z.infer<typeof registerFormSchema>;
