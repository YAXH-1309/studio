
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { UserForm } from "@/components/admin/users/UserForm";
import { UserPlus } from "lucide-react";

export default function NewUserPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <UserPlus className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">Add New User</CardTitle>
          </div>
          <CardDescription>Fill in the details below to create a new user account.</CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm />
        </CardContent>
      </Card>
    </div>
  );
}
