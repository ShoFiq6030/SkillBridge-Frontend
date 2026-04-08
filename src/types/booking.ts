export interface TutorProfile {
  id: string;
  userId: string;
  headline: string;
  bio: string;
  hourlyRate: number;
  currency: string;
  language: string;
  experienceYears: number;
  avgRating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
    email: string;
    image: string;
  };
}

export interface Slot {
  id: string;
  tutorProfileId: string;
  startAt: string;
  endAt: string;
  duration: number;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TutorSubject {
  id: string;
  tutorProfileId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: string;
    name: string;
    slag: string;
  };
}

export interface Booking {
  id: string;
  tutorProfileId: string;
  studentId: string;
  slotId: string;
  tutorSubjectId: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  note: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  tutorProfile: TutorProfile;
  slot: Slot;
  tutorSubject: TutorSubject;
  review?: {
    id: string;
    bookingId: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface BookingResponse {
  success: boolean;
  message?: string;
  data: Booking[];
}
