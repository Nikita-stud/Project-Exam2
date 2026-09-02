import { BOOKINGS_API_URL } from '@/constants/api';
import allowedRequest from '../helpers/allowedRequest';

export async function cancelBooking(bookingId: string): Promise<void> {
  try {
    const response = await fetch(
      `${BOOKINGS_API_URL}/${bookingId}`,
      allowedRequest('DELETE'),
    );

    if (!response.ok) {
      const json = await response.json().catch(() => null);
      throw new Error(
        json?.errors?.[0]?.message ?? 'Failed to cancel booking',
      );
    }
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Failed to cancel booking');
  }
}
