'use client';

import Link from 'next/link';
import VenueStore from '@/store/venueStore';
import VenueList from '@/components/venues/VenueList';
import BackNav from '@/components/ui/BackNav';
import HeroSection from '@/components/ui/HeroSection';

export default function SavedVenuesPage() {
  const items = VenueStore((state) => state.items);

  return (
    <>
      <BackNav />
      <HeroSection />
      <section className="pt-[20px] md:p-[50px]">
        <h1 className="pl-[20px] md:hidden">Saved Venues</h1>
        {items.length === 0 ? (
          <div className="px-[20px]">
            <Link
              href={`/`}
              className="border p-[50px] flex flex-col items-center justify-center text-center rounded-[10px] bg-[#fff] mt-[10px] md:py-[80px]"
            >
              <p>You have not saved any venues yet.</p>

              <button className="login-cta bg-primary w-[166px] h-[43px] rounded-[10px] text-white flex items-center justify-center mt-[20px] hover:opacity-90 md:w-[320px] md:h-[58px]">
                Search now <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </Link>
          </div>
        ) : (
          <VenueList venues={items} />
        )}
      </section>
    </>
  );
}
