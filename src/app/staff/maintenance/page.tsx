
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, ListChecks, PlusCircle } from "lucide-react";
import Image from "next/image";

// Placeholder for actual form and actions
// import { MaintenanceTaskForm } from "@/components/staff/maintenance/MaintenanceTaskForm";
// import { getMaintenanceTasks } from "./actions";

export default function StaffMaintenancePage() {
  // const tasks = await getMaintenanceTasks(); // To list tasks
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wrench className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Maintenance Tasks</CardTitle>
            </div>
            <Button disabled> {/* Disabled until form and action are implemented */}
              <PlusCircle className="mr-2 h-4 w-4" /> New Task
            </Button>
          </div>
          <CardDescription>Schedule, assign, and track the status of maintenance tasks and repair work. Firebase is connected; task management features are under development.</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          {/* <MaintenanceTaskForm /> */}
          {/* Display list of tasks here */}
          <Image 
            src="https://picsum.photos/seed/staff-maintenance/400/250" 
            alt="Maintenance Placeholder" 
            width={400} 
            height={250} 
            className="mx-auto rounded-lg mb-6"
            data-ai-hint="tools workshop"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          <h3 className="text-xl font-semibold mb-2">Maintenance Management System Coming Soon</h3>
          <p className="text-muted-foreground">This section will enable staff to efficiently manage all maintenance activities using Firebase.</p>
        </CardContent>
      </Card>
    </div>
  );
}
