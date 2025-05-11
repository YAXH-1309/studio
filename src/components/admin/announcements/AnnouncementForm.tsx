
"use client";

import type { Announcement, UserRole } from "@/types";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createAnnouncement, updateAnnouncement } from "@/app/admin/announcements/actions";
import { Timestamp } from "firebase/firestore";

const announcementTypes = ["Maintenance", "Event", "Notice", "Important", "General"];
const userRoles: UserRole[] = ["admin", "student", "staff", "parent"];

const announcementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  type: z.string().min(1, "Type is required"),
  published: z.boolean().default(false),
  targetRoles: z.array(z.string()).optional(),
  // authorId: z.string().optional(), // Assuming authorId is set on server or from context
});

type AnnouncementFormData = z.infer<typeof announcementSchema>;

interface AnnouncementFormProps {
  announcement?: Announcement; // For editing
  onFormSubmit?: () => void; // Optional: callback after submission
}

export function AnnouncementForm({ announcement, onFormSubmit }: AnnouncementFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: announcement?.title || "",
      content: announcement?.content || "",
      date: announcement?.date ? (announcement.date as Timestamp).toDate().toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      type: announcement?.type || announcementTypes[0],
      published: announcement?.published || false,
      targetRoles: announcement?.targetRoles || [],
    },
  });

  const watchedTargetRoles = watch("targetRoles", announcement?.targetRoles || []);

  const onSubmit = async (data: AnnouncementFormData) => {
    try {
      let result;
      const submissionData = {
        ...data,
        // authorId: "current-admin-user-id" // Replace with actual authenticated user ID
      };

      if (announcement?.id) {
        result = await updateAnnouncement(announcement.id, submissionData);
      } else {
        result = await createAnnouncement(submissionData);
      }

      if (result.success) {
        toast({
          title: announcement?.id ? "Announcement Updated" : "Announcement Created",
          description: result.message,
        });
        reset();
        if (onFormSubmit) {
          onFormSubmit();
        } else {
          router.push("/admin/announcements");
          router.refresh(); // Re-fetch data on the announcements page
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
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} />
        {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" {...register("content")} rows={5} />
        {errors.content && <p className="text-sm text-destructive mt-1">{errors.content.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" {...register("date")} />
          {errors.date && <p className="text-sm text-destructive mt-1">{errors.date.message}</p>}
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {announcementTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && <p className="text-sm text-destructive mt-1">{errors.type.message}</p>}
        </div>
      </div>
      
      <div>
        <Label>Target Roles (Optional)</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
          {userRoles.map((role) => (
            <Controller
              key={role}
              name="targetRoles"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2 p-2 border rounded-md">
                  <Checkbox
                    id={`role-${role}`}
                    checked={field.value?.includes(role)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([...(field.value || []), role])
                        : field.onChange(field.value?.filter((value) => value !== role));
                    }}
                  />
                  <Label htmlFor={`role-${role}`} className="capitalize cursor-pointer">{role}</Label>
                </div>
              )}
            />
          ))}
        </div>
         <p className="text-xs text-muted-foreground mt-1">If no roles selected, announcement is public to all.</p>
      </div>


      <div className="flex items-center space-x-2">
        <Controller
            name="published"
            control={control}
            render={({ field }) => (
                <Switch
                id="published"
                checked={field.value}
                onCheckedChange={field.onChange}
                />
            )}
        />
        <Label htmlFor="published">Publish Announcement</Label>
         {errors.published && <p className="text-sm text-destructive mt-1">{errors.published.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? (announcement?.id ? "Updating..." : "Creating...") : (announcement?.id ? "Update Announcement" : "Create Announcement")}
      </Button>
    </form>
  );
}
