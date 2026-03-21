"use server";

import { BookingData, bookingService } from "@/services/booking.service";
import { updateTag } from "next/cache";

export const bookSlot = async (bookingData: BookingData) => {
  const result = await bookingService.bookSlot(bookingData);
  updateTag("tutor-profile");
  return result;
};
