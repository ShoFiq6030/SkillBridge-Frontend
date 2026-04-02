"use client";

import { Booking, TutorSlot, TutorSubject } from "@/types/tutor.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { BookingCard } from "./BookingCard";

interface ManageBookingsClientProps {
  upcomingBookings: Array<{
    booking: Booking;
    slot: TutorSlot | undefined;
    tutorSubject: TutorSubject | undefined;
  }>;
  pastBookings: Array<{
    booking: Booking;
    slot: TutorSlot | undefined;
    tutorSubject: TutorSubject | undefined;
  }>;
}

export function ManageBookingsClient({
  upcomingBookings,
  pastBookings,
}: ManageBookingsClientProps) {
  return (
    <div className="space-y-6">
      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>
            Your scheduled and pending tutoring sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.map(({ booking, slot, tutorSubject }) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  slot={slot}
                  tutorSubject={tutorSubject}
                  isUpcoming={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No upcoming sessions</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Past Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Session History</CardTitle>
          <CardDescription>Your past tutoring sessions</CardDescription>
        </CardHeader>
        <CardContent>
          {pastBookings.length > 0 ? (
            <div className="space-y-4">
              {pastBookings.map(({ booking, slot, tutorSubject }) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  slot={slot}
                  tutorSubject={tutorSubject}
                  isUpcoming={false}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No past sessions</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
