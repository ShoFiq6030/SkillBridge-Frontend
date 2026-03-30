import { env } from "@/env";
import { cookies } from "next/headers";

export const userService = {
  getSession: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.API_URL}/api/auth/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();
      // console.log(session);

      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
