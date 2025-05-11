import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, PlusCircle, Download, RefreshCw } from "lucide-react";
import Image from "next/image";

export default function StudentBookingsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">My Bookings & Requests</CardTitle>
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> New Booking/Room Change
            </Button>
          </div>
          <CardDescription>Manage your room bookings, request changes, view billing history, and download invoices.</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Image 
            src="https://picsum.photos/seed/student-bookings/400/250" 
            alt="Bookings Placeholder" 
            width={400} 
            height={250} 
            className="mx-auto rounded-lg mb-6"
            data-ai-hint="invoice document"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          <h3 className="text-xl font-semibold mb-2">Booking & Invoice Management Coming Soon</h3>
          <p className="text-muted-foreground">This section will allow students to handle their bookings and financial records related to hostel accommodation.</p>
          <div className="mt-4 flex justify-center gap-4">
            <Button variant="outline"><RefreshCw className="mr-2 h-4 w-4" /> Request Room Change</Button>
            <Button variant="secondary"><Download className="mr-2 h-4 w-4" /> Download Last Invoice</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
