"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { addSlot, updateSlot } from "@/actions/tutor.action";

interface AddAndUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot: {
    id?: string;
    startAt: string;
    endAt: string;
  } | null;
  onSuccess: () => void;
}

export default function AddAndUpdateModal({
  isOpen,
  onClose,
  slot,
  onSuccess,
}: AddAndUpdateModalProps) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!slot?.id;

  useEffect(() => {
    if (isOpen) {
      if (slot && slot.id) {
        // Edit mode: populate with existing slot data
        const start = new Date(slot.startAt);
        const end = new Date(slot.endAt);

        setDate(formatDateOnly(start));
        setStartTime(formatTimeOnly(start));
        setEndTime(formatTimeOnly(end));
      } else {
        // Add mode: clear fields
        setDate("");
        setStartTime("");
        setEndTime("");
      }
    }
  }, [isOpen, slot]);

  const formatDateOnly = (date: Date): string => {
    // Format for date input: YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTimeOnly = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const convertToUTC = (dateStr: string, timeStr: string): string => {
    // Combine date and time, then convert to UTC
    const localDate = new Date(`${dateStr}T${timeStr}`);
    return localDate.toISOString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !startTime || !endTime) {
      toast.error("Please fill in all fields");
      return;
    }

    const startUTC = convertToUTC(date, startTime);
    const endUTC = convertToUTC(date, endTime);

    // Validate that end time is after start time
    const start = new Date(startUTC);
    const end = new Date(endUTC);
    if (end <= start) {
      toast.error("End time must be after start time");
      return;
    }

    setIsSubmitting(true);

    try {
      let res;
      if (isEditMode && slot?.id) {
        res = await updateSlot(slot.id, startUTC, endUTC);
      } else {
        res = await addSlot(startUTC, endUTC);
      }

      if (res.error) {
        toast.error(res.error.message || `Failed to ${isEditMode ? "update" : "add"} slot`);
      }
      if (res.data) {
        toast.success(`Slot ${isEditMode ? "updated" : "added"} successfully`);
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error(`An error occurred while ${isEditMode ? "updating" : "adding"} the slot`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Time Slot" : "Add New Time Slot"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the start and end time for this availability slot."
              : "Create a new availability slot. Select date and times in your local timezone."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  {isEditMode ? "Updating..." : "Adding..."}
                </>
              ) : (
                <>{isEditMode ? "Update Slot" : "Add Slot"}</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}