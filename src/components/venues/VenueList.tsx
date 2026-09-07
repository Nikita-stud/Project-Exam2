'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SearchStore from '@/store/searchStore';
import fetchVenues from '@/api/venues/fetchVenues';
import type { Venue } from '../../types/index';
import VenueCard from './VenueCard';
import PaginationControls from '../helpers/PaginationControls';
import { LoadingContainer } from '../ui/LoadingContainer';

export default function VenueList() {
  const formData = SearchStore((store) => store.formData);
  const resetFormData = SearchStore((store) => store.resetFormData);

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadVenues = async () => {
      try {
        const data = await fetchVenues();
        setVenues(data);
      } finally {
        setLoading(false);
      }
    };
    loadVenues();
  }, []);

  const filtered = venues.filter((venue) => {
    const destination = formData.destination.trim().toLowerCase();
    const matchesName = venue.name.trim().toLowerCase().includes(destination);
    const matchesGuests = venue.maxGuests >= Number(formData.guests);
    return matchesName && matchesGuests;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  function onPageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <>
      {loading ? (
        <div className="mt-[20px] md:mt-[50px] ">
          <LoadingContainer />
          <LoadingContainer />
        </div>
      ) : null}
      {!loading && (
        <section className="p-[20px] md:p-[50px]">
          {currentItems.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-[20px] mb-[20px] md:grid-cols-2 md:gap-[50px] md:mb-[50px] lg:grid-cols-3">
                {currentItems.map((venue) => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </div>
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
                onClick={resetFormData}
                className="flex items-center justify-center gap-2 bg-primary w-[320px] h-[58px] text-white rounded-[10px]"
              >
                <i className="fa-regular fa-trash-can" aria-hidden="true"></i>{' '}
                Clear filter
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
}
