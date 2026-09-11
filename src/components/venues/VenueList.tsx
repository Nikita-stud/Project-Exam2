'use client';
import { useMemo, useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

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
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get('page') ?? 1);

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

  const filtered = useMemo(() => {
    return venues.filter((venue) => {
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
  }, [venues, formData, from, to]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const onPageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', String(page));
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname],
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      onPageChange(1);
    }
  }, [currentPage, totalPages, onPageChange]);

  const handleClearFilter = () => {
    resetFormData();
    onPageChange(1);
  };

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
            <ClearFilterMessage onClear={handleClearFilter} />
          )}
        </section>
      )}
    </>
  );
}
