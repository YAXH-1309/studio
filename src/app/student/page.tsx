import { PlaceholderCard } from '@/components/dashboard/shared/PlaceholderCard';
import { AnnouncementsFeed } from '@/components/dashboard/shared/AnnouncementsFeed';
import { UserCircle, BedDouble, FileText, UploadCloud, AlertTriangle, MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Student Dashboard</CardTitle>
          <CardDescription className="text-primary-foreground/80">Welcome, Student! Access your hostel information and services.</CardDescription>
        </CardHeader>
         <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-lg">
            View your room details, make requests, and stay updated with announcements.
          </p>
          <Image 
            src="https://picsum.photos/seed/student-dashboard/200/100" 
            alt="Student illustration" 
            width={200} 
            height={100} 
            className="rounded-md hidden md:block"
            data-ai-hint="student studying"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PlaceholderCard
          title="My Profile"
          description="View and update your personal information."
          icon={UserCircle}
          actionText="View Profile"
          actionLink="/student/profile"
        />
        <PlaceholderCard
          title="Room Details"
          description="Check your assigned room, roommate info, and amenities."
          icon={BedDouble}
          actionText="View Room"
          actionLink="/student/room"
        />
        <PlaceholderCard
          title="Bookings & Invoices"
          description="Make new bookings, request room changes, view billing."
          icon={FileText}
          actionText="Manage Bookings"
          actionLink="/student/bookings"
        />
        <PlaceholderCard
          title="Upload Documents"
          description="Submit required personal documents securely."
          icon={UploadCloud}
          actionText="Upload Documents"
          actionLink="/student/documents"
        />
        <PlaceholderCard
          title="Complaints / Requests"
          description="Submit maintenance requests or other complaints."
          icon={AlertTriangle}
          actionText="Submit Request"
          actionLink="/student/complaints"
        />
        <PlaceholderCard
          title="Chat with Staff"
          description="Directly communicate with hostel staff for queries."
          icon={MessageSquare}
          actionText="Open Chat"
          actionLink="/student/chat"
        />
      </div>

      <AnnouncementsFeed />
    </div>
  );
}
