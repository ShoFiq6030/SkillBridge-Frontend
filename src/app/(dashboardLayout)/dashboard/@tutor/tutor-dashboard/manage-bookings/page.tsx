import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";
import { Booking, Tutor, TutorSlot, TutorSubject } from "@/types/tutor.type";
import { ManageBookingsClient } from "@/components/modules/manageBookingPage/ManageBookingsClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

export default async function ManageBookingsPage() {
  let tutorData: Tutor | null = null;
  let error: string | null = null;

  try {
    const session = await userService.getSession();
    const userInfo = session.data?.user;

    if (!userInfo) {
      error = "Please log in to manage bookings";
    } else {
      const tutorDataResult = await tutorService.getTutorByUserIdAuth(
        userInfo.id,
      );

      if (tutorDataResult.error || !tutorDataResult.data) {
        error = tutorDataResult.error?.message || "Failed to load tutor data";
      } else {
        tutorData = tutorDataResult.data;
      }
    }
  } catch (err) {
    error = "Something went wrong";
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Bookings</h1>
          <p className="text-muted-foreground">
            View and manage your tutoring session bookings.
          </p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-2">Error loading bookings</p>
            <p className="text-sm text-red-500">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!tutorData) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Bookings</h1>
          <p className="text-muted-foreground">
            View and manage your tutoring session bookings.
          </p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No tutor data found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Separate bookings by status
  const upcomingBookings = tutorData.bookings
    .filter(
      (booking) =>
        booking.status === "CONFIRMED" || booking.status === "PENDING",
    )
    .map((booking) => {
      const slot = tutorData.slots.find((s) => s.id === booking.slotId);
      const tutorSubject = tutorData.subjects.find(
        (s) => s.id === booking.tutorSubjectId,
      );
      return {
        booking,
        slot,
        tutorSubject,
      };
    })
    .sort((a, b) => {
      const dateA = a.slot ? new Date(a.slot.startAt) : new Date(0);
      const dateB = b.slot ? new Date(b.slot.startAt) : new Date(0);
      return dateA.getTime() - dateB.getTime();
    });

  const pastBookings = tutorData.bookings
    .filter(
      (booking) =>
        booking.status === "COMPLETED" || booking.status === "CANCELLED",
    )
    .map((booking) => {
      const slot = tutorData.slots.find((s) => s.id === booking.slotId);
      const tutorSubject = tutorData.subjects.find(
        (s) => s.id === booking.tutorSubjectId,
      );
      return {
        booking,
        slot,
        tutorSubject,
      };
    })
    .sort((a, b) => {
      const dateA = a.slot ? new Date(a.slot.startAt) : new Date(0);
      const dateB = b.slot ? new Date(b.slot.startAt) : new Date(0);
      return dateB.getTime() - dateA.getTime(); // Most recent first
    })
    .slice(0, 10);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Bookings</h1>
        <p className="text-muted-foreground">
          View and manage your tutoring session bookings.
        </p>
      </div>

      <ManageBookingsClient
        upcomingBookings={upcomingBookings}
        pastBookings={pastBookings}
      />
    </div>
  );
}
