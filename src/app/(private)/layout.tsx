'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthStore from '@/store/authStore';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = AuthStore((store) => store.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) router.replace('/');
  }, [token, router]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
