import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { BedDouble, Users, Wifi, Bath } from "lucide-react";
import Image from "next/image";

export default function StudentRoomPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <BedDouble className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">My Room Details</CardTitle>
          </div>
          <CardDescription>Information about your assigned room, amenities, and roommates.</CardDescription>
        </CardHeader>
        <CardContent className="py-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Image 
                src="https://picsum.photos/seed/hostel-room/500/350" 
                alt="Hostel Room" 
                width={500} 
                height={350} 
                className="rounded-lg shadow-md"
                data-ai-hint="dorm room"
                placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Room Number: A-101</h3>
              <p className="text-muted-foreground">Floor: 1st Floor, Wing A</p>
              
              <div className="mt-4 space-y-3">
                <p className="flex items-center"><Users className="mr-2 h-5 w-5 text-primary/80" /> Room Type: Double Occupancy</p>
                <p className="flex items-center"><Wifi className="mr-2 h-5 w-5 text-primary/80" /> Amenities: Wi-Fi, Study Desk, Wardrobe</p>
                <p className="flex items-center"><Bath className="mr-2 h-5 w-5 text-primary/80" /> Bathroom: Attached</p>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-2">Roommate(s):</h4>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Alex Johnson (Contact: alex.j@example.com)</li>
                </ul>
              </div>
            </div>
          </div>
           <div className="text-center mt-12">
             <h3 className="text-xl font-semibold mb-2">Room Policies Feature Coming Soon</h3>
             <p className="text-muted-foreground">Detailed room policies and guidelines will be displayed here.</p>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
