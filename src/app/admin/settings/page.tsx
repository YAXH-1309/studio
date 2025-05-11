import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Save } from "lucide-react";
import Image from "next/image";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">System Settings</CardTitle>
            </div>
            <Button>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </div>
          <CardDescription>Configure global system settings, payment integrations, notification preferences, and third-party services.</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Image 
            src="https://picsum.photos/seed/settings-admin/400/250" 
            alt="Settings Placeholder" 
            width={400} 
            height={250} 
            className="mx-auto rounded-lg mb-6"
            data-ai-hint="gears cogs"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          <h3 className="text-xl font-semibold mb-2">System Configuration Feature Coming Soon</h3>
          <p className="text-muted-foreground">This area will provide administrators with tools to customize and manage system-wide settings.</p>
        </CardContent>
      </Card>
    </div>
  );
}
