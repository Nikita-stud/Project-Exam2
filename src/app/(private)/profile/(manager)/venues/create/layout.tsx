import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Venue || Holidaze',
  description:
    'Create Venue Page for Holidaze, where you can create your own venue and manage it',
};

export default function CreateVenueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
