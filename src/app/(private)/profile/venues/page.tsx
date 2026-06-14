import type { VenuePageType } from '@/types';

export default async function VenuePage({ params }: VenuePageType) {
  const { venuesId } = await params;

  return (
    <main>
      <h1>Venue Details</h1>
      <p>Venue Details for: {venuesId}</p>
    </main>
  );
}
