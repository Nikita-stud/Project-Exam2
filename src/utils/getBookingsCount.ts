import type { Venue } from '@/types';

export function getBookingsCount(venues: Venue[]) {
  let bookingsCount = 0;
  for (const venue of venues) {
    bookingsCount += venue._count?.bookings ?? 0;
  }
  return bookingsCount;
}
