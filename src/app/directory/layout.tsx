"use client"; // AppLayout is a client component because SidebarProvider is client-side

import type { ReactNode} from 'react';
import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import type { NavItem, UserRole } from '@/types';
import { LayoutDashboard, Users, Building, Bell, Briefcase, Settings, BarChart3, BookUser, UserCircle, BedDouble, FileText, MessageSquare, UploadCloud, AlertTriangle, Wrench, Archive, CalendarDays, UserSearch, ShieldCheck } from 'lucide-react';

// Helper to get NavItems based on role
const getNavItemsForRole = (role: UserRole | null): NavItem[] => {
  if (!role) return []; // Default or empty nav
  switch (role) {
    case 'admin':
      return [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, matchExact: true },
        { href: '/admin/users', label: 'User Management', icon: Users },
        { href: '/admin/rooms', label: 'Room Management', icon: Building },
        { href: '/admin/bookings', label: 'Bookings', icon: Briefcase },
        { href: '/admin/announcements', label: 'Manage Announcements', icon: Bell },
        { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
        { href: '/admin/settings', label: 'System Settings', icon: Settings },
        { href: '/directory', label: 'Directory', icon: BookUser },
      ];
    case 'student':
      return [
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
    case 'staff':
      return [
        { href: '/staff', label: 'Dashboard', icon: LayoutDashboard, matchExact: true },
        { href: '/staff/residents', label: 'Manage Residents', icon: Users },
        { href: '/staff/rooms', label: 'View Rooms', icon: BedDouble },
        { href: '/staff/maintenance', label: 'Maintenance Tasks', icon: Wrench },
        { href: '/staff/inventory', label: 'Inventory', icon: Archive },
        { href: '/staff/visitors', label: 'Visitor Logs', icon: CalendarDays },
        { href: '/staff/reports', label: 'Generate Reports', icon: BarChart2 },
        { href: '/staff/announcements', label: 'View Announcements', icon: Bell },
        { href: '/directory', label: 'Directory', icon: BookUser },
      ];
    case 'parent':
      return [
        { href: '/parent', label: 'Dashboard', icon: LayoutDashboard, matchExact: true },
        { href: '/parent/student-info', label: "Child's Info", icon: UserSearch },
        { href: '/parent/announcements', label: 'Announcements', icon: Bell },
        { href: '/directory', label: 'Hostel Directory', icon: BookUser },
      ];
    default:
      return [];
  }
};

const getUserNameForRole = (role: UserRole | null): string => {
  if (!role) return "Guest User";
  switch (role) {
    case 'admin': return "Admin User";
    case 'student': return "Student User";
    case 'staff': return "Staff Member";
    case 'parent': return "Parent User";
    default: return "Guest User";
  }
}


export default function DirectoryLayout({ children }: { children: React.ReactNode }) {
  const [currentUserRole, setCurrentUserRole] = useState<UserRole | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Attempt to get role from localStorage (set during mock login)
    const storedRole = localStorage.getItem('userRole') as UserRole | null;
    if (storedRole) {
      setCurrentUserRole(storedRole);
    } else {
      // Fallback or redirect if no role found (e.g., direct access without login)
      // For now, defaulting to a generic state or could redirect to /login
      // This part might need refinement based on actual auth flow
      // router.push('/login'); 
    }
  }, []);
  
  if (!mounted) {
     // Or a loading skeleton for AppLayout
    return <div className="flex min-h-screen items-center justify-center"><p>Loading directory...</p></div>;
  }

  if (!currentUserRole) {
    // Handle case where role couldn't be determined, possibly redirect
     return <div className="flex min-h-screen items-center justify-center"><p>Access denied. Please log in.</p></div>;
  }
  
  const navItems = getNavItemsForRole(currentUserRole);
  const userName = getUserNameForRole(currentUserRole);

  return (
    <AppLayout
      userRole={currentUserRole}
      navItems={navItems}
      userName={userName}
    >
      {children}
    </AppLayout>
  );
}
