import { VENUES_API_URL } from '@/constants/api';
import allowedDataRequest from '../helpers/allowedDataRequest';
import type { Venue } from '@/types';
import type { CreateVenueData } from '@/schemas/createVenueFormSchema';

export async function createManagerVenue(
  venueData: CreateVenueData,
): Promise<Venue> {
  try {
    const response = await fetch(
      VENUES_API_URL,
      allowedDataRequest('POST', venueData),
    );
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message ?? 'Failed to create venue');
    }

    return json.data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Failed to create venue');
  }
}
