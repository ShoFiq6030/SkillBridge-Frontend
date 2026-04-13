import { useState } from "react";
import { Booking, TutorSlot, TutorSubject } from "@/types/tutor.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { Eye, XCircle, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateBookingStatusAction  } from "@/actions/booking.action";

interface BookingCardProps {
  booking: Booking;
  slot: TutorSlot | undefined;
  tutorSubject: TutorSubject | undefined;
  isUpcoming: boolean;

  onStatusChanged?: () => void;
}

export function BookingCard({
  booking,
  slot,
  tutorSubject,
  isUpcoming,

  onStatusChanged,
}: BookingCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const updateAction =
    updateBookingStatusAction 

  const formatTimeRange = (startAt: string, endAt: string) => {
    const start = parseISO(startAt);
    const end = parseISO(endAt);
    return `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`;
  };

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

  const handleCancel = async () => {
    setIsUpdating(true);
    try {
      const result = await updateAction(booking.id, "CANCELLED");
      if (result.data.success) {
        toast.success(result.data.message);
        if (onStatusChanged) onStatusChanged();
      } else {
        toast.error(result.data.error);
      }
    } catch (err) {
      toast.error("Failed to update booking status");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleComplete = async () => {
    setIsUpdating(true);
    try {
      const result = await updateAction(booking.id, "COMPLETED");
      if (result.data.success) {
        toast.success(result.data.message);
        if (onStatusChanged) onStatusChanged();
      } else {
        toast.error(result.data.error);
      }
    } catch (err) {
      toast.error("Failed to update booking status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
      <div>
        <p className="font-medium">Student</p>
        <p className="text-sm text-muted-foreground">
          {booking.student?.name || booking.studentId.slice(0, 8) + "..."}
        </p>
        <p className="text-xs text-muted-foreground">
          {booking.student?.email || ""}
        </p>
      </div>
      <div>
        <p className="font-medium">Tutor</p>
        <p className="text-sm text-muted-foreground">
          {booking.tutorProfile?.user?.name ||
            booking.tutorProfile?.id ||
            "Unknown"}
        </p>
        <p className="text-xs text-muted-foreground">
          {booking.tutorProfile?.user?.email || ""}
        </p>
      </div>
      <div>
        <p className="font-medium">Subject</p>
        <p className="text-sm text-muted-foreground">
          {tutorSubject?.category.name || "General"}
        </p>
      </div>
      <div>
        <p className="font-medium">{isUpcoming ? "Date & Time" : "Date"}</p>
        {slot ? (
          <>
            <p className="text-sm">
              {format(parseISO(slot.startAt), "MMM dd, yyyy")}
            </p>
            {isUpcoming && (
              <p className="text-xs text-muted-foreground">
                {formatTimeRange(slot.startAt, slot.endAt)}
              </p>
            )}
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
        {booking.status === "COMPLETED" && (
          <div className="mt-2 rounded-lg border border-muted p-3 bg-muted/20">
            <p className="text-sm font-medium">Review</p>
            {booking.review ? (
              <>
                <p className="text-sm mt-1">
                  Rating: {booking.review.rating} / 5
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {booking.review.comment}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground mt-1">
                No review available.
              </p>
            )}
          </div>
        )}
      </div>
      <div className={isUpcoming ? "md:col-span-2" : ""}>
        <p className="font-medium">Actions</p>
        <div className={`${isUpcoming ? "flex flex-col space-y-2 mt-1" : ""}`}>
          {isUpcoming && booking.status === "CONFIRMED" && (
            <>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleCancel}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Cancel"
                )}
              </Button>
              <Button
                size="sm"
                variant="default"
                onClick={handleComplete}
                disabled={isUpdating}
              >
                <CheckCircle className="mr-1 h-3 w-3" />
                {isUpdating ? "Processing..." : "Mark Complete"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
