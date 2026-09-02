import fetchVenues from '@/api/venues/fetchVenues';
import VenueList from '@/components/venues/VenueList';
import MainHeroSection from '@/components/ui/MainHeroSection';
import VenueSearch from '@/components/venues/VenueSearch';
import { VenueProvider } from '@/context/context';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Page || Holidaze',
  description:
    'Your favorite destinations and venues in one place. Book your next trip with us and experience the best of venues and sights.',
};

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
