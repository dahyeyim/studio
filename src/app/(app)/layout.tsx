import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { FirebaseClientProvider } from '@/firebase';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <FirebaseClientProvider>
      <SidebarProvider>
        <Sidebar>
          <AppSidebar />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-2 border-b bg-background px-4 lg:h-[60px] lg:px-6 md:hidden">
            <Link
              href="/schedule"
              className="flex items-center gap-2 font-semibold"
            >
              <span className="text-sm font-medium">The 2nd</span>
              <span>Mongolia-Korea Urban Forum</span>
            </Link>
            <div className="ml-auto">
              <SidebarTrigger />
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </FirebaseClientProvider>
  );
}
