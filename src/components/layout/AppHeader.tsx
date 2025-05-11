"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'; // Use existing sidebar
import type { UserRole } from '@/types';
import { LogOut, UserCircle, Settings, Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AppHeaderProps {
  userRole: UserRole;
  userName: string;
}

export function AppHeader({ userRole, userName }: AppHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile } = useSidebar(); // Get isMobile from useSidebar context
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole'); // Clear mock auth state
    router.push('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const capitalizedRole = userRole.charAt(0).toUpperCase() + userRole.slice(1);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 shadow-sm backdrop-blur-md md:px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-muted rounded-md animate-pulse md:hidden"></div>
          <div className="h-8 w-24 bg-muted rounded-md animate-pulse"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
          <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 shadow-sm backdrop-blur-md md:px-6">
      <div className="flex items-center gap-2">
        {isMobile && <SidebarTrigger />}
        <Link href={`/${userRole}`} aria-label={`${capitalizedRole} Dashboard`}>
          <Logo />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`https://picsum.photos/seed/${userName}/40/40`} alt={userName} data-ai-hint="profile person" />
                <AvatarFallback>{getInitials(userName)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {capitalizedRole}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push(`/${userRole}/profile`)}> {/* Placeholder profile link */}
              <UserCircle className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/${userRole}/settings`)}> {/* Placeholder settings link */}
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
