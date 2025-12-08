'use client';

import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import type { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export function AppLayoutContent({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <Sidebar collapsible={'offcanvas'}>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
