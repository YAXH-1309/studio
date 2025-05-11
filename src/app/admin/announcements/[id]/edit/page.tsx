
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { AnnouncementForm } from "@/components/admin/announcements/AnnouncementForm";
import { BellPlus, Edit3 } from "lucide-react";
import { getAnnouncements } from "@/app/admin/announcements/actions"; // Re-use getAnnouncements
import type { Announcement } from "@/types";
import { notFound } from "next/navigation";

async function getAnnouncementById(id: string): Promise<Announcement | null> {
  const announcements = await getAnnouncements();
  const announcement = announcements.find(ann => ann.id === id);
  return announcement || null;
}


export default async function EditAnnouncementPage({ params }: { params: { id: string } }) {
  const announcement = await getAnnouncementById(params.id);

  if (!announcement) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Edit3 className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">Edit Announcement</CardTitle>
          </div>
          <CardDescription>Update the details for the announcement: {announcement.title}</CardDescription>
        </CardHeader>
        <CardContent>
          <AnnouncementForm announcement={announcement} />
        </CardContent>
      </Card>
    </div>
  );
}
