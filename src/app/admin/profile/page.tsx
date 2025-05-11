
"use client"; // Required for useEffect and useState

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCog, Edit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/types"; // Assuming a User type exists
import { Timestamp } from "firebase/firestore";

// Mock function to fetch user data - replace with actual Firebase call
async function getAdminUserProfile(userId: string): Promise<User | null> {
  // In a real app, this would fetch from Firestore
  if (userId === "admin-user-id") {
    return {
      id: "admin-user-id",
      name: "Admin User",
      email: "admin@dormflow.com",
      role: "admin",
      contact: "0123-456-789",
      lastLogin: Timestamp.now(), // Firestore Timestamp
      createdAt: Timestamp.fromDate(new Date("2023-01-01")),
    };
  }
  return null;
}


export default function AdminProfilePage() {
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [lastLoginDate, setLastLoginDate] = useState<string | null>(null);

  useEffect(() => {
    // Mock fetching admin user data
    // In a real app, you'd get the current user's ID from auth context
    const currentUserId = "admin-user-id"; 
    getAdminUserProfile(currentUserId).then(user => {
      setAdminUser(user);
      if (user?.lastLogin) {
        setLastLoginDate(user.lastLogin.toDate().toLocaleDateString());
      } else {
        setLastLoginDate(new Date().toLocaleDateString()); // Fallback if no lastLogin
      }
    });
  }, []);

  if (!adminUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserCog className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Admin Profile</CardTitle>
            </div>
            <Button variant="outline" disabled> {/* Edit functionality not implemented yet */}
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
          <CardDescription>View and manage your administrator account details.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center text-center py-12">
          <Avatar className="h-32 w-32 mb-6 ring-4 ring-primary ring-offset-2 shadow-lg">
            <AvatarImage src={`https://picsum.photos/seed/${adminUser.id}/128/128`} alt={adminUser.name} data-ai-hint="professional person" />
            <AvatarFallback className="text-4xl">{adminUser.name.substring(0,2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h3 className="text-2xl font-semibold mb-1">{adminUser.name}</h3>
          <p className="text-muted-foreground mb-4">{adminUser.email}</p>
          
          <div className="mt-6 w-full max-w-md text-left space-y-3">
            <div className="flex justify-between p-3 border rounded-md"><span>Role:</span> <span className="font-medium text-destructive capitalize">{adminUser.role}</span></div>
            {lastLoginDate && (
              <div className="flex justify-between p-3 border rounded-md"><span>Last Login:</span> <span className="font-medium">{lastLoginDate}</span></div>
            )}
            {adminUser.contact && (
              <div className="flex justify-between p-3 border rounded-md"><span>Contact:</span> <span className="font-medium">{adminUser.contact}</span></div>
            )}
             {adminUser.createdAt && (
              <div className="flex justify-between p-3 border rounded-md"><span>Member Since:</span> <span className="font-medium">{adminUser.createdAt.toDate().toLocaleDateString()}</span></div>
            )}
          </div>
          <p className="mt-8 text-muted-foreground">Full profile editing and activity logs will be available in future updates.</p>
        </CardContent>
      </Card>
    </div>
  );
}
