"use client";

import { useState } from "react";
import { Booking, TutorSlot, TutorSubject } from "@/types/tutor.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

import { BookingCard } from "./BookingCard";
import { updateBookingStatusAction } from "@/actions/booking.action";

interface BookingListItem {
  booking: Booking;
  slot: TutorSlot | undefined;
  tutorSubject: TutorSubject | undefined;
}

interface ManageBookingsClientProps {
  confirmedBookings: BookingListItem[];
  completedBookings: BookingListItem[];
  cancelledBookings: BookingListItem[];
 
}

const tabData = [
  { key: "CONFIRMED", label: "Confirmed" },
  { key: "COMPLETED", label: "Completed" },
  { key: "CANCELLED", label: "Cancelled" },
];

export function ManageBookingsClient({
  confirmedBookings,
  completedBookings,
  cancelledBookings,
}: ManageBookingsClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "CONFIRMED" | "COMPLETED" | "CANCELLED"
  >("CONFIRMED");

  const handleStatusChange = async () => {
    router.refresh();
  };

  const getSelectedBookings = () => {
    switch (activeTab) {
      case "COMPLETED":
        return completedBookings;
      case "CANCELLED":
        return cancelledBookings;
      case "CONFIRMED":
      default:
        return confirmedBookings;
    }
  };

  const selectedBookings = getSelectedBookings();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
          <CardDescription>Filter bookings by status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {tabData.map((tab) => {
              const count =
                tab.key === "CONFIRMED"
                  ? confirmedBookings.length
                  : tab.key === "COMPLETED"
                    ? completedBookings.length
                    : cancelledBookings.length;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    activeTab === tab.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>

          {selectedBookings.length > 0 ? (
            <div className="space-y-4">
              {selectedBookings.map(({ booking, slot, tutorSubject }) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  slot={slot}
                  tutorSubject={tutorSubject}
                  isUpcoming={activeTab === "CONFIRMED"}
                  
                  onStatusChanged={handleStatusChange}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No bookings in this category.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
