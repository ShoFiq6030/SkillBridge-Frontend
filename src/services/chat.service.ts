import { env } from "@/env";
import { cookies } from "next/headers";

export const chatService = {
  getChatRooms: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/api/chat/chat-rooms`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        cache: "no-store",
      });
      const chatRooms = await res.json();
      return { data: chatRooms.data, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
