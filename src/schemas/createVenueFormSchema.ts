import { z } from 'zod';

const mediaItemSchema = z.object({
  url: z
    .string()
    .url({ message: 'Image must be a valid URL' })
    .or(z.literal('')),
  alt: z.string().max(120).optional(),
});

export const createVenueFormSchema = z.object({
  media: z
    .array(mediaItemSchema)
    .min(1)
    .refine((media) => !!media[0]?.url, {
      message: 'At least 1 Image is required',
      path: [0, 'url'],
    }),
  name: z
    .string()
    .trim()
    .min(1, { message: 'Venue name is required' })
    .max(100, { message: 'Venue name can not be longer than 100 characters' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Description is required' })
    .max(1000, {
      message: 'Description can not be longer than 1000 characters',
    }),
  maxGuests: z
    .number({ message: 'Max guests is required' })
    .int({ message: 'Must be a whole number' })
    .min(1, { message: 'Minimum 1 guest required' }),
  price: z
    .number({ message: 'Price is required' })
    .positive({ message: 'Price must be greater than 0' })
    .max(1000, { message: 'Price can not be greater than 1000' }),
  meta: z
    .object({
      wifi: z.boolean().optional(),
      parking: z.boolean().optional(),
      breakfast: z.boolean().optional(),
      pets: z.boolean().optional(),
    })
    .optional(),
  location: z.object({
    address: z
      .string()
      .trim()
      .min(1, { message: 'Address is required' })
      .max(200),
    city: z
      .string()
      .trim()
      .min(1, { message: 'City is required' })
      .max(20, { message: 'Max 20 characters' })
      .regex(/^[A-Za-z\s]+$/, { message: 'Only letters allowed' }),
    zip: z
      .string()
      .trim()
      .min(1, { message: 'Post code is required' })
      .max(20, { message: 'Max 20 characters' })
      .regex(/^[0-9]+$/, { message: 'Only numbers allowed' }),
    country: z
      .string()
      .trim()
      .min(1, { message: 'Country is required' })
      .max(100),
  }),
});

export type CreateVenueData = z.infer<typeof createVenueFormSchema>;
