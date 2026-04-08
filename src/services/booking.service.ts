import { env } from "@/env";
import { BookingResponse } from "@/types/booking";
import { cookies } from "next/headers";

export interface BookingData {
  slotId: string;
  tutorSubjectId: string;
  note?: string;
}

export const bookingService = {
  getUserBookings: async function (): Promise<{
    data: BookingResponse | null;
    error: { message: string } | null;
  }> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/booking`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success === false) {
        return {
          data: null,
          error: { message: data.message || "Failed to fetch bookings" },
        };
      }
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

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

  updateBookingStatus: async function (
    bookingId: string,
    status: "CONFIRMED" | "COMPLETED" | "CANCELLED",
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${env.API_URL}/api/booking/status/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify({ status }),
        },
      );
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        return {
          data: null,
          error: { message: data.message || "Failed to update booking status" },
        };
      }
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  submitReview: async function (
    bookingId: string,
    rating: number,
    comment: string,
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ bookingId, rating, comment }),
      });
      const data = await res.json();
      if (data.success === false) {
        return {
          data: null,
          error: { message: data.message || "Failed to submit review" },
        };
      }
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  updateReview: async function (
    reviewId: string,
    rating: number,
    comment: string,
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/reviews/${reviewId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ rating, comment }),
      });
      const data = await res.json();
      if (data.success === false) {
        return {
          data: null,
          error: { message: data.message || "Failed to update review" },
        };
      }
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
