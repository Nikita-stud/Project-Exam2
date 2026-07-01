import { z } from 'zod';

export const editProfileFormSchema = z.object({
  avatar: z
    .object({
      url: z
        .string()
        .url({ message: 'Avatar URL must be a valid URL' })
        .optional(),
      alt: z.string().max(120).default('Users avatar for the profile page'),
    })
    .optional(),
  banner: z
    .object({
      url: z
        .string()
        .url({ message: 'Banner URL must be a valid URL' })
        .optional(),
      alt: z.string().max(120).default('Users banner for the profile page'),
    })
    .optional(),
  bio: z
    .string()
    .trim()
    .max(160, { message: 'Bio can not be longer than 160 characters' })
    .optional(),
});

export type EditProfileData = z.infer<typeof editProfileFormSchema>;
