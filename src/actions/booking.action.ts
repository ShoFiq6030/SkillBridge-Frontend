"use server";

import { BookingData, bookingService } from "@/services/booking.service";
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

export const bookSlotAction = async (bookingData: BookingData ) => {
  console.log(bookingData);
  const result = await bookingService.bookSlot(bookingData);
  revalidatePath("/tutors");
  return result;
}

export const processPaymentAction = async (bookingId: string) => {
  
  const result = await bookingService.processPayment(bookingId);
  // revalidatePath("/dashboard/user-dashboard");
  return result;
}