
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/types';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '../ui/button';
import { 
  PanelLeftClose, PanelRightClose, LayoutDashboard, Users, Building, Bell, Briefcase, Settings, BarChart3, BookUser, UserCircle, BedDouble, FileText, MessageSquare, UploadCloud, AlertTriangle, Wrench, Archive, CalendarDays, BarChart2, UserSearch, ShieldCheck, Bed, UserCog, type LucideIcon // Added UserCog
} from 'lucide-react';

interface SidebarNavigationProps {
  navItems: NavItem[];
  userRole: string; 
}

const iconComponents: { [key: string]: LucideIcon } = {
  LayoutDashboard,
  Users,
  Building,
  Bell,
  Briefcase,
  Settings,
  BarChart3,
  BookUser,
  UserCircle,
  BedDouble,
  FileText,
  MessageSquare,
  UploadCloud,
  AlertTriangle,
  Wrench,
  Archive,
  CalendarDays,
  BarChart2,
  UserSearch,
  ShieldCheck,
  Bed,
  UserCog, // Added UserCog
  User: UserCircle, // Map 'User' to UserCircle as a fallback or specific choice for Staff Profile
};

export function SidebarNavigation({ navItems, userRole }: SidebarNavigationProps) {
  const pathname = usePathname();
  const { state, toggleSidebar, isMobile } = useSidebar();

  const isActive = (item: NavItem) => {
    if (item.matchExact) {
      return pathname === item.href;
    }
    // For dashboard links, ensure exact match to avoid highlighting on sub-paths
    if (item.href === `/${userRole}` || item.href === '/admin' || item.href === '/student' || item.href === '/staff' || item.href === '/parent') {
        return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };
  
  if (isMobile) return null; 

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-2 flex justify-between items-center">
        {state === "expanded" && (
            <span className="text-sm font-semibold text-sidebar-foreground/70 pl-2 uppercase">
                {userRole} Menu
            </span>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8" aria-label="Toggle Sidebar">
            {state === "expanded" ? <PanelLeftClose /> : <PanelRightClose />}
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const IconComponent = iconComponents[item.icon];
            if (!IconComponent) {
              console.warn(`Icon not found for name: ${item.icon}, using default LayoutDashboard.`);
              const FallbackIcon = LayoutDashboard; // Fallback icon
              return (
                 <SidebarMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                    <SidebarMenuButton
                        asChild
                        isActive={isActive(item)}
                        tooltip={state === "collapsed" ? item.label : undefined}
                    >
                        <a>
                        <FallbackIcon />
                        <span>{item.label}</span>
                        </a>
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
              );
            }
            return (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item)}
                    tooltip={state === "collapsed" ? item.label : undefined}
                  >
                    <a>
                      <IconComponent />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      {state === "expanded" && (
        <SidebarFooter className="p-2">
          <p className="text-xs text-sidebar-foreground/60 text-center">
            HOSTEL MANAGEMENT SYSTEM &copy; {new Date().getFullYear()}
          </p>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
