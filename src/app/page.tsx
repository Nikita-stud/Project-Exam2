import fetchVenues from '@/api/venues/fetchVenues';
import VenueList from '@/components/venues/VenueList';
import MainHeroSection from '@/components/ui/MainHeroSection';

export default async function Home() {
  const venues = await fetchVenues();

  return (
    <section>
      <h1 className="pb-[20px] md:hidden">Book your stay</h1>
      <MainHeroSection />
      <VenueList venues={venues} />
    </section>
  );
}
