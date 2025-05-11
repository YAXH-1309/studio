
"use server";

import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc, Timestamp, query, orderBy, where, writeBatch } from "firebase/firestore";
import type { Booking, BookingStatus, Room } from "@/types";
import { revalidatePath } from "next/cache";

const bookingsCollection = collection(db, "bookings");
const roomsCollection = collection(db, "rooms");

export async function getAllBookings(): Promise<Booking[]> {
  try {
    const q = query(bookingsCollection, orderBy("requestedAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    return [];
  }
}

export async function updateBookingStatus(bookingId: string, newStatus: BookingStatus, adminNotes?: string): Promise<{ success: boolean; message: string }> {
  try {
    const bookingRef = doc(db, "bookings", bookingId);
    const bookingSnap = await getDocs(query(bookingsCollection, where("id", "==", bookingId))); // Not efficient
    // const bookingSnap = await getDoc(bookingRef);

    if (bookingSnap.empty) {
      return { success: false, message: "Booking not found." };
    }
    const bookingData = bookingSnap.docs[0].data() as Booking;


    const updateData: Partial<Booking> = {
      status: newStatus,
      updatedAt: Timestamp.now(),
    };
    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }

    const batch = writeBatch(db);
    batch.update(bookingRef, updateData);

    // If booking is approved, update room status to occupied
    // If booking is rejected/cancelled/completed AND it was previously approved, update room status to available
    // This is a simplified logic. Real-world scenario would involve checking dates, existing occupants etc.
    if (newStatus === 'approved') {
        const roomRef = doc(db, "rooms", bookingData.roomId);
        batch.update(roomRef, { status: 'occupied', updatedAt: Timestamp.now() });
    } else if (['rejected', 'cancelled', 'completed'].includes(newStatus) && bookingData.status === 'approved') {
        // Check if other approved bookings exist for this room before setting to available
        const otherBookingsQuery = query(bookingsCollection, 
            where('roomId', '==', bookingData.roomId), 
            where('status', '==', 'approved'),
            // where(documentId(), '!=', bookingId) // Firestore doesn't support inequality on documentId directly with other filters
        );
        const otherBookingsSnap = await getDocs(otherBookingsQuery);
        const activeOtherBookings = otherBookingsSnap.docs.filter(d => d.id !== bookingId);

        if (activeOtherBookings.length === 0) {
            const roomRef = doc(db, "rooms", bookingData.roomId);
            batch.update(roomRef, { status: 'available', updatedAt: Timestamp.now() });
        }
    }
    
    await batch.commit();

    revalidatePath("/admin/bookings");
    revalidatePath("/student/bookings"); // Student might see their booking status update
    revalidatePath("/admin/rooms"); // Room status might change
    return { success: true, message: `Booking status updated to ${newStatus}.` };
  } catch (error) {
    console.error("Error updating booking status:", error);
    return { success: false, message: "Failed to update booking status." };
  }
}
