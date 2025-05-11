import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { BellRing } from "lucide-react";

// Mock announcement data
const mockAnnouncements = [
  { id: 1, title: "Maintenance Schedule Update", content: "Water supply will be interrupted on 25th Dec from 2 PM to 4 PM for scheduled maintenance.", date: "2023-12-20", type: "Maintenance" },
  { id: 2, title: "Holiday Event: Christmas Party", content: "Join us for the annual Christmas party in the common hall on 24th Dec at 7 PM!", date: "2023-12-18", type: "Event" },
  { id: 3, title: "New Laundry Room Rules", content: "Please ensure you follow the new laundry room guidelines posted on the notice board.", date: "2023-12-15", type: "Notice" },
  { id: 4, title: "Security System Upgrade", content: "We've upgraded our security cameras for enhanced safety.", date: "2023-12-10", type: "Important" },
];

export function AnnouncementsFeed() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          <BellRing className="h-6 w-6 text-primary" />
          <CardTitle>Announcements</CardTitle>
        </div>
        <CardDescription>Latest updates and important notices.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72">
          <div className="space-y-4">
            {mockAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-3 border rounded-lg bg-secondary/30">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold">{announcement.title}</h4>
                  <Badge variant={announcement.type === 'Important' ? 'destructive' : 'secondary'}>{announcement.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{announcement.content}</p>
                <p className="text-xs text-muted-foreground/70">{new Date(announcement.date).toLocaleDateString()}</p>
              </div>
            ))}
             {mockAnnouncements.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No announcements at the moment.</p>
             )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
