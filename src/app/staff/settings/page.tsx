import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Save, BellOff, Languages } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function StaffSettingsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Staff Settings</CardTitle>
            </div>
            <Button>
              <Save className="mr-2 h-4 w-4" /> Save Preferences
            </Button>
          </div>
          <CardDescription>Manage your account preferences and notification settings.</CardDescription>
        </CardHeader>
        <CardContent className="py-8 space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center"><BellOff className="mr-2 h-5 w-5 text-primary/80"/>Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="task-notifs" className="flex-grow">New Task Assignments</Label>
                <Switch id="task-notifs" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="visitor-alerts" className="flex-grow">Visitor Arrival Alerts</Label>
                <Switch id="visitor-alerts" defaultChecked />
              </div>
            </div>
          </div>

           <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center"><Languages className="mr-2 h-5 w-5 text-primary/80"/>Language & Region (Placeholder)</h3>
            <div className="space-y-4">
               <p className="text-sm text-muted-foreground p-3 border rounded-md">Language and regional settings will be configurable here.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
