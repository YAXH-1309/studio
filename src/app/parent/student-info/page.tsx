import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { UserSearch, Bed, CalendarCheck2, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function ParentStudentInfoPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <UserSearch className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">My Child's Information</CardTitle>
          </div>
          <CardDescription>View details about your child's accommodation and progress.</CardDescription>
        </CardHeader>
        <CardContent className="py-8">
           <div className="flex flex-col items-center text-center mb-8">
            <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary ring-offset-1">
              <AvatarImage src="https://picsum.photos/seed/child-student/128/128" alt="Child's Name" data-ai-hint="student child" />
              <AvatarFallback className="text-3xl">CS</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">Child Student Name</h3>
            <p className="text-muted-foreground">Student ID: STU-12345</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Room Number</CardTitle>
                <Bed className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">A-101</div>
                <p className="text-xs text-muted-foreground">Wing A, 1st Floor</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance (Mock)</CardTitle>
                <CalendarCheck2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95%</div>
                <p className="text-xs text-muted-foreground">Last updated: Today</p>
              </CardContent>
            </Card>
             <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Achievements (Mock)</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Dean's List - Semester 1</li>
                    <li>Won Inter-Hostel Debate Competition</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Image 
              src="https://picsum.photos/seed/parent-info/400/200" 
              alt="Parent Information Placeholder" 
              width={400} 
              height={200} 
              className="mx-auto rounded-lg mb-6"
              data-ai-hint="family connection"
              placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              />
            <h3 className="text-xl font-semibold mb-2">More Detailed Information Coming Soon</h3>
            <p className="text-muted-foreground">Parents will have access to more comprehensive details about their child's hostel stay here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
