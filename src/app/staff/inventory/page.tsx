import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Archive, PackagePlus, ListTree } from "lucide-react";
import Image from "next/image";

export default function StaffInventoryPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Archive className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Inventory Management</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <ListTree className="mr-2 h-4 w-4" /> View Stock
              </Button>
              <Button>
                <PackagePlus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </div>
          </div>
          <CardDescription>Track hostel inventory, manage stock levels, and raise requests for restocking items.</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Image 
            src="https://picsum.photos/seed/staff-inventory/400/250" 
            alt="Inventory Placeholder" 
            width={400} 
            height={250} 
            className="mx-auto rounded-lg mb-6"
            data-ai-hint="warehouse boxes"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          <h3 className="text-xl font-semibold mb-2">Inventory Tracking System Coming Soon</h3>
          <p className="text-muted-foreground">Staff will be able to manage hostel supplies and assets through this module.</p>
        </CardContent>
      </Card>
    </div>
  );
}
