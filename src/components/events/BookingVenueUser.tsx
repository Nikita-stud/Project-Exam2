'use client';

import { useEffect, useRef, useState } from 'react';
import { DayPicker } from '@daypicker/react';
import '@daypicker/react/style.css';
import SearchStore from '@/store/searchStore';
import AuthStore from '@/store/authStore';
import type { VenueBooking } from '@/types';

export default function BookingVenueUser({
  maxGuests,
  bookings,
}: {
  maxGuests: number;
  bookings?: VenueBooking[];
}) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const dateFieldRef = useRef<HTMLDivElement>(null);
  const formData = SearchStore((store) => store.formData);
  const setFormData = SearchStore((store) => store.setFormData);
  const resetFormData = SearchStore((store) => store.resetFormData);
  const token = AuthStore((store) => store.token);
  const venueManager = AuthStore((store) => store.user?.venueManager);

  useEffect(() => {
    resetFormData();
  }, []);

  useEffect(() => {
    if (!calendarOpen) return;

    const handleClickOutside = (e: PointerEvent) => {
      if (!dateFieldRef.current?.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () =>
      document.removeEventListener('pointerdown', handleClickOutside);
  }, [calendarOpen]);

  const ifBooked = (bookings ?? []).map((selected) => ({
    from: new Date(selected.dateFrom),
    to: new Date(selected.dateTo),
  }));

  if (!token || venueManager) {
    return null;
  }
  return (
    <div className="flex flex-col gap-[10px] mb-[20px]">
      <div
        ref={dateFieldRef}
        className="flex-1 border relative rounded-[10px] min-h-[58px] bg-[#fff]"
      >
        <p className="absolute top-[30%] left-[20px]">
          <i className="fa-regular fa-calendar" aria-hidden="true">
            <span className="hidden">hidden</span>
          </i>
        </p>
        <label htmlFor="booking-date" className="block pl-[50px] pt-[5px]">
          Dates
        </label>
        <button
          type="button"
          id="booking-date"
          onClick={() => setCalendarOpen(!calendarOpen)}
          className="w-full px-[50px] truncate text-left "
        >
          {formData.selected?.from ? (
            `${formData.selected.from.toLocaleDateString()} – ${formData.selected.to?.toLocaleDateString() ?? '...'}`
          ) : (
            <span className="text-calm font-light">Select dates...</span>
          )}
        </button>
        {calendarOpen && (
          <DayPicker
            mode="range"
            selected={formData.selected}
            onSelect={(e) => setFormData({ selected: e })}
            excludeDisabled
            disabled={[{ before: new Date() }, ...ifBooked]}
            numberOfMonths={1}
            min={1}
            showOutsideDays
            required
            modifiersClassNames={{
              selected: 'booking-selected',
              today: 'booking-today',
              range_start: 'booking-range-start',
              range_middle: 'booking-range-middle',
              range_end: 'booking-range-end',
              disabled: 'booking-disabled',
            }}
            className="venue-search-calendar"
          />
        )}
      </div>
      <div className="flex-1 border relative rounded-[10px] min-h-[58px] bg-[#fff]">
        <p className="absolute top-[30%] left-[20px]">
          <i className="fa-regular fa-user" aria-hidden="true">
            <span className="hidden">hidden</span>
          </i>
        </p>
        <label htmlFor="guests" className="block pl-[50px] pt-[5px]">
          Guests
        </label>
        <input
          type="number"
          id="guests"
          name="guests"
          min={1}
          max={maxGuests}
          placeholder={`Max ${maxGuests} guests`}
          value={formData.guests}
          onChange={(e) => setFormData({ guests: e.target.value })}
          className="w-full px-[50px] truncate"
        />
      </div>
    </div>
  );
}
