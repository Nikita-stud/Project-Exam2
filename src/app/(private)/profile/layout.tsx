import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile Page || Holidaze',
  description:
    'Profile Page for Holidaze, where you can view and manage your bookings, venues, and profile settings',
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
