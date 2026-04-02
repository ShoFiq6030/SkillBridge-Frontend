"use server";
import { tutorService } from "@/services/tutor.service";
import { Tutor } from "@/types/tutor.type";
import { updateTag } from "next/cache";
import { bookingService } from "@/services/booking.service";

export const updateTutorProfile = async (
  tutorId: string,
  profileData: Partial<Tutor>,
) => {
  try {
    // console.log(profileData, "server action");
    const res = await tutorService.updateTutor(tutorId, profileData);
    updateTag("tutor-profile");
    if (res.data===null) {
        return { data: null, error: { message: res.error?.message || "Failed to update tutor profile" } };
    }
    return { data: res, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: { message: err.message || "Something Went Wrong" },
    };
  }
};
export const deleteSubject = async (
  subjectId: string,
  
) => {
  try {
    
    const res = await tutorService.deleteSubject(subjectId);
    updateTag("tutor-profile-auth");
    if (res.data===null) {
        return { data: null, error: { message: res.error?.message || "Failed to update tutor profile" } };
    }
    return { data: res, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: { message: err.message || "Something Went Wrong" },
    };
  }
};
export const addSubject = async (
  subjectId: string,
  
) => {
  try {
    
    const res = await tutorService.addSubject(subjectId);
    updateTag("tutor-profile-auth");
    if (res.data===null) {
        return { data: null, error: { message: res.error?.message || "Failed to update tutor profile" } };
    }
    return { data: res, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: { message: err.message || "Something Went Wrong" },
    };
  }
};

export const createCategory = async (
  name: string,
  slug: string,
) => {
  try {
    
    const res = await tutorService.createCategory(name, slug);
    updateTag("categories");
    if (res.data===null) {
        return { data: null, error: { message: res.error?.message || "Failed to create category" } };
    }
    return { data: res, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: { message: err.message || "Something Went Wrong" },
    };
  }
};

export const deleteSlot = async (
  slotId: string,
) => {
  try {
    
    const res = await tutorService.deleteSlot(slotId);
    updateTag("tutor-profile-auth");
    if (res.data===null) {
        return { data: null, error: { message: res.error?.message || "Failed to delete slot" } };
    }
    return { data: res, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: { message: err.message || "Something Went Wrong" },
    };
  }
};

export const updateSlot = async (
  slotId: string,
  startAt: string,
  endAt: string,
) => {
  try {
    
    const res = await tutorService.updateSlot(slotId, startAt, endAt);
    updateTag("tutor-profile-auth");
    if (res.data===null) {
        return { data: null, error: { message: res.error?.message || "Failed to update slot" } };
    }
    return { data: res, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: { message: err.message || "Something Went Wrong" },
    };
  }
};

export const addSlot = async (
  startAt: string,
  endAt: string,
) => {
  try {
    
    const res = await tutorService.addSlot(startAt, endAt);
    updateTag("tutor-profile-auth");
    if (res.data===null) {
        return { data: null, error: { message: res.error?.message || "Failed to add slot" } };
    }
    return { data: res, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: { message: err.message || "Something Went Wrong" },
    };
  }
};

export async function updateBookingStatusAction(
  bookingId: string,
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED"
) {
  try {
    const result = await bookingService.updateBookingStatus(bookingId, status);
    
    if (result.error) {
      return {
        success: false,
        error: result.error.message || "Failed to update booking status",
      };
    }
    
     updateTag("tutor-profile-auth");

    return {
      success: true,
      message: `Booking ${status.toLowerCase()} successfully`,
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to update booking status",
    };
  }
}