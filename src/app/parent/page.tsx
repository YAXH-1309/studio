import { PlaceholderCard } from '@/components/dashboard/shared/PlaceholderCard';
import { AnnouncementsFeed } from '@/components/dashboard/shared/AnnouncementsFeed';
import { UserSearch, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

export default function ParentDashboardPage() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Parent Dashboard</CardTitle>
          <CardDescription className="text-primary-foreground/80">Welcome, Parent! Stay connected and informed about your child's hostel life.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-lg">
            Monitor your child's details and receive important announcements from the hostel.
          </p>
          <Image 
            src="https://picsum.photos/seed/parent-dashboard/200/100" 
            alt="Parent illustration" 
            width={200} 
            height={100} 
            className="rounded-md hidden md:block"
            data-ai-hint="family support"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <PlaceholderCard
          title="Child's Information"
          description="View your child's room details, attendance (if applicable), and other relevant information."
          icon={UserSearch}
          actionText="View Details"
          actionLink="/parent/student-info"
        />
        <PlaceholderCard
          title="Important Alerts"
          description="Receive critical alerts and notifications regarding your child or hostel events."
          icon={ShieldCheck}
        />
      </div>

      <AnnouncementsFeed />
    </div>
  );
}
