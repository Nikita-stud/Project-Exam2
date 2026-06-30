export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: RegisterUser['email'];
  password: RegisterUser['password'];
}

interface UserAvatar {
  url: string;
  alt: string;
}

interface UserBanner {
  url: string;
  alt: string;
}

export interface LoginResponseData {
  name: string;
  email: string;
  avatar: UserAvatar;
  banner: UserBanner;
  accessToken: string;
}

export interface LoginResponse {
  data: LoginResponseData;
  meta: Record<string, never>;
}

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface VenuePageType {
  params: Promise<{ venueId: string }>;
}

interface Media {
  url?: string;
  alt?: string;
}

interface VenueMeta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
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
  location: Location;
}

interface PageMeta {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
}

export interface VenuesResponse {
  data: Venue[];
  meta: PageMeta;
}

export interface VenueResponse {
  data: Venue;
  meta: Record<string, never>;
}
