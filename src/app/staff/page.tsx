import { PlaceholderCard } from '@/components/dashboard/shared/PlaceholderCard';
import { AnnouncementsFeed } from '@/components/dashboard/shared/AnnouncementsFeed';
import { Users, Bed, Wrench, Archive, CalendarDays, BarChart2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

export default function StaffDashboardPage() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Staff Dashboard</CardTitle>
          <CardDescription className="text-primary-foreground/80">Welcome, Staff! Manage hostel operations and resident services efficiently.</CardDescription>
        </CardHeader>
         <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-lg">
            Access tools for resident management, maintenance, inventory, and more.
          </p>
          <Image 
            src="https://picsum.photos/seed/staff-dashboard/200/100" 
            alt="Staff illustration" 
            width={200} 
            height={100} 
            className="rounded-md hidden md:block"
            data-ai-hint="team working"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PlaceholderCard
          title="Manage Residents"
          description="View assigned rooms/residents, add new residents."
          icon={Users}
          actionText="View Residents"
          actionLink="/staff/residents"
        />
        <PlaceholderCard
          title="View Rooms"
          description="Check room status and occupancy."
          icon={Bed}
          actionText="View Rooms"
          actionLink="/staff/rooms"
        />
        <PlaceholderCard
          title="Maintenance Tasks"
          description="Schedule and track maintenance jobs."
          icon={Wrench}
          actionText="Manage Tasks"
          actionLink="/staff/maintenance"
        />
        <PlaceholderCard
          title="Inventory Management"
          description="Update inventory and raise restock requests."
          icon={Archive}
          actionText="Manage Inventory"
          actionLink="/staff/inventory"
        />
        <PlaceholderCard
          title="Visitor Logs"
          description="Handle visitor entries and view logs."
          icon={CalendarDays}
          actionText="View Visitor Logs"
          actionLink="/staff/visitors"
        />
        <PlaceholderCard
          title="Generate Reports"
          description="Create limited reports on tasks and inventory."
          icon={BarChart2}
          actionText="View Reports"
          actionLink="/staff/reports"
        />
      </div>

      <AnnouncementsFeed />
    </div>
  );
}
