
"use server";

import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, Timestamp, query, orderBy } from "firebase/firestore";
import type { User, UserRole } from "@/types";
import { revalidatePath } from "next/cache";

const usersCollection = collection(db, "users");

export async function createUser(data: Omit<User, "id" | "createdAt" | "updatedAt" | "lastLogin">) {
  try {
    const userData = {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    const docRef = await addDoc(usersCollection, userData);
    revalidatePath("/admin/users");
    return { success: true, message: "User created successfully.", userId: docRef.id };
  } catch (error) {
    console.error("Error creating user:", error);
    // Consider more specific error messages based on error codes if using Firebase Auth
    if (error instanceof Error && error.message.includes("email-already-in-use")) {
         return { success: false, message: "Email already in use." };
    }
    return { success: false, message: "Failed to create user." };
  }
}

export async function getUsers(): Promise<User[]> {
  try {
    const q = query(usersCollection, orderBy("name", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const userRef = doc(db, "users", id);
    const userSnap = await getDocs(query(usersCollection, where("id", "==", id))); // This is not efficient, better to use doc(db, "users", id) and getDoc
     if (!userSnap.empty) {
        const userData = userSnap.docs[0].data();
        return { id: userSnap.docs[0].id, ...userData } as User;
    }
    // Fallback if direct getDoc is preferred:
    // const userSnap = await getDoc(userRef);
    // if (userSnap.exists()) {
    //   return { id: userSnap.id, ...userSnap.data() } as User;
    // }
    return null;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
}


export async function updateUser(id: string, data: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>) {
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, { ...data, updatedAt: Timestamp.now() });
    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${id}/edit`);
    // Also revalidate profile pages if they exist and show this user's data
    revalidatePath(`/${data.role}/profile`, 'layout'); // Revalidate layout to update user name in header if changed
    return { success: true, message: "User updated successfully." };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, message: "Failed to update user." };
  }
}

export async function deleteUser(id: string) {
  try {
    // Add checks here: e.g., cannot delete the last admin, or handle related data (bookings, etc.)
    const userRef = doc(db, "users", id);
    await deleteDoc(userRef);
    revalidatePath("/admin/users");
    return { success: true, message: "User deleted successfully." };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, message: "Failed to delete user." };
  }
}
