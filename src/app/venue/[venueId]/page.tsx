import fetchVenue from '@/api/venues/fetchVenue';
import type { VenuePageType } from '@/types';
import EventBooking from '@/components/events/EventBooking';
import BookingVenueUser from '@/components/events/BookingVenueUser';
import BackNav from '@/components/ui/BackNav';
import VenueImages from '@/components/venues/VenueImages';
import OwnerAvatar from '@/components/helpers/OwnerAvatar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Venue Page || Holidaze',
  description:
    'Your venue is waiting for you. Book your next trip with us and experience the best of venues and sights.',
};

export default async function VenuePage({ params }: VenuePageType) {
  const { venueId } = await params;
  const venue = await fetchVenue(venueId);
  const galleryImages = venue.media.filter((image) => image.url).slice(0, 5);

  return (
    <>
      <BackNav />
      <div className="p-[20px] md:p-[50px]">
        <div className="lg:flex lg:gap-[20px]">
          <div className="lg:w-[580px] lg:flex-none">
            <VenueImages venue={venue} images={galleryImages} />
          </div>

          <div className="mt-[20px] lg:mt-0 lg:flex lg:flex-col lg:flex-1">
            <section>
              <div className="flex items-baseline justify-between mb-[10px]">
                <h1>{venue.name || 'No name'}</h1>
                <p>
                  <i
                    className="fa-solid fa-star mr-[5px]"
                    aria-hidden="true"
                  ></i>
                  {venue.rating === 0 ? ' None' : venue.rating}
                </p>
              </div>
              <div className="flex my-[20px]">
                <OwnerAvatar
                  image={venue.owner?.avatar.url}
                  alt={venue.owner?.avatar.alt || 'Profile image'}
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
                    <strong>Included:</strong>
                    {Object.entries(venue.meta)
                      .filter(([, included]) => included)
                      .map(
                        ([text]) =>
                          text.charAt(0).toUpperCase() + text.slice(1),
                      )
                      .join(', ') || 'None'}
                  </p>
                  <p>
                    <strong>Details:</strong> {venue.description}
                  </p>
                </div>
              </section>
            </section>

            <section className="bg-calm/20 flex flex-col gap-[20px] px-[20px] my-[20px] rounded-[10px] pb-[20px] lg:w-full lg:mt-auto">
              <div className="mt-[20px] mb-[-20px]">
                <BookingVenueUser
                  maxGuests={venue.maxGuests}
                  bookings={venue.bookings}
                />
              </div>
              <EventBooking
                venueId={venue.id}
                venueName={venue.name}
                imageUrl={venue.media[0]?.url || '/no-photo.svg'}
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
