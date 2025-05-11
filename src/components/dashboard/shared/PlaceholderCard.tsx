import type { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PlaceholderCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  actionText?: string;
  actionLink?: string;
  children?: ReactNode;
}

export function PlaceholderCard({ title, description, icon: Icon, actionText, actionLink, children }: PlaceholderCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <Icon className="h-7 w-7 text-primary" />
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children ? children : <p className="text-sm text-muted-foreground">Feature details will be displayed here. Content under development.</p>}
        {actionText && actionLink && (
          <Button asChild className="mt-4">
            <Link href={actionLink}>{actionText}</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
