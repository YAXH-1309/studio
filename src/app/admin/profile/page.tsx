import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCog, Edit } from "lucide-react"; // Changed icon to UserCog
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminProfilePage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserCog className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Admin Profile</CardTitle>
            </div>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
          <CardDescription>View and manage your administrator account details.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center text-center py-12">
          <Avatar className="h-32 w-32 mb-6 ring-4 ring-primary ring-offset-2 shadow-lg">
            <AvatarImage src="https://picsum.photos/seed/admin-user/128/128" alt="Admin User" data-ai-hint="professional person" />
            <AvatarFallback className="text-4xl">AU</AvatarFallback>
          </Avatar>
          <h3 className="text-2xl font-semibold mb-1">Admin User</h3>
          <p className="text-muted-foreground mb-4">admin@dormflow.com</p>
          
          <div className="mt-6 w-full max-w-md text-left space-y-3">
            <div className="flex justify-between p-3 border rounded-md"><span>Role:</span> <span className="font-medium text-destructive">Administrator</span></div>
            <div className="flex justify-between p-3 border rounded-md"><span>Last Login:</span> <span className="font-medium">{(new Date()).toLocaleDateString()}</span></div>
            <div className="flex justify-between p-3 border rounded-md"><span>Contact:</span> <span className="font-medium">0123-456-789</span></div>
          </div>
          <p className="mt-8 text-muted-foreground">Profile settings and activity logs will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
