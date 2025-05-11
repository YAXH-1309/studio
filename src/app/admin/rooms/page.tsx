
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, PlusSquare, Edit3, Eye } from "lucide-react";
import Link from "next/link";
import { getRooms, deleteRoom } from "./actions";
import type { Room } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/shared/DeleteButton";

export default async function AdminRoomsPage() {
  const rooms = await getRooms();

  const getStatusBadgeVariant = (status: Room['status']) => {
    switch (status) {
      case "available": return "default"; // Or a success-like color if you have one
      case "occupied": return "secondary";
      case "maintenance": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Room Management</CardTitle>
            </div>
            <Link href="/admin/rooms/new">
              <Button>
                <PlusSquare className="mr-2 h-4 w-4" /> Add New Room
              </Button>
            </Link>
          </div>
          <CardDescription>Oversee room details, types, amenities, and current occupancy status.</CardDescription>
        </CardHeader>
        <CardContent>
          {rooms.length === 0 ? (
             <div className="text-center py-12">
              <Building className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Rooms Found</h3>
              <p className="text-muted-foreground mb-4">Add rooms to the system to start managing them.</p>
              <Link href="/admin/rooms/new">
                <Button>
                  <PlusSquare className="mr-2 h-4 w-4" /> Add New Room
                </Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room Number</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Wing/Floor</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.roomNumber}</TableCell>
                    <TableCell>{room.type}</TableCell>
                    <TableCell>{room.capacity}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(room.status)} className="capitalize">{room.status}</Badge>
                    </TableCell>
                    <TableCell>{room.wing || 'N/A'} / {room.floor || 'N/A'}</TableCell>
                    <TableCell className="text-right space-x-2">
                       <Link href={`/admin/rooms/${room.id}/edit`}>
                         <Button variant="outline" size="sm"><Edit3 className="h-4 w-4" /></Button>
                       </Link>
                       <DeleteButton itemId={room.id} itemName={`Room ${room.roomNumber}`} deleteAction={deleteRoom} />
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
