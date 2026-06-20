import { VENUES_API_URL } from '../../constants/api';
import type { Venue, VenuesResponse } from '../../types/index';

export default async function fetchVenues(): Promise<Venue[]> {
  const response = await fetch(VENUES_API_URL, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch venues: ${response.statusText}`);
  }

  const result: VenuesResponse = await response.json();
  return result.data;
}
