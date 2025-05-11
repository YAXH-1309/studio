import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Bed, Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function StaffRoomsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bed className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">View Rooms</CardTitle>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filter Rooms
            </Button>
          </div>
          <CardDescription>Check room status, occupancy details, and upcoming vacancies.</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Image 
            src="https://picsum.photos/seed/staff-rooms/400/250" 
            alt="Room View Placeholder" 
            width={400} 
            height={250} 
            className="mx-auto rounded-lg mb-6"
            data-ai-hint="hotel lobby"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          <h3 className="text-xl font-semibold mb-2">Room Status Overview Coming Soon</h3>
          <p className="text-muted-foreground">Staff will be able to view detailed room information and statuses here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
