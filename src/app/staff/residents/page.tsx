
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, UserPlus, Search } from "lucide-react";
import Image from "next/image";
// import { getUsers } from "@/app/admin/users/actions"; // Can reuse if staff have permission
// import type { User } from "@/types";

export default async function StaffResidentsPage() {
  // const residents = (await getUsers()).filter(user => user.role === 'student'); // Example: filter users
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Manage Residents</CardTitle>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search residents..." className="pl-8 sm:w-[300px]" disabled />
              </div>
              <Button disabled> {/* Staff might not add users directly, admins do. Or this links to a specific form */}
                <UserPlus className="mr-2 h-4 w-4" /> Add Resident
              </Button>
            </div>
          </div>
          <CardDescription>View resident details, manage check-ins/outs, and update information. Firebase is connected; resident data will be fetched from the 'users' collection.</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          {/* Display list of residents (students) here */}
          <Image 
            src="https://picsum.photos/seed/staff-residents/400/250" 
            alt="Residents Management Placeholder" 
            width={400} 
            height={250} 
            className="mx-auto rounded-lg mb-6"
            data-ai-hint="community people"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          <h3 className="text-xl font-semibold mb-2">Resident Management Tools Coming Soon</h3>
          <p className="text-muted-foreground">This section will provide staff with tools to manage resident information and activities, drawing data from Firebase.</p>
        </CardContent>
      </Card>
    </div>
  );
}
