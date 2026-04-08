"use client";

import {  useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  submitReviewAction,
  updateReviewAction,
} from "@/actions/booking.action";

interface ReviewData {
  id: string;
  rating: number;
  comment: string;
}

interface ReviewModalProps {
  bookingId: string;
  isOpen: boolean;
  reviewData?: ReviewData;
  onOpenChange: (open: boolean) => void;
}

export function ReviewModal({
  bookingId,
  isOpen,
  reviewData,
  onOpenChange,
}: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && reviewData) {
      setRating(reviewData.rating);
      setComment(reviewData.comment);
    }
    if (isOpen && !reviewData) {
      setRating(5);
      setComment("");
    }
  }, [isOpen, reviewData]);

  const isEditMode = Boolean(reviewData?.id);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!bookingId) {
      toast.error("Unable to submit review without booking reference.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = isEditMode
        ? await updateReviewAction(reviewData!.id, rating, comment.trim())
        : await submitReviewAction(bookingId, rating, comment.trim());

      if (result.data) {
        toast.success(
          isEditMode
            ? "Review updated successfully."
            : "Review submitted successfully.",
        );
        onOpenChange(false);
      } else {
        toast.error(result.error?.message || "Failed to save review.");
      }
    } catch (error) {
      toast.error("Something went wrong while saving your review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Review" : "Write a Review"}
          </DialogTitle>
          <DialogDescription>
            Share your experience with a rating from 1 to 5 stars and a short
            comment.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={`focus:outline-none rounded-full p-2 transition-colors ${
                    rating >= value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                  aria-label={`${value} star${value > 1 ? "s" : ""}`}
                >
                  <Star className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="review-comment" className="text-sm font-medium">
              Comment
            </label>
            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you liked or what could improve..."
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              rows={5}
              required
            />
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting || comment.trim().length === 0}
            >
              {isSubmitting
                ? "Saving..."
                : isEditMode
                  ? "Update Review"
                  : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
