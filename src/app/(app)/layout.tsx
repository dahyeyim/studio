'use client';

import type { ReactNode } from 'react';
import { FirebaseClientProvider } from '@/firebase';
import { AppLayoutContent } from '@/components/app-layout-content';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <FirebaseClientProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </FirebaseClientProvider>
  );
}
