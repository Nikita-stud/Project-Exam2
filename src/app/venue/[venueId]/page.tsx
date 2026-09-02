import Link from 'next/link';
import Image from 'next/image';
import fetchVenue from '@/api/venues/fetchVenue';
import type { VenuePageType } from '@/types';
import EventBooking from '@/components/events/EventBooking';
import BookingDateGuests from '@/components/events/BookingDateGuests';
import { VenueProvider } from '@/context/context';
import BackNav from '@/components/ui/BackNav';
import SaveVenueButton from '@/components/venues/SaveVenueButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Venue Page || Holidaze',
  description:
    'Your venue is waiting for you. Book your next trip with us and experience the best of venues and sights.',
};

export default async function VenuePage({ params }: VenuePageType) {
  const { venueId } = await params;
  const venue = await fetchVenue(venueId);

  return (
    <>
      <BackNav />
      <div className="p-[20px] ">
        <div className="relative mb-[20px] w-full">
          <Image
            src={venue.media[0]?.url || ''}
            alt={venue.media[0]?.alt || venue.name}
            width={350}
            height={260}
            sizes="100vw"
            className="w-full h-[260px] object-cover rounded-[10px]"
          />
          <SaveVenueButton venue={venue} />
        </div>

        <section>
          <VenueProvider>
            <div className="flex items-baseline justify-between mb-[10px]">
              <h1>{venue.name}</h1>
              <p>
                <i className="fa-solid fa-star" aria-hidden="true"></i>{' '}
                {venue.rating === 0 ? ' None' : venue.rating}
              </p>
            </div>
            <BookingDateGuests maxGuests={venue.maxGuests} />
            <div className="flex my-[20px]">
              <Image
                src={venue.owner?.avatar.url || '/no-photo.svg'}
                alt={venue.owner?.avatar.alt || venue.owner?.name || 'Owner'}
                width={40}
                height={40}
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
              <div className="ml-[10px]">
                <p className="text-calm">Owner</p>
                <p>{venue.owner?.name}</p>
              </div>
            </div>
            <section>
              <h2 className="mb-[10px]">Details</h2>
              <div className="flex flex-col gap-[10px]">
                <p>
                  <strong>Location:</strong> {venue.location.address},
                  {venue.location.zip}
                  {venue.location.address}
                </p>
                <p>
                  <strong>Included:</strong>{' '}
                  {Object.entries(venue.meta)
                    .filter(([, included]) => included)
                    .map(
                      ([amenity]) =>
                        amenity.charAt(0).toUpperCase() + amenity.slice(1),
                    )
                    .join(', ') || 'None'}
                </p>
                <p>
                  <strong>Details:</strong> {venue.description}
                </p>
              </div>
            </section>
            <div className="flex justify-end mt-[20px] mb-[10px]">
              <EventBooking venueId={venue.id} />
            </div>
          </VenueProvider>
        </section>
      </div>
    </>
  );
}
