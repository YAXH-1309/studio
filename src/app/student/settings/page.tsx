import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Save, Bell, Palette } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function StudentSettingsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">My Settings</CardTitle>
            </div>
            <Button>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </div>
          <CardDescription>Customize your notification preferences and account settings.</CardDescription>
        </CardHeader>
        <CardContent className="py-8 space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center"><Bell className="mr-2 h-5 w-5 text-primary/80"/>Notification Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="announcement-notifs" className="flex-grow">Receive Hostel Announcements</Label>
                <Switch id="announcement-notifs" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="booking-notifs" className="flex-grow">Booking Confirmations & Updates</Label>
                <Switch id="booking-notifs" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="chat-notifs" className="flex-grow">Chat Message Notifications</Label>
                <Switch id="chat-notifs" />
              </div>
            </div>
          </div>

           <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center"><Palette className="mr-2 h-5 w-5 text-primary/80"/>Appearance (Placeholder)</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="dark-mode" className="flex-grow">Dark Mode</Label>
                <Switch id="dark-mode" disabled /> 
              </div>
              <p className="text-sm text-muted-foreground">Theme customization options will be available here.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
