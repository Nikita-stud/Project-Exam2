import type { Venue } from '../../types/index';
import VenueCard from './VenueCard';

export default function VenueList({ venues }: { venues: Venue[] }) {
  if (!venues || venues.length === 0) {
    return <p>No Venues found</p>;
  }

  return (
    <section className="grid gap-[20px] p-[20px] md:p-[50px]">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </section>
  );
}
