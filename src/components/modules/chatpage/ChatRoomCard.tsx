import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChatRoomItem } from "@/types";
import { parseISO, format, formatDistanceToNow } from "date-fns";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ChatRoomCard({
  room,
  isTutor ,
}: {
  room: ChatRoomItem;
  isTutor: boolean;
}) {
  const { booking, student, tutor, messages } = room;

  const lastMessage = messages.at(-1);

  const lastActivityTime = lastMessage?.createdAt || room.createdAt;

  // const isSenderTutor = lastMessage?.senderId === room.tutorId;

  // ✅ status color mapping (fix: use supported variants)
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "PENDING":
        return "secondary";
      case "CONFIRMED":
        return "default";
      case "CANCELLED":
        return "destructive";
      case "COMPLETED":
        return "outline";
      default:
        return "outline";
    }
  };

  // ✅ slot time range
  const formatTimeRange = (startAt: string, endAt: string) => {
    return `${format(parseISO(startAt), "h:mm a")} - ${format(
      parseISO(endAt),
      "h:mm a",
    )}`;
  };

  // ✅ last message time ago
  const timeAgo = formatDistanceToNow(parseISO(lastActivityTime), {
    addSuffix: true,
  });

  // ✅ subject fallback (API safe)
  const subject = booking.tutorSubject?.category?.name || "General Session";

  return (
    <Link
      href={`${isTutor ? "/dashboard/tutor-dashboard/manage-bookings/chat" : "/dashboard/user-dashboard/chat"}/${room.booking.id}`}
      className="block"
    >
      <Card className="hover:shadow-md transition-all hover:bg-muted/40 cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            {isTutor ? (
              <Avatar className="h-12 w-12">
                <AvatarImage src={student.image} alt={student.name} />
                <AvatarFallback>
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className="h-12 w-12">
                <AvatarImage src={tutor.image} alt={tutor.name} />
                <AvatarFallback>
                  {tutor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Name + Time */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold truncate">{isTutor ? student.name : tutor.name}</h3>

                {/* ⏱ Last activity */}
                <span className="text-xs text-muted-foreground">{timeAgo}</span>
              </div>

              {/* Subject + Status */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <Badge
                  variant={getStatusVariant(booking.status) as any}
                  className="text-[10px]"
                >
                  {booking.status}
                </Badge>

                <span className="truncate">{subject}</span>
              </div>

              {/* Slot time */}
              <div className="text-xs text-muted-foreground mt-1">
                <span className="text-xs text-muted-foreground">
                  {format(parseISO(booking.slot.startAt), " dd MMM")}
                </span>{" "}
                | {formatTimeRange(booking.slot.startAt, booking.slot.endAt)}
              </div>

              {/* Last Message */}
              <p className="text-sm text-muted-foreground truncate mt-1">
                {lastMessage ? (
                  <>
                    {isTutor ? "You: " : room.tutor.name + ": "}
                    {lastMessage.content}
                  </>
                ) : (
                  "No messages yet"
                )}
              </p>
            </div>

            {/* Right side */}
            <div className="text-right flex flex-col items-end gap-2">
              {/* 📅 booking date */}

              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
