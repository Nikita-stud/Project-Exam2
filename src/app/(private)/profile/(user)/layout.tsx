'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthStore from '@/store/authStore';

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = AuthStore((store) => store.user);
  const router = useRouter();

  useEffect(() => {
    if (user?.venueManager) {
      router.replace('/profile');
    }
  }, [user, router]);

  if (user?.venueManager) {
    return null;
  }

  return <>{children}</>;
}
