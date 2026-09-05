import { VENUES_API_URL } from '../../constants/api';
import type { Venue } from '../../types/index';

export default async function fetchVenue(id: string): Promise<Venue> {
  try {
    const response = await fetch(
      `${VENUES_API_URL}/${id}?_owner=true&_bookings=true`,
      {
        next: { revalidate: 3600 },
      },
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch Venue with id ${id}`);
    }

    return json.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to fetch venue');
  }
}
