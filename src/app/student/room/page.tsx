
"use client"; // For potential future data fetching based on logged-in student

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { BedDouble, Users, Wifi, Bath, Loader2 } from "lucide-react";
import Image from "next/image";
import type { Room, User, Booking } from "@/types"; // Assuming types
import { Timestamp } from "firebase/firestore";

// Mock data - In a real app, this would be fetched based on the logged-in student's current booking
const mockRoomData: Room = {
  id: "room-a101",
  roomNumber: "A-101",
  type: "Double",
  capacity: 2,
  wing: "A",
  floor: "1st Floor",
  amenities: ["Wi-Fi", "Study Desk", "Wardrobe"],
  status: "occupied",
  createdAt: Timestamp.now(),
  currentOccupants: ["mock-student-user-id", "alex-johnson-id"],
};

const mockRoommateData: User = {
  id: "alex-johnson-id",
  name: "Alex Johnson",
  email: "alex.j@example.com",
  role: "student",
};


export default function StudentRoomPage() {
  const [roomDetails, setRoomDetails] = useState<Room | null>(null);
  const [roommate, setRoommate] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data for the current student's room
    // This would involve:
    // 1. Get current student's ID.
    // 2. Find their active 'approved' booking.
    // 3. Get room details from booking.roomId.
    // 4. Get roommate details if room.currentOccupants contains other IDs.
    setTimeout(() => { // Simulate async fetch
      setRoomDetails(mockRoomData);
      // If mockRoomData.currentOccupants has another ID besides the current student, fetch that roommate
      if (mockRoomData.currentOccupants && mockRoomData.currentOccupants.length > 1 && mockRoomData.currentOccupants.includes("alex-johnson-id")) {
        setRoommate(mockRoommateData);
      }
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <p>Loading room details...</p>
      </div>
    );
  }

  if (!roomDetails) {
    return (
      <div className="space-y-6 text-center py-10">
         <BedDouble className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Room Assigned</h3>
        <p className="text-muted-foreground">It seems you are not currently assigned to a room, or your booking is pending approval.</p>
        <p className="text-muted-foreground">Please check your bookings page or contact administration.</p>
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <BedDouble className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">My Room Details</CardTitle>
          </div>
          <CardDescription>Information about your assigned room, amenities, and roommates. Firebase is connected; dynamic data based on your current booking is under development.</CardDescription>
        </CardHeader>
        <CardContent className="py-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Image 
                src={`https://picsum.photos/seed/${roomDetails.id}/500/350`}
                alt={`Hostel Room ${roomDetails.roomNumber}`} 
                width={500} 
                height={350} 
                className="rounded-lg shadow-md"
                data-ai-hint="dorm room"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Room Number: {roomDetails.roomNumber}</h3>
              <p className="text-muted-foreground">Floor: {roomDetails.floor || 'N/A'}, Wing: {roomDetails.wing || 'N/A'}</p>
              
              <div className="mt-4 space-y-3">
                <p className="flex items-center"><Users className="mr-2 h-5 w-5 text-primary/80" /> Room Type: {roomDetails.type} (Capacity: {roomDetails.capacity})</p>
                {roomDetails.amenities && roomDetails.amenities.length > 0 && (
                    <p className="flex items-center"><Wifi className="mr-2 h-5 w-5 text-primary/80" /> Amenities: {roomDetails.amenities.join(', ')}</p>
                )}
                {/* This is a simplification. Bathroom info might be part of amenities or a separate field. */}
                {roomDetails.amenities?.includes("Attached Bathroom") && 
                    <p className="flex items-center"><Bath className="mr-2 h-5 w-5 text-primary/80" /> Bathroom: Attached</p>
                }
              </div>

              {roommate && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Roommate(s):</h4>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>{roommate.name} (Contact: {roommate.email})</li>
                  </ul>
                </div>
              )}
              {!roommate && roomDetails.type !== "Single" && (
                 <div className="mt-6">
                  <h4 className="font-semibold mb-2">Roommate(s):</h4>
                  <p className="text-muted-foreground">No roommate currently assigned or information unavailable.</p>
                </div>
              )}
            </div>
          </div>
           <div className="text-center mt-12">
             <h3 className="text-xl font-semibold mb-2">Room Policies Feature Coming Soon</h3>
             <p className="text-muted-foreground">Detailed room policies and guidelines will be displayed here.</p>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
