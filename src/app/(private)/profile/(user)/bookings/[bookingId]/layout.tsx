import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Booking Details || Holidaze',
  description:
    'Booking Page for Holidaze, where you can view and manage your booked venue',
};

export default function BookedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
