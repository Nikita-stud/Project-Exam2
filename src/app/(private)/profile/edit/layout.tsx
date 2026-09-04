import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Profile || Holidaze',
  description:
    'Update your Holidaze profile details, such as bio, avatar and banner',
};

export default function EditProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
