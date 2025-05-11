import type { ReactNode } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import type { NavItem } from '@/types';

const parentNavItems: NavItem[] = [
  { href: '/parent', label: 'Dashboard', icon: 'LayoutDashboard', matchExact: true },
  { href: '/parent/student-info', label: "Child's Info", icon: 'UserSearch' },
  { href: '/parent/announcements', label: 'Announcements', icon: 'Bell' },
  { href: '/directory', label: 'Hostel Directory', icon: 'BookUser' },
];

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout
      userRole="parent"
      navItems={parentNavItems}
      userName="Parent User" // Mock user name
    >
      {children}
    </AppLayout>
  );
}

