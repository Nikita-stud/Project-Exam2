import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bookings Page || Holidaze',
  description:
    'Bookings Page for Holidaze, where you can view and manage your bookings',
};

export default function ManagerBookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
