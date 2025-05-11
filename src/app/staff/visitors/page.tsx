import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, UserCheck, UserPlus } from "lucide-react";
import Image from "next/image";

export default function StaffVisitorsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Visitor Logs</CardTitle>
            </div>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> New Visitor Entry
            </Button>
          </div>
          <CardDescription>Manage visitor entries, track visitor history, and ensure security protocols.</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Image 
            src="https://picsum.photos/seed/staff-visitors/400/250" 
            alt="Visitor Log Placeholder" 
            width={400} 
            height={250} 
            className="mx-auto rounded-lg mb-6"
            data-ai-hint="guest reception"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          <h3 className="text-xl font-semibold mb-2">Visitor Management System Coming Soon</h3>
          <p className="text-muted-foreground">This section will help staff manage guest and visitor access to the hostel premises.</p>
        </CardContent>
      </Card>
    </div>
  );
}
