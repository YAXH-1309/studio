
"use client"; 

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { BellRing, Loader2 } from "lucide-react";
import type { Announcement, UserRole } from "@/types";
import { getAnnouncementsForRole } from '@/app/admin/announcements/actions'; // Assuming actions can be called client-side for now
import { Timestamp } from 'firebase/firestore';

export function AnnouncementsFeed() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    // Simulate getting current user role (e.g., from context or localStorage)
    const storedRole = localStorage.getItem('userRole') as UserRole | null;
    setCurrentUserRole(storedRole || 'student'); // Default to student if no role found
  }, []);

  useEffect(() => {
    if (!currentUserRole) return;

    const fetchAnnouncements = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Note: Calling server actions directly from client like this is okay for simple cases,
        // but for more complex scenarios or if you need to pass sensitive data,
        // consider API routes or a dedicated client-side fetching library.
        const fetchedAnnouncements = await getAnnouncementsForRole(currentUserRole);
        setAnnouncements(fetchedAnnouncements);
      } catch (err) {
        console.error("Failed to fetch announcements:", err);
        setError("Could not load announcements. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, [currentUserRole]);

  const getBadgeVariant = (type: string): "default" | "secondary" | "destructive" | "outline" | null | undefined => {
    switch (type.toLowerCase()) {
      case 'important': return 'destructive';
      case 'event': return 'default';
      case 'maintenance': return 'secondary';
      case 'notice': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          <BellRing className="h-6 w-6 text-primary" />
          <CardTitle>Announcements</CardTitle>
        </div>
        <CardDescription>Latest updates and important notices.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2 text-muted-foreground">Loading announcements...</p>
            </div>
          )}
          {error && (
            <div className="text-center py-4 text-destructive">
              <p>{error}</p>
            </div>
          )}
          {!isLoading && !error && (
            <div className="space-y-4">
              {announcements.length === 0 ? (
                 <p className="text-sm text-muted-foreground text-center py-4">No announcements relevant to you at the moment.</p>
              ) : (
                announcements.map((announcement) => (
                  <div key={announcement.id} className="p-3 border rounded-lg bg-card hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-card-foreground">{announcement.title}</h4>
                      <Badge variant={getBadgeVariant(announcement.type)}>{announcement.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1 whitespace-pre-wrap">{announcement.content}</p>
                    <p className="text-xs text-muted-foreground/80">
                      {announcement.date ? (announcement.date as Timestamp).toDate().toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
