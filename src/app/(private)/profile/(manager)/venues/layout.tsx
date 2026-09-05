import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Venues Page || Holidaze',
  description:
    'Venues Page for Holidaze, where you can view and manage your venues',
};

export default function VenuesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
