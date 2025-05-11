
import type { LucideIcon } from 'lucide-react';
import type { Timestamp } from 'firebase/firestore';

export type UserRole = "admin" | "student" | "staff" | "parent";

export interface NavItem {
  href: string;
  label: string;
  icon: string; 
  matchExact?: boolean; 
  children?: NavItem[];
  role?: UserRole[]; 
}

// Firestore Document Interfaces
export interface FirestoreDocument {
  id: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface User extends FirestoreDocument {
  name: string;
  email: string;
  role: UserRole;
  contact?: string;
  // For student
  course?: string;
  studentId?: string;
  // For parent
  associatedChildId?: string; // Student's ID
  // For staff
  department?: string;
  lastLogin?: Timestamp; // Example field
}

export interface Announcement extends FirestoreDocument {
  title: string;
  content: string;
  date: Timestamp; // Or string if you prefer to store as ISO string
  type: 'Maintenance' | 'Event' | 'Notice' | 'Important' | string; // string for flexibility
  targetRoles?: UserRole[];
  targetDorms?: string[]; // If applicable
  published: boolean;
  authorId?: string; // User ID of creator
}

export interface Room extends FirestoreDocument {
  roomNumber: string;
  type: 'Single' | 'Double' | 'Suite' | string; // e.g., "A-101"
  capacity: number;
  wing?: string;
  floor?: string;
  amenities?: string[]; // e.g., ["Wi-Fi", "Study Desk", "Wardrobe"]
  status: 'available' | 'occupied' | 'maintenance';
  currentOccupants?: string[]; // Array of User IDs
}

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'cancelled' | 'completed';

export interface Booking extends FirestoreDocument {
  userId: string; // User ID of student making booking
  userName?: string; // For display purposes
  roomId: string; 
  roomNumber?: string; // For display purposes
  startDate: Timestamp;
  endDate: Timestamp;
  status: BookingStatus;
  notes?: string; // Student notes
  adminNotes?: string; // Admin notes
  requestedAt: Timestamp;
}

export interface MaintenanceTask extends FirestoreDocument {
  title: string;
  description: string;
  roomId?: string; // Optional, if task is room-specific
  reportedByUserId?: string; // Student/Staff who reported
  assignedToUserId?: string; // Staff ID
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  deadline?: Timestamp;
}

export interface InventoryItem extends FirestoreDocument {
  name: string;
  category: string;
  quantity: number;
  minStockLevel?: number;
  unit: string; // e.g., "pcs", "kg", "ltr"
  lastRestocked?: Timestamp;
}

export interface VisitorLog extends FirestoreDocument {
  visitorName: string;
  residentId: string; // Student ID they are visiting
  residentName?: string;
  checkInTime: Timestamp;
  checkOutTime?: Timestamp;
  purpose?: string;
  staffIdRecordedBy?: string; // Staff who logged
}

export interface Complaint extends FirestoreDocument {
  submittedByUserId: string;
  submittedByName?: string;
  title: string;
  description: string;
  type: 'maintenance' | 'room' | 'staff' | 'general' | string;
  status: 'new' | 'investigating' | 'resolved' | 'closed';
  resolvedAt?: Timestamp;
  resolutionNotes?: string;
}

export interface UserDocument extends FirestoreDocument {
  userId: string;
  documentName: string;
  documentType: 'ID Proof' | 'Address Proof' | 'Academic' | string;
  fileUrl?: string; // URL from Firebase Storage (or other storage)
  uploadDate: Timestamp;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  notes?: string;
}

// For system settings (example)
export interface SystemSettings extends FirestoreDocument {
  // key: string; // e.g., "maintenanceMode", "defaultCurrency"
  // value: any;
  maintenanceMode?: boolean;
  defaultCurrency?: string;
  notificationPreferences?: {
    email: boolean;
    sms: boolean;
  };
  // Add other settings as needed
}
