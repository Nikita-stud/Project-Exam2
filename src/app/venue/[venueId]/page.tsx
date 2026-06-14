import type { VenuePageType } from '@/types';

export default async function VenuePage({ params }: VenuePageType) {
  const { venueId } = await params;

  return (
    <section>
      <h1>Venue Details</h1>
      <p>Venue Details for: {venueId}</p>
    </section>
  );
}
