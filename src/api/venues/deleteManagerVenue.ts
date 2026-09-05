import { VENUES_API_URL } from '@/constants/api';
import allowedRequest from '../helpers/allowedRequest';

export async function deleteManagerVenue(venueId: string): Promise<void> {
  try {
    const response = await fetch(
      `${VENUES_API_URL}/${venueId}`,
      allowedRequest('DELETE'),
    );

    if (!response.ok) {
      throw new Error('Failed to cancel booking');
    }
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to delete venue');
  }
}
