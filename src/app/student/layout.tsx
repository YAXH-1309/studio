import type { ReactNode } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import type { NavItem } from '@/types';
import { LayoutDashboard, UserCircle, BedDouble, FileText, MessageSquare, Bell, BookUser, UploadCloud, AlertTriangle } from 'lucide-react';

const studentNavItems: NavItem[] = [
  { href: '/student', label: 'Dashboard', icon: LayoutDashboard, matchExact: true },
  { href: '/student/profile', label: 'My Profile', icon: UserCircle },
  { href: '/student/room', label: 'Room Details', icon: BedDouble },
  { href: '/student/bookings', label: 'Bookings & Requests', icon: FileText },
  { href: '/student/documents', label: 'My Documents', icon: UploadCloud },
  { href: '/student/complaints', label: 'Complaints/Requests', icon: AlertTriangle },
  { href: '/student/chat', label: 'Chat with Staff', icon: MessageSquare },
  { href: '/student/announcements', label: 'Announcements', icon: Bell },
  { href: '/directory', label: 'Directory', icon: BookUser },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout
      userRole="student"
      navItems={studentNavItems}
      userName="Student User" // Mock user name
    >
      {children}
    </AppLayout>
  );
}
