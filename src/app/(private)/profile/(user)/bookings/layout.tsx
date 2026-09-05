import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Booked Venues || Holidaze',
  description:
    'Booked Page for Holidaze, where you can view and manage your booked venues',
};

export default function BookedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
