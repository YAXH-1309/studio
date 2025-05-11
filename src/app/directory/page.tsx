import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookUser, Search, Phone, Mail } from "lucide-react";

const mockContacts = [
  { id: 1, name: "Admin Office", role: "Administration", phone: "0123-456-789", email: "admin@dormflow.com", avatarSeed: "admin" },
  { id: 2, name: "John Doe (Warden)", role: "Hostel Staff", phone: "0123-456-790", email: "john.doe@dormflow.com", avatarSeed: "john" },
  { id: 3, name: "Jane Smith (Reception)", role: "Hostel Staff", phone: "0123-456-791", email: "jane.smith@dormflow.com", avatarSeed: "jane" },
  { id: 4, name: "Maintenance Dept.", role: "Support", phone: "0123-456-792", email: "maintenance@dormflow.com", avatarSeed: "maintenance" },
  { id: 5, name: "Student Council", role: "Student Body", phone: "N/A", email: "student.council@dormflow.com", avatarSeed: "council" },
];

export default function DirectoryPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookUser className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Hostel Directory</CardTitle>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search contacts..." className="pl-8 sm:w-[300px]" />
            </div>
          </div>
          <CardDescription>Find contact information for hostel staff, administration, and important services.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockContacts.map(contact => (
              <Card key={contact.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://picsum.photos/seed/${contact.avatarSeed}/64/64`} data-ai-hint="person avatar" />
                    <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    <CardDescription>{contact.role}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1 text-sm">
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{contact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
           {mockContacts.length === 0 && (
            <p className="text-center py-10 text-muted-foreground">Directory is currently empty or under construction.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
