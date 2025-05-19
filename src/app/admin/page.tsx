import { PlaceholderCard } from '@/components/dashboard/shared/PlaceholderCard';
import { AnnouncementsFeed } from '@/components/dashboard/shared/AnnouncementsFeed';
import { Users, Building, Briefcase, Settings, BarChart3, Bell } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Admin Dashboard</CardTitle>
          <CardDescription className="text-primary-foreground/80">Welcome, Admin! Oversee and manage all aspects of HOSTEL MANAGEMENT SYSTEM.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-lg">
            You have full control over the system. Use the navigation to manage users, rooms, and settings.
          </p>
          <Image 
            src="https://picsum.photos/seed/admin-dashboard/200/100" 
            alt="Admin illustration" 
            width={200} 
            height={100} 
            className="rounded-md hidden md:block"
            data-ai-hint="office analytics"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PlaceholderCard
          title="User Management"
          description="Add, edit, or remove users and manage their roles."
          icon={Users}
          actionText="Manage Users"
          actionLink="/admin/users"
        />
        <PlaceholderCard
          title="Room Management"
          description="Oversee room allocations, types, and availability."
          icon={Building}
          actionText="Manage Rooms"
          actionLink="/admin/rooms"
        />
        <PlaceholderCard
          title="Booking Approvals"
          description="Review and approve/reject new booking requests."
          icon={Briefcase}
          actionText="View Bookings"
          actionLink="/admin/bookings"
        />
        <PlaceholderCard
          title="System Settings"
          description="Configure payment gateways, integrations, and global settings."
          icon={Settings}
          actionText="Go to Settings"
          actionLink="/admin/settings"
        />
        <PlaceholderCard
          title="Generate Reports"
          description="View system-wide reports on occupancy, financials, etc."
          icon={BarChart3}
          actionText="View Reports"
          actionLink="/admin/reports"
        />
         <PlaceholderCard
          title="Broadcast Announcements"
          description="Create and publish announcements for different user groups."
          icon={Bell}
          actionText="Manage Announcements"
          actionLink="/admin/announcements"
        />
      </div>
      
      <AnnouncementsFeed />
    </div>
  );
}
