import { BOOKINGS_API_URL } from '@/constants/api';
import allowedRequest from '../helpers/allowedRequest';
import type { Booking } from '@/types';

export async function fetchBooking(bookingId: string): Promise<Booking> {
  try {
    const response = await fetch(
      `${BOOKINGS_API_URL}/${bookingId}?_venue=true&_owner=true`,
      allowedRequest('GET'),
    );
    const json = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch booking with id ${bookingId}`);
    }

    return json.data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Failed to fetch booking');
  }
}
