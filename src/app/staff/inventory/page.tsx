
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Archive, PackagePlus, ListTree } from "lucide-react";
import Image from "next/image";

// Placeholder for actual form and actions
// import { InventoryItemForm } from "@/components/staff/inventory/InventoryItemForm";
// import { getInventoryItems } from "./actions";

export default function StaffInventoryPage() {
  // const items = await getInventoryItems(); // To list inventory items
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
              <Button variant="outline" disabled> {/* Disabled until functionality is added */}
                <ListTree className="mr-2 h-4 w-4" /> View Stock
              </Button>
              <Button disabled> {/* Disabled until form and action are implemented */}
                <PackagePlus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </div>
          </div>
          <CardDescription>Track hostel inventory, manage stock levels, and raise requests for restocking items. Firebase is connected; inventory features are under development.</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          {/* <InventoryItemForm /> */}
          {/* Display list of inventory items here */}
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
          <p className="text-muted-foreground">Staff will be able to manage hostel supplies and assets through this module using Firebase.</p>
        </CardContent>
      </Card>
    </div>
  );
}
