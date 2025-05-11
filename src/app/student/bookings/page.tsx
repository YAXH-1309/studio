
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, PlusCircle, RefreshCw, Eye } from "lucide-react";
import Link from "next/link"; // Keep Link if needed for other navigation
import { getStudentBookings } from "./actions";
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
import { BookingRequestForm } from "@/components/student/bookings/BookingRequestForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";


export default async function StudentBookingsPage() {
  const bookings = await getStudentBookings();

  const getStatusBadgeVariant = (status: BookingStatus) => {
    switch (status) {
      case "pending": return "secondary";
      case "approved": return "default";
      case "rejected": return "destructive";
      case "cancelled": return "outline";
      case "completed": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">My Bookings & Requests</CardTitle>
            </div>
             <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> New Booking Request
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>New Room Booking Request</DialogTitle>
                  <DialogDescription>
                    Select an available room and your desired dates. Your request will be reviewed by administration.
                  </DialogDescription>
                </DialogHeader>
                <BookingRequestForm />
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>Manage your room bookings, request changes, and view their status.</CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-12">
               <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Bookings Yet</h3>
              <p className="text-muted-foreground mb-4">You haven't made any booking requests. Click the button above to start.</p>
            </div>
          ) : (
            <>
            <h3 className="text-lg font-semibold mb-4">Your Booking History</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Requested At</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.roomNumber || booking.roomId}</TableCell>
                    <TableCell>
                      {(booking.startDate as Timestamp).toDate().toLocaleDateString()} - {(booking.endDate as Timestamp).toDate().toLocaleDateString()}
                    </TableCell>
                    <TableCell>{(booking.requestedAt as Timestamp).toDate().toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(booking.status)} className="capitalize">{booking.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {booking.notes ? (
                        <Dialog>
                            <DialogTrigger asChild><Button variant="ghost" size="sm"><Eye className="h-4 w-4"/></Button></DialogTrigger>
                            <DialogContent>
                                <DialogHeader><DialogTitle>Booking Notes</DialogTitle></DialogHeader>
                                <p className="font-semibold">Your notes:</p>
                                <p className="text-sm p-2 border rounded bg-secondary/50">{booking.notes}</p>
                                {booking.adminNotes && <>
                                    <p className="font-semibold mt-2">Admin notes:</p>
                                    <p className="text-sm p-2 border rounded bg-secondary/50">{booking.adminNotes}</p>
                                </>}
                            </DialogContent>
                        </Dialog>
                      ) : (booking.adminNotes ? 
                        <Dialog>
                            <DialogTrigger asChild><Button variant="ghost" size="sm"><Eye className="h-4 w-4"/></Button></DialogTrigger>
                            <DialogContent>
                                <DialogHeader><DialogTitle>Admin Notes</DialogTitle></DialogHeader>
                                <p className="text-sm p-2 border rounded bg-secondary/50">{booking.adminNotes}</p>
                            </DialogContent>
                        </Dialog> 
                        : "N/A")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </>
          )}
        </CardContent>
      </Card>
      
      {/* Placeholder for room change request - more complex feature */}
      <Card className="shadow-md mt-6">
        <CardHeader>
            <CardTitle className="text-lg">Request Room Change</CardTitle>
            <CardDescription>Functionality to request a room change is under development.</CardDescription>
        </CardHeader>
        <CardContent>
            <Button variant="outline" disabled><RefreshCw className="mr-2 h-4 w-4" /> Request Room Change (Coming Soon)</Button>
        </CardContent>
      </Card>
    </div>
  );
}
