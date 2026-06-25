'use client';

import { useState } from 'react';
import { DayPicker, DateRange } from '@daypicker/react';
import '@daypicker/react/style.css';

export default function VenueSearch() {
  const [destination, setDestination] = useState('');
  const [selected, setSelected] = useState<DateRange | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [guests, setGuests] = useState('1');

  return (
    <div className="p-[10px] bg-white shadow-page md:absolute md:z-100 md:p-0 md:top-[400px] md:left-1/2 md:-translate-x-1/2">
      <form method="POST" className="md:flex">
        <div className="relative border rounded-[10px] h-[58px] bg-[#fff] md:w-[200px] lg:w-[300px] md:z-10">
          <p className="absolute top-[30%] left-[20px]">
            <i className="fa-solid fa-magnifying-glass">
              <span className="hidden">hidden</span>
            </i>
          </p>
          <label htmlFor="destination" className="block pl-[50px] pt-[5px]">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            minLength={2}
            maxLength={30}
            placeholder="Search..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-[50px] truncate"
          />
        </div>
        <div className="flex mt-[-1px] md:mt-0 md:-ml-2.5 md:relative md:z-30">
          <div className="flex-1 border relative rounded-l-[10px] h-[58px] bg-[#fff] md:flex-none md:w-[200px] lg:w-[332px]">
            <p className="absolute top-[30%] left-[20px]">
              <i className="fa-regular fa-calendar">
                <span className="hidden">hidden</span>
              </i>
            </p>
            <label htmlFor="date" className="block pl-[50px] pt-[5px]">
              Dates
            </label>
            <button
              type="button"
              onClick={() => setCalendarOpen(!calendarOpen)}
              className="w-full px-[50px] truncate text-left"
            >
              {selected?.from ? (
                `${selected.from.toLocaleDateString()} – ${selected.to?.toLocaleDateString() ?? '...'}`
              ) : (
                <span className="text-calm font-light">Select dates...</span>
              )}
            </button>
            {calendarOpen && (
              <DayPicker
                mode="range"
                selected={selected}
                onSelect={setSelected}
                excludeDisabled
                disabled={{ before: new Date() }}
                numberOfMonths={1}
                min={1}
                required
                className="absolute z-50 top-[8px] left-0  p-[10px] bg-[#fff] border rounded-[10px] shadow-lg"
              />
            )}
          </div>
          <div className="flex-1 border relative ml-[-1px] rounded-r-[10px] h-[58px] bg-[#fff] md:mt-0 md:-ml-2.5 md:z-10 md:rounded-[10px] md:flex-none md:w-[300px] lg:w-[352px]">
            <p className="absolute top-[30%] left-[20px]">
              <i className="fa-regular fa-user">
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
              max={10}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full px-[50px] truncate"
            />
            <button
              type="submit"
              className="hidden md:block absolute right-[5px] top-1/2 -translate-y-1/2 w-[166px] h-[43px] bg-calm text-white rounded-[10px]"
            >
              <i className="fa-solid fa-magnifying-glass pr-[8px]">
                <span className="hidden">hidden</span>
              </i>
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
