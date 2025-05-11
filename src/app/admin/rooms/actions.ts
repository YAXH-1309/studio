
"use server";

import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, Timestamp, query, orderBy } from "firebase/firestore";
import type { Room } from "@/types";
import { revalidatePath } from "next/cache";

const roomsCollection = collection(db, "rooms");

export async function createRoom(data: Omit<Room, "id" | "createdAt" | "updatedAt">) {
  try {
    const roomData = {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    const docRef = await addDoc(roomsCollection, roomData);
    revalidatePath("/admin/rooms");
    return { success: true, message: "Room created successfully.", roomId: docRef.id };
  } catch (error) {
    console.error("Error creating room:", error);
    return { success: false, message: "Failed to create room." };
  }
}

export async function getRooms(): Promise<Room[]> {
  try {
    const q = query(roomsCollection, orderBy("roomNumber", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Room));
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
}

export async function getRoomById(id: string): Promise<Room | null> {
  try {
    const roomRef = doc(db, "rooms", id);
    const roomSnap = await getDocs(query(roomsCollection, where("id", "==", id))); // Not efficient
    // const roomSnap = await getDoc(roomRef);
    if (!roomSnap.empty) {
        const roomData = roomSnap.docs[0].data();
        return { id: roomSnap.docs[0].id, ...roomData } as Room;
    }
    return null;
  } catch (error) {
    console.error("Error fetching room by ID:", error);
    return null;
  }
}

export async function updateRoom(id: string, data: Partial<Omit<Room, "id" | "createdAt" | "updatedAt">>) {
  try {
    const roomRef = doc(db, "rooms", id);
    await updateDoc(roomRef, { ...data, updatedAt: Timestamp.now() });
    revalidatePath("/admin/rooms");
    revalidatePath(`/admin/rooms/${id}/edit`);
    return { success: true, message: "Room updated successfully." };
  } catch (error) {
    console.error("Error updating room:", error);
    return { success: false, message: "Failed to update room." };
  }
}

export async function deleteRoom(id: string) {
  try {
    // Consider implications: what if room has active bookings or occupants?
    const roomRef = doc(db, "rooms", id);
    await deleteDoc(roomRef);
    revalidatePath("/admin/rooms");
    return { success: true, message: "Room deleted successfully." };
  } catch (error) {
    console.error("Error deleting room:", error);
    return { success: false, message: "Failed to delete room." };
  }
}
