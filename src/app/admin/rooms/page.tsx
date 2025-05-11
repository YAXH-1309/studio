import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, PlusSquare } from "lucide-react";
import Image from "next/image";

export default function AdminRoomsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Room Management</CardTitle>
            </div>
            <Button>
              <PlusSquare className="mr-2 h-4 w-4" /> Add New Room
            </Button>
          </div>
          <CardDescription>Oversee room details, types, amenities, and current occupancy status.</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
           <Image 
            src="https://picsum.photos/seed/room-management/400/250" 
            alt="Room Management Placeholder" 
            width={400} 
            height={250} 
            className="mx-auto rounded-lg mb-6"
            data-ai-hint="modern interior"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          <h3 className="text-xl font-semibold mb-2">Room Management Feature Coming Soon</h3>
          <p className="text-muted-foreground">This section will provide tools to manage hostel rooms, inventory, and facilities.</p>
        </CardContent>
      </Card>
    </div>
  );
}
