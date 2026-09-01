import { MANAGER_VENUES_API_URL } from '@/constants/api';
import allowedRequest from '../helpers/allowedRequest';
import type { Venue, ManagerVenuesResponse } from '@/types';

export async function fetchManagerVenues(userName: string): Promise<Venue[]> {
  const response = await fetch(
    MANAGER_VENUES_API_URL(userName),
    allowedRequest('GET'),
  );
  const json: ManagerVenuesResponse = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to fetch bookings`);
  }
  console.log('json.data', json.data);

  return json.data;
}
