import Link from 'next/link';
import Image from 'next/image';
import fetchVenue from '@/api/venues/fetchVenue';
import type { VenuePageType } from '@/types';
import EventBooking from '@/components/events/EventBooking';
import BookingDateGuests from '@/components/events/BookingDateGuests';
import { VenueProvider } from '@/context/context';
import BackNav from '@/components/ui/BackNav';

export default async function VenuePage({ params }: VenuePageType) {
  const { venueId } = await params;

  const venue = await fetchVenue(venueId);

  console.log('VENUE:', venue);

  return (
    <>
      <BackNav />
      <div className="p-[20px]">
        <Image
          src={venue.media[0]?.url || ''}
          alt={venue.media[0]?.alt || venue.name}
          width={300}
          height={300}
          sizes="100vw"
          className="w-full h-auto rounded-[10px] mb-[20px]"
        />

        <section>
          <VenueProvider>
            <h1 className="mb-[10px]">{venue.name}</h1>
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
              <EventBooking />
            </div>
          </VenueProvider>
        </section>
      </div>
    </>
  );
}
