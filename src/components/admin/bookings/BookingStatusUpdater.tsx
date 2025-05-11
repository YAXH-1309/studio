
"use client";

import { useState } from "react";
import type { Booking, BookingStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Ban, CheckCheck, Edit3 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { updateBookingStatus } from "@/app/admin/bookings/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";


const availableStatuses: BookingStatus[] = ["pending", "approved", "rejected", "cancelled", "completed"];

interface BookingStatusUpdaterProps {
  booking: Booking;
}

export function BookingStatusUpdater({ booking }: BookingStatusUpdaterProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus>(booking.status);
  const [adminNotes, setAdminNotes] = useState(booking.adminNotes || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleStatusUpdate = async () => {
    if (selectedStatus === booking.status && adminNotes === (booking.adminNotes || "")) {
      toast({ title: "No Changes", description: "Status and notes are the same." });
      setIsDialogOpen(false);
      return;
    }
    setIsSubmitting(true);
    const result = await updateBookingStatus(booking.id, selectedStatus, adminNotes);
    if (result.success) {
      toast({ title: "Status Updated", description: result.message });
    } else {
      toast({ title: "Error", description: result.message, variant: "destructive" });
    }
    setIsSubmitting(false);
    setIsDialogOpen(false);
    // Revalidation should happen via server action
  };
  
  const getIconForStatus = (status: BookingStatus) => {
    switch (status) {
        case "approved": return <CheckCircle className="h-4 w-4 text-green-600" />;
        case "rejected": return <XCircle className="h-4 w-4 text-red-600" />;
        case "cancelled": return <Ban className="h-4 w-4 text-yellow-600" />;
        case "completed": return <CheckCheck className="h-4 w-4 text-blue-600" />;
        default: return <Edit3 className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" title={`Current status: ${booking.status}. Click to change.`}>
          {getIconForStatus(booking.status)}
          <span className="ml-1 capitalize hidden sm:inline">{booking.status}</span>
          <span className="ml-1 sm:hidden"><Edit3 className="h-3 w-3"/></span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Booking Status</DialogTitle>
          <DialogDescription>
            Change status for booking by {booking.userName || booking.userId} for room {booking.roomNumber || booking.roomId}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="status-select">New Status</Label>
            <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as BookingStatus)}>
              <SelectTrigger id="status-select">
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                {availableStatuses.map(status => (
                  <SelectItem key={status} value={status} className="capitalize">
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="admin-notes">Admin Notes (Optional)</Label>
            <Textarea
              id="admin-notes"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add notes for this status change (e.g., reason for rejection)"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleStatusUpdate} disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Status"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
