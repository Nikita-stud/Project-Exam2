import type { VenueBooking } from './bookings';

interface Media {
  url?: string;
  alt?: string;
}

interface UserImage {
  url: string;
  alt: string;
}

export interface VenueMeta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

export interface VenueLocation {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

export interface VenueOwner {
  name: string;
  email: string;
  bio: string;
  avatar: UserImage;
  banner: UserImage;
}

export interface Venue {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: VenueMeta;
  location: VenueLocation;
  owner?: VenueOwner;
  bookings?: VenueBooking[];
  _count?: { bookings: number };
}

export interface VenuePageType {
  params: Promise<{ venueId: string }>;
}

export interface VenueState {
  items: Venue[];
  saveVenue: (venue: Venue) => void;
  removeVenue: (id: string) => void;
  isSaved: (id: string) => boolean;
  clearItems: () => void;
}

export interface ManagerVenuesState {
  venues: Venue[] | null;
  venue: Venue | null;
  user: string | null;
  setVenues: (userName: string, venues: Venue[]) => void;
  setVenue: (userName: string, venue: Venue) => void;
}
