import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";
import { Tutor, TutorSlot } from "@/types/tutor.type";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Suspense } from "react";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

export default async function ManageSlotsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Slots</h1>
        <p className="text-muted-foreground">
          Set your availability and manage your tutoring schedule.
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <SlotsContent />
      </Suspense>
    </div>
  );
}

async function SlotsContent() {
  const session = await userService.getSession();
  const userInfo = session.data?.user;

  if (!userInfo) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">Please log in to manage slots</p>
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
          <p className="text-muted-foreground mb-2">Error loading slots</p>
          <p className="text-sm text-red-500">{tutorDataResult.error?.message || "Unknown error"}</p>
        </CardContent>
      </Card>
    );
  }

  const tutorData: Tutor = tutorDataResult.data;

  // Group slots by day of week
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const slotsByDay = weekDays.reduce((acc, day) => {
    acc[day] = [];
    return acc;
  }, {} as Record<string, TutorSlot[]>);

  tutorData.slots.forEach(slot => {
    const slotDate = parseISO(slot.startAt);
    const dayName = format(slotDate, "EEEE");
    if (slotsByDay[dayName]) {
      slotsByDay[dayName].push(slot);
    }
  });

  // Sort slots by start time within each day
  Object.keys(slotsByDay).forEach(day => {
    slotsByDay[day].sort((a, b) => 
      new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
    );
  });

  const formatTimeRange = (startAt: string, endAt: string) => {
    const start = parseISO(startAt);
    const end = parseISO(endAt);
    return `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`;
  };

  return (
    <>
      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Your recurring availability</CardDescription>
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Time Slot
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {weekDays.map((day) => {
              const daySlots = slotsByDay[day];
              return (
                <div key={day} className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">{day}</h3>
                  {daySlots && daySlots.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {daySlots.map((slot) => (
                        <div 
                          key={slot.id} 
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            slot.isBooked 
                              ? "bg-yellow-50 border-yellow-200" 
                              : "bg-green-50 border-green-200"
                          }`}
                        >
                          <div className="flex-1">
                            <span className="text-sm font-medium">
                              {formatTimeRange(slot.startAt, slot.endAt)}
                            </span>
                            {slot.isBooked && (
                              <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                Booked
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="outline" size="sm" className="h-8 px-2">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="destructive" size="sm" className="h-8 px-2">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No slots available</p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add New Time Slot */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Time Slot</CardTitle>
          <CardDescription>Create a new availability slot</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="day" className="text-sm font-medium">
                  Day
                </label>
                <select
                  id="day"
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {weekDays.map(day => (
                    <option key={day} value={day.toLowerCase()}>{day}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="startTime" className="text-sm font-medium">
                  Start Time
                </label>
                <input
                  id="startTime"
                  type="time"
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="endTime" className="text-sm font-medium">
                  End Time
                </label>
                <input
                  id="endTime"
                  type="time"
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="recurring"
                type="checkbox"
                defaultChecked
                className="rounded border-gray-300"
              />
              <label htmlFor="recurring" className="text-sm font-medium">
                Recurring weekly
              </label>
            </div>

            <Button type="submit">Add Time Slot</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}