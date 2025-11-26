import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import type { ReactNode } from 'react';
import { BotMessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 md:hidden">
          <Link href="/schedule" className="flex items-center gap-2 font-semibold">
            <BotMessageSquare className="h-6 w-6" />
            <span>The 2nd Korea-Mongolia Urban Forum</span>
          </Link>
          <div className="ml-auto">
            <SidebarTrigger />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
