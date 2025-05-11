
import { AnnouncementsFeed } from '@/components/dashboard/shared/AnnouncementsFeed';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Bell } from 'lucide-react';

export default function ParentAnnouncementsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">Hostel Announcements for Parents</CardTitle>
          </div>
          <CardDescription>Keep up-to-date with news, events, and important notices concerning students and the hostel.</CardDescription>
        </CardHeader>
      </Card>
      <AnnouncementsFeed />
    </div>
  );
}
