
"use client"; // Required for useEffect and useState

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle, Edit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/types"; 
import { Timestamp } from "firebase/firestore";
import Image from "next/image";

// Mock function - replace with actual Firebase call
async function getStudentProfile(userId: string): Promise<User | null> {
  if (userId === "mock-student-user-id") { // Use the same ID as in student/bookings/actions.ts
    return {
      id: "mock-student-user-id",
      name: "Student User",
      email: "student.user@example.com",
      role: "student",
      contact: "+1 234 567 8900",
      course: "Computer Science",
      studentId: "STU-007",
      createdAt: Timestamp.fromDate(new Date("2023-08-15")),
    };
  }
  return null;
}


export default function StudentProfilePage() {
  const [studentUser, setStudentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUserId = "mock-student-user-id"; // Get from auth context in real app
    getStudentProfile(currentUserId).then(user => {
      setStudentUser(user);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!studentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Could not load profile data.</p>
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserCircle className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">My Profile</CardTitle>
            </div>
            <Button variant="outline" disabled> {/* Edit functionality not implemented yet */}
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
          <CardDescription>View and manage your personal information and hostel-related details. Profile editing is under development.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center text-center py-12">
          <Avatar className="h-32 w-32 mb-6 ring-4 ring-primary ring-offset-2 shadow-lg">
            <AvatarImage src={`https://picsum.photos/seed/${studentUser.id}/128/128`} alt={studentUser.name} data-ai-hint="student portrait"/>
            <AvatarFallback className="text-4xl">{studentUser.name.substring(0,2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h3 className="text-2xl font-semibold mb-1">{studentUser.name}</h3>
          <p className="text-muted-foreground mb-4">{studentUser.email}</p>
          
          <div className="mt-6 w-full max-w-md text-left space-y-3">
            {/* This should actually fetch room assigned to student from bookings or user profile */}
            <div className="flex justify-between p-3 border rounded-md"><span>Room No:</span> <span className="font-medium">A-101 (Placeholder)</span></div>
            {studentUser.course && <div className="flex justify-between p-3 border rounded-md"><span>Course:</span> <span className="font-medium">{studentUser.course}</span></div>}
            {studentUser.studentId && <div className="flex justify-between p-3 border rounded-md"><span>Student ID:</span> <span className="font-medium">{studentUser.studentId}</span></div>}
            {studentUser.contact && <div className="flex justify-between p-3 border rounded-md"><span>Contact:</span> <span className="font-medium">{studentUser.contact}</span></div>}
             {studentUser.createdAt && <div className="flex justify-between p-3 border rounded-md"><span>Joined:</span> <span className="font-medium">{(studentUser.createdAt as Timestamp).toDate().toLocaleDateString()}</span></div>}
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
            <p className="mt-4 text-muted-foreground">Full profile editing and document uploads will be available soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
