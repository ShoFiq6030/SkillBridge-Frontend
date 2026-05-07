"use client";

import { useEffect, useRef, useState } from "react";
import { env } from "@/env";
import Pusher, { Channel } from "pusher-js";
import { sendMessageAction } from "@/actions/chat.action";

interface Message {
  id: string;
  content: string;
  senderId: string;
  sender: { id: string; name: string; image?: string };
  createdAt: string;
}

let pusherSingleton: Pusher | null = null;

const getPusher = (): Pusher => {
  if (pusherSingleton) return pusherSingleton;

  pusherSingleton = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
    channelAuthorization: {
      endpoint: `/api/pusher/auth`, // ✅ relative URL via proxy
      transport: "ajax",
      customHandler: async ({ socketId, channelName }, callback) => {
        try {
          const res = await fetch(`/api/pusher/auth`, { // ✅ relative URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              socket_id: socketId,
              channel_name: channelName,
            }),
          });

          if (!res.ok) {
            pusherSingleton?.disconnect();
            pusherSingleton = null;
            callback(new Error(`Auth failed: ${res.status}`), null);
            return;
          }

          const data = await res.json();
          callback(null, data);
        } catch (err: any) {
          pusherSingleton?.disconnect();
          pusherSingleton = null;
          callback(err, null);
        }
      },
    },
  });

  pusherSingleton.connection.bind("connected", () => {
    console.log("✅ Pusher connected:", pusherSingleton?.connection.socket_id);
  });

  pusherSingleton.connection.bind("error", (err: any) => {
    console.error("❌ Pusher connection error:", err);
  });

  pusherSingleton.connection.bind("state_change", (states: any) => {
    console.log("🔄 Pusher state:", states.previous, "→", states.current);
  });

  return pusherSingleton;
};
export function useChat(
  chatRoomId: string,
  currentUserId: string,
  currentUserName: string,
  currentUserImage?: string,
) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sentMessageIdsRef = useRef<Set<string>>(new Set());
  const channelRef = useRef<Channel | null>(null);

  
// Load existing messages
useEffect(() => {
  const fetchMessages = async () => {
    try {
      const res = await fetch(
        `/api/chat/messages/${chatRoomId}`, // ✅ relative URL via proxy
        { credentials: "include" },
      );
      const data = await res.json();
      setMessages(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setIsLoading(false);
    }
  };
  fetchMessages();
}, [chatRoomId]);

  // Subscribe to channel
  useEffect(() => {
    const pusher = getPusher();
    const channelName = `private-chat-${chatRoomId}`;

    console.log("📡 Subscribing to channel:", channelName);
    const channel = pusher.subscribe(channelName);
    channelRef.current = channel;

    channel.bind("pusher:subscription_succeeded", () => {
      console.log("✅ Subscribed to:", channelName);
    });

    channel.bind("pusher:subscription_error", (error: any) => {
      console.error("❌ Subscription error:", error);
    });

    channel.bind("new-message", (data: Message) => {
      console.log("📨 New message from Pusher:", data);
      setMessages((prev) => {
        const exists = prev.some((m) => m.id === data.id);
        if (exists || sentMessageIdsRef.current.has(data.id)) {
          console.log("⏭️ Skipping duplicate:", data.id);
          sentMessageIdsRef.current.delete(data.id);
          return prev;
        }
        return [...prev, data]; // ✅ removed senderId check
      });
    });

    return () => {
      console.log("🔌 Unsubscribing from:", channelName);
      channel.unbind_all();
      pusher.unsubscribe(channelName);
      channelRef.current = null;
    };
  }, [chatRoomId]);

  const sendMessage = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    const tempId = `temp-${Date.now()}-${Math.random()}`;
    const tempMessage: Message = {
      id: tempId,
      content: trimmed,
      senderId: currentUserId,
      sender: {
        id: currentUserId,
        name: currentUserName,
        image: currentUserImage,
      },
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMessage]);

    try {
      const result = await sendMessageAction(chatRoomId, trimmed);

      if (!result.success) {
        setMessages((prev) => prev.filter((m) => m.id !== tempId));
      } else if (result.data?.id) {
        // ✅ Register real ID before replacing so Pusher broadcast is skipped
        sentMessageIdsRef.current.add(result.data.id);

        setMessages((prev) =>
          prev.map((m) =>
            m.id === tempId
              ? {
                  id: result.data!.id,
                  content: result.data!.content,
                  senderId: result.data!.senderId,
                  sender: {
                    id: currentUserId,
                    name: currentUserName,
                    image: currentUserImage,
                  },
                  createdAt: result.data!.createdAt,
                }
              : m,
          ),
        );
      }
    } catch (error) {
      console.error("❌ Error sending message:", error);
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
    }
  };

  return { messages, isLoading, sendMessage };
}