import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send } from "lucide-react";
import Image from "next/image";

export default function StudentChatPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">Chat with Hostel Staff</CardTitle>
          </div>
          <CardDescription>Communicate directly with hostel staff for your queries and assistance.</CardDescription>
        </CardHeader>
        <CardContent className="py-8">
          <div className="border rounded-lg h-[500px] flex flex-col">
            <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-secondary/20">
              {/* Placeholder chat messages */}
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg max-w-[70%]">
                  <p className="text-sm">Hello! I have a query about the Wi-Fi.</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">10:00 AM</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[70%]">
                  <p className="text-sm">Hi Student! Please let me know your room number, and I'll check the Wi-Fi status.</p>
                   <p className="text-xs text-primary-foreground/70 mt-1">10:01 AM</p>
                </div>
              </div>
              <div className="text-center">
                <Image 
                    src="https://picsum.photos/seed/chat-feature/300/150" 
                    alt="Chat Feature Placeholder" 
                    width={300} 
                    height={150} 
                    className="mx-auto rounded-lg my-8"
                    data-ai-hint="communication bubbles"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    />
                <p className="text-muted-foreground">Full chat functionality is under development.</p>
              </div>
            </div>
            <div className="p-4 border-t flex items-center gap-2">
              <Input type="text" placeholder="Type your message..." className="flex-grow" />
              <Button size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
