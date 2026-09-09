'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthStore from '@/store/authStore';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = AuthStore((store) => store.token);
  const user = AuthStore((store) => store.user);

  const router = useRouter();
  const [zustandLoad, setZustandLoad] = useState<boolean>(() =>
    AuthStore.persist.hasHydrated(),
  );

  useEffect(() => {
    const stopListen = AuthStore.persist.onFinishHydration(() =>
      setZustandLoad(true),
    );
    return stopListen;
  }, []);

  useEffect(() => {
    if (zustandLoad && !token) {
      router.replace('/');
    } else if (zustandLoad && user?.venueManager) {
      router.replace('/');
    }
  }, [zustandLoad, token, user, router]);

  if (!token || !zustandLoad) {
    return null;
  }

  return <>{children}</>;
}
