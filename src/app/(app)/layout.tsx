'use client';

import type { ReactNode } from 'react';
import { FirebaseClientProvider } from '@/firebase';
import { AppLayoutContent } from '@/components/app-layout-content';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';

function Header() {
  const { isMobile } = useSidebar();
  if (!isMobile) return null;

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />
    </header>
  );
}

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <FirebaseClientProvider>
      <AppLayoutContent>
        <div className="flex flex-1 flex-col">
          <Header />
          {children}
        </div>
      </AppLayoutContent>
    </FirebaseClientProvider>
  );
}
