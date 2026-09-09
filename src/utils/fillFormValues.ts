import type { Venue } from '@/types';
import type { CreateVenueData } from '@/schemas/createVenueFormSchema';

export function fillFormValues(venue: Venue): CreateVenueData {
  return {
    media:
      venue.media.length > 0
        ? venue.media.map((item) => ({ url: item.url ?? '', alt: item.alt }))
        : [{ url: '' }],
    name: venue.name,
    description: venue.description,
    maxGuests: venue.maxGuests,
    price: venue.price,
    meta: {
      wifi: venue.meta.wifi,
      parking: venue.meta.parking,
      breakfast: venue.meta.breakfast,
      pets: venue.meta.pets,
    },
    location: {
      address: venue.location.address,
      city: venue.location.city,
      zip: venue.location.zip,
      country: venue.location.country,
    },
  };
}
