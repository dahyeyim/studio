'use client';

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  ClipboardList,
  Users,
  HelpCircle,
  BotMessageSquare,
  Home,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
    },
    {
      href: '/schedule',
      label: 'Schedule',
      icon: ClipboardList,
    },
    {
      href: '/attendees',
      label: 'Attendees',
      icon: Users,
    },
    {
      href: '/questions',
      label: 'Q&A',
      icon: HelpCircle,
    },
  ];

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link href="/" className="flex items-center gap-2">
          <BotMessageSquare className="h-8 w-8 text-sidebar-primary" />
          <h2 className="text-xl font-semibold text-sidebar-foreground">
            The 2nd Korea-Mongolia Urban Forum
          </h2>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 text-xs text-sidebar-foreground/50">
        &copy; {new Date().getFullYear()} The 2nd Korea-Mongolia Urban Forum
      </SidebarFooter>
    </>
  );
}
