'use client';

import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import type { ReactNode } from 'react';

export function AppLayoutContent({ children }: { children: ReactNode }) {

  return (
    <SidebarProvider>
      <Sidebar collapsible={'offcanvas'}>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
