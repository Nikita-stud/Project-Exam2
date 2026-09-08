import VenueList from '@/components/venues/VenueList';
import MainHeroSection from '@/components/ui/MainHeroSection';
import VenuesSearchLandingPage from '@/components/venues/VenuesSearchLandingPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Page || Holidaze',
  description:
    'Your favorite destinations and venues in one place. Book your next trip with us and experience the best of venues and sights.',
};

export default function Home() {
  return (
    <>
      <VenuesSearchLandingPage />
      <h1 className="pl-[20px] pt-[10px] md:hidden">Book your stay</h1>
      <MainHeroSection />
      <VenueList />
    </>
  );
}
