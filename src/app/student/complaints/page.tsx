
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Wrench, MessageSquarePlus } from "lucide-react";
import Image from "next/image";

// Placeholder for actual form and actions
// import { ComplaintForm } from "@/components/student/complaints/ComplaintForm";
// import { getStudentComplaints } from "./actions";

export default function StudentComplaintsPage() {
  // const complaints = await getStudentComplaints(); // To list existing complaints
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Complaints & Requests</CardTitle>
            </div>
            <Button disabled> {/* Disabled until form and action implemented */}
              <MessageSquarePlus className="mr-2 h-4 w-4" /> Submit New
            </Button>
          </div>
          <CardDescription>Submit maintenance requests, lodge complaints, or provide suggestions to the hostel staff. Firebase is connected; submission and tracking are under development.</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          {/* <ComplaintForm /> */}
          {/* Display list of complaints here */}
          <Image 
            src="https://picsum.photos/seed/student-complaints/400/250" 
            alt="Complaints Placeholder" 
            width={400} 
            height={250} 
            className="mx-auto rounded-lg mb-6"
            data-ai-hint="customer support"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          <h3 className="text-xl font-semibold mb-2">Request Tracking System Coming Soon</h3>
          <p className="text-muted-foreground">Students will be able to submit and track their requests or complaints here using Firebase.</p>
           <div className="mt-4 flex justify-center gap-4">
            <Button variant="outline" disabled><Wrench className="mr-2 h-4 w-4" /> Request Maintenance</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
