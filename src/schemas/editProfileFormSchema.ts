import { z } from 'zod';

export const editProfileFormSchema = z.object({
  avatar: z
    .object({
      url: z
        .string()
        .url({ message: 'Avatar URL must be a valid URL' })
        .or(z.literal('')),
      alt: z.string().max(120).optional(),
    })
    .optional(),
  banner: z
    .object({
      url: z
        .string()
        .url({ message: 'Banner URL must be a valid URL' })
        .or(z.literal('')),
      alt: z.string().max(120).optional(),
    })
    .optional(),
  bio: z
    .string()
    .trim()
    .max(160, { message: 'Bio can not be longer than 160 characters' })
    .optional(),
});

export type EditProfileData = z.infer<typeof editProfileFormSchema>;
