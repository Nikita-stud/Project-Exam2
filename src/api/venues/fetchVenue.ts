import { VENUES_API_URL } from '../../constants/api';
import type { Venue, VenueResponse } from '../../types/index';

export default async function fetchVenue(id: string): Promise<Venue> {
  const response = await fetch(`${VENUES_API_URL}/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Venue with ID ${id} was not found.`);
    }
    throw new Error(`Failed to fetch venue: ${response.statusText}`);
  }

  const result: VenueResponse = await response.json();

  if (!result.data) {
    throw new Error('Venue data is not available');
  }
  return result.data;
}
