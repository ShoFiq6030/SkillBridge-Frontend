import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";
import { Tutor, Review } from "@/types/tutor.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, parseISO, isToday, isThisWeek } from "date-fns";

export const dynamic = "force-dynamic";

export default async function TutorDashboard() {
  const session = await userService.getSession();
  const userInfo = session.data?.user;
  // console.log(userInfo)

  if (!userInfo) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Please log in to view your dashboard
          </p>
          <Button asChild className="mt-4">
            <a href="/login">Log In</a>
          </Button>
        </div>
      </div>
    );
  }

  const tutorDataResult = await tutorService.getTutorByUserIdAuth(userInfo.id);
  // console.log(tutorDataResult)
  const { data: tutorStats } = await tutorService.getTutorStats();
  // console.log(tutorStats)

  if (tutorDataResult.error || !tutorDataResult.data) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Error loading tutor data</p>
          <p className="text-sm text-red-500 mt-2">
            {tutorDataResult.error?.message || "Unknown error"}
          </p>
          <Button asChild variant="outline" className="mt-4">
            <a href="/dashboard/tutor-dashboard/manage-subjects">
              Create Tutor Profile
            </a>
          </Button>
        </div>
      </div>
    );
  }

  const tutorData: Tutor = tutorDataResult.data;

  // Calculate stats
  const todaySessions = tutorData.slots.filter(
    (slot) => slot.isBooked && isToday(parseISO(slot.startAt)),
  ).length;

  const thisWeekSessions = tutorData.slots.filter(
    (slot) => slot.isBooked && isThisWeek(parseISO(slot.startAt)),
  ).length;

  const uniqueStudentIds = new Set(
    tutorData.bookings.map((booking) => booking.studentId),
  );
  const totalStudents = uniqueStudentIds.size;

  const avgRating = tutorData.avgRating || 0;

  // Get upcoming bookings with slot and subject info
  const upcomingBookings = tutorData.bookings
    .filter((booking) => booking.status === "CONFIRMED")
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
    .filter((item) => item.slot !== undefined)
    .sort(
      (a, b) =>
        new Date(a.slot!.startAt).getTime() -
        new Date(b.slot!.startAt).getTime(),
    )
    .slice(0, 3);

  // Get recent reviews (with dummy data if empty)
  const recentReviews: Review[] =
    tutorData.reviews.length > 0 ? tutorData.reviews.slice(0, 3) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tutor Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {tutorData.user.name}! Here's an overview of your
            tutoring activities.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            {tutorData.user.image ? (
              <AvatarImage
                src={tutorData.user.image}
                alt={tutorData.user.name}
              />
            ) : (
              <AvatarFallback>{tutorData.user.name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div className="text-right">
            <p className="font-medium">{tutorData.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {tutorData.headline}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tutorStats.totalBookings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisWeekSessions}</div>
            <p className="text-xs text-muted-foreground">
              {thisWeekSessions === 0
                ? "No sessions this week"
                : `${thisWeekSessions} session${thisWeekSessions > 1 ? "s" : ""}`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              {totalStudents === 0
                ? "No students yet"
                : `Active student${totalStudents > 1 ? "s" : ""}`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {avgRating > 0 ? `${avgRating.toFixed(1)} ⭐` : "No ratings yet"}
            </div>
            <p className="text-xs text-muted-foreground">
              {tutorData.totalReviews}{" "}
              {tutorData.totalReviews === 1 ? "review" : "reviews"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Complate Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tutorStats.completedBookings}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold ">
              {tutorStats.totalEarnings}$
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Profile Overview */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
            <CardDescription>Your tutoring profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                {tutorData.user.image ? (
                  <AvatarImage
                    src={tutorData.user.image}
                    alt={tutorData.user.name}
                  />
                ) : (
                  <AvatarFallback>
                    {tutorData.user.name.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{tutorData.user.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {tutorData.headline}
                </p>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="ml-1 text-sm font-medium">
                    {avgRating > 0 ? avgRating.toFixed(1) : "No ratings"}
                  </span>
                  <span className="mx-1 text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">
                    {tutorData.experienceYears} years experience
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Bio</h4>
              <p className="text-sm text-muted-foreground">
                {tutorData.bio || "No bio provided yet."}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Subjects</h4>
              <div className="flex flex-wrap gap-2">
                {tutorData.subjects.length > 0 ? (
                  tutorData.subjects.map((subject) => (
                    <Badge key={subject.id} variant="secondary">
                      {subject.category.name}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No subjects added yet
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <h4 className="text-sm font-medium mb-1">Hourly Rate</h4>
                <p className="text-lg font-bold">
                  ${tutorData.hourlyRate}/{tutorData.currency}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Languages</h4>
                <p className="text-sm">{tutorData.language}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled tutoring sessions</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map(({ booking, slot, tutorSubject }) => (
                  <div
                    key={booking.id}
                    className="flex items-start space-x-3 p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium">
                        {tutorSubject?.category.name || "General"}
                      </p>
                      {slot && (
                        <>
                          <p className="text-sm text-muted-foreground">
                            {format(parseISO(slot.startAt), "MMM dd, yyyy")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {format(parseISO(slot.startAt), "h:mm a")} -{" "}
                            {format(parseISO(slot.endAt), "h:mm a")}
                          </p>
                        </>
                      )}
                    </div>
                    <Badge variant="outline">{booking.status}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No upcoming sessions</p>
                <Button variant="outline" className="mt-2" asChild>
                  <a href="/dashboard/tutor-dashboard/manage-slots">
                    Add Availability
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
          <CardDescription>Feedback from your students</CardDescription>
        </CardHeader>
        <CardContent>
          {recentReviews.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentReviews.map((review: Review) => (
                <div key={review.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-12 w-12">
                        {review.student?.image ? (
                          <AvatarImage
                            src={review.student?.image}
                            alt={review.student?.name}
                          />
                        ) : (
                          <AvatarFallback>
                            {review.student?.name?.charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span className="font-medium text-sm">
                        {review.student?.name || "Student"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-500">
                        {"★".repeat(review.rating)}
                      </span>
                      <span className="ml-1 text-sm font-medium">
                        {review.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    "{review.comment}"
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {format(parseISO(review.createdAt), "MMM dd, yyyy")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No reviews yet</p>
              <p className="text-sm text-muted-foreground">
                Complete sessions to receive feedback from students
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you might want to do</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              asChild
              variant="outline"
              className="h-auto py-4 flex flex-col"
            >
              <a href="/dashboard/tutor-dashboard/manage-subjects">
                <span className="text-lg mb-1">📚</span>
                <span className="text-sm">Manage Subjects</span>
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto py-4 flex flex-col"
            >
              <a href="/dashboard/tutor-dashboard/manage-slots">
                <span className="text-lg mb-1">📅</span>
                <span className="text-sm">Manage Slots</span>
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto py-4 flex flex-col"
            >
              <a href="/dashboard/tutor-dashboard/manage-bookings">
                <span className="text-lg mb-1">📋</span>
                <span className="text-sm">Manage Bookings</span>
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto py-4 flex flex-col"
            >
              <a href="/dashboard/tutor-dashboard/history">
                <span className="text-lg mb-1">📊</span>
                <span className="text-sm">View History</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
