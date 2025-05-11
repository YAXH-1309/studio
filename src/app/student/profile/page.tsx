import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle, Edit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function StudentProfilePage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserCircle className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">My Profile</CardTitle>
            </div>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
          <CardDescription>View and manage your personal information and hostel-related details.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center text-center py-12">
          <Avatar className="h-32 w-32 mb-6 ring-4 ring-primary ring-offset-2 shadow-lg">
            <AvatarImage src="https://picsum.photos/seed/student-user/128/128" alt="Student Name" data-ai-hint="student portrait"/>
            <AvatarFallback className="text-4xl">SU</AvatarFallback>
          </Avatar>
          <h3 className="text-2xl font-semibold mb-1">Student User</h3>
          <p className="text-muted-foreground mb-4">student.user@example.com</p>
          
          <div className="mt-6 w-full max-w-md text-left space-y-3">
            <div className="flex justify-between p-3 border rounded-md"><span>Room No:</span> <span className="font-medium">A-101</span></div>
            <div className="flex justify-between p-3 border rounded-md"><span>Course:</span> <span className="font-medium">Computer Science</span></div>
            <div className="flex justify-between p-3 border rounded-md"><span>Contact:</span> <span className="font-medium">+1 234 567 8900</span></div>
          </div>
          <Image 
            src="https://picsum.photos/seed/profile-details/400/200" 
            alt="Profile details placeholder" 
            width={400} 
            height={200} 
            className="mx-auto rounded-lg mt-8"
            data-ai-hint="personal documents"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
        </CardContent>
      </Card>
    </div>
  );
}
