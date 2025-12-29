'use client'

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        const redirect = encodeURIComponent(pathname || '/');
        router.replace(`/auth/login?redirect=${redirect}`);
      } else if (user?.role !== 'admin') {
        router.replace('/');
      }
    }
  }, [isAuthenticated, isLoading, user, pathname, router]);

  if (isLoading || !isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}