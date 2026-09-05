import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Venue || Holidaze',
  description:
    'Edit Venue Page for Holidaze, where you can edit your existing venue and manage it',
};

export default function EditVenueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
