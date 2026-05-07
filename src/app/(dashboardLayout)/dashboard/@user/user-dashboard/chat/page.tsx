// app/dashboard/tutor-dashboard/manage-bookings/chat/page.tsx
// adjust to your service
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Calendar, Clock, MessageSquare } from "lucide-react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { chatService } from "@/services/chat.service";
import { BookingSearchFilter } from "@/components/modules/chatpage/BookingSearchFilter";
import ChatRoomCard from "@/components/modules/chatpage/ChatRoomCard";
import { ChatRoomItem } from "@/types";

export const dynamic = "force-dynamic";


// ── Page ──────────────────────────────────────────────────────────────────

export default async function UserChatPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const response = await chatService.getChatRooms();
  if (response.error || !response.data) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-destructive font-semibold mb-2">Error</p>
            <p className="text-muted-foreground">
              {response.error?.message || "Failed to load chat rooms"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const chatRooms: ChatRoomItem[] = response.data;

const sortedRooms = [...chatRooms].sort((a, b) => {
  const aLast = a.messages.at(-1)?.createdAt || a.createdAt;
  const bLast = b.messages.at(-1)?.createdAt || b.createdAt;
  return new Date(bLast).getTime() - new Date(aLast).getTime();
});
  // ── Filter from URL searchParams ────────────────────────────────────────
  const { status, search } = await searchParams;
  const statusFilter = status || "CONFIRMED";
  const searchTerm = search?.toLowerCase() || "";

  const filtered = sortedRooms.filter((room) => {
    const matchesSearch =
      !searchTerm ||
      room.student.name.toLowerCase().includes(searchTerm) ||
      room.booking.tutorSubject?.category?.name
        ?.toLowerCase()
        .includes(searchTerm);

    const matchesStatus =
      statusFilter === "ALL" || room.booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Counts use all rooms (not filtered) so numbers don't reset on search
  const counts = {
    ALL: chatRooms.length,
    CONFIRMED: chatRooms.filter((r) => r.booking.status === "CONFIRMED").length,
    COMPLETED: chatRooms.filter((r) => r.booking.status === "COMPLETED").length,
    CANCELLED: chatRooms.filter((r) => r.booking.status === "CANCELLED").length,
  };

  return (
    <div className="space-y-6">
      <PageHeader />

      <BookingSearchFilter
        currentStatus={statusFilter}
        currentSearch={searchTerm}
        counts={counts}
      />

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">
                No bookings found for the selected filter
              </p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((room) => <ChatRoomCard key={room.id} room={room} isTutor={false} />)
        )}
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────

function PageHeader() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Student Chats</h1>
      <p className="text-muted-foreground">
        View and communicate with tutor about your bookings.
      </p>
    </div>
  );
}

