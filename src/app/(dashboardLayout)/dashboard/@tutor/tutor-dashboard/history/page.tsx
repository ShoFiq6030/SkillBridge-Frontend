import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";
import { Tutor, Booking } from "@/types/tutor.type";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format, parseISO, isAfter, isBefore, startOfMonth, endOfMonth } from "date-fns";
import { Eye, Star } from "lucide-react";
import { Suspense } from "react";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

export default async function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Session History</h1>
        <p className="text-muted-foreground">
          View your past tutoring sessions and performance metrics.
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <HistoryContent />
      </Suspense>
    </div>
  );
}

async function HistoryContent() {
  const session = await userService.getSession();
  const userInfo = session.data?.user;

  if (!userInfo) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">Please log in to view history</p>
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
          <p className="text-muted-foreground mb-2">Error loading history</p>
          <p className="text-sm text-red-500">{tutorDataResult.error?.message || "Unknown error"}</p>
        </CardContent>
      </Card>
    );
  }

  const tutorData: Tutor = tutorDataResult.data;

  // Get all completed and cancelled bookings (past sessions)
  const allPastBookings = tutorData.bookings
    .filter(booking => booking.status === "COMPLETED" || booking.status === "CANCELLED")
    .map(booking => {
      const slot = tutorData.slots.find(s => s.id === booking.slotId);
      const tutorSubject = tutorData.subjects.find(s => s.id === booking.tutorSubjectId);
      return {
        booking,
        slot,
        tutorSubject
      };
    })
    .filter(item => item.slot !== undefined)
    .sort((a, b) => new Date(b.slot!.startAt).getTime() - new Date(a.slot!.startAt).getTime());

  // Calculate statistics
  const totalSessions = allPastBookings.length;
  const completedSessions = allPastBookings.filter(item => item.booking.status === "COMPLETED").length;
  const cancelledSessions = allPastBookings.filter(item => item.booking.status === "CANCELLED").length;

  // Calculate total earnings (only from completed sessions)
  const totalEarnings = allPastBookings
    .filter(item => item.booking.status === "COMPLETED")
    .reduce((sum, item) => {
      // Calculate duration in hours
      const start = new Date(item.slot!.startAt);
      const end = new Date(item.slot!.endAt);
      const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      return sum + (durationHours * tutorData.hourlyRate);
    }, 0);

  // Calculate completion rate
  const completionRate = totalSessions > 0 ? ((completedSessions / totalSessions) * 100).toFixed(1) : 0;

  // Get current month's data
  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const currentMonthEnd = endOfMonth(now);

  const thisMonthBookings = allPastBookings.filter(item => {
    const sessionDate = new Date(item.slot!.startAt);
    return isAfter(sessionDate, currentMonthStart) && isBefore(sessionDate, currentMonthEnd);
  });

  const thisMonthEarnings = thisMonthBookings
    .filter(item => item.booking.status === "COMPLETED")
    .reduce((sum, item) => {
      const start = new Date(item.slot!.startAt);
      const end = new Date(item.slot!.endAt);
      const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      return sum + (durationHours * tutorData.hourlyRate);
    }, 0);

  const thisMonthSessions = thisMonthBookings.length;

  // Group by month for chart data (simplified)
  const monthlyData = allPastBookings.reduce((acc, item) => {
    const month = format(new Date(item.slot!.startAt), "MMMM yyyy");
    if (!acc[month]) {
      acc[month] = {
        sessions: 0,
        earnings: 0,
        completed: 0,
        cancelled: 0
      };
    }
    acc[month].sessions++;
    if (item.booking.status === "COMPLETED") {
      acc[month].completed++;
      const start = new Date(item.slot!.startAt);
      const end = new Date(item.slot!.endAt);
      const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      acc[month].earnings += durationHours * tutorData.hourlyRate;
    } else if (item.booking.status === "CANCELLED") {
      acc[month].cancelled++;
    }
    return acc;
  }, {} as Record<string, { sessions: number; earnings: number; completed: number; cancelled: number }>);

  // Get recent sessions (last 10)
  const recentSessions = allPastBookings.slice(0, 10);

  return (
    <>
      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSessions}</div>
            <p className="text-xs text-muted-foreground">
              {completedSessions} completed, {cancelledSessions} cancelled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalEarnings.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Lifetime earnings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {totalSessions > 0 ? `${completedSessions}/${totalSessions} sessions` : "No sessions yet"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tutorData.avgRating > 0 ? `${tutorData.avgRating.toFixed(1)} ⭐` : "No ratings"}
            </div>
            <p className="text-xs text-muted-foreground">
              From {tutorData.totalReviews} {tutorData.totalReviews === 1 ? 'review' : 'reviews'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* This Month Summary */}
      <Card>
        <CardHeader>
          <CardTitle>This Month's Summary</CardTitle>
          <CardDescription>
            Performance for {format(now, "MMMM yyyy")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{thisMonthSessions}</p>
              <p className="text-sm text-muted-foreground">Sessions This Month</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                ${thisMonthEarnings.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">Earnings This Month</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {tutorData.avgRating > 0 ? tutorData.avgRating.toFixed(1) : "N/A"}
              </p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Breakdown */}
      {Object.keys(monthlyData).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Monthly Breakdown</CardTitle>
            <CardDescription>Your performance by month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(monthlyData)
                .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                .map(([month, data]) => (
                  <div key={month} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{month}</p>
                      <p className="text-sm text-muted-foreground">
                        {data.completed} completed, {data.cancelled} cancelled
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${data.earnings.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        {data.sessions} total sessions
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
          <CardDescription>Your most recent tutoring sessions</CardDescription>
        </CardHeader>
        <CardContent>
          {recentSessions.length > 0 ? (
            <div className="space-y-4">
              {recentSessions.map(({ booking, slot, tutorSubject }) => (
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
                    {slot && (
                      <>
                        <p className="text-sm">{format(parseISO(slot.startAt), "MMM dd, yyyy")}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(parseISO(slot.startAt), "h:mm a")} - {format(parseISO(slot.endAt), "h:mm a")}
                        </p>
                      </>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">Status</p>
                    <Badge 
                      variant={booking.status === "COMPLETED" ? "default" : "destructive"}
                      className={booking.status === "COMPLETED" ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {booking.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-medium">Earnings</p>
                    {booking.status === "COMPLETED" && slot && (
                      <p className="text-sm font-semibold text-green-600">
                        ${(() => {
                          const start = new Date(slot.startAt);
                          const end = new Date(slot.endAt);
                          const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
                          return (hours * tutorData.hourlyRate).toFixed(2);
                        })()}
                      </p>
                    )}
                    {booking.status === "CANCELLED" && (
                      <p className="text-sm text-muted-foreground">$0.00</p>
                    )}
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
              <p className="text-muted-foreground">No session history yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Complete tutoring sessions to see your history here
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}