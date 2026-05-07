import { Booking } from "./booking";

export interface ChatRoomItem {
  id: string;
  createdAt: string;
  bookingId: string;
  studentId: string;
  tutorId: string;
  booking: Booking;
  student: { id: string; name: string; image: string };
  tutor: { id: string; name: string; image: string };
  messages: {
    id: string;
    createdAt: string;
    senderId: string;
    content: string;
  }[];
}