
"use client";

import type { Booking, Room } from "@/types";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { createBookingRequest, getAvailableRooms } from "@/app/student/bookings/actions";
import { useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";


const bookingRequestSchema = z.object({
  roomId: z.string().min(1, "Please select a room"),
  startDate: z.date({ required_error: "Start date is required."}),
  endDate: z.date({ required_error: "End date is required."}),
  notes: z.string().optional(),
}).refine(data => data.endDate > data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"], // path of error
});

type BookingRequestFormData = z.infer<typeof bookingRequestSchema>;

interface BookingRequestFormProps {
  onFormSubmit?: () => void;
}

export function BookingRequestForm({ onFormSubmit }: BookingRequestFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<BookingRequestFormData>({
    resolver: zodResolver(bookingRequestSchema),
    defaultValues: {
      notes: "",
    },
  });

  useEffect(() => {
    async function fetchRooms() {
      setIsLoadingRooms(true);
      const rooms = await getAvailableRooms();
      setAvailableRooms(rooms);
      setIsLoadingRooms(false);
    }
    fetchRooms();
  }, []);

  const onSubmit = async (data: BookingRequestFormData) => {
    try {
      // Convert dates to string for server action, will be converted to Timestamp there
      const submissionData = {
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      };
      const result = await createBookingRequest(submissionData);

      if (result.success) {
        toast({
          title: "Booking Request Submitted",
          description: result.message,
        });
        reset();
        if (onFormSubmit) {
          onFormSubmit();
        }
        router.refresh(); // Refresh to show updated booking list
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
        description: "An unexpected error occurred while submitting your request.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="roomId">Select Room</Label>
        <Controller
          name="roomId"
          control={control}
          render={({ field }) => (
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
              disabled={isLoadingRooms || availableRooms.length === 0}
            >
              <SelectTrigger id="roomId">
                <SelectValue placeholder={isLoadingRooms ? "Loading rooms..." : (availableRooms.length === 0 ? "No rooms available" : "Select an available room")} />
              </SelectTrigger>
              <SelectContent>
                {availableRooms.map((room) => (
                  <SelectItem key={room.id} value={room.id}>
                    {room.roomNumber} - {room.type} (Capacity: {room.capacity})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.roomId && <p className="text-sm text-destructive mt-1">{errors.roomId.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                        initialFocus
                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0)) } // Disable past dates
                    />
                    </PopoverContent>
                </Popover>
            )}
            />
          {errors.startDate && <p className="text-sm text-destructive mt-1">{errors.startDate.message}</p>}
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
           <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                        initialFocus
                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0)) } // Disable past dates
                    />
                    </PopoverContent>
                </Popover>
            )}
            />
          {errors.endDate && <p className="text-sm text-destructive mt-1">{errors.endDate.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          {...control.register("notes")}
          rows={3}
          placeholder="Any specific requests or notes for your booking?"
        />
        {errors.notes && <p className="text-sm text-destructive mt-1">{errors.notes.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting || isLoadingRooms} className="w-full md:w-auto">
        {isSubmitting ? "Submitting Request..." : "Submit Booking Request"}
      </Button>
    </form>
  );
}

