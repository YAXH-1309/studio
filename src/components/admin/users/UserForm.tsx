
"use client";

import type { User, UserRole } from "@/types";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createUser, updateUser } from "@/app/admin/users/actions";

const userRoles: UserRole[] = ["admin", "student", "staff", "parent"];

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(userRoles, { errorMap: () => ({ message: "Please select a valid role."}) }),
  contact: z.string().optional(),
  // Student specific
  studentId: z.string().optional(),
  course: z.string().optional(),
  // Parent specific
  associatedChildId: z.string().optional(),
  // Staff specific
  department: z.string().optional(),
});

// Add password fields for creation, handle them carefully.
const createUserSchema = userSchema.extend({
    // For creation, password might be required. For mock, we omit.
    // password: z.string().min(6, "Password must be at least 6 characters"),
});


type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  user?: User; // For editing
  onFormSubmit?: () => void;
}

export function UserForm({ user, onFormSubmit }: UserFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(user ? userSchema : createUserSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "student",
      contact: user?.contact || "",
      studentId: user?.studentId || "",
      course: user?.course || "",
      associatedChildId: user?.associatedChildId || "",
      department: user?.department || "",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: UserFormData) => {
    try {
      let result;
      // Filter out fields not relevant to the selected role before submission
      const submissionData: Partial<User> = { name: data.name, email: data.email, role: data.role, contact: data.contact };
      if (data.role === 'student') {
        submissionData.studentId = data.studentId;
        submissionData.course = data.course;
      } else if (data.role === 'parent') {
        submissionData.associatedChildId = data.associatedChildId;
      } else if (data.role === 'staff') {
        submissionData.department = data.department;
      }


      if (user?.id) {
        result = await updateUser(user.id, submissionData as Omit<User, "id" | "createdAt" | "updatedAt">);
      } else {
        // For creation, you might handle password separately or ensure it's part of `submissionData`
        // For this example, we are not handling password creation.
        result = await createUser(submissionData as Omit<User, "id" | "createdAt" | "updatedAt" | "lastLogin">);
      }

      if (result.success) {
        toast({
          title: user?.id ? "User Updated" : "User Created",
          description: result.message,
        });
        reset(); // Reset form after successful submission
        if (onFormSubmit) {
          onFormSubmit();
        } else {
          router.push("/admin/users");
          router.refresh();
        }
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" {...register("email")} disabled={!!user} /> {/* Disable email edit for existing users for simplicity */}
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
         {!!user && <p className="text-xs text-muted-foreground mt-1">Email cannot be changed for existing users in this form.</p>}
      </div>
      
      {/* Password field only for new user creation - For mock, we'll skip direct password handling in this form.
          In a real app, send a reset/setup link or handle password hashing securely.
      {!user && (
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
        </div>
      )} */}


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="role">Role</Label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {userRoles.map((role) => (
                    <SelectItem key={role} value={role} className="capitalize">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && <p className="text-sm text-destructive mt-1">{errors.role.message}</p>}
        </div>
        <div>
          <Label htmlFor="contact">Contact Number (Optional)</Label>
          <Input id="contact" {...register("contact")} />
          {errors.contact && <p className="text-sm text-destructive mt-1">{errors.contact.message}</p>}
        </div>
      </div>

      {selectedRole === 'student' && (
        <>
          <div>
            <Label htmlFor="studentId">Student ID (Optional)</Label>
            <Input id="studentId" {...register("studentId")} />
            {errors.studentId && <p className="text-sm text-destructive mt-1">{errors.studentId.message}</p>}
          </div>
          <div>
            <Label htmlFor="course">Course (Optional)</Label>
            <Input id="course" {...register("course")} />
            {errors.course && <p className="text-sm text-destructive mt-1">{errors.course.message}</p>}
          </div>
        </>
      )}

      {selectedRole === 'parent' && (
        <div>
          <Label htmlFor="associatedChildId">Associated Child's Student ID (Optional)</Label>
          <Input id="associatedChildId" {...register("associatedChildId")} placeholder="Enter student ID of child"/>
          {errors.associatedChildId && <p className="text-sm text-destructive mt-1">{errors.associatedChildId.message}</p>}
        </div>
      )}

      {selectedRole === 'staff' && (
        <div>
          <Label htmlFor="department">Department (Optional)</Label>
          <Input id="department" {...register("department")} />
          {errors.department && <p className="text-sm text-destructive mt-1">{errors.department.message}</p>}
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? (user?.id ? "Updating..." : "Creating...") : (user?.id ? "Update User" : "Create User")}
      </Button>
    </form>
  );
}
