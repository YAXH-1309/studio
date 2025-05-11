
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, PieChart, Users, Bed } from "lucide-react";
import Image from "next/image";

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">System Reports</CardTitle>
            </div>
            <Button variant="outline" disabled>
              <Download className="mr-2 h-4 w-4" /> Export All Reports
            </Button>
          </div>
          <CardDescription>Generate and view comprehensive reports on occupancy, financials, user activity, and more. Firebase is connected, but specific report generation is under development.</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
           <Image 
            src="https://picsum.photos/seed/reports-admin/400/250" 
            alt="Reports Placeholder" 
            width={400} 
            height={250} 
            className="mx-auto rounded-lg mb-6"
            data-ai-hint="charts graphs"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          <h3 className="text-xl font-semibold mb-2">Advanced Reporting Feature Coming Soon</h3>
          <p className="text-muted-foreground">Detailed analytics and reporting tools will be available here for administrators, leveraging data from Firebase.</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Button variant="secondary" disabled><PieChart className="mr-2 h-4 w-4" /> Occupancy Report</Button>
            <Button variant="secondary" disabled><Users className="mr-2 h-4 w-4" /> User Activity Report</Button>
            <Button variant="secondary" disabled><Bed className="mr-2 h-4 w-4" /> Room Usage Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
