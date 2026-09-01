import { VENUES_API_URL } from '@/constants/api';
import allowedDataRequest from '../helpers/allowedDataRequest';
import type { Venue } from '@/types';
import type { CreateVenueData } from '@/schemas/createVenueFormSchema';

export async function updateManagerVenue(
  venueId: string,
  venueData: CreateVenueData,
): Promise<Venue> {
  const response = await fetch(
    `${VENUES_API_URL}/${venueId}`,
    allowedDataRequest('PUT', venueData),
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message ?? 'Failed to update venue');
  }

  return json.data;
}
