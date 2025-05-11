
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { RoomForm } from "@/components/admin/rooms/RoomForm";
import { Building } from "lucide-react";
import { getRoomById } from "@/app/admin/rooms/actions";
import type { Room } from "@/types";
import { notFound } from "next/navigation";

async function getSingleRoom(id: string): Promise<Room | null> {
  const room = await getRoomById(id); // Assumes getRoomById fetches a single room
  return room || null;
}

export default async function EditRoomPage({ params }: { params: { id: string } }) {
  const room = await getSingleRoom(params.id);

  if (!room) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Building className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">Edit Room: {room.roomNumber}</CardTitle>
          </div>
          <CardDescription>Update the details for this room.</CardDescription>
        </CardHeader>
        <CardContent>
          <RoomForm room={room} />
        </CardContent>
      </Card>
    </div>
  );
}
