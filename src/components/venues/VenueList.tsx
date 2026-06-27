'use client';

import { useVenueContext } from '@/context/context';
import type { Venue } from '../../types/index';
import VenueCard from './VenueCard';

export default function VenueList({ venues }: { venues: Venue[] }) {
  const context = useVenueContext();

  if (!venues || venues.length === 0) {
    return <p>No Venues found</p>;
  }

  const filtered = context
    ? venues.filter((venue) => {
        const destination = context.formData.destination.trim().toLowerCase();
        const matchesName = venue.name.trim().toLowerCase().includes(destination);
        const matchesGuests = venue.maxGuests >= Number(context.formData.guests);
        return matchesName && matchesGuests;
      })
    : venues;

  return (
    <section className="grid gap-[20px] p-[20px] md:p-[50px]">
      {filtered.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </section>
  );
}
