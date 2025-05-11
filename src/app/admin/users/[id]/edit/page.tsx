
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { UserForm } from "@/components/admin/users/UserForm";
import { UserCog } from "lucide-react";
import { getUserById } from "@/app/admin/users/actions";
import type { User } from "@/types";
import { notFound } from "next/navigation";

// This function would typically fetch a single user by ID
async function getSingleUser(id: string): Promise<User | null> {
  // Re-using getUsers and filtering is not ideal for performance with many users.
  // In a real app, implement a direct fetch: const user = await getUserById(id);
  const users = await getUsers(); // from ./actions
  const user = users.find(u => u.id === id);
  // If using a direct getUserById that returns null on not found:
  // const user = await getUserById(id);
  return user || null;
}

export default async function EditUserPage({ params }: { params: { id: string } }) {
  const user = await getSingleUser(params.id);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <UserCog className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">Edit User: {user.name}</CardTitle>
          </div>
          <CardDescription>Update the details for the user account.</CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm user={user} />
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function (can be moved to actions.ts if direct ID fetch is implemented there)
// For now, it's here to work with the existing getUsers
import { getUsers } from "@/app/admin/users/actions";
