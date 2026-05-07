import ChatBox from "@/components/layout/ChatBox";
import { userService } from "@/services/user.service";
import { tutorService } from "@/services/tutor.service";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TutorChatPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const session = await userService.getSession();
  const { bookingId } = await params;

  if (!session.data?.user?.id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-destructive mb-4">Please login to access chat</p>
        <Button asChild>
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  // Fetch chatRoom using tutorService
  const res = await tutorService.getChatData(bookingId);

  if (!res.data?.success || !res.data?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg max-w-md text-center">
          <p className="font-semibold">Chat Not Available</p>
          <p className="text-sm">
            This booking does not have an active chat session yet.
          </p>
        </div>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/dashboard/tutor-dashboard/manage-bookings/chat">
            Back to Bookings
          </Link>
        </Button>
      </div>
    );
  }

  const chatRoom = res.data.data;
  const bookingStatus=chatRoom.booking.status;

  return (
    <div className="min-h-[80vh] mt-10 px-4 pb-10">
      <div className="flex items-center gap-2 mb-6">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard/tutor-dashboard/manage-bookings/chat">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Student Chat</h1>
      </div>
      <ChatBox
        chatRoomId={chatRoom.id}
        bookingStatus={bookingStatus}
        currentUserId={session.data?.user?.id!}
      />
    </div>
  );
}
