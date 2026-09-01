'use client';

import { useEffect, useRef, useState } from 'react';
import { DayPicker } from '@daypicker/react';
import '@daypicker/react/style.css';
import { useVenueContext } from '@/context/context';

export default function BookingDateGuests({
  maxGuests,
}: {
  maxGuests: number;
}) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const dateFieldRef = useRef<HTMLDivElement>(null);
  const { formData, setFormData } = useVenueContext();

  useEffect(() => {
    if (!calendarOpen) return;

    const handleClickOutside = (e: PointerEvent) => {
      if (!dateFieldRef.current?.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [calendarOpen]);

  return (
    <div className="flex flex-col gap-[10px] mb-[20px] md:flex-row">
      <div
        ref={dateFieldRef}
        className="flex-1 border relative rounded-[10px] h-[58px] bg-white"
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
          className="w-full px-[50px] truncate text-left"
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
            onSelect={(e) => setFormData({ ...formData, selected: e })}
            excludeDisabled
            disabled={{ before: new Date() }}
            numberOfMonths={1}
            min={1}
            required
            className="venue-search-calendar absolute z-50 top-[8px] left-0 max-w-[calc(100vw-2.5rem)] overflow-x-auto p-[10px] bg-white border rounded-[10px] shadow-lg"
          />
        )}
      </div>
      <div className="flex-1 border relative rounded-[10px] h-[58px] bg-white">
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
          placeholder="0"
          value={formData.guests}
          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
          className="w-full px-[50px] truncate"
        />
      </div>
    </div>
  );
}
