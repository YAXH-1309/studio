
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { AnnouncementForm } from "@/components/admin/announcements/AnnouncementForm";
import { BellPlus } from "lucide-react";

export default function NewAnnouncementPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <BellPlus className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">Create New Announcement</CardTitle>
          </div>
          <CardDescription>Fill in the details below to create a new announcement.</CardDescription>
        </CardHeader>
        <CardContent>
          <AnnouncementForm />
        </CardContent>
      </Card>
    </div>
  );
}
