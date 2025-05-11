import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, Download, FilePieChart } from "lucide-react";
import Image from "next/image";

export default function StaffReportsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart2 className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Staff Reports</CardTitle>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
          </div>
          <CardDescription>Generate and view reports related to maintenance, inventory, and resident activities.</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Image 
            src="https://picsum.photos/seed/staff-reports/400/250" 
            alt="Staff Reports Placeholder" 
            width={400} 
            height={250} 
            className="mx-auto rounded-lg mb-6"
            data-ai-hint="data visualization"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          <h3 className="text-xl font-semibold mb-2">Reporting Tools Coming Soon</h3>
          <p className="text-muted-foreground">Staff will be able to generate specific reports relevant to their operational duties.</p>
           <div className="mt-4 flex justify-center gap-4">
            <Button variant="secondary"><FilePieChart className="mr-2 h-4 w-4" /> View Occupancy Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
