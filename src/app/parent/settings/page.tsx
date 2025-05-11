import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Save, MailWarning, ShieldQuestion } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ParentSettingsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Parent Settings</CardTitle>
            </div>
            <Button>
              <Save className="mr-2 h-4 w-4" /> Save Settings
            </Button>
          </div>
          <CardDescription>Adjust your notification preferences for updates related to your child.</CardDescription>
        </CardHeader>
        <CardContent className="py-8 space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center"><MailWarning className="mr-2 h-5 w-5 text-primary/80"/>Notification Settings for Child</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="attendance-alerts" className="flex-grow">Attendance Alerts (Mock)</Label>
                <Switch id="attendance-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="emergency-notifs" className="flex-grow">Emergency Notifications</Label>
                <Switch id="emergency-notifs" defaultChecked />
              </div>
               <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="event-updates" className="flex-grow">Hostel Event Updates</Label>
                <Switch id="event-updates" />
              </div>
            </div>
          </div>

           <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center"><ShieldQuestion className="mr-2 h-5 w-5 text-primary/80"/>Account Security (Placeholder)</h3>
            <div className="space-y-4">
               <p className="text-sm text-muted-foreground p-3 border rounded-md">Password change and other security settings will be available here.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
