"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { UserRole } from '@/types';
import { Building, GraduationCap, ShieldCheck, UserCog, LogIn } from 'lucide-react';

const roleOptions: { value: UserRole; label: string; icon: React.ElementType }[] = [
  { value: 'admin', label: 'Admin', icon: UserCog },
  { value: 'student', label: 'Student', icon: GraduationCap },
  { value: 'staff', label: 'Staff', icon: Building },
  { value: 'parent', label: 'Parent', icon: ShieldCheck },
];

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') as UserRole | null;
  
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>(initialRole || undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (initialRole && roleOptions.find(r => r.value === initialRole)) {
      setSelectedRole(initialRole);
    } else if (roleOptions.length > 0) {
      // Default to first role if initialRole is invalid or not provided
      setSelectedRole(roleOptions[0].value);
    }
  }, [initialRole]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      // In a real app, you'd handle actual authentication here.
      // For this mock, we'll store the role in localStorage for client-side access if needed
      // and redirect.
      localStorage.setItem('userRole', selectedRole);
      router.push(`/${selectedRole}`);
    }
  };

  if (!mounted) {
    // Avoid hydration mismatch by not rendering role-dependent UI until mounted
    return (
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <LogIn className="h-6 w-6 text-primary" /> HOSTEL MANAGEMENT SYSTEM Login
          </CardTitle>
          <CardDescription>Loading login options...</CardDescription>
        </CardHeader>
        <CardContent className="h-48 animate-pulse bg-muted/50 rounded-md" />
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <LogIn className="h-6 w-6 text-primary" /> HOSTEL MANAGEMENT SYSTEM Login
        </CardTitle>
        <CardDescription>Select your role to proceed to your dashboard.</CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="role" className="text-base font-semibold mb-3 block">Select Your Role</Label>
            <RadioGroup
              id="role"
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value as UserRole)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {roleOptions.map((role) => (
                <Label
                  key={role.value}
                  htmlFor={role.value}
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md ${
                    selectedRole === role.value ? 'border-primary ring-2 ring-primary shadow-lg' : 'border-border'
                  }`}
                >
                  <role.icon className={`h-8 w-8 mb-2 ${selectedRole === role.value ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`font-medium ${selectedRole === role.value ? 'text-primary' : ''}`}>{role.label}</span>
                  <RadioGroupItem value={role.value} id={role.value} className="sr-only" />
                </Label>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={!selectedRole}>
            Login as {selectedRole ? roleOptions.find(r => r.value === selectedRole)?.label : '...'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
