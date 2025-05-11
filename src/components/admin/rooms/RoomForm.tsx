
"use client";

import type { Room } from "@/types";
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
import { createRoom, updateRoom } from "@/app/admin/rooms/actions";
import { Checkbox } from "@/components/ui/checkbox";

const roomTypes = ["Single", "Double", "Triple", "Dormitory", "Suite", "Apartment"];
const roomStatuses = ["available", "occupied", "maintenance", "unavailable"];
const allAmenities = ["Wi-Fi", "Air Conditioning", "Study Desk", "Wardrobe", "Attached Bathroom", "Balcony", "TV", "Mini Fridge"];


const roomSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required"),
  type: z.string().min(1, "Room type is required"),
  capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
  wing: z.string().optional(),
  floor: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  status: z.enum(["available", "occupied", "maintenance", "unavailable"] as [string, ...string[]], { // Cast to satisfy Zod enum
    errorMap: () => ({ message: "Please select a valid status."})
  }).default("available"),
});

type RoomFormData = z.infer<typeof roomSchema>;

interface RoomFormProps {
  room?: Room;
  onFormSubmit?: () => void;
}

export function RoomForm({ room, onFormSubmit }: RoomFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      roomNumber: room?.roomNumber || "",
      type: room?.type || roomTypes[0],
      capacity: room?.capacity || 1,
      wing: room?.wing || "",
      floor: room?.floor || "",
      amenities: room?.amenities || [],
      status: room?.status || "available",
    },
  });

  const onSubmit = async (data: RoomFormData) => {
    try {
      let result;
      if (room?.id) {
        result = await updateRoom(room.id, data);
      } else {
        result = await createRoom(data);
      }

      if (result.success) {
        toast({
          title: room?.id ? "Room Updated" : "Room Created",
          description: result.message,
        });
        reset();
        if (onFormSubmit) {
          onFormSubmit();
        } else {
          router.push("/admin/rooms");
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="roomNumber">Room Number/Name</Label>
          <Input id="roomNumber" {...register("roomNumber")} />
          {errors.roomNumber && <p className="text-sm text-destructive mt-1">{errors.roomNumber.message}</p>}
        </div>
        <div>
          <Label htmlFor="type">Room Type</Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  {roomTypes.map((type) => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="capacity">Capacity</Label>
          <Input id="capacity" type="number" {...register("capacity")} />
          {errors.capacity && <p className="text-sm text-destructive mt-1">{errors.capacity.message}</p>}
        </div>
         <div>
          <Label htmlFor="status">Status</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {roomStatuses.map((status) => (
                    <SelectItem key={status} value={status} className="capitalize">
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && <p className="text-sm text-destructive mt-1">{errors.status.message}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="wing">Wing (Optional)</Label>
          <Input id="wing" {...register("wing")} />
          {errors.wing && <p className="text-sm text-destructive mt-1">{errors.wing.message}</p>}
        </div>
        <div>
          <Label htmlFor="floor">Floor (Optional)</Label>
          <Input id="floor" {...register("floor")} />
          {errors.floor && <p className="text-sm text-destructive mt-1">{errors.floor.message}</p>}
        </div>
      </div>

      <div>
        <Label>Amenities (Optional)</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2 p-3 border rounded-md">
          {allAmenities.map((amenity) => (
            <Controller
              key={amenity}
              name="amenities"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity-${amenity.replace(/\s+/g, '-')}`}
                    checked={field.value?.includes(amenity)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([...(field.value || []), amenity])
                        : field.onChange(
                            field.value?.filter((value) => value !== amenity)
                          );
                    }}
                  />
                  <Label htmlFor={`amenity-${amenity.replace(/\s+/g, '-')}`} className="cursor-pointer text-sm font-normal">{amenity}</Label>
                </div>
              )}
            />
          ))}
        </div>
         {errors.amenities && <p className="text-sm text-destructive mt-1">{errors.amenities.message}</p>}
      </div>


      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? (room?.id ? "Updating..." : "Creating...") : (room?.id ? "Update Room" : "Create Room")}
      </Button>
    </form>
  );
}
