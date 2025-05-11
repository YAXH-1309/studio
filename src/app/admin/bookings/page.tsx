import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Briefcase, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">Booking Management</CardTitle>
          </div>
          <CardDescription>Review, approve, or reject booking requests. Manage existing bookings and view booking history.</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
           <Image 
            src="https://picsum.photos/seed/booking-management/400/250" 
            alt="Booking Management Placeholder" 
            width={400} 
            height={250} 
            className="mx-auto rounded-lg mb-6"
            data-ai-hint="calendar schedule"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          <h3 className="text-xl font-semibold mb-2">Booking Management Feature Coming Soon</h3>
          <p className="text-muted-foreground">Administrators will be able to manage all aspects of room bookings here.</p>
          <div className="mt-4 flex justify-center gap-4">
            <Button variant="outline"><CheckCircle className="mr-2 h-4 w-4" /> Approve Selected</Button>
            <Button variant="destructive"><XCircle className="mr-2 h-4 w-4" /> Reject Selected</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
