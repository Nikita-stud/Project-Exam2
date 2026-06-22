import { VENUES_API_URL } from '../../constants/api';
import type { Venue, VenuesResponse } from '../../types/index';

export default async function fetchVenues(): Promise<Venue[]> {
  const response = await fetch(VENUES_API_URL, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Venues were not found.`);
    }
    throw new Error(`Failed to fetch venues: ${response.statusText}`);
  }

  const result: VenuesResponse = await response.json();

  if (!result.data) {
    throw new Error('Venues data is not available');
  }
  return result.data;
}
