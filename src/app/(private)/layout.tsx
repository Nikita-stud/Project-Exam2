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
  const router = useRouter();
  const [zustandLoad, setZustandLoad] = useState(() =>
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
    }
  }, [zustandLoad, token, router]);

  if (!token || !zustandLoad) {
    return null;
  }

  return <>{children}</>;
}
