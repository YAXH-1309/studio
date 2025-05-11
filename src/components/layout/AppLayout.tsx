"use client"; // SidebarProvider uses client features

import type { ReactNode } from 'react';
import { AppHeader } from './AppHeader';
import { SidebarNavigation } from './SidebarNavigation';
import type { NavItem, UserRole } from '@/types';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

interface AppLayoutProps {
  children: ReactNode;
  userRole: UserRole;
  navItems: NavItem[];
  userName: string; // Mock user name
}

export default function AppLayout({ children, userRole, navItems, userName }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-background">
        <SidebarNavigation navItems={navItems} userRole={userRole} />
        <div className="flex flex-1 flex-col">
          <AppHeader userRole={userRole} userName={userName} />
          <SidebarInset>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              {children}
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
