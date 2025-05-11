import type { LucideIcon } from 'lucide-react';

export type UserRole = "admin" | "student" | "staff" | "parent";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  matchExact?: boolean; // If true, an exact path match is required for active state
  children?: NavItem[];
  role?: UserRole[]; // Optional: specify which roles can see this item
}
