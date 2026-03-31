export interface Booking {
  id: string;
  tutorProfileId: string;
  studentId: string;
  slotId: string;
  tutorSubjectId: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  note?: string;
  createdAt: string;
  updatedAt: string;
  slot?: TutorSlot;
  tutorSubject?: TutorSubject;
  student?: User;
}

export interface Tutor {
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

  user: User;
  subjects: TutorSubject[];
  slots: TutorSlot[];
  reviews: Review[];
  bookings: Booking[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  image: string;
}

export interface TutorSubject {
  id: string;
  tutorProfileId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface TutorSlot {
  id: string;
  tutorProfileId: string;
  startAt: string;
  endAt: string;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  tutorProfileId: string;
  studentId: string;
  bookingId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  student?: User;
}
