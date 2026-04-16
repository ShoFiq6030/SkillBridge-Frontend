import { bookingService } from "@/services/booking.service";
import { userService } from "@/services/user.service";
import { ManageBookingsClient } from "@/components/modules/manageBookingPage/ManageBookingsClient";
import { Card, CardContent } from "@/components/ui/card";
import { updateBookingStatusAction } from "@/actions/admin.action";
import { Booking } from "@/types/tutor.type";

export const dynamic = "force-dynamic";

export default async function AdminManageBookingsPage() {
  const { data, error } = await bookingService.getAdminBookings();
  const bookingData = data as Booking[];

  if (error || !data) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Bookings</h1>
          <p className="text-muted-foreground">
            View and manage all platform bookings.
          </p>
        </div>
      </div>
    );
  }

  const confirmedBookings = bookingData
    .filter((booking) => booking.status === "CONFIRMED")
    .map((booking) => ({
      booking,
      slot: booking.slot,
      tutorSubject: booking.tutorSubject,
    }))
    .sort((a, b) => {
      const dateA = a.slot ? new Date(a.slot.startAt) : new Date(0);
      const dateB = b.slot ? new Date(b.slot.startAt) : new Date(0);
      return dateA.getTime() - dateB.getTime();
    });

  const completedBookings = bookingData
    .filter((booking) => booking.status === "COMPLETED")
    .map((booking) => ({
      booking,
      slot: booking.slot,
      tutorSubject: booking.tutorSubject,
    }))
    .sort((a, b) => {
      const dateA = a.slot ? new Date(a.slot.startAt) : new Date(0);
      const dateB = b.slot ? new Date(b.slot.startAt) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

  const cancelledBookings = bookingData
    .filter((booking) => booking.status === "CANCELLED")
    .map((booking) => ({
      booking,
      slot: booking.slot,
      tutorSubject: booking.tutorSubject,
    }))
    .sort((a, b) => {
      const dateA = a.slot ? new Date(a.slot.startAt) : new Date(0);
      const dateB = b.slot ? new Date(b.slot.startAt) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Bookings</h1>
        <p className="text-muted-foreground">
          View and manage bookings across the platform.
        </p>
      </div>

      <ManageBookingsClient
        confirmedBookings={confirmedBookings}
        completedBookings={completedBookings}
        cancelledBookings={cancelledBookings}
      />
    </div>
  );
}
