'use client';

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarMenuSkeleton,
} from '@/components/ui/sidebar';
import {
  ClipboardList,
  Users,
  HelpCircle,
  Home,
  Mic,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { useMemo } from 'react';

export function AppSidebar() {
  const pathname = usePathname();
  const { user, firestore, isUserLoading } = useFirebase();

  const attendeeQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return query(
      collection(firestore, 'attendees'),
      where('creatorId', '==', user.uid),
      limit(1)
    );
  }, [firestore, user?.uid]);

  const { data: attendeeData, isLoading: isAttendeeLoading } =
    useCollection(attendeeQuery);

  const hasRegistered = useMemo(
    () => (attendeeData ? attendeeData.length > 0 : false),
    [attendeeData]
  );
  
  const isLoading = isUserLoading || isAttendeeLoading;

  const baseMenuItems = [
    {
      href: '/schedule',
      label: 'Schedule',
      icon: ClipboardList,
    },
    {
      href: '/presenters',
      label: 'Presenters',
      icon: Mic,
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

  const menuItems = useMemo(() => {
    if (isLoading || hasRegistered) {
      return baseMenuItems;
    }
    return [
      {
        href: '/',
        label: 'Home',
        icon: Home,
      },
      ...baseMenuItems,
    ];
  }, [isLoading, hasRegistered, baseMenuItems]);


  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link href="/schedule" className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-sidebar-foreground">
            The 2nd Korea-Mongolia Urban Forum
          </h2>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {isLoading ? (
            <>
              <SidebarMenuSkeleton showIcon />
              <SidebarMenuSkeleton showIcon />
              <SidebarMenuSkeleton showIcon />
              <SidebarMenuSkeleton showIcon />
            </>
          ) : (
            menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={
                    pathname.startsWith(item.href) &&
                    (item.href !== '/' || pathname === '/')
                  }
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 text-xs text-sidebar-foreground/50">
        &copy; {new Date().getFullYear()} The 2nd Korea-Mongolia Urban Forum
      </SidebarFooter>
    </>
  );
}
