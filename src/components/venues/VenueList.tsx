'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useVenueContext } from '@/context/context';
import type { Venue } from '../../types/index';
import VenueCard from './VenueCard';
import PaginationControls from '../helpers/PaginationControls';

export default function VenueList({ venues }: { venues: Venue[] }) {
  const context = useVenueContext();

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  if (!venues || venues.length === 0) {
    return <p>No Venues found</p>;
  }

  const filtered = context
    ? venues.filter((venue) => {
        const destination = context.formData.destination.trim().toLowerCase();
        const matchesName = venue.name
          .trim()
          .toLowerCase()
          .includes(destination);
        const matchesGuests =
          venue.maxGuests >= Number(context.formData.guests);
        return matchesName && matchesGuests;
      })
    : venues;

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  function onPageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <section className="grid gap-[20px] p-[20px] md:p-[50px]">
      {currentItems.length > 0 ? (
        <>
          {currentItems.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-[50px] my-[50px] text-center">
          <Link href="/">
            <Image
              className="w-auto"
              src="/text-logo.png"
              alt="Logo"
              width={300}
              height={200}
            />
          </Link>
          <h3>We could not find a match</h3>
          <p>Lets clear your filers and start over</p>
          <button
            onClick={() =>
              context.setFormData({
                destination: '',
                selected: undefined,
                guests: '',
              })
            }
            className="flex items-center justify-center gap-2 bg-primary w-[320px] h-[58px] text-white rounded-[10px]"
          >
            <i className="fa-regular fa-trash-can"></i> Clear filter
          </button>
        </div>
      )}
    </section>
  );
}
