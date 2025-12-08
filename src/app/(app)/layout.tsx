import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import type { ReactNode } from 'react';
import { FirebaseClientProvider } from '@/firebase';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <FirebaseClientProvider>
      <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col border-x">
        <SidebarProvider>
          <Sidebar collapsible="none">
            <AppSidebar />
          </Sidebar>
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      </div>
    </FirebaseClientProvider>
  );
}
