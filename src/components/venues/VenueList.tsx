'use client';

import { useEffect, useState } from 'react';
import SearchStore from '@/store/searchStore';
import fetchVenues from '@/api/venues/fetchVenues';
import type { Venue } from '../../types/index';
import VenueCard from './VenueCard';
import PaginationControls from '../helpers/PaginationControls';
import { LoadingContainer } from '../ui/LoadingContainer';
import ClearFilterMessage from '../helpers/ClearFilterMessage';

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

  const { from, to } = formData.selected ?? {};

  const filtered = venues.filter((venue) => {
    const destination = formData.destination.trim().toLowerCase();
    const matchesName = venue.name.trim().toLowerCase().includes(destination);
    const matchesGuests = Number(formData.guests) <= venue.maxGuests;
    const matchesDates =
      !from ||
      !to ||
      !venue.bookings?.some((booking) => {
        const bookingStart = new Date(booking.dateFrom);
        const bookingEnd = new Date(booking.dateTo);
        return from < bookingEnd && to > bookingStart;
      });
    return matchesName && matchesGuests && matchesDates;
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
        <div className="flex flex-col mt-[20px] md:mt-[50px] md:flex-row">
          <div className="w-full md:w-1/3">
            <LoadingContainer />
          </div>
          <div className="w-full md:w-1/3">
            <LoadingContainer />
          </div>
          <div className="w-full md:w-1/3">
            <LoadingContainer />
          </div>
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
            <ClearFilterMessage onClear={resetFormData} />
          )}
        </section>
      )}
    </>
  );
}
