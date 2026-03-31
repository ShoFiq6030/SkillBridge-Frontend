import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";
import { Tutor, Booking } from "@/types/tutor.type";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { Eye, XCircle, CheckCircle } from "lucide-react";
import { Suspense } from "react";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

export default async function ManageBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Bookings</h1>
        <p className="text-muted-foreground">
          View and manage your tutoring session bookings.
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <BookingsContent />
      </Suspense>
    </div>
  );
}

async function BookingsContent() {
  const session = await userService.getSession();
  const userInfo = session.data?.user;

  if (!userInfo) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">Please log in to manage bookings</p>
          <Button asChild>
            <a href="/login">Log In</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const tutorDataResult = await tutorService.getTutorByUserIdAuth(userInfo.id);
  
  if (tutorDataResult.error || !tutorDataResult.data) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-2">Error loading bookings</p>
          <p className="text-sm text-red-500">{tutorDataResult.error?.message || "Unknown error"}</p>
        </CardContent>
      </Card>
    );
  }

  const tutorData: Tutor = tutorDataResult.data;

  // Separate bookings by status
  const upcomingBookings = tutorData.bookings.filter(
    booking => booking.status === "CONFIRMED" || booking.status === "PENDING"
  ).map(booking => {
    const slot = tutorData.slots.find(s => s.id === booking.slotId);
    const tutorSubject = tutorData.subjects.find(s => s.id === booking.tutorSubjectId);
    return {
      booking,
      slot,
      tutorSubject
    };
  }).sort((a, b) => {
    const dateA = a.slot ? new Date(a.slot.startAt) : new Date(0);
    const dateB = b.slot ? new Date(b.slot.startAt) : new Date(0);
    return dateA.getTime() - dateB.getTime();
  });

  const pastBookings = tutorData.bookings.filter(
    booking => booking.status === "COMPLETED" || booking.status === "CANCELLED"
  ).map(booking => {
    const slot = tutorData.slots.find(s => s.id === booking.slotId);
    const tutorSubject = tutorData.subjects.find(s => s.id === booking.tutorSubjectId);
    return {
      booking,
      slot,
      tutorSubject
    };
  }).sort((a, b) => {
    const dateA = a.slot ? new Date(a.slot.startAt) : new Date(0);
    const dateB = b.slot ? new Date(b.slot.startAt) : new Date(0);
    return dateB.getTime() - dateA.getTime(); // Most recent first
  }).slice(0, 10);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "default";
      case "PENDING":
        return "secondary";
      case "CANCELLED":
        return "destructive";
      case "COMPLETED":
        return "outline";
      default:
        return "outline";
    }
  };

  const formatTimeRange = (startAt: string, endAt: string) => {
    const start = parseISO(startAt);
    const end = parseISO(endAt);
    return `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`;
  };

  return (
    <>
      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Your scheduled and pending tutoring sessions</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.map(({ booking, slot, tutorSubject }) => (
                <div key={booking.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Student</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.studentId.slice(0, 8)}...
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Subject</p>
                    <p className="text-sm text-muted-foreground">
                      {tutorSubject?.category.name || "General"}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Date & Time</p>
                    {slot ? (
                      <>
                        <p className="text-sm">{format(parseISO(slot.startAt), "MMM dd, yyyy")}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatTimeRange(slot.startAt, slot.endAt)}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">No slot assigned</p>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">Status</p>
                    <Badge variant={getStatusBadgeVariant(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-medium">Actions</p>
                    <div className="flex space-x-2 mt-1">
                      {booking.status === "PENDING" && (
                        <>
                          <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Accept
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="mr-1 h-3 w-3" />
                            Decline
                          </Button>
                        </>
                      )}
                      {booking.status === "CONFIRMED" && (
                        <>
                          <Button size="sm" variant="outline">
                            <Eye className="mr-1 h-3 w-3" />
                            View
                          </Button>
                          <Button size="sm" variant="destructive">
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
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
                <div key={booking.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Student</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.studentId.slice(0, 8)}...
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Subject</p>
                    <p className="text-sm text-muted-foreground">
                      {tutorSubject?.category.name || "General"}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Date</p>
                    {slot ? (
                      <p className="text-sm">{format(parseISO(slot.startAt), "MMM dd, yyyy")}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">-</p>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">Status</p>
                    <Badge variant={getStatusBadgeVariant(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                  <div>
                    <Button size="sm" variant="outline">
                      <Eye className="mr-1 h-3 w-3" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No past sessions</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}