'use client';
import { useRef, useState } from 'react';
import { DayPicker } from '@daypicker/react';
import '@daypicker/react/style.css';
import SearchStore from '@/store/searchStore';
import useClickOutside from '@/hooks/useClickOutside';

export default function VenuesSearchLandingPage() {
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const dateFieldRef = useRef<HTMLDivElement>(null);

  const formData = SearchStore((store) => store.formData);
  const setFormData = SearchStore((store) => store.setFormData);

  useClickOutside(dateFieldRef, calendarOpen, setCalendarOpen);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="p-[10px] bg-white shadow-page md:absolute md:z-100 md:p-0 md:top-[400px] md:left-1/2 md:-translate-x-1/2 md:bg-transparent md:shadow-none">
      <form onSubmit={handleSearch} className="md:flex md:items-stretch">
        <div className="relative border rounded-[10px] h-[58px] bg-[#fff] md:w-[200px] lg:w-[300px] md:z-10">
          <p className="absolute top-[30%] left-[20px]">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true">
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
            autoComplete="off"
            minLength={2}
            maxLength={30}
            placeholder="Search..."
            value={formData.destination}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFormData({ destination: e.target.value });
            }}
            className="w-full px-[50px] truncate"
          />
        </div>
        <div className="flex mt-[-1px] md:mt-0 md:-ml-2.5 md:relative md:z-30">
          <div
            ref={dateFieldRef}
            className="flex-1 min-w-0 border relative rounded-l-[10px] h-[58px] bg-[#fff] md:flex-none md:w-[200px] lg:w-[332px]"
          >
            <p className="absolute top-[30%] left-[20px]">
              <i className="fa-regular fa-calendar" aria-hidden="true">
                <span className="hidden">hidden</span>
              </i>
            </p>
            <label htmlFor="date" className="block pl-[50px] pt-[5px]">
              Dates
            </label>
            <button
              type="button"
              id="date"
              onClick={() => setCalendarOpen(!calendarOpen)}
              className="w-full px-[50px] truncate text-left focus:outline-none"
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
                onSelect={(e) => {
                  setFormData({ selected: e });
                }}
                excludeDisabled
                disabled={{ before: new Date() }}
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
          <div className="flex-1 min-w-0 border relative ml-[-1px] rounded-r-[10px] h-[58px] bg-[#fff] md:mt-0 md:-ml-2.5 md:z-10 md:rounded-[10px] md:flex-none md:w-[300px] lg:w-[352px]">
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
              max={10}
              placeholder="0"
              value={formData.guests}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData({ guests: e.target.value });
              }}
              className="w-full px-[50px] truncate"
            />
            <button
              type="submit"
              className="hidden md:block absolute right-[5px] top-1/2 -translate-y-1/2 w-[166px] h-[43px] bg-calm text-white rounded-[10px] hover:opacity-90 disabled:opacity-70"
            >
              <i
                className="fa-solid fa-magnifying-glass pr-[8px]"
                aria-hidden="true"
              >
                <span className="hidden">hidden</span>
              </i>
              Search
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="mt-[10px] w-full h-[48px] bg-calm text-white rounded-[10px] md:hidden hover:opacity-90 disabled:opacity-70"
        >
          <i
            className="fa-solid fa-magnifying-glass pr-[8px]"
            aria-hidden="true"
          >
            <span className="hidden">hidden</span>
          </i>
          Search
        </button>
      </form>
    </div>
  );
}
