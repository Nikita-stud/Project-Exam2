'use client';

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
        <VenueList venues={items} />
      </section>
    </>
  );
}
