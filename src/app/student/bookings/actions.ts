
"use server";

import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, Timestamp, query, where, orderBy, doc, getDoc } from "firebase/firestore";
import type { Booking, Room } from "@/types";
import { revalidatePath } from "next/cache";

const bookingsCollection = collection(db, "bookings");
const roomsCollection = collection(db, "rooms");


// Assume getCurrentUserId is a helper that gets the authenticated user's ID
// For mock purposes, we'll hardcode it or pass it.
async function getCurrentUserId(): Promise<string | null> {
  // In a real app, this would come from Firebase Auth or a session
  // For now, let's assume a mock student ID.
  // This needs to align with how user context is managed.
  // If localStorage 'userRole' and a corresponding 'userId' is set on login, use that.
  // For this demo, a hardcoded ID will be used.
  return "mock-student-user-id"; // Replace with actual user ID logic
}
async function getCurrentUserName(): Promise<string | null> {
    return "Mock Student User"; // Replace with actual user name logic
}


export async function createBookingRequest(data: Omit<Booking, "id" | "createdAt" | "updatedAt" | "status" | "requestedAt" | "userId" | "userName"> & { roomId: string; startDate: string; endDate: string; }) {
  const userId = await getCurrentUserId();
  const userName = await getCurrentUserName();

  if (!userId) {
    return { success: false, message: "User not authenticated." };
  }

  try {
    // Optional: Check room availability before creating request (more complex, involves date range checks)
    const roomRef = doc(db, "rooms", data.roomId);
    const roomSnap = await getDoc(roomRef);
    if (!roomSnap.exists()) {
        return { success: false, message: "Selected room does not exist." };
    }
    const roomData = roomSnap.data() as Room;


    const bookingData = {
      ...data,
      userId,
      userName: userName || userId,
      roomNumber: roomData.roomNumber, // Store room number for easier display
      startDate: Timestamp.fromDate(new Date(data.startDate)),
      endDate: Timestamp.fromDate(new Date(data.endDate)),
      status: "pending" as const, // All new requests are pending
      requestedAt: Timestamp.now(),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    await addDoc(bookingsCollection, bookingData);
    revalidatePath("/student/bookings");
    revalidatePath("/admin/bookings"); // Notify admin
    return { success: true, message: "Booking request submitted successfully." };
  } catch (error) {
    console.error("Error creating booking request:", error);
    return { success: false, message: "Failed to submit booking request." };
  }
}

export async function getStudentBookings(): Promise<Booking[]> {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  try {
    const q = query(bookingsCollection, where("userId", "==", userId), orderBy("requestedAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
  } catch (error) {
    console.error("Error fetching student bookings:", error);
    return [];
  }
}

export async function getAvailableRooms(): Promise<Room[]> {
    try {
        // This is a simplified version. A real availability check would need to consider booking dates.
        const q = query(roomsCollection, where("status", "==", "available"), orderBy("roomNumber", "asc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Room));
    } catch (error) {
        console.error("Error fetching available rooms:", error);
        return [];
    }
}
