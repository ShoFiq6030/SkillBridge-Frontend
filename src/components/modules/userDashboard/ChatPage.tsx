"use client";

import { useState, useEffect, useRef } from "react";
import { Booking } from "@/types/booking";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
} from "lucide-react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatMessage {
  id: string;
  sender: "student" | "tutor";
  content: string;
  timestamp: Date;
  read: boolean;
}

interface ChatPageProps {
  booking: Booking;
}

export function ChatPage({ booking }: ChatPageProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "tutor",
      content: `Hi! I'm excited to help you with ${booking.tutorSubject?.category?.name || "your studies"}. See you at ${format(parseISO(booking.slot.startAt), "h:mm a")} on ${format(parseISO(booking.slot.startAt), "EEEE")}!`,
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
  ]);
  const [messageInput, setMessageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!messageInput.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "student",
      content: messageInput,
      timestamp: new Date(),
      read: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessageInput("");
    setIsLoading(true);

    // Simulate tutor response after a delay
    setTimeout(() => {
      const responses = [
        "That sounds great! Looking forward to discussing this with you.",
        "Perfect! I have some resources we can go over together.",
        "Absolutely, we'll cover that in detail during our session.",
        "Great question! Let's dive deeper into this topic.",
      ];

      const tutorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "tutor",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        read: false,
      };

      setMessages((prev) => [...prev, tutorMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const tutorName = booking.tutorProfile?.user?.name || "Tutor";
  const tutorImage = booking.tutorProfile?.user?.image;
  const tutorInitials = tutorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const formatTimeRange = (startAt: string, endAt: string) => {
    const start = parseISO(startAt);
    const end = parseISO(endAt);
    return `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard/user-dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Chat with {tutorName}
          </h1>
          <p className="text-muted-foreground">
            {booking.tutorSubject?.category?.name || "General"} • Session on{" "}
            {format(parseISO(booking.slot.startAt), "MMM dd, yyyy")} at{" "}
            {format(parseISO(booking.slot.startAt), "h:mm a")}
          </p>
        </div>
      </div>

      {/* Main Chat Card */}
      <Card className="overflow-hidden flex flex-col h-150">
        {/* Chat Header */}
        <CardHeader className="border-b bg-muted/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={tutorImage} alt={tutorName} />
                <AvatarFallback>{tutorInitials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-base">{tutorName}</CardTitle>
                <CardDescription className="text-xs">
                  {booking.tutorProfile?.headline || "Professional Tutor"}
                </CardDescription>
              </div>
              <Badge variant="outline" className="capitalize">
                {booking.status.toLowerCase()}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Video className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Tutor Profile</DropdownMenuItem>
                  <DropdownMenuItem>Session Details</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        {/* Session Info Banner */}
        <div className="px-6 py-3 bg-primary/10 border-b text-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Next Session:</span>{" "}
              <span className="text-muted-foreground">
                {format(parseISO(booking.slot.startAt), "EEEE, MMMM dd, yyyy")}{" "}
                at {formatTimeRange(booking.slot.startAt, booking.slot.endAt)}
              </span>
            </div>
            <Badge variant="secondary">
              ${booking.price} {booking.tutorProfile?.currency || "USD"}
            </Badge>
          </div>
        </div>

        {/* Messages Area */}
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "student" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === "student"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-foreground rounded-bl-none"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === "student"
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {format(msg.timestamp, "h:mm a")}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground rounded-lg rounded-bl-none px-4 py-2">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        {/* Message Input */}
        <div className="border-t p-4 bg-muted/50">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-10 w-10"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="h-10 w-10"
              disabled={!messageInput.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>

      {/* Booking Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Session Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Subject</p>
            <p className="font-medium">
              {booking.tutorSubject?.category?.name || "General"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Tutor</p>
            <p className="font-medium">{tutorName}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Date & Time</p>
            <p className="font-medium">
              {format(parseISO(booking.slot.startAt), "MMM dd, yyyy")} at{" "}
              {formatTimeRange(booking.slot.startAt, booking.slot.endAt)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Duration</p>
            <p className="font-medium">{booking.slot.duration} hour(s)</p>
          </div>
          <div>
            <p className="text-muted-foreground">Price</p>
            <p className="font-medium">
              ${booking.price} {booking.tutorProfile?.currency || "USD"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Status</p>
            <Badge className="capitalize">{booking.status.toLowerCase()}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
