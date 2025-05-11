
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { RoomForm } from "@/components/admin/rooms/RoomForm";
import { PlusSquare } from "lucide-react";

export default function NewRoomPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <PlusSquare className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">Add New Room</CardTitle>
          </div>
          <CardDescription>Fill in the details below to add a new room to the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <RoomForm />
        </CardContent>
      </Card>
    </div>
  );
}
