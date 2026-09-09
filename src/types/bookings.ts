import type { Venue } from './venues';

interface UserImage {
  url: string;
  alt: string;
}

export interface BookingCustomer {
  name: string;
  email: string;
  bio?: string;
  avatar?: UserImage;
  banner?: UserImage;
}

export interface VenueBooking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer?: BookingCustomer;
}

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: Venue;
}

export interface CreateBookingData {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}

export interface BookingSuccessPageType {
  params: Promise<{ venueId: string }>;
  searchParams: Promise<{
    from?: string;
    to?: string;
    guests?: string;
    name?: string;
    image?: string;
  }>;
}
