import fetchVenues from '@/api/venues/fetchVenues';
import VenueList from '@/components/venues/VenueList';

export default async function Home() {
  const venues = await fetchVenues();

  return (
    <section>
      <h1 className="pb-[20px]">Book your stay</h1>
      <VenueList venues={venues} />
    </section>
  );
}
