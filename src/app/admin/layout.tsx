import type { ReactNode } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import type { NavItem } from '@/types';

const adminNavItems: NavItem[] = [
  { href: '/admin', label: 'Dashboard', icon: 'LayoutDashboard', matchExact: true },
  { href: '/admin/users', label: 'User Management', icon: 'Users' },
  { href: '/admin/rooms', label: 'Room Management', icon: 'Building' },
  { href: '/admin/bookings', label: 'Bookings', icon: 'Briefcase' },
  { href: '/admin/announcements', label: 'Manage Announcements', icon: 'Bell' },
  { href: '/admin/reports', label: 'Reports', icon: 'BarChart3' },
  { href: '/admin/settings', label: 'System Settings', icon: 'Settings' },
  { href: '/directory', label: 'Directory', icon: 'BookUser' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout
      userRole="admin"
      navItems={adminNavItems}
      userName="Admin User" // Mock user name
    >
      {children}
    </AppLayout>
  );
}

