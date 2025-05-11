import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Edit } from "lucide-react"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ParentProfilePage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Parent Profile</CardTitle>
            </div>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
          <CardDescription>View and manage your parent account details.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center text-center py-12">
          <Avatar className="h-32 w-32 mb-6 ring-4 ring-primary ring-offset-2 shadow-lg">
            <AvatarImage src="https://picsum.photos/seed/parent-user/128/128" alt="Parent User" data-ai-hint="parent guardian" />
            <AvatarFallback className="text-4xl">PU</AvatarFallback>
          </Avatar>
          <h3 className="text-2xl font-semibold mb-1">Parent User</h3>
          <p className="text-muted-foreground mb-4">parent.user@example.com</p>
          
          <div className="mt-6 w-full max-w-md text-left space-y-3">
            <div className="flex justify-between p-3 border rounded-md"><span>Associated Child:</span> <span className="font-medium">Child Student Name (STU-12345)</span></div>
            <div className="flex justify-between p-3 border rounded-md"><span>Contact:</span> <span className="font-medium">0123-999-888</span></div>
             <div className="flex justify-between p-3 border rounded-md"><span>Communication Preferences:</span> <span className="font-medium">Email & SMS</span></div>
          </div>
           <p className="mt-8 text-muted-foreground">Notification settings for child's updates will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
