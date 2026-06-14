import type { VenuePageType } from '@/types';
// import Link from 'next/link';

export default async function VenuePage({ params }: VenuePageType) {
  const { venueId } = await params;

  return (
    <section>
      <h1>Venue Details</h1>
      <p>Venue Details for: {venueId}</p>
      {/* {venues.map((venue) => (
        <Link key={venue.title} href={`/blog/${venue.id}`}>
          {venue.description}
        </Link>
      ))} */}
    </section>
  );
}
