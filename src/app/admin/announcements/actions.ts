
"use server";

import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, Timestamp, query, orderBy, where } from "firebase/firestore";
import type { Announcement, UserRole } from "@/types";
import { revalidatePath } from "next/cache";

const announcementsCollection = collection(db, "announcements");

export async function createAnnouncement(data: Omit<Announcement, "id" | "createdAt" | "updatedAt" | "date"> & { date: string }) {
  try {
    const announcementData = {
      ...data,
      date: Timestamp.fromDate(new Date(data.date)),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    await addDoc(announcementsCollection, announcementData);
    revalidatePath("/admin/announcements");
    revalidatePath("/student/announcements"); // Revalidate for other roles too
    revalidatePath("/staff/announcements");
    revalidatePath("/parent/announcements");
    return { success: true, message: "Announcement created successfully." };
  } catch (error) {
    console.error("Error creating announcement:", error);
    return { success: false, message: "Failed to create announcement." };
  }
}

export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const q = query(announcementsCollection, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Announcement));
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
}

// Get announcements relevant for a specific user role
export async function getAnnouncementsForRole(role: UserRole | null): Promise<Announcement[]> {
  if (!role) return [];
  try {
    // Fetch announcements that are public (no targetRoles) or target the specific role
    const q = query(
        announcementsCollection, 
        where("published", "==", true),
        orderBy("date", "desc")
    );
    const querySnapshot = await getDocs(q);
    const allAnnouncements = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Announcement));
    
    return allAnnouncements.filter(ann => 
        !ann.targetRoles || ann.targetRoles.length === 0 || ann.targetRoles.includes(role)
    );

  } catch (error) {
    console.error(`Error fetching announcements for role ${role}:`, error);
    return [];
  }
}


export async function updateAnnouncement(id: string, data: Partial<Omit<Announcement, "id" | "createdAt" | "updatedAt">> & { date?: string }) {
  try {
    const announcementRef = doc(db, "announcements", id);
    const updateData: Partial<Announcement> = { ...data, updatedAt: Timestamp.now() };
    if (data.date) {
      updateData.date = Timestamp.fromDate(new Date(data.date));
    }
    await updateDoc(announcementRef, updateData);
    revalidatePath("/admin/announcements");
    revalidatePath("/student/announcements");
    revalidatePath("/staff/announcements");
    revalidatePath("/parent/announcements");
    return { success: true, message: "Announcement updated successfully." };
  } catch (error) {
    console.error("Error updating announcement:", error);
    return { success: false, message: "Failed to update announcement." };
  }
}

export async function deleteAnnouncement(id: string) {
  try {
    const announcementRef = doc(db, "announcements", id);
    await deleteDoc(announcementRef);
    revalidatePath("/admin/announcements");
    revalidatePath("/student/announcements");
    revalidatePath("/staff/announcements");
    revalidatePath("/parent/announcements");
    return { success: true, message: "Announcement deleted successfully." };
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return { success: false, message: "Failed to delete announcement." };
  }
}
