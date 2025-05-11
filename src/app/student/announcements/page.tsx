
import { AnnouncementsFeed } from '@/components/dashboard/shared/AnnouncementsFeed';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Bell } from 'lucide-react';

export default function StudentAnnouncementsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">All Announcements</CardTitle>
          </div>
          <CardDescription>Stay updated with all notices, events, and important information from the hostel administration.</CardDescription>
        </CardHeader>
      </Card>
      {/* AnnouncementsFeed is now client-side and fetches its own data */}
      <AnnouncementsFeed /> 
    </div>
  );
}
