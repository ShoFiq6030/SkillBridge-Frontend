"use client";

import { Booking } from "@/types/booking";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import {
  Calendar,
  Clock,
  User,
  BookOpen,
  MoreVertical,
  XCircle,
  Loader2,
  Check,
} from "lucide-react";
import { useState } from "react";
import { updateBookingStatusAction } from "@/actions/booking.action";
import { ReviewModal } from "@/components/modules/userDashboard/ReviewModal";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserBookingCardProps {
  booking: Booking;
}

export function UserBookingCard({ booking }: UserBookingCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);

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
      const result = await updateBookingStatusAction(booking.id, "CANCELLED");
      if (result.data) {
        toast.success("Booking cancelled successfully");
      } else {
        toast.error(result.error?.message || "Failed to cancel booking");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const canCancel =
    booking.status === "PENDING" || booking.status === "CONFIRMED";
  const canReview = booking.status === "COMPLETED";
  const reviewed = booking.review ? true : false;


  const handleReview = () => {
    setOpenReviewModal(true);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-xl bg-card hover:shadow-md transition-shadow gap-4">
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <Badge
            variant={getStatusBadgeVariant(booking.status)}
            className="capitalize"
          >
            {booking.status.toLowerCase()}
          </Badge>
          <span className="text-xs text-muted-foreground">
            Booked on {format(parseISO(booking.createdAt), "MMM dd, yyyy")}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-primary" />
            <span className="font-medium">Tutor:</span>
            <span className="text-muted-foreground">
              {booking.tutorProfile?.user?.name || "Professional Tutor"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="font-medium">Subject:</span>
            <span className="text-muted-foreground">
              {booking.tutorSubject?.category?.name || "General"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-medium">Date:</span>
            <span className="text-muted-foreground">
              {format(parseISO(booking.slot.startAt), "EEEE, MMM dd")}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium">Time:</span>
            <span className="text-muted-foreground">
              {formatTimeRange(booking.slot.startAt, booking.slot.endAt)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Price:</span>
            <span className="text-primary font-bold">${booking.price}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {canCancel && (
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:bg-destructive/10"
            onClick={handleCancel}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <XCircle className="mr-2 h-4 w-4" />
                Cancel
              </>
            )}
          </Button>
        )}
        {canReview && (
          <Button variant="outline" size="sm" onClick={handleReview}>
            Review {reviewed && <Check className="ml-2 h-4 w-4" />}
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Contact Tutor</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ReviewModal
        bookingId={booking.id}
        reviewData={booking.review}
        isOpen={openReviewModal}
        onOpenChange={setOpenReviewModal}
      />
    </div>
  );
}
