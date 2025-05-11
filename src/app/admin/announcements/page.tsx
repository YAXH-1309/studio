
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellPlus, Edit3, Trash2, PlusCircle, Eye } from "lucide-react";
import Link from "next/link";
import { getAnnouncements, deleteAnnouncement } from "./actions";
import type { Announcement } from "@/types";
import { Timestamp } from "firebase/firestore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AnnouncementForm } from "@/components/admin/announcements/AnnouncementForm";
import { DeleteButton } from "@/components/shared/DeleteButton";

function AnnouncementItem({ announcement }: { announcement: Announcement }) {
  const handleDelete = async () => {
    // This action is now handled by DeleteButton's server action prop
  };

  return (
    <Card className="mb-4 shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{announcement.title}</CardTitle>
            <CardDescription>
              Type: {announcement.type} | Date: {(announcement.date as Timestamp).toDate().toLocaleDateString()} | Status: {announcement.published ? "Published" : "Draft"}
            </CardDescription>
             {announcement.targetRoles && announcement.targetRoles.length > 0 && (
              <CardDescription className="text-xs">
                Targeted Roles: {announcement.targetRoles.join(", ")}
              </CardDescription>
            )}
          </div>
          <div className="flex gap-2">
            <Link href={`/admin/announcements/${announcement.id}/edit`}>
              <Button variant="outline" size="sm"><Edit3 className="mr-2 h-4 w-4" /> Edit</Button>
            </Link>
            <DeleteButton itemId={announcement.id} itemName={announcement.title} deleteAction={deleteAnnouncement} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground whitespace-pre-wrap">{announcement.content}</p>
      </CardContent>
    </Card>
  );
}

export default async function AdminAnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BellPlus className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Manage Announcements</CardTitle>
            </div>
            <Link href="/admin/announcements/new">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Announcement
              </Button>
            </Link>
          </div>
          <CardDescription>Create, edit, publish, and target announcements to specific user roles or dorms.</CardDescription>
        </CardHeader>
        <CardContent>
          {announcements.length === 0 ? (
            <div className="text-center py-12">
              <BellPlus className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Announcements Yet</h3>
              <p className="text-muted-foreground mb-4">Get started by creating your first announcement.</p>
              <Link href="/admin/announcements/new">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Create New Announcement
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((ann) => (
                <AnnouncementItem key={ann.id} announcement={ann} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
