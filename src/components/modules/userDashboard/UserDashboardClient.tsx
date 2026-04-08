"use client";

import { Booking } from "@/types/booking";
import { UserBookingCard } from "./UserBookingCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Filter,
  Search,
  TrendingUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";

interface UserDashboardClientProps {
  bookings: Booking[];
}

export function UserDashboardClient({ bookings }: UserDashboardClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const router = useRouter();
  // console.log(bookings);

  const stats = () => {
    const totalSessions = bookings.length;
    const upcoming = bookings.filter((b) => b.status === "CONFIRMED").length;
    const completed = bookings.filter((b) => b.status === "COMPLETED").length;
    const totalSpent = bookings.reduce(
      (sum, b) => sum + (b.status !== "CANCELLED" ? b.price : 0),
      0,
    );

    // Find favorite subject
    const subjects = bookings.map(
      (b) => b.tutorSubject?.category?.name || "General",
    );
    const subjectCounts = subjects.reduce(
      (acc, s) => {
        acc[s] = (acc[s] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const favoriteSubject =
      Object.entries(subjectCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "None";

    return {
      totalSessions,
      upcoming,
      completed,
      totalSpent,
      favoriteSubject,
    };
  };

  const filteredBookings = () => {
    return bookings
      .filter((booking) => {
        const matchesSearch =
          booking.tutorProfile.headline
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (booking.tutorSubject?.category?.name || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === "ALL" || booking.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  };

  const upcomingBookings = bookings
    .filter((b) => b.status === "CONFIRMED" || b.status === "PENDING")
    .sort(
      (a, b) =>
        new Date(a.slot.startAt).getTime() - new Date(b.slot.startAt).getTime(),
    )
    .slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            User Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your learning sessions and track your progress.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/tutors")}
          >
            Find New Tutors
          </Button>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-none shadow-sm bg-gradient-to-br from-blue-500/10 to-blue-600/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Sessions
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats().totalSessions}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Sessions booked so far
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-none shadow-sm bg-gradient-to-br from-orange-500/10 to-orange-600/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats().upcoming}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Confirmed & pending
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-none shadow-sm bg-gradient-to-br from-green-500/10 to-green-600/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <CreditCard className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats().totalSpent}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Investment in learning
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-none shadow-sm bg-gradient-to-br from-purple-500/10 to-purple-600/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Top Subject</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate capitalize">
              {stats().favoriteSubject}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Your most frequent area
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        {/* Main Content: Booking Management */}
        <div className="md:col-span-5 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b">
              <div>
                <CardTitle className="text-xl font-bold">
                  Manage Bookings
                </CardTitle>
                <CardDescription>
                  Track and manage your session status
                </CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search tutor or subject..."
                    className="pl-9 h-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px] h-9">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>

                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {filteredBookings().length > 0 ? (
                <div className="space-y-4">
                  {filteredBookings().map((booking) => (
                    <UserBookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <Filter className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">No bookings found</p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your filters or search term.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("ALL");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Upcoming & Recent */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-primary/5 pb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Next Sessions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-3 border rounded-lg space-y-2 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-sm line-clamp-1">
                        {booking.tutorSubject?.category?.name || "General"}
                      </p>
                      <Badge variant="outline" className="text-[10px] h-4">
                        {format(parseISO(booking.slot.startAt), "MMM dd")}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {format(parseISO(booking.slot.startAt), "h:mm a")}
                    </div>
                    <p className="text-xs font-medium text-primary">
                      Tutor: {booking.tutorProfile?.user?.name}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-sm text-muted-foreground py-8">
                  No upcoming sessions
                </p>
              )}
              {upcomingBookings.length > 0 && (
                <Button
                  variant="link"
                  className="w-full text-xs text-primary"
                  onClick={() => setStatusFilter("CONFIRMED")}
                >
                  View all confirmed sessions
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden bg-muted/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Learning Tip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground italic">
                "Consistency is the key to mastering any subject. Try to
                schedule sessions at the same time every week to build a
                routine."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
