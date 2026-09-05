import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saved Venues || Holidaze',
  description:
    'Saved Page for Holidaze, where you can view and manage your saved venues',
};

export default function SavedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
