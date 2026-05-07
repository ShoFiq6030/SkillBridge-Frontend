import { env } from "@/env";
import { cookies } from "next/headers";




export const userService = {
  
  getSession: async () => {
    try {
      const cookieStore = await cookies();
      // console.log(cookieStore)

      const res = await fetch(`${env.API_URL}/api/auth/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        cache: "no-store",
      });

      const session = await res.json();
      // console.log("Session data in userService:", session);

      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  getChatData :async(bookingId: string) => {
    try {
       const cookieStore = await cookies();
      const res = await fetch(
        `${env.API_URL}/api/chat/room/${bookingId}`,
        {
          headers: {
            Cookie: cookieStore.toString(),
           
          },
        },
      );
      const resData = await res.json();
      return { data: resData, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  getUserBookings: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/booking`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        cache: "no-store",
      });
      const bookings = await res.json();
      return { data: bookings, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

 

};
