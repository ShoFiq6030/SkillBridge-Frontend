// components/ChatBox.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@/hooks/useChat";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { format, isToday, isYesterday, parseISO } from "date-fns";

interface Props {
  chatRoomId: string;
  currentUserId: string;
  bookingStatus: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
}

export default function ChatBox({
  chatRoomId,
  currentUserId,
  bookingStatus,
}: Props) {
  const [session, setSession] = useState<any>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await authClient.getSession();
        setSession(sessionData.data);
      } catch (error) {
        console.error("Failed to fetch session:", error);
      } finally {
        setSessionLoading(false);
      }
    };
    fetchSession();
  }, []);

  const currentUserName = session?.user?.name || "Unknown User";
  const currentUserImage = session?.user?.image || undefined;
  const { messages, isLoading, sendMessage } = useChat(
    chatRoomId,
    currentUserId,
    currentUserName,
    currentUserImage,
  );
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(input.trim());
    setInput("");
  };

  function formatMessageDate(dateString: string) {
    const date = parseISO(dateString);

    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";

    return format(date, "MMM dd, yyyy");
  }

  if (isLoading || sessionLoading)
    return (
      <p className="text-center text-gray-400 dark:text-gray-500">
        Loading messages...
      </p>
    );

  return (
    <div className="flex flex-col h-full border rounded-xl overflow-hidden bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white dark:bg-slate-800">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-gray-400">
            No messages yet
          </p>
        ) : (
          messages?.map((msg, index) => {
            const isMe = msg.senderId === currentUserId;

            // ✅ check previous message date
            const prevMsg = messages[index - 1];

            const showDate =
              !prevMsg ||
              formatMessageDate(prevMsg.createdAt) !==
                formatMessageDate(msg.createdAt);

            return (
              <div key={msg.id}>
                {/* ✅ DATE SEPARATOR */}
                {showDate && (
                  <div className="flex justify-center my-3">
                    <span className="text-xs bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full">
                      {formatMessageDate(msg.createdAt)}
                    </span>
                  </div>
                )}

                <div
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  {!isMe && (
                    <div className="flex flex-col justify-end items-center">
                      <Image
                        width={24}
                        height={24}
                        src={
                          msg.sender.image ||
                          "https://res.cloudinary.com/dfz4ek2ub/image/upload/v1766300704/PH/PH-10/ladaenosgqi8pdhgyd9l.png"
                        }
                        alt={msg.sender.name}
                        className="w-6 h-6 rounded-full border border-gray-300 dark:border-slate-500 mr-2"
                      />
                    </div>
                  )}

                  <div
                    className={`flex flex-col ${
                      isMe ? "items-end" : "items-start"
                    }`}
                  >
                    {!isMe && (
                      <p className="text-xs text-gray-600/50 dark:text-gray-300/30 mb-1">
                        {msg.sender.name}
                      </p>
                    )}

                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                        isMe
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-100 rounded-bl-none"
                      }`}
                    >
                      <p>{msg.content}</p>

                      <p
                        className={`text-xs mt-1 ${
                          isMe
                            ? "text-blue-100"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {format(parseISO(msg.createdAt), "hh:mm a")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        <div />
      </div>

      {/* Input */}
      {bookingStatus === "CONFIRMED" && (
        <div className="border-t border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 p-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 border border-gray-200 dark:border-slate-500 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}
