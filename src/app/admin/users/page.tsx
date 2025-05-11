
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Edit3, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { getUsers, deleteUser } from "./actions";
import type { User } from "@/types";
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
import { DeleteButton } from "@/components/shared/DeleteButton";

export default async function AdminUsersPage() {
  const users = await getUsers();

  const getRoleBadgeVariant = (role: User["role"]) => {
    switch (role) {
      case "admin": return "destructive";
      case "student": return "default";
      case "staff": return "secondary";
      case "parent": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">User Management</CardTitle>
            </div>
            <Link href="/admin/users/new">
              <Button>
                <UserPlus className="mr-2 h-4 w-4" /> Add New User
              </Button>
            </Link>
          </div>
          <CardDescription>View, add, edit, and remove users. Assign roles and manage permissions.</CardDescription>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Users Found</h3>
              <p className="text-muted-foreground mb-4">Start by adding users to the system.</p>
              <Link href="/admin/users/new">
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" /> Add New User
                </Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize">{user.role}</Badge>
                    </TableCell>
                    <TableCell>{user.contact || "N/A"}</TableCell>
                    <TableCell>{user.createdAt ? (user.createdAt as Timestamp).toDate().toLocaleDateString() : "N/A"}</TableCell>
                    <TableCell className="text-right space-x-2">
                       <Link href={`/admin/users/${user.id}/edit`}> {/* Placeholder, edit page not created yet */}
                         <Button variant="outline" size="sm"><Edit3 className="h-4 w-4" /></Button>
                       </Link>
                       <DeleteButton itemId={user.id} itemName={user.name} deleteAction={deleteUser} />
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
