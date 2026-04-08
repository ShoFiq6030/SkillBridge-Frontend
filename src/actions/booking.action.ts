"use server";

import { bookingService } from "@/services/booking.service";
import { revalidatePath } from "next/cache";

export const getUserBookingsAction = async () => {
  return await bookingService.getUserBookings();
};

export const updateBookingStatusAction = async (
  bookingId: string,
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED",
) => {
  const result = await bookingService.updateBookingStatus(bookingId, status);
  revalidatePath("/dashboard/user-dashboard");
  return result;
};

export const submitReviewAction = async (
  bookingId: string,
  rating: number,
  comment: string,
) => {
  const result = await bookingService.submitReview(bookingId, rating, comment);
  revalidatePath("/dashboard/user-dashboard");
  return result;
};

export const updateReviewAction = async (
  reviewId: string,
  rating: number,
  comment: string,
) => {
  const result = await bookingService.updateReview(reviewId, rating, comment);
  revalidatePath("/dashboard/user-dashboard");
  return result;
};
