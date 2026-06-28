import fetchVenues from '@/api/venues/fetchVenues';
import VenueList from '@/components/venues/VenueList';
import MainHeroSection from '@/components/ui/MainHeroSection';
import VenueSearch from '@/components/venues/VenueSearch';
import { VenueProvider } from '@/context/context';

export default async function Home() {
  const venues = await fetchVenues();
  return (
    <>
      <VenueProvider>
        <section>
          <VenueSearch />
          <h1 className="pl-[20px] pt-[10px] md:hidden">Book your stay</h1>
          <MainHeroSection />
          <VenueList venues={venues} />
        </section>
      </VenueProvider>
    </>
  );
}
