import { VENUES_API_URL } from '../../constants/api';
import type { Venue } from '../../types/index';

export default async function fetchVenues(): Promise<Venue[]> {
  try {
    const response = await fetch(
      `${VENUES_API_URL}?sort=created&sortOrder=desc`,
      {
        next: { revalidate: 60 },
      },
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch Venues`);
    }

    return json.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to fetch venues');
  }
}
