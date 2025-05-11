import type { ReactNode } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import type { NavItem } from '@/types';

const staffNavItems: NavItem[] = [
  { href: '/staff', label: 'Dashboard', icon: 'LayoutDashboard', matchExact: true },
  { href: '/staff/residents', label: 'Manage Residents', icon: 'Users' },
  { href: '/staff/rooms', label: 'View Rooms', icon: 'Bed' }, // Bed icon for staff rooms
  { href: '/staff/maintenance', label: 'Maintenance Tasks', icon: 'Wrench' },
  { href: '/staff/inventory', label: 'Inventory', icon: 'Archive' },
  { href: '/staff/visitors', label: 'Visitor Logs', icon: 'CalendarDays' },
  { href: '/staff/reports', label: 'Generate Reports', icon: 'BarChart2' },
  { href: '/staff/announcements', label: 'View Announcements', icon: 'Bell' },
  { href: '/directory', label: 'Directory', icon: 'BookUser' },
];

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout
      userRole="staff"
      navItems={staffNavItems}
      userName="Staff Member" // Mock user name
    >
      {children}
    </AppLayout>
  );
}

