
"use client"; // For potential future data fetching based on logged-in parent

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { UserSearch, Bed, CalendarCheck2, Award, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import type { User, Room, Booking } from "@/types"; // Assuming types
import { Timestamp } from "firebase/firestore";

// Mock data - In a real app, this would be fetched based on the logged-in parent's associated child
const mockChildData: User = {
  id: "child-student-id-123",
  name: "Child Student Name",
  email: "child.student@example.com",
  role: "student",
  studentId: "STU-12345",
  course: "Engineering",
  createdAt: Timestamp.now(),
};

const mockChildRoomData: Room = {
  id: "room-b203",
  roomNumber: "B-203",
  type: "Single",
  capacity: 1,
  wing: "B",
  floor: "2nd Floor",
  status: "occupied",
  createdAt: Timestamp.now(),
};

// This would be fetched from bookings collection or a denormalized field on user
const mockAttendance = "95%"; 
const mockAchievements = ["Dean's List - Semester 1", "Won Inter-Hostel Debate Competition"];

export default function ParentStudentInfoPage() {
  const [childInfo, setChildInfo] = useState<User | null>(null);
  const [childRoom, setChildRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data for the parent's child
    // This would involve:
    // 1. Get current parent's ID.
    // 2. Get associatedChildId from parent's profile.
    // 3. Fetch child's User data.
    // 4. Fetch child's active Booking, then Room data.
    setTimeout(() => { // Simulate async fetch
      setChildInfo(mockChildData);
      setChildRoom(mockChildRoomData); // This should be from child's current booking
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <p>Loading child's information...</p>
      </div>
    );
  }

  if (!childInfo) {
    return (
      <div className="space-y-6 text-center py-10">
         <UserSearch className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Child Information Not Found</h3>
        <p className="text-muted-foreground">Could not load information for the associated child. Please ensure your account is correctly linked or contact administration.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <UserSearch className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">My Child's Information</CardTitle>
          </div>
          <CardDescription>View details about your child's accommodation and progress. Firebase is connected; dynamic data fetching is under development.</CardDescription>
        </CardHeader>
        <CardContent className="py-8">
           <div className="flex flex-col items-center text-center mb-8">
            <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary ring-offset-1">
              <AvatarImage src={`https://picsum.photos/seed/${childInfo.id}/128/128`} alt={childInfo.name} data-ai-hint="student child" />
              <AvatarFallback className="text-3xl">{childInfo.name.substring(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">{childInfo.name}</h3>
            <p className="text-muted-foreground">Student ID: {childInfo.studentId || 'N/A'}</p>
             <p className="text-sm text-muted-foreground">Course: {childInfo.course || 'N/A'}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Room Number</CardTitle>
                <Bed className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{childRoom?.roomNumber || 'N/A'}</div>
                <p className="text-xs text-muted-foreground">{childRoom?.wing || 'N/A'}, {childRoom?.floor || 'N/A'}</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance (Mock)</CardTitle>
                <CalendarCheck2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockAttendance}</div>
                <p className="text-xs text-muted-foreground">Last updated: Today</p>
              </CardContent>
            </Card>
             <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Achievements (Mock)</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {mockAchievements.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {mockAchievements.map((ach, idx) => <li key={idx}>{ach}</li>)}
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground">No recent achievements logged.</p>
                )}
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
            <p className="text-muted-foreground">Parents will have access to more comprehensive details about their child's hostel stay here, fetched from Firebase.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
