
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, CheckCircle, XCircle, Eye, Edit, Clock } from "lucide-react";
import { getAllBookings, updateBookingStatus } from "./actions";
import type { Booking, BookingStatus } from "@/types";
import { Timestamp } from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BookingStatusUpdater } from "@/components/admin/bookings/BookingStatusUpdater";

export default async function AdminBookingsPage() {
  const bookings = await getAllBookings();

  const getStatusBadgeVariant = (status: BookingStatus) => {
    switch (status) {
      case "pending": return "secondary";
      case "approved": return "default"; // success-like
      case "rejected": return "destructive";
      case "cancelled": return "outline";
      case "completed": return "secondary"; // a muted success or similar
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">Booking Management</CardTitle>
          </div>
          <CardDescription>Review, approve, or reject booking requests. Manage existing bookings and view booking history.</CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Booking Requests Found</h3>
              <p className="text-muted-foreground">There are currently no pending or active booking requests.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name/ID</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Requested At</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.userName || booking.userId}</TableCell>
                    <TableCell>{booking.roomNumber || booking.roomId}</TableCell>
                    <TableCell>
                      {(booking.startDate as Timestamp).toDate().toLocaleDateString()} - {(booking.endDate as Timestamp).toDate().toLocaleDateString()}
                    </TableCell>
                    <TableCell>{(booking.requestedAt as Timestamp).toDate().toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(booking.status)} className="capitalize">{booking.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <BookingStatusUpdater booking={booking} />
                      {/* <Button variant="ghost" size="sm" title="View Details (Not Implemented)">
                        <Eye className="h-4 w-4" />
                      </Button> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

