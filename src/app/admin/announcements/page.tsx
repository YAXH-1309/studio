import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellPlus, Edit3, Trash2 } from "lucide-react";
import Image from "next/image";

export default function AdminAnnouncementsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BellPlus className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Manage Announcements</CardTitle>
            </div>
            <Button>
              <BellPlus className="mr-2 h-4 w-4" /> Create New Announcement
            </Button>
          </div>
          <CardDescription>Create, edit, publish, and target announcements to specific user roles or dorms.</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
           <Image 
            src="https://picsum.photos/seed/announcements-admin/400/250" 
            alt="Announcements Management Placeholder" 
            width={400} 
            height={250} 
            className="mx-auto rounded-lg mb-6"
            data-ai-hint="communication megaphone"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          <h3 className="text-xl font-semibold mb-2">Announcement Management Feature Coming Soon</h3>
          <p className="text-muted-foreground">This section will allow admins to control all announcements within DormFlow.</p>
          <div className="mt-4 flex justify-center gap-4">
            <Button variant="outline"><Edit3 className="mr-2 h-4 w-4" /> Edit Existing</Button>
            <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete Selected</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
