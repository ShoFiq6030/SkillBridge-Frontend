"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tutor, TutorSlot } from "@/types";

import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteSlot } from "@/actions/tutor.action";
import { toast } from "sonner";
import AddAndUpdateModal from "./AddAndUpdateModal";

export default function SlotsList({ tutorData }: { tutorData: Tutor }) {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<{
    id?: string;
    startAt: string;
    endAt: string;
  } | null>(null);

  // Group slots by local date (YYYY-MM-DD)
  const slotsByDate = new Map<string, TutorSlot[]>();

  tutorData.slots.forEach((slot) => {
    const slotDate = parseISO(slot.startAt);
    const dateKey = format(slotDate, "yyyy-MM-dd"); // local date
    if (!slotsByDate.has(dateKey)) {
      slotsByDate.set(dateKey, []);
    }
    slotsByDate.get(dateKey)!.push(slot);
  });

  // Get sorted dates (ascending)
  const sortedDates = Array.from(slotsByDate.keys()).sort();

  // Sort slots within each day by start time
  sortedDates.forEach((dateKey) => {
    const daySlots = slotsByDate.get(dateKey)!;
    daySlots.sort(
      (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
    );
  });

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const formatTimeRange = (startAt: string, endAt: string) => {
    const start = parseISO(startAt);
    const end = parseISO(endAt);
    return `${format(start, "h:mm a")} to ${format(end, "h:mm a")}`;
  };

  const handleDeleteClick = (slotId: string) => {
    setSlotToDelete(slotId);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!slotToDelete) return;

    try {
      const res = await deleteSlot(slotToDelete);
      if (res.error) {
        toast.error(res.error.message || "Failed to delete slot");
      }
      if (res.data) {
        toast.success("Slot deleted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the slot");
    } finally {
      setDeleteConfirmOpen(false);
      setSlotToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setSlotToDelete(null);
  };

  const handleOpenAddModal = () => {
    setEditingSlot(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (slot: TutorSlot) => {
    setEditingSlot({
      id: slot.id,
      startAt: slot.startAt,
      endAt: slot.endAt,
    });
    setModalOpen(true);
  };

  const handleModalSuccess = () => {
    // The parent component will re-fetch data due to cache invalidation
    // This callback can be used for additional actions if needed
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Schedule by Date</CardTitle>
            <CardDescription>
              Your availability slots sorted by date (including past slots)
            </CardDescription>
          </div>
          <Button onClick={handleOpenAddModal}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Time Slot
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sortedDates.length > 0 ? (
            sortedDates.map((dateKey) => {
              const daySlots = slotsByDate.get(dateKey)!;
              const firstSlot = daySlots[0];
              const dateObj = parseISO(firstSlot.startAt);
              const formattedDate = format(dateObj, "EEEE, MMMM d, yyyy");

              return (
                <div key={dateKey} className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">{formattedDate}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {daySlots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`flex items-center  justify-between py-3 px-3 rounded-lg border ${
                          slot.isBooked
                            ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-700"
                            : "bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-700"
                        }`}
                      >
                        <div className="flex-1">
                          <span className="text-sm font-medium text-nowrap">
                            {formatTimeRange(slot.startAt, slot.endAt)}
                          </span>
                          {slot.isBooked && (
                            <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                              Booked
                            </span>
                          )}
                        </div>
                        {!slot.isBooked && (
                          <div className="flex space-x-2 ml-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2 cursor-pointer"
                              onClick={() => handleOpenEditModal(slot)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>

                            <Button
                              variant="destructive"
                              size="sm"
                              className="h-8 px-2 cursor-pointer"
                              disabled={slot.isBooked}
                              onClick={() => handleDeleteClick(slot.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground">No slots available</p>
          )}
        </div>
      </CardContent>

      {/* Delete Slot Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              time slot from your schedule.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add/Update Slot Modal */}
      <AddAndUpdateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        slot={editingSlot}
        onSuccess={handleModalSuccess}
      />
    </Card>
  );
}