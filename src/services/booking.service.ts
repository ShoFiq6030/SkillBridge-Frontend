import { env } from "@/env";
import { cookies } from "next/headers";

export interface BookingData {
  slotId: string;
  tutorSubjectId: string;
  note?: string;
}

export const bookingService = {
  bookSlot: async function (bookingData: BookingData) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        return {
          data: null,
          error: { message: data.message || "Booking Failed" },
        };
      }
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
