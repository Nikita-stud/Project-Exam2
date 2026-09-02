import { USER_BOOKINGS_API_URL } from '@/constants/api';
import allowedRequest from '../helpers/allowedRequest';
import type { Booking, UserBookingsResponse } from '@/types';

export async function fetchUserBookings(userName: string): Promise<Booking[]> {
  try {
    const response = await fetch(
      USER_BOOKINGS_API_URL(userName),
      allowedRequest('GET'),
    );
    const json: UserBookingsResponse = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch bookings`);
    }

    return json.data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Failed to fetch bookings');
  }
}
