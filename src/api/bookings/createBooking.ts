import { BOOKINGS_API_URL } from '@/constants/api';
import allowedDataRequest from '../helpers/allowedDataRequest';
import type { Booking, CreateBookingData } from '@/types';

export async function createBooking(
  bookingData: CreateBookingData,
): Promise<Booking> {
  try {
    const response = await fetch(
      BOOKINGS_API_URL,
      allowedDataRequest('POST', bookingData),
    );
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message ?? 'Failed to create booking');
    }

    return json.data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Failed to create booking');
  }
}
