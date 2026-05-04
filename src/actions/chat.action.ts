"use server";

import { cookies } from "next/headers";

interface SendMessageResponse {
  success: boolean;
  data?: {
    id: string;
    content: string;
    senderId: string;
    chatRoomId: string;
    createdAt: string;
  };
  error?: string;
}

export async function sendMessageAction(
  chatRoomId: string,
  content: string,
): Promise<SendMessageResponse> {
  try {
    if (!chatRoomId || !content.trim()) {
      return {
        success: false,
        error: "Chat room ID and content are required",
      };
    }

    const cookieStore = await cookies();
    const cookieString = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/chat/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieString,
        },
        body: JSON.stringify({
          chatRoomId,
          content: content.trim(),
        }),
        credentials: "include",
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error:", errorText);
      return {
        success: false,
        error: `Failed to send message: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data || data,
    };
  } catch (error) {
    console.error("Error sending message:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send message",
    };
  }
}
