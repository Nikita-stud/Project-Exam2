'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import AuthStore from '@/store/authStore';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = AuthStore((store) => store.token);
  const router = useRouter();

  const zustandLoad = useSyncExternalStore(
    AuthStore.persist.onFinishHydration,
    () => AuthStore.persist.hasHydrated(),
    () => false,
  );

  useEffect(() => {
    if (zustandLoad && !token) {
      router.replace('/');
    }
  }, [zustandLoad, token, router]);

  if (!token || !zustandLoad) {
    return null;
  }

  return <>{children}</>;
}
