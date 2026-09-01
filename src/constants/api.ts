const BASE_API_URL = 'https://v2.api.noroff.dev';
export const REGISTER_API_URL = BASE_API_URL + '/auth/register';
export const LOGIN_API_URL = BASE_API_URL + '/auth/login?_holidaze=true'; //_holidaze=true gives if manager or not
export const BOOKINGS_API_URL = BASE_API_URL + '/holidaze/bookings';
export const VENUES_API_URL = BASE_API_URL + '/holidaze/venues';
export const PROFILES_API_URL = BASE_API_URL + '/holidaze/profiles';

export const USER_BOOKINGS_API_URL = (userName: string) =>
  `${PROFILES_API_URL}/${userName}/bookings?_venue=true`;

export const MANAGER_VENUES_API_URL = (userName: string) =>
  `${PROFILES_API_URL}/${userName}/venues?_bookings=true&_customer=true`;

export const UPDATE_PROFILE_API_URL = (userName: string) =>
  `${PROFILES_API_URL}/${userName}`;
